(function () {
  'use strict';

  var STORAGE_KEY = 'bwj-series-library-v1';
  var STEP_LABELS = ['选题确认', '素材就绪', '旁白录音', '剪辑完成', '已发布'];
  var WEIGHTS = ['S', 'A', 'B', 'C'];

  var library = Array.isArray(window.SERIES_LIBRARY) ? window.SERIES_LIBRARY : [];
  var bigIndex = new Map();
  var subIndex = new Map();
  var epIndex = new Map();
  var allEpisodes = [];

  library.forEach(function (big) {
    bigIndex.set(big.id, big);
    (big.subSeries || []).forEach(function (sub) {
      subIndex.set(sub.id, { big: big, sub: sub });
      (sub.episodes || []).forEach(function (ep) {
        epIndex.set(ep.id, { big: big, sub: sub, ep: ep });
        allEpisodes.push({ big: big, sub: sub, ep: ep });
      });
    });
  });

  var els = {
    tree: document.getElementById('tree'),
    content: document.getElementById('content'),
    search: document.getElementById('search'),
    searchHint: document.getElementById('search-hint'),
    searchClear: document.getElementById('search-clear'),
    statShot: document.getElementById('stat-shot'),
    statPublished: document.getElementById('stat-published'),
    statProgress: document.getElementById('stat-progress'),
    toast: document.getElementById('toast'),
    btnExport: document.getElementById('btn-export'),
    btnImport: document.getElementById('btn-import'),
    btnReset: document.getElementById('btn-reset'),
    fileImport: document.getElementById('file-import')
  };

  var ui = {
    selectedSub: '',
    openEp: null,
    search: '',
    openGroups: {}
  };

  var state = normaliseState(readStoredState());
  var storageWarned = false;
  var noteTimer = null;
  var pendingNote = null;
  var toastTimer = null;

  function esc(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function readStoredState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function normaliseState(raw) {
    var next = { version: 1, weights: { big: {}, sub: {}, ep: {} }, checks: {}, notes: {} };
    if (!raw || typeof raw !== 'object') return next;

    if (raw.weights && typeof raw.weights === 'object') {
      ['big', 'sub', 'ep'].forEach(function (kind) {
        var bucket = raw.weights[kind];
        if (!bucket || typeof bucket !== 'object') return;
        Object.keys(bucket).forEach(function (id) {
          if (WEIGHTS.indexOf(bucket[id]) !== -1) next.weights[kind][id] = bucket[id];
        });
      });
    }

    if (raw.checks && typeof raw.checks === 'object') {
      Object.keys(raw.checks).forEach(function (id) {
        if (!Array.isArray(raw.checks[id])) return;
        next.checks[id] = STEP_LABELS.map(function (_, index) {
          return Boolean(raw.checks[id][index]);
        });
      });
    }

    if (raw.notes && typeof raw.notes === 'object') {
      Object.keys(raw.notes).forEach(function (id) {
        if (typeof raw.notes[id] === 'string') next.notes[id] = raw.notes[id];
      });
    }

    return next;
  }

  function saveState() {
    var ok = false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      ok = true;
    } catch (error) {
      ok = false;
    }
    if (!ok && !storageWarned) {
      storageWarned = true;
      var note = document.querySelector('.save-note');
      if (note) {
        note.innerHTML = '当前浏览器不允许本地保存，刷新后勾选会丢失。<br>请用右上角「导出备份」保存进度。';
      }
      toast('本地保存不可用，请手动导出备份');
    }
  }

  function getChecks(ep) {
    var saved = state.checks[ep.id];
    if (saved && saved.length === STEP_LABELS.length) return saved;
    var fallback = Array.isArray(ep.defaultChecklist) ? ep.defaultChecklist : [];
    return STEP_LABELS.map(function (_, index) {
      return Boolean(fallback[index]);
    });
  }

  function bigWeight(big) {
    return state.weights.big[big.id] || big.weight || 'B';
  }

  function subWeight(sub) {
    return state.weights.sub[sub.id] || sub.weight || 'B';
  }

  function epWeight(ep) {
    return state.weights.ep[ep.id] || ep.weight || 'B';
  }

  function weightClass(weight) {
    return 'weight-' + String(weight || 'b').toLowerCase();
  }

  function weightOptions(selected) {
    return WEIGHTS.map(function (weight) {
      return '<option value="' + weight + '"' + (weight === selected ? ' selected' : '') + '>' + weight + '</option>';
    }).join('');
  }

  function computeStats(episodes) {
    var shots = 0;
    var published = 0;
    var steps = 0;
    (episodes || []).forEach(function (ep) {
      var checks = getChecks(ep);
      if (checks[1]) shots += 1;
      if (checks[4]) published += 1;
      checks.forEach(function (done) {
        if (done) steps += 1;
      });
    });
    var total = (episodes || []).length;
    var totalSteps = total * STEP_LABELS.length;
    return {
      total: total,
      shots: shots,
      published: published,
      steps: steps,
      totalSteps: totalSteps,
      pct: totalSteps ? Math.round((steps / totalSteps) * 100) : 0
    };
  }

  function refreshStats() {
    var stats = computeStats(allEpisodes.map(function (item) { return item.ep; }));
    els.statShot.textContent = String(stats.shots);
    els.statPublished.textContent = String(stats.published);
    els.statProgress.textContent = stats.pct + '%';
  }

  function episodeMatches(ep, query) {
    var text = [
      ep.code,
      ep.title,
      (ep.altTitles || []).join(' '),
      ep.hook,
      ep.copy,
      (ep.tags || []).join(' '),
      ep.source
    ].filter(Boolean).join(' ').toLowerCase();
    return text.indexOf(query) !== -1;
  }

  function isGroupOpen(bigId) {
    if (ui.search.trim()) return true;
    if (Object.prototype.hasOwnProperty.call(ui.openGroups, bigId)) return ui.openGroups[bigId];
    var active = subIndex.get(ui.selectedSub);
    return Boolean(active && active.big.id === bigId);
  }

  function updateSearchHint(query, subCount, epCount) {
    if (!query) {
      els.searchHint.textContent = '共 ' + library.length + ' 个大系列 · ' + allEpisodes.length + ' 集';
    } else {
      els.searchHint.textContent = '找到 ' + subCount + ' 个子系列 · ' + epCount + ' 集';
    }
    els.searchClear.hidden = !ui.search;
  }

  function renderTree() {
    var query = ui.search.trim().toLowerCase();
    var html = '';
    var matchedSubs = 0;
    var matchedEps = 0;

    library.forEach(function (big) {
      var bigText = [big.name, big.tagline, big.description].filter(Boolean).join(' ').toLowerCase();
      var bigHit = !query || bigText.indexOf(query) !== -1;
      var rows = [];

      (big.subSeries || []).forEach(function (sub) {
        var subText = [sub.name, sub.summary].filter(Boolean).join(' ').toLowerCase();
        var subHit = bigHit || subText.indexOf(query) !== -1;
        var episodes = sub.episodes || [];
        var hits = subHit ? episodes : episodes.filter(function (ep) {
          return episodeMatches(ep, query);
        });
        if (!subHit && hits.length === 0) return;
        matchedSubs += 1;
        matchedEps += hits.length;
        rows.push(sub);
      });

      if (rows.length === 0) return;

      var open = isGroupOpen(big.id);
      var bigStats = computeStats((big.subSeries || []).reduce(function (list, sub) {
        return list.concat(sub.episodes || []);
      }, []));

      html += '<div class="tree-group ' + (open ? 'open' : '') + '" data-big="' + esc(big.id) + '">' +
        '<button class="tree-group-head" type="button" data-group="' + esc(big.id) + '" aria-expanded="' + open + '">' +
          '<span class="chev">›</span>' +
          '<span class="dot" style="background:' + esc(big.color || '#e85d3f') + '"></span>' +
          '<span class="tree-name">' + esc(big.name) + '</span>' +
          '<span class="weight ' + weightClass(bigWeight(big)) + ' tree-badge">' + esc(bigWeight(big)) + '</span>' +
          '<span class="tree-count" title="已发布 ' + bigStats.published + ' / 共 ' + bigStats.total + ' 集；已拍 ' + bigStats.shots + ' 集">' + bigStats.published + '/' + bigStats.total + '</span>' +
        '</button>' +
        '<div class="tree-children">' +
          rows.map(function (sub) {
            var stats = computeStats(sub.episodes || []);
            var shotClass = stats.total && stats.shots === stats.total ? 'full' : (stats.shots > 0 ? 'part' : '');
            return '<button class="tree-item ' + (sub.id === ui.selectedSub ? 'active' : '') + '" type="button" data-sub="' + esc(sub.id) + '">' +
              '<span class="tree-name">' + esc(sub.name) + '</span>' +
              '<span class="weight ' + weightClass(subWeight(sub)) + '">' + esc(subWeight(sub)) + '</span>' +
              '<span class="shot-dot ' + shotClass + '" title="已拍 ' + stats.shots + ' / 共 ' + stats.total + ' 集"></span>' +
              '<span class="tree-count" title="已发布 ' + stats.published + ' / 共 ' + stats.total + ' 集；已拍 ' + stats.shots + ' 集">' + stats.published + '/' + stats.total + '</span>' +
            '</button>';
          }).join('') +
        '</div>' +
      '</div>';
    });

    if (html) {
      els.tree.innerHTML = html;
    } else if (query) {
      els.tree.innerHTML = '<div class="tree-empty">没有找到「' + esc(ui.search.trim()) + '」，换个关键词试试。</div>';
    } else {
      els.tree.innerHTML = '<div class="tree-empty">没有读取到系列数据。</div>';
    }

    updateSearchHint(query, matchedSubs, matchedEps);
  }

  function renderDetail() {
    var found = subIndex.get(ui.selectedSub);
    if (!found) {
      els.content.innerHTML = '<div class="empty"><h2>还没有选择系列</h2><p>从左侧目录点开一个子系列，就能看到选题、文案和拍摄建议。</p></div>';
      return;
    }

    var big = found.big;
    var sub = found.sub;
    var episodes = sub.episodes || [];
    var stats = computeStats(episodes);

    document.documentElement.style.setProperty('--series-color', big.color || '#e85d3f');

    els.content.innerHTML =
      '<section class="panel-head">' +
        '<div class="breadcrumb">' + esc(big.name) + ' <span class="sep">/</span> ' + esc(sub.name) + '</div>' +
        '<h2>' + esc(sub.name) + '</h2>' +
        '<p class="tagline">' + esc(sub.summary || big.tagline || '') + '</p>' +
        '<div class="head-meta">' +
          '<label class="control">大系列权重 <select data-big-weight="' + esc(big.id) + '">' + weightOptions(bigWeight(big)) + '</select></label>' +
          '<label class="control">子系列权重 <select data-sub-weight="' + esc(sub.id) + '">' + weightOptions(subWeight(sub)) + '</select></label>' +
          '<div class="progress-wrap">' +
            '<div class="progress-label"><span id="head-progress-label">已完成 ' + stats.steps + ' / ' + stats.totalSteps + ' 步</span><b id="head-progress-pct">' + stats.pct + '%</b></div>' +
            '<div class="progress-bar"><div class="progress-fill" id="head-progress-fill" style="width:' + stats.pct + '%"></div></div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<div class="detail-toolbar">' +
        '<div><h3>建议选题</h3><span class="sub">共 ' + episodes.length + ' 集 · 已发布 ' + stats.published + '/' + stats.total + '</span></div>' +
        '<button class="btn-small" id="btn-expand-all" type="button">展开全部</button>' +
      '</div>' +
      '<div class="episode-list">' + episodes.map(renderEpisode).join('') + '</div>';
  }

  function renderEpisode(ep) {
    var checks = getChecks(ep);
    var open = ui.openEp === ep.id;
    var altTitles = ep.altTitles || [];
    var tags = ep.tags || [];
    var shooting = ep.shooting || [];
    var meta = '';

    if (ep.duration) meta += '<span class="meta-item">目标 ' + esc(ep.duration) + '</span>';
    if (ep.source) meta += '<span class="meta-item source">' + esc(ep.source) + '</span>';
    tags.forEach(function (tag) {
      meta += '<span class="meta-item">#' + esc(tag) + '</span>';
    });

    return '<article class="episode ' + (open ? 'open' : '') + '" data-episode="' + esc(ep.id) + '">' +
      '<div class="ep-head">' +
        '<span class="code">' + esc(ep.code || ep.id) + '</span>' +
        '<h4 class="ep-title">' + esc(ep.title) + '</h4>' +
        '<div class="ep-tools">' +
          '<select class="ep-weight" data-ep-weight="' + esc(ep.id) + '" title="单集权重" aria-label="单集权重">' + weightOptions(epWeight(ep)) + '</select>' +
          '<button class="expand-btn" type="button" data-expand="' + esc(ep.id) + '" aria-expanded="' + open + '" aria-label="展开或收起文案">▾</button>' +
        '</div>' +
      '</div>' +
      '<div class="status-row">' +
        STEP_LABELS.map(function (label, index) {
          return '<label class="check-pill step-' + index + ' ' + (checks[index] ? 'on' : '') + '">' +
            '<input type="checkbox" data-ep="' + esc(ep.id) + '" data-step="' + index + '"' + (checks[index] ? ' checked' : '') + '>' +
            '<span>' + label + '</span>' +
          '</label>';
        }).join('') +
      '</div>' +
      '<div class="ep-body">' +
        (altTitles.length ? '<div class="alt-titles">' + altTitles.map(function (title) {
          return '<span class="chip">' + esc(title) + '</span>';
        }).join('') + '</div>' : '') +
        (ep.hook ? '<div class="hook"><span class="hook-label">开场钩子</span><p>' + esc(ep.hook) + '</p></div>' : '') +
        '<div class="section-label"><span>口播文案 · 小学生第一人称</span><button class="copy-btn" type="button" data-copy="' + esc(ep.id) + '">复制文案</button></div>' +
        '<div class="copy-block"><p>' + esc(ep.copy || '') + '</p></div>' +
        '<div class="section-label"><span>拍摄建议</span></div>' +
        '<ol class="shooting-list">' + shooting.map(function (tip) {
          return '<li>' + esc(tip) + '</li>';
        }).join('') + '</ol>' +
        '<div class="ep-meta">' + meta + '</div>' +
        '<label class="note-label" for="note-' + esc(ep.id) + '">备注</label>' +
        '<textarea class="note" id="note-' + esc(ep.id) + '" data-note="' + esc(ep.id) + '" placeholder="记录拍摄时间、改稿想法、发布数据……自动保存">' + esc(state.notes[ep.id] || '') + '</textarea>' +
      '</div>' +
    '</article>';
  }

  function selectSub(subId, epId) {
    var found = subIndex.get(subId);
    if (!found) return;

    var episodes = found.sub.episodes || [];
    var nextEp = epId !== undefined ? epId : (episodes[0] ? episodes[0].id : null);

    ui.selectedSub = subId;
    ui.openGroups[found.big.id] = true;
    ui.openEp = episodes.some(function (ep) { return ep.id === nextEp; }) ? nextEp : (episodes[0] ? episodes[0].id : null);

    renderTree();
    renderDetail();
    writeHash();

    if (window.innerWidth <= 980) {
      els.content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function toggleEpisode(epId) {
    ui.openEp = ui.openEp === epId ? null : epId;
    syncEpisodeOpen();
    writeHash();
    var allButton = document.getElementById('btn-expand-all');
    if (allButton) allButton.textContent = '展开全部';
  }

  function syncEpisodeOpen() {
    var cards = els.content.querySelectorAll('.episode');
    Array.prototype.forEach.call(cards, function (card) {
      var open = card.dataset.episode === ui.openEp;
      card.classList.toggle('open', open);
      var button = card.querySelector('[data-expand]');
      if (button) button.setAttribute('aria-expanded', String(open));
    });
  }

  function toggleAllEpisodes() {
    var cards = els.content.querySelectorAll('.episode');
    if (!cards.length) return;
    var allOpen = Array.prototype.every.call(cards, function (card) {
      return card.classList.contains('open');
    });
    Array.prototype.forEach.call(cards, function (card) {
      card.classList.toggle('open', !allOpen);
      var button = card.querySelector('[data-expand]');
      if (button) button.setAttribute('aria-expanded', String(!allOpen));
    });
    ui.openEp = null;
    writeHash();
    var allButton = document.getElementById('btn-expand-all');
    if (allButton) allButton.textContent = allOpen ? '展开全部' : '收起全部';
  }

  function updateHeadProgress() {
    var found = subIndex.get(ui.selectedSub);
    if (!found) return;
    var stats = computeStats(found.sub.episodes || []);
    var label = document.getElementById('head-progress-label');
    var pct = document.getElementById('head-progress-pct');
    var fill = document.getElementById('head-progress-fill');
    if (label) label.textContent = '已完成 ' + stats.steps + ' / ' + stats.totalSteps + ' 步';
    if (pct) pct.textContent = stats.pct + '%';
    if (fill) fill.style.width = stats.pct + '%';
  }

  function handleStepChange(input) {
    var epId = input.dataset.ep;
    var step = Number(input.dataset.step);
    var found = epIndex.get(epId);
    if (!found || !Number.isInteger(step)) return;

    var checks = getChecks(found.ep).slice();
    var checked = input.checked;
    if (checked) {
      for (var i = 0; i <= step; i += 1) checks[i] = true;
    } else {
      for (var j = step; j < checks.length; j += 1) checks[j] = false;
    }
    state.checks[epId] = checks;

    var card = input.closest('.episode');
    if (card) {
      Array.prototype.forEach.call(card.querySelectorAll('input[data-step]'), function (box) {
        var index = Number(box.dataset.step);
        box.checked = Boolean(checks[index]);
        var pill = box.closest('.check-pill');
        if (pill) pill.classList.toggle('on', Boolean(checks[index]));
      });
    }

    saveState();
    refreshStats();
    updateHeadProgress();
    renderTree();
    toast(checked ? '已标记到「' + STEP_LABELS[step] + '」' : '已取消「' + STEP_LABELS[step] + '」');
  }

  function handleWeightChange(select) {
    var value = select.value;
    if (WEIGHTS.indexOf(value) === -1) return;

    if (select.dataset.epWeight) {
      state.weights.ep[select.dataset.epWeight] = value;
    } else if (select.dataset.subWeight) {
      state.weights.sub[select.dataset.subWeight] = value;
    } else if (select.dataset.bigWeight) {
      state.weights.big[select.dataset.bigWeight] = value;
    }
    saveState();
    renderTree();
    toast('权重已改为 ' + value);
  }

  function flushNote(showToast) {
    if (!pendingNote) return;
    state.notes[pendingNote.id] = pendingNote.value;
    pendingNote = null;
    clearTimeout(noteTimer);
    saveState();
    if (showToast) toast('备注已保存');
  }

  function queueNoteSave(id, value) {
    pendingNote = { id: id, value: value };
    clearTimeout(noteTimer);
    noteTimer = setTimeout(function () { flushNote(false); }, 350);
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      els.toast.classList.remove('show');
    }, 1700);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () {
        return true;
      }).catch(function () {
        return legacyCopy(text);
      });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (error) {
      ok = false;
    }
    area.remove();
    return ok;
  }

  function copyEpisode(epId, button) {
    var found = epIndex.get(epId);
    if (!found) return;
    copyText(found.ep.copy || '').then(function (ok) {
      if (!ok) {
        toast('复制失败，请手动选中文案');
        return;
      }
      var original = button.textContent;
      button.textContent = '已复制';
      toast('文案已复制');
      setTimeout(function () {
        button.textContent = original;
      }, 1400);
    });
  }

  function writeHash() {
    if (!ui.selectedSub) return;
    var hash = '#' + ui.selectedSub + (ui.openEp ? '/' + ui.openEp : '');
    try {
      history.replaceState(null, '', hash);
    } catch (error) {
      // file:// 下个别浏览器不允许修改地址，深链接仍可在打开时生效
    }
  }

  function initSelection() {
    var raw = '';
    try {
      raw = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    } catch (error) {
      raw = '';
    }
    var parts = raw.split('/');
    var subId = parts[0] || '';
    var epId = parts[1] || '';
    var found = subIndex.get(subId);

    if (found) {
      var episodes = found.sub.episodes || [];
      ui.selectedSub = subId;
      ui.openEp = episodes.some(function (ep) { return ep.id === epId; }) ? epId : (episodes[0] ? episodes[0].id : null);
    } else {
      var fallbackId = subIndex.has('game-platform') ? 'game-platform' : (allEpisodes[0] ? allEpisodes[0].sub.id : '');
      var fallback = subIndex.get(fallbackId);
      ui.selectedSub = fallbackId;
      ui.openEp = fallback && fallback.sub.episodes[0] ? fallback.sub.episodes[0].id : null;
    }

    var active = subIndex.get(ui.selectedSub);
    if (active) ui.openGroups[active.big.id] = true;
  }

  function buildExport() {
    var weights = { big: {}, sub: {}, ep: {} };
    var checks = {};
    library.forEach(function (big) {
      weights.big[big.id] = bigWeight(big);
      (big.subSeries || []).forEach(function (sub) {
        weights.sub[sub.id] = subWeight(sub);
        (sub.episodes || []).forEach(function (ep) {
          weights.ep[ep.id] = epWeight(ep);
        });
      });
    });
    allEpisodes.forEach(function (item) {
      checks[item.ep.id] = getChecks(item.ep);
    });
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      weights: weights,
      checks: checks,
      notes: state.notes
    };
  }

  function exportState() {
    var blob = new Blob([JSON.stringify(buildExport(), null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    var stamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = '系列库备份-' + stamp + '.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast('备份已导出');
  }

  function importState(file) {
    var reader = new FileReader();
    reader.onload = function () {
      var payload = null;
      try {
        payload = JSON.parse(String(reader.result));
      } catch (error) {
        toast('导入失败：不是有效的 JSON 文件');
        return;
      }
      if (!payload || typeof payload !== 'object' || (!payload.checks && !payload.weights)) {
        toast('导入失败：文件格式不对');
        return;
      }
      if (!window.confirm('导入会覆盖当前所有勾选、权重和备注，确定继续吗？')) return;
      clearTimeout(noteTimer);
      pendingNote = null;
      state = normaliseState(payload);
      saveState();
      renderTree();
      renderDetail();
      refreshStats();
      toast('备份已导入');
    };
    reader.onerror = function () {
      toast('读取文件失败');
    };
    reader.readAsText(file);
  }

  function resetState() {
    if (!window.confirm('确定清空所有勾选、权重和备注吗？此操作不可撤销，建议先导出备份。')) return;
    clearTimeout(noteTimer);
    pendingNote = null;
    state = normaliseState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // 忽略，内存中的状态已重置
    }
    renderTree();
    renderDetail();
    refreshStats();
    toast('已清空所有标记');
  }

  els.tree.addEventListener('click', function (event) {
    var group = event.target.closest('.tree-group-head');
    if (group) {
      var bigId = group.dataset.group;
      ui.openGroups[bigId] = !isGroupOpen(bigId);
      renderTree();
      return;
    }
    var item = event.target.closest('.tree-item');
    if (item) selectSub(item.dataset.sub);
  });

  els.content.addEventListener('click', function (event) {
    var expand = event.target.closest('[data-expand]');
    if (expand) {
      toggleEpisode(expand.dataset.expand);
      return;
    }
    var copy = event.target.closest('[data-copy]');
    if (copy) {
      copyEpisode(copy.dataset.copy, copy);
      return;
    }
    if (event.target.closest('#btn-expand-all')) toggleAllEpisodes();
  });

  els.content.addEventListener('change', function (event) {
    var step = event.target.closest('input[data-step]');
    if (step) {
      handleStepChange(step);
      return;
    }
    var select = event.target.closest('select[data-ep-weight], select[data-sub-weight], select[data-big-weight]');
    if (select) handleWeightChange(select);
  });

  els.content.addEventListener('input', function (event) {
    var note = event.target.closest('textarea[data-note]');
    if (note) queueNoteSave(note.dataset.note, note.value);
  });

  els.content.addEventListener('focusout', function (event) {
    var note = event.target.closest('textarea[data-note]');
    if (!note) return;
    pendingNote = { id: note.dataset.note, value: note.value };
    flushNote(true);
  });

  els.search.addEventListener('input', function () {
    ui.search = els.search.value.trim();
    renderTree();
  });

  els.search.addEventListener('search', function () {
    ui.search = els.search.value.trim();
    renderTree();
  });

  els.search.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    els.search.value = '';
    ui.search = '';
    renderTree();
    els.search.focus();
  });

  els.searchClear.addEventListener('click', function () {
    els.search.value = '';
    ui.search = '';
    renderTree();
    els.search.focus();
  });

  els.btnExport.addEventListener('click', exportState);
  els.btnImport.addEventListener('click', function () { els.fileImport.click(); });
  els.btnReset.addEventListener('click', resetState);

  els.fileImport.addEventListener('change', function () {
    var file = els.fileImport.files && els.fileImport.files[0];
    if (file) importState(file);
    els.fileImport.value = '';
  });

  window.addEventListener('beforeunload', function () { flushNote(false); });

  if (!library.length) {
    els.tree.innerHTML = '<div class="tree-empty">没有读取到系列数据。</div>';
    els.searchHint.textContent = '请检查 data.js 是否加载成功';
    els.content.innerHTML = '<div class="empty"><h2>没有读取到系列数据</h2><p>请确认各系列的 data.js 和 index.html 在同一目录，并且都通过 &lt;script&gt; 引入。</p></div>';
    return;
  }

  initSelection();
  renderTree();
  renderDetail();
  refreshStats();
  writeHash();
})();
