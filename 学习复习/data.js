window.SERIES_LIBRARY = window.SERIES_LIBRARY || [];

window.SERIES_LIBRARY.push({
  id: 'study',
  name: '学习复习',
  tagline: '把复习变成两个人的比赛',
  color: '#4a6cf7',
  weight: 'A',
  description: '放学回家先把课本过一遍，再用游戏复习；还有自己出题、英语单词、数学口算。重点不是分数，是孩子愿意主动学、能讲出来。',
  subSeries: [
    {
      id: 'study-after-school',
      name: '放学复习',
      weight: 'A',
      summary: '从扔书包到打开游戏，一条片子拍完整套放学复习流程。',
      episodes: [
        {
          id: 'B15',
          code: 'B15',
          title: '放学回家，书包一扔，我居然自己开始复习了',
          altTitles: ['说好先玩十分钟，结果我翻开了课本', '以前复习要我爸催，现在我自己开游戏'],
          hook: '放学回家，我书包一扔，然后自己把课本掏出来了。',
          copy: '放学回家，我书包一扔，先瘫了两分钟。然后我把英语书、语文书掏出来，往桌上一扔，翻开今天学的那一页。先自己过一遍，再打开我爸做的游戏，用闯关的方式又复习了一遍。我妈问我今天怎么这么自觉，我说：这个复习游戏我还没通关。',
          shooting: [
            '门口固定机位：书包落地，人扑到沙发上，3 秒，保留真实声音',
            '桌面俯拍：英语书、语文书一本本扔到桌上，2–3 秒',
            '课本特写：翻到当天学的页，手指着读一遍，3 秒',
            '屏幕录制：打开游戏复习关卡，答对音效留 2 秒',
            '结尾拍家长的反应镜头，配一句吐槽'
          ],
          weight: 'A',
          duration: '75s',
          source: '',
          tags: ['待拍', '放学复习', '游戏复习'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'study-self-quiz',
      name: '自己出题',
      weight: 'A',
      summary: '角色反转：孩子出题考爸爸，讲题才是真会。',
      episodes: [
        {
          id: 'B07',
          code: 'B07',
          title: '今天我出题考我爸，他故意错',
          altTitles: ['角色互换：我出题，我爸做题', '我爸错得太假了，我当场拆穿'],
          hook: '今天换我出题考我爸，他故意错，想让我讲题。',
          copy: '今天我出题考我爸。他故意错，想让我讲题。结果有一道我自己也讲错了。行吧，互相学习。',
          shooting: [
            '孩子写题的过程拍 3 秒',
            '爸爸装不会的表情',
            '孩子批改时用红笔',
            '讲题卡壳的那一段别剪'
          ],
          weight: 'A',
          duration: '90s',
          source: '',
          tags: ['待拍', '角色反转'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'study-english',
      name: '英语单词',
      weight: 'A',
      summary: '单词卡片 + 俯卧撑惩罚，爸爸的英语可能都还给老师了。',
      episodes: [
        {
          id: 'B13',
          code: 'B13',
          title: '我抽单词，我爸读，读错一个做 5 个俯卧撑',
          altTitles: ['英语单词卡片，把我爸难住了', '我爸的英语，可能都还给老师了'],
          hook: '我抽英语单词，我爸读，读错一个做 5 个俯卧撑。',
          copy: '我把英语单词做成卡片，我抽一张，我爸读一张。读错一个做 5 个俯卧撑。结果他做了 40 个。',
          shooting: [
            '卡片特写，字要大',
            '爸爸读错的单词给字幕',
            '俯卧撑计数用大字',
            '最后拍爸爸趴下'
          ],
          weight: 'A',
          duration: '60s',
          source: '',
          tags: ['待拍', '英语'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'study-math',
      name: '数学口算',
      weight: 'A',
      summary: '程序员爸爸的数学，好像也不太行了。',
      episodes: [
        {
          id: 'B14',
          code: 'B14',
          title: '30 秒口算，我爸输给我了',
          altTitles: ['程序员爸爸的数学，好像也不太行了', '口算比赛，输的人洗碗'],
          hook: '我爸说程序员数学好，我说那比比口算。',
          copy: '我爸说程序员数学好，我说那比比口算。30 秒，他做了 12 道，我做了 18 道。他说他是让着我。行吧，让着就让着。',
          shooting: [
            '计时器 + 题纸同框',
            '两人并排俯拍',
            '答案特写',
            '比分用大字上屏'
          ],
          weight: 'A',
          duration: '45s',
          source: '',
          tags: ['待拍', '数学'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    }
  ]
});
