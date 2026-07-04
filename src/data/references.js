/**
 * 参考资料库 — 五行择日 × 行业分类 × 实证研究
 *
 * 每条记录包含：
 *   - title:      书名/标题
 *   - author:     作者/编者
 *   - dynasty:    朝代/年代
 *   - category:   分类（择日理论|行业五行|风水指数|学术实证|行业分类标准|在线工具）
 *   - why:        为什么重要，与本站的关系
 *   - links:      [{ label, url, type }]
 *   - notes:      备注
 */

export const REFERENCES = [
  // ═══════════════════════════════════════════
  // 一、择日理论（四本核心书目）
  // ═══════════════════════════════════════════
  {
    title: '协纪辨方书',
    author: '允禄、李廷耀 等奉敕编',
    dynasty: '清·乾隆',
    category: '择日理论',
    why: '最重要的一本——乾隆钦定的官方择日学汇编，涵盖建除十二神、黄道黑道、神煞、方位忌宜等全部择日系统。本站四柱计算与五行生克的核心理论来源。',
    links: [
      { label: '书格高清PDF（36卷完整版）', url: 'https://www.shuge.org/meet/topic/147613/', type: 'pdf' },
      { label: 'Google Books 在线阅读', url: 'https://books.google.com.sg/books?id=xJseAQAAMAAJ', type: 'online' },
      { label: 'Wikimedia Commons（卷33-36）', url: 'https://commons.wikimedia.org/wiki/File:SSID-12152602_%E5%8D%94%E7%B4%80%E8%BE%A8%E6%96%B9%E6%9B%B8_%E5%8D%B733-36.pdf', type: 'pdf' },
      { label: '籍古佐 PDF下载（165MB）', url: 'https://www.jiguzuo.com/guji/17646034254974.html', type: 'pdf' },
    ],
    notes: '共三十六卷，收入《四库全书·子部》。乾隆亲制序文，是中国古代择吉学集大成之作。朱墨套印本最为珍贵。'
  },
  {
    title: '玉匣记',
    author: '许逊（传）',
    dynasty: '东晋',
    category: '择日理论',
    why: '民间最流行的择吉通书，对每日宜忌的分类极其详细。站内"今日宜忌"功能的理论题库来源。',
    links: [
      { label: '古籍屋 高清扫描版（108MB）', url: 'https://m.gujiwu.cn/yixue/49710.html', type: 'pdf' },
      { label: '百度网盘 提取码6666', url: 'https://pan.baidu.com/s/1dO-MGfpqLhdwDwaVtOu6cQ', type: 'pan' },
      { label: '六爻网 PDF下载', url: 'http://bbs.liuyao8.com/forum.php?mod=viewthread&tid=63630', type: 'pdf' },
    ],
    notes: '又名《玉匣记通书》，涵盖神明诞辰、吉凶日判断、民间禁忌、占梦、六壬时课等。被誉为古人"生活指南+时间管理"的结合体。清代朱説霖有《増广玉匣记通书》增补本。'
  },
  {
    title: '选择求真',
    author: '胡晖（字应光，号明远）',
    dynasty: '清·嘉庆',
    category: '择日理论',
    why: '深入论述"以人命配日课"的方法论——即如何根据个人八字选日子。这是本站区分于普通万年历的关键理论支撑。',
    links: [
      { label: '百度文库 卷一在线阅读', url: 'https://wenku.baidu.com/view/f93da23568d97f192279168884868762caaebb32.html', type: 'online' },
      { label: '风水168 精订正体字版（17MB）', url: 'https://www.fengshui-168.com/forum.php?mod=viewthread&tid=3649', type: 'pdf' },
      { label: '古籍阁 古本PDF（19MB）', url: 'https://www.gujige.com/thread-130052-1-23.html', type: 'pdf' },
      { label: '搜狐介绍文章', url: 'https://www.sohu.com/a/646763194_120466577', type: 'article' },
    ],
    notes: '共10卷，嘉庆十四年（1809年）成书。宗杨公造命法，遵循《协纪》星曜，"谬者删之，正者录之"。涵盖补龙、扶山、七政四余、嫁娶安床等诸多实战规则。'
  },
  {
    title: '鳌头通书',
    author: '熊宗立',
    dynasty: '明',
    category: '择日理论',
    why: '明代择日集大成，包含大量"命主+日子"配合的实战规则。与《选择求真》互为补充，共同构成本站"个人命局×日课"的核心方法论。',
    links: [
      { label: '数墨居 PDF（36卷，286MB）', url: 'https://www.shumoju.com/ao_tou_tong_shu_da_quan/', type: 'pdf' },
      { label: '浙江图书馆 在线阅读', url: 'https://history.zjlib.cn/app/universal-search/resource/62b555353157d263ee6a4489/details', type: 'online' },
      { label: '古籍屋 网盘下载', url: 'https://m.gujiwu.cn/guji/3585.html', type: 'pdf' },
      { label: '国学大师网 馆藏信息', url: 'https://m.guoxuedashi.com/shumu/gj-716480xk.html', type: 'reference' },
    ],
    notes: '全称《新镌历法总览合节鳌头通书大全》，共十卷。清代熊月畴重订。内容涵盖玉函斗首、河洛生成数、金精鳌、遁甲奇门等大型择日体系。'
  },
  {
    title: '增补选择通书广玉匣记',
    author: '朱説霖',
    dynasty: '清·乾隆',
    category: '择日理论',
    why: '《玉匣记》与《鳌头通书》的融合增补版，清代最流行的民间择日通书之一。',
    links: [
      { label: '百度网盘 提取码6666', url: 'https://pan.baidu.com/s/10jA_y21D4D676XhEjBRTrA', type: 'pan' },
    ],
    notes: '乾隆53年刊本，2册5卷265页。融合择日学与干支历法，是了解清代民间择吉实践的绝佳窗口。'
  },

  // ═══════════════════════════════════════════
  // 二、五行与行业分类（投资参考）
  // ═══════════════════════════════════════════
  {
    title: '中信里昂风水指数 2026（丙午马年）',
    author: '中信里昂证券 (CLSA)',
    dynasty: '2026年',
    category: '风水指数',
    why: '业内最知名的五行投资年度报告，自1992年起每年发布。提供了五行（金木水火土）与具体行业板块的对应关系，是本站行业五行归类的关键参考。',
    links: [
      { label: 'CLSA 官方页面', url: 'https://www.clsa.com/special/FSI/2026/cn/?section=feng-shui-index', type: 'online' },
      { label: '东方财富股吧 中文摘要', url: 'https://guba.eastmoney.com/news,cjpl,1665416548.html', type: 'article' },
      { label: '格隆汇 中文详解', url: 'https://dxpress.gelonghui.com/live/2290214', type: 'article' },
    ],
    notes: '2026年核心判断：金≈木最旺，火亮眼但年末回调，土平淡，水最弱。恒指属"土鸡"，全年走势如"马术盛装舞步"——进两步退一步。该报告为趣味性内容，非正式研报。'
  },
  {
    title: '中信里昂风水指数 2022（寅虎年）',
    author: '中信里昂证券 (CLSA)',
    dynasty: '2022年',
    category: '风水指数',
    why: '历史参考——可对比不同流年对行业板块的不同判断，验证五行模型的跨年一致性。',
    links: [
      { label: 'CLSA 官方页面', url: 'https://www.clsa.com/special/FSI/2022/cn/?section=sectors', type: 'online' },
    ],
    notes: '该年有详细的行业×五行×生肖三重对照表，是历年风水指数中行业分类最详尽的一版。'
  },
  {
    title: '五行与股票行业的划分',
    author: '百度文库 / 多来源汇编',
    dynasty: '当代',
    category: '行业五行',
    why: '汇集了传统命理学中各行业五行归类的基本规则，本站申万31行业五行映射的重要参考。',
    links: [
      { label: '百度文库', url: 'https://wenku.baidu.com/view/46ab1dd9d7d8d15abe23482fb4daa58da1111c52.html', type: 'article' },
      { label: '东方财富博客', url: 'https://m.eastmoney.com/blog/article/221006212', type: 'article' },
      { label: '股票五行板块分类 百度文库', url: 'https://wenku.baidu.com/view/015911bec77da26925c5b0a5', type: 'article' },
    ],
    notes: '需注意各来源的五行归类存在分歧（如煤炭归火还是归土、金融归金还是归水），实战中应保持一套自洽体系。'
  },

  // ═══════════════════════════════════════════
  // 三、学术实证
  // ═══════════════════════════════════════════
  {
    title: '以五行生克模型验证台湾股票市场类股指数',
    author: '张宫熊、廖昭宇',
    dynasty: '2014年',
    category: '学术实证',
    why: '学术验证五行理论在股票择时上的有效性。木属性行业（纺织、橡胶）准确率最高达77%，按流年五行择时高低报酬排序准确率达68%。为本站提供方法论支撑。',
    links: [
      { label: 'iFAIRS 2014 会议论文', url: 'http://www.ymcmr.org/wp-content/uploads/2014/07/iFAIRS-paper-full-content-download-file-2013-small.pdf', type: 'pdf' },
    ],
    notes: '屏东科技大学研究，研究期间2000-2012年共13年。对台湾加权指数28个类股赋予五行本命属性，并验证生克模型的有效性。'
  },
  {
    title: '以五行生克模型验证日经225指数成分股',
    author: '张宫熊、陈柏霖',
    dynasty: '约2015年',
    category: '学术实证',
    why: '进一步验证五行生克模型在日本市场的适用性。火属性公司报偿走向准确率最高达98.18%。',
    links: [],
    notes: '屏东科技大学第二篇实证论文。证明五行生克模型具有一定跨市场普适性，但日经225的单行业高准确率可能受样本偏差影响。'
  },
  {
    title: '证券在五行行业分类中的依据',
    author: '和讯网',
    dynasty: '2025年',
    category: '行业五行',
    why: '讨论了证券行业（券商股）归入金还是水的学术争议，以及不同归类对投资分析的影响。',
    links: [
      { label: '和讯网', url: 'https://m.hexun.com/funds/2025-04-02/218288716.html', type: 'article' },
    ],
    notes: '核心争议点：金融（流动性→水）vs 金融（货币金属→金）。本站将银行/非银归入金，与中信里昂一致。'
  },

  // ═══════════════════════════════════════════
  // 四、行业分类标准
  // ═══════════════════════════════════════════
  {
    title: '申万行业分类标准 2021版',
    author: '申万宏源证券研究所',
    dynasty: '2021年',
    category: '行业分类标准',
    why: '本站31个申万一级行业的数据来源。2021版从28个调整至31个，新增美容护理、石油石化、环保三个一级行业。',
    links: [
      { label: 'CnOpenData 申万行业分类数据库', url: 'https://www.cnopendata.com/data/m/Index/swhyfl.html', type: 'database' },
      { label: '雪球 31个行业分类详解', url: 'https://xueqiu.com/8789404130/331746623', type: 'article' },
      { label: '雪球 完整列表', url: 'https://xueqiu.com/8789404130/330381112', type: 'article' },
      { label: '百度百科 申万行业分类', url: 'https://baike.baidu.com/item/%E7%94%B3%E4%B8%87%E8%A1%8C%E4%B8%9A%E5%88%86%E7%B1%BB/67325202', type: 'reference' },
    ],
    notes: '2021年7月30日正式发布。主要变化：新增3个一级行业、更名6个、二级行业大幅扩展。投资分析中通常将31个行业分为大消费、大周期、大科技、大金融四大类。'
  },

  // ═══════════════════════════════════════════
  // 五、五行能量行业轮动（更多参考资料）
  // ═══════════════════════════════════════════
  {
    title: '股市各个行业的五行属性',
    author: '百家号 / 多来源',
    dynasty: '2024年',
    category: '行业五行',
    why: '综合整理了中国投资圈对A股行业五行归类的共识，涵盖传统行业与新兴行业（如新能源、半导体）。',
    links: [
      { label: '百家号', url: 'https://baijiahao.baidu.com/s?id=1809900703731060177', type: 'article' },
    ],
    notes: '社区讨论性质，不同作者对同一行业的五行归类可能存在分歧，建议对照多个来源使用。'
  },
  {
    title: '万物类象的五行属性划分',
    author: '搜狐 / 命理学整理',
    dynasty: '当代',
    category: '行业五行',
    why: '传统八字命理学中"万物类象"的系统总结，可用于延伸理解新兴行业（如AI、区块链、元宇宙）的五行归属。',
    links: [
      { label: '搜狐', url: 'https://m.sohu.com/a/365242475_406476/', type: 'article' },
    ],
    notes: '万物类象是八字命理学的底层方法论——将世间万物按五行属性归类，是本站处理新出现行业（未在古籍中记载）五行判定的理论依据。'
  },
  {
    title: '再谈五行板块强弱与具体应用',
    author: 'MACD俱乐部',
    dynasty: '当代',
    category: '行业五行',
    why: 'A股投资者社区对五行板块轮动的实战讨论，包含具体选股思路和季节性规律。',
    links: [
      { label: 'MACD俱乐部', url: 'https://bbs.macd.cn/thread-3053375-1-1.html', type: 'forum' },
    ],
    notes: '社区讨论，非学术研究。包含大量个人实战经验的分享，可作为定性参考。'
  },

  // ═══════════════════════════════════════════
  // 六、在线工具
  // ═══════════════════════════════════════════
  {
    title: '东方财富行业板块行情',
    author: '东方财富网',
    dynasty: '实时',
    category: '在线工具',
    why: '本站实时行情数据的来源。API接口：push2.eastmoney.com，覆盖申万行业板块的实时涨跌幅。',
    links: [
      { label: '东方财富行业板块', url: 'https://data.eastmoney.com/bkzj/hy.html', type: 'online' },
    ],
    notes: '公开API无需认证，支持跨域访问。参数 fs=m:90+t2 表示申万行业板块，字段 f3 为涨跌幅。'
  },
  {
    title: '寿星万年历（节气计算参考）',
    author: '许剑伟',
    dynasty: '当代',
    category: '在线工具',
    why: '本站24节气日期计算的算法参考来源。',
    links: [
      { label: '寿星万年历 GitHub', url: 'https://github.com/yybeta/sxwnl', type: 'code' },
    ],
    notes: '开源万年历程序，提供精确的节气交节时刻计算（精度±1分钟），本站简化为±1日精度的查表+外推法。'
  },

  // ═══════════════════════════════════════════
  // 七、基础理论
  // ═══════════════════════════════════════════
  {
    title: '五行大义',
    author: '萧吉',
    dynasty: '隋',
    category: '基础理论',
    why: '现存最早的五行理论系统著作，五行学说的集大成之作。理解五行生克、旺相休囚死的理论基础。',
    links: [
      { label: '国学大师网', url: 'https://m.guoxuedashi.com/guji/746332r/', type: 'online' },
    ],
    notes: '全书五卷，系统论述了五行（木火土金水）的名称、体性、生克、相杂、配属等，是后世一切五行应用的理论源头。'
  }
]

/**
 * 按分类分组
 */
export const CATEGORY_ORDER = [
  '择日理论',
  '基础理论',
  '行业五行',
  '风水指数',
  '学术实证',
  '行业分类标准',
  '在线工具'
]

export const CATEGORY_LABELS = {
  '择日理论': '📚 择日理论 —— 时间维度的吉凶',
  '基础理论': '🌳 基础理论 —— 五行学说的源头',
  '行业五行': '🏭 五行与行业分类 —— 空间维度的能量',
  '风水指数': '🔮 风水指数 —— 券商年度五行报告',
  '学术实证': '📊 学术实证 —— 五行模型的量化验证',
  '行业分类标准': '📋 行业分类标准 —— 申万分类体系',
  '在线工具': '🛠️ 在线工具与数据源'
}
