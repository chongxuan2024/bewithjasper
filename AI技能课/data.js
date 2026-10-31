window.SERIES_LIBRARY = window.SERIES_LIBRARY || [];

window.SERIES_LIBRARY.push({
  id: 'skill',
  name: 'AI 技能课',
  tagline: '同一批素材，A 版讲完整故事，C 版只讲概念',
  color: '#3b8f8a',
  weight: 'A',
  description: 'A 系列的知识切片。A 系列负责记录故事和反应，C 系列负责把 SKILL、出题、错题、难度这些概念讲清楚，适合家长和想弄懂原理的小学生。',
  subSeries: [
    {
      id: 'skill-what',
      name: '什么是 SKILL',
      weight: 'A',
      summary: '给 AI 一份工作说明书，写一次，以后都能用。',
      episodes: [
        {
          id: 'C01',
          code: 'C01',
          title: '3 分钟讲清楚什么是 SKILL',
          altTitles: ['SKILL 就是给 AI 的一份工作说明书', '为什么每次都要重新教 AI？'],
          hook: '我爸说 SKILL 就是给 AI 的一份工作说明书，写一次，以后都能用。',
          copy: '我爸说 SKILL 就是给 AI 的一份工作说明书。以前我每次都要重新告诉它怎么出题，现在把规则写进去，一句话它就知道该怎么干。就像打游戏前先选好装备，后面就不用每次都重新选了。',
          shooting: [
            '白板画「没有技能 vs 有技能」两栏',
            '对比两次对话：一次重复说，一次一句话',
            '打开 SKILL.md 只拍结构，不讲代码',
            '结尾用「下期现场做一个」做钩子'
          ],
          weight: 'A',
          duration: '180s',
          source: '',
          tags: ['待拍', '知识课', 'SKILL'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'skill-make',
      name: '做出题 SKILL',
      weight: 'A',
      summary: '从需求、规则到 SKILL.md，再到课本实测。',
      episodes: [
        {
          id: 'C02',
          code: 'C02',
          title: '现场做一个「出题 SKILL」',
          altTitles: ['把我爸脑子里的出题规则掏出来', '第一次运行就翻车，改完才能用'],
          hook: '今天我把我爸脑子里的「怎么出题」掏出来，写成 AI 能看懂的文件。',
          copy: '今天我把我爸脑子里的「怎么出题」掏出来，写成一份 SKILL。先问好题目长什么样，再列五条规则，最后写成文件让 AI 读。第一次运行就翻车了，改完才勉强能用。原来教 AI 跟教我爸差不多，规则得说清楚。',
          shooting: [
            '先拍规则清单，只留 5 条',
            '文件结构只拍目录，不讲代码',
            '第一次运行失败保留，别剪掉',
            '修改后成功再给 3 秒',
            '用课本单元实测，只露单元标题'
          ],
          weight: 'A',
          duration: '4min',
          source: '',
          tags: ['待拍', '知识课', 'SKILL'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'skill-loop',
      name: '出题到复测',
      weight: 'A',
      summary: '出题、做题、错题报告、专项加练、复测，跑三周。',
      episodes: [
        {
          id: 'C03',
          code: 'C03',
          title: '用 SKILL 出题 → 做题 → 错题报告（连载）',
          altTitles: ['AI 出题、我做题、AI 分析我，跑了三周', '分数没提高，也是好内容'],
          hook: '我们打算用同一个 SKILL 跑三周，看薄弱点到底能不能补上。',
          copy: '我们打算用同一个 SKILL 跑三周：第一周出题做题，第二周分析错题，第三周专项加练，最后复测。分数有没有提高我不知道，但至少我知道自己哪里不会了。',
          shooting: [
            '按周拍，每期只留一个阶段',
            '分数变化用字幕卡，不露真实成绩',
            '没提高也保留，真实比好看重要',
            '复测对比放在最后一期结尾'
          ],
          weight: 'A',
          duration: '连载',
          source: '',
          tags: ['待拍', '知识课', '连载'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'skill-level',
      name: '难度实验',
      weight: 'B',
      summary: '基础关全对，加两级，第一题就卡住。',
      episodes: [
        {
          id: 'C04',
          code: 'C04',
          title: '难度升级实验：加两个级别会发生什么',
          altTitles: ['题目太简单，加两级试试', '难度不是越高越好'],
          hook: '同一个游戏，基础关我全对，我爸说加两个级别试试。',
          copy: '同一个游戏，基础关我全对，我爸说加两个级别试试。结果第一题我就不会了。难度不是越高越好，跳两级容易直接劝退。',
          shooting: [
            '复用 A13 素材，不用重拍',
            '基础关和困难关各留 3 秒',
            '只讲难度曲线一个点',
            '成片控制在 60 秒'
          ],
          weight: 'B',
          duration: '60s',
          source: '亲子闯关13-题目太简单，加大2个级别再看看？.mp4',
          tags: ['复用素材', '知识切片', 'A13'],
          defaultChecklist: [true, true, false, false, false]
        }
      ]
    }
  ]
});
