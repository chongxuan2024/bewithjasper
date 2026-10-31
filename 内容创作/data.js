window.SERIES_LIBRARY = window.SERIES_LIBRARY || [];

window.SERIES_LIBRARY.push({
  id: 'content',
  name: '内容创作',
  tagline: '把做过的事，换一种方式讲出来',
  color: '#c98a1e',
  weight: 'B',
  description: '公众号、数据排序、折线图、聊天记录。同一批素材可以一鱼多吃，也可以做轻量科普。',
  subSeries: [
    {
      id: 'content-wechat',
      name: '公众号',
      weight: 'B',
      summary: '视频拍完，顺手写一篇方法文。',
      episodes: [
        {
          id: 'B01',
          code: 'B01',
          title: '我把我们做游戏的事写成了一篇公众号',
          altTitles: ['五年级小学生的第一篇公众号', '视频拍完，顺便写篇图文'],
          hook: '今天不拍视频，写公众号。',
          copy: '今天不拍视频，写公众号。我爸说要有开头、有步骤、有翻车。我说这不就是我们的日常吗。',
          shooting: [
            '选题会 5 秒',
            '写稿时只拍手和屏幕',
            '排版前后对比',
            '按下发布那一刻'
          ],
          weight: 'B',
          duration: '图文',
          source: '',
          tags: ['待拍', '公众号'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'content-sort',
      name: '数据排序',
      weight: 'A',
      summary: '用袜子讲冒泡排序，一条只讲一种算法。',
      episodes: [
        {
          id: 'B09',
          code: 'B09',
          title: '我爸用袜子给我讲冒泡排序',
          altTitles: ['30 秒看懂冒泡排序', '两双袜子，讲明白一个算法'],
          hook: '我爸用袜子给我讲冒泡排序。',
          copy: '我爸用袜子给我讲冒泡排序。两双袜子比大小，大的往后挪。挪了五分钟，我居然听懂了。',
          shooting: [
            '俯拍桌面',
            '两两比较时给字幕',
            '交换过程用正常速度，最后整体加速',
            '结尾用动画对比'
          ],
          weight: 'A',
          duration: '75s',
          source: '',
          tags: ['待拍', '排序', '轻科普'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'content-chart',
      name: '折线图',
      weight: 'A',
      summary: '用真实数据画图，讲趋势和异常点。',
      episodes: [
        {
          id: 'B10',
          code: 'B10',
          title: '我家的身高折线图，暴露了我弟长得比我快',
          altTitles: ['用真实数据画折线图', '我爸说这叫趋势，我说这叫不公平'],
          hook: '我爸让我把家里的身高数据画成折线图。',
          copy: '我爸让我把家里的身高数据画成折线图。画完发现，我弟的线比我陡。我爸说这叫趋势。我说这叫不公平。',
          shooting: [
            '量身高 5 秒',
            '手绘折线图',
            '电脑图表对比',
            '指出异常点 / 交叉点'
          ],
          weight: 'A',
          duration: '90s',
          source: '',
          tags: ['待拍', '折线图', '轻科普'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'content-chat',
      name: '聊天记录',
      weight: 'B',
      summary: '父子聊天记录动画，重点是好笑和真实。',
      episodes: [
        {
          id: 'B11',
          code: 'B11',
          title: '我爸的「在吗」后面从来没好事',
          altTitles: ['父子聊天记录曝光', '我爸发「在吗」，我就知道要加班了'],
          hook: '我爸每次发「在吗」，后面都没好事。',
          copy: '我爸每次发「在吗」，后面都没好事。上次他发「在吗」，我以为要没收手机，结果是让我帮他找 bug。',
          shooting: [
            '聊天记录去掉头像、昵称、手机号',
            '用动画还原对话，一条一条出',
            '爸爸的画外音可以补录',
            '结尾放一句真实的神回复'
          ],
          weight: 'B',
          duration: '60s',
          source: '',
          tags: ['待拍', '聊天记录', '注意打码'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    }
  ]
});
