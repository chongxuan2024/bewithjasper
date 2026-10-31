window.SERIES_LIBRARY = window.SERIES_LIBRARY || [];

window.SERIES_LIBRARY.push({
  id: 'ai',
  name: 'AI 工具',
  tagline: '把点子做成能打开、能玩、能上架的东西',
  color: '#7c5cd6',
  weight: 'B',
  description: '网页小工具、上架 App、微信小程序、数字人。重点记录从想法到成品的全过程，包括被拒和返工。',
  subSeries: [
    {
      id: 'ai-web-tool',
      name: '网页小工具',
      weight: 'A',
      summary: '一个功能就够，先做出来再迭代。',
      episodes: [
        {
          id: 'B03',
          code: 'B03',
          title: '我爸说 2 小时能做一个网页工具，我不信',
          altTitles: ['他做完了，我 2 分钟找出 8 个 bug', '我爸说这不叫 bug，叫 feature'],
          hook: '我爸说 2 小时能做一个网页工具，我不信。',
          copy: '我爸说 2 小时能做一个网页工具，我不信。结果他真做完了。我用了 2 分钟，找出 8 个 bug。他说这不叫 bug，叫 feature。',
          shooting: [
            '先拍需求，一句话说清',
            'AI 写代码的过程加速',
            '试用时只留 2 个 bug',
            '爸爸嘴硬的表情特写'
          ],
          weight: 'A',
          duration: '150s',
          source: '',
          tags: ['待拍', '网页'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'ai-ios',
      name: '上架 App Store',
      weight: 'B',
      summary: '从网页到 App，重点拍被拒和修改。',
      episodes: [
        {
          id: 'B04',
          code: 'B04',
          title: '我们把网页游戏装进了手机，然后被苹果拒了 2 次',
          altTitles: ['第一次上架 App Store，学到了 3 件事', '被拒不可怕，改就是了'],
          hook: '我们把网页游戏装进了手机，本来以为马上就能上架。',
          copy: '我们把网页游戏装进了手机，本来以为马上就能上架。结果被苹果拒了两次。第一次说隐私政策，第二次说截图不对。行吧，改就是了。',
          shooting: [
            '打包成功的画面',
            '真机运行 5 秒',
            '被拒邮件打码后展示',
            '修改过程加速',
            '审核通过那一刻保留'
          ],
          weight: 'B',
          duration: '300s',
          source: '',
          tags: ['待拍', 'iOS', '审核周期长'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'ai-miniprogram',
      name: '微信小程序',
      weight: 'B',
      summary: '把网页工具搬进小程序，审核意见比代码还难懂。',
      episodes: [
        {
          id: 'B05',
          code: 'B05',
          title: '小程序审核，我爸改标题改到怀疑人生',
          altTitles: ['把网页工具搬进小程序，没那么简单', '审核意见比代码还难懂'],
          hook: '把网页工具搬进小程序，我以为复制粘贴就完事了。',
          copy: '把网页工具搬进小程序，我以为复制粘贴就完事了。结果光类目和标题就改了半天。我爸说这是审核，我说这是猜谜。',
          shooting: [
            '注册和类目选择',
            '提交审核',
            '审核意见特写（打码）',
            '修改前后对比'
          ],
          weight: 'B',
          duration: '240s',
          source: '',
          tags: ['待拍', '小程序'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'ai-app',
      name: '答题 App',
      weight: 'B',
      summary: '同一个游戏，网页版和手机版完全不是一回事。',
      episodes: [
        {
          id: 'B08',
          code: 'B08',
          title: '把答题游戏变成手机 App，多了 3 个新问题',
          altTitles: ['网页版 7 分，手机版先修 3 个 bug', '触屏和鼠标，完全不是一回事'],
          hook: '网页版玩着还行，装到手机上以后，问题全出来了。',
          copy: '网页版玩着还行，装到手机上以后，多了三个新问题：按钮太小、返回键乱跳、启动页太丑。我爸说这叫适配，我说这叫重新做一遍。',
          shooting: [
            '网页版和手机版并排对比',
            '按钮太小的特写',
            '返回键乱跳的录屏',
            '修改前后各 3 秒'
          ],
          weight: 'B',
          duration: '180s',
          source: '',
          tags: ['待拍', 'App'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    },
    {
      id: 'ai-avatar',
      name: '数字人',
      weight: 'B',
      summary: '数字人很标准，但还是想听爸爸讲。',
      episodes: [
        {
          id: 'B12',
          code: 'B12',
          title: '数字人讲题，差点把我讲睡着',
          altTitles: ['AI 数字人 vs 我爸讲题，谁更好懂？', '数字人很标准，但我还是想听我爸讲'],
          hook: '今天用数字人讲题，它讲得很标准，但我听了 30 秒就想睡。',
          copy: '今天用数字人讲题。它讲得很标准，但我听了 30 秒就想睡。还是我爸讲得好，至少他会突然问我一句“听懂没”。',
          shooting: [
            '录一段配音',
            '生成数字人',
            '播放时的真实反应',
            '和真人讲题并排对比',
            '标注“AI 生成”'
          ],
          weight: 'B',
          duration: '75s',
          source: '',
          tags: ['待拍', '数字人', '标注 AI 生成'],
          defaultChecklist: [true, false, false, false, false]
        }
      ]
    }
  ]
});
