(function () {
  'use strict';

  var toastEl = document.getElementById('guide-toast');
  var toastTimer = null;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2000);
  }

  /* ---------- 目录高亮 ---------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.guide-nav a[href^="#"]'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href').slice(1);
      return { link: link, section: document.getElementById(id) };
    })
    .filter(function (item) {
      return item.section;
    });

  function setActive(link) {
    navLinks.forEach(function (item) {
      item.classList.toggle('active', item === link);
    });
  }

  var ticking = false;

  function syncActive() {
    ticking = false;
    if (!sections.length) return;

    var marker = 140;
    var current = sections[0];

    sections.forEach(function (item) {
      if (item.section.getBoundingClientRect().top <= marker) {
        current = item;
      }
    });

    var bottomReached = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
    if (bottomReached) {
      current = sections[sections.length - 1];
    }

    setActive(current.link);
  }

  function requestSync() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(syncActive);
  }

  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync);

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setActive(link);
    });
  });

  syncActive();

  /* ---------- 复制模板 ---------- */

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '0';
    area.style.left = '-9999px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, area.value.length);

    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }

    document.body.removeChild(area);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text) ? undefined : Promise.reject(new Error('copy failed'));
      });
    }
    return legacyCopy(text) ? Promise.resolve() : Promise.reject(new Error('copy failed'));
  }

  document.querySelectorAll('[data-copy-target]').forEach(function (button) {
    button.addEventListener('click', function () {
      var selector = button.getAttribute('data-copy-target');
      var target = selector ? document.querySelector(selector) : null;
      if (!target) return;

      var text = target.innerText.replace(/\n{3,}/g, '\n\n').trim();
      if (!text) {
        toast('模板是空的');
        return;
      }

      copyText(text)
        .then(function () {
          var original = button.textContent;
          button.textContent = '已复制';
          setTimeout(function () {
            button.textContent = original;
          }, 1400);
          toast('模板已复制，可粘贴到文档里');
        })
        .catch(function () {
          toast('复制失败，请手动选择模板内容');
        });
    });
  });

  /* ---------- 打印 ---------- */

  var printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  var openedForPrint = [];

  window.addEventListener('beforeprint', function () {
    openedForPrint = [];
    document.querySelectorAll('.guide-details').forEach(function (details) {
      if (!details.open) {
        openedForPrint.push(details);
        details.open = true;
      }
    });
  });

  window.addEventListener('afterprint', function () {
    openedForPrint.forEach(function (details) {
      details.open = false;
    });
    openedForPrint = [];
  });
})();
