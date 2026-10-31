window.SERIES_LIBRARY = window.SERIES_LIBRARY || [];

window.SERIES_LIBRARY.push({
  id: 'study',
  name: '学习复习',
  tagline: '把复习变成两个人的比赛',
  color: '#4a6cf7',
  weight: 'A',
  description: '自己出题、英语单词、数学口算。重点不是分数，是孩子愿意主动学、能讲出来。',
  subSeries: [
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
