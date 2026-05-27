const I18N = {
  zh: {
    hub: 'Arcade Hub', score: '积分', streak: '连续挑战', completed: '已完成', quick: '快速挑战',
    today: '今日精选', trending: '正在流行', daily: '每日题', play: '开始答题', points: '积分',
    q: '第', of: '题 / 共', result: '你的结果', share: '分享文案', again: '再玩一次', close: '关闭',
    follow: '关注专栏', followed: '已关注', startBrief: '开始情景',
    deepLabel: '深度阅读 + 测验', deepTitle: '冷战危机室',
    deepCopy: '先读一段中立情景简报，再选择你会如何处理升级、盟友信号和风险。',
    creatorLabel: '创作者提示', creatorTitle: '写一个你的版本',
    creatorCopy: '选一个话题，设计 3-5 个选择，并做出让人想分享的结果。',
    create: '创建你的测验',
    categories: {
      love: '爱情与人格', meme: '梗与社交身份', celebrity: '明星与 K-pop', ai: 'AI 与未来工作',
      war: '战争、历史与地缘', geography: '地理与文明', finance: '金融与风险', daily: '每日挑战', create: '创建你的测验'
    },
    formats: {
      personality: '人格测验', trivia: '知识问答', timed: '限时挑战', thisThat: '二选一',
      strategy: '策略模拟', map: '地图挑战', daily: '每日题', template: '创作模板'
    },
    results: {
      strategist: ['冷静策略家', '你擅长先看结构再做选择，喜欢把风险拆开处理。'],
      spark: ['高能传播体', '你对新鲜事反应很快，能把复杂情绪变成可分享的判断。'],
      analyst: ['清醒分析派', '你会追问证据、边界和代价，适合做高压力判断。'],
      connector: ['社交读心者', '你很会捕捉气氛变化，也愿意给别人留余地。']
    },
    questionTemplates: {
      personality: ['面对这类题，你第一反应是什么？', '朋友让你给建议，你会先看什么？', '如果结果要发给朋友，你更想突出哪一点？', '最后一题：你最像哪种玩家？'],
      trivia: ['哪个选项最符合题目里的关键信息？', '如果只能选一个事实点，你会选？', '这道题的陷阱更可能在哪里？', '最后判断：你的答案是？'],
      timed: ['倒计时开始，你先锁定什么？', '第二步你会排除哪类干扰？', '时间只剩一半，你怎么处理？', '冲刺题：选一个最稳的答案。'],
      thisThat: ['你会选哪一边？', '周末版本的你更像哪一个？', '朋友群里你通常负责什么？', '最终选择：更像你的是？'],
      strategy: ['情景开始，你的第一步是什么？', '出现不确定信号，你会如何分配资源？', '舆论和成本同时上升，你优先处理什么？', '最后决策：你选择哪条路径？'],
      map: ['看一张空白地图，你先找什么线索？', '如果边界很模糊，你会用什么判断？', '文明扩张通常受什么影响最大？', '最后定位：你更相信哪条线索？'],
      daily: ['今天的热题先看哪一层？', '你会把哪个选项发给朋友讨论？', '遇到争议项，你会怎么判断？', '今日收尾：选一个答案。'],
      template: ['你的测验标题应该先抓住什么？', '题目数量怎么安排？', '结果卡最重要的是什么？', '发布前最后检查什么？']
    },
    options: ['直觉和情绪信号', '数据、地图或时间线', '人际关系和传播效果', '风险、成本和后果']
  },
  en: {
    hub: 'Arcade Hub', score: 'Score', streak: 'Streak', completed: 'Completed', quick: 'Quick challenge',
    today: "Today's featured", trending: 'Trending now', daily: 'Daily Quiz', play: 'Play quiz', points: 'pts',
    q: 'Q', of: 'of', result: 'Your result', share: 'Share copy', again: 'Play again', close: 'Close',
    follow: 'Follow column', followed: 'Following', startBrief: 'Start scenario',
    deepLabel: 'Deep read + quiz', deepTitle: 'Cold War Crisis Room',
    deepCopy: 'Read a neutral scenario brief, then choose how you would manage escalation, alliance signals, and risk.',
    creatorLabel: 'Creator prompt', creatorTitle: 'Write your own version',
    creatorCopy: 'Pick a topic, define 3-5 choices, and make a result people want to share.',
    create: 'Create your quiz',
    categories: {
      love: 'Love & Personality', meme: 'Meme & Social Identity', celebrity: 'Celebrity & K-pop', ai: 'AI & Future Work',
      war: 'War, History & Geopolitics', geography: 'Geography & Civilization', finance: 'Finance & Risk', daily: 'Daily Challenge', create: 'Create Your Quiz'
    },
    formats: {
      personality: 'Personality quiz', trivia: 'Trivia quiz', timed: 'Timed challenge', thisThat: 'This-or-that',
      strategy: 'Strategy simulation', map: 'Map challenge', daily: 'Daily quiz', template: 'Quiz template'
    },
    results: {
      strategist: ['Calm Strategist', 'You read the structure before moving, then split risk into manageable choices.'],
      spark: ['Viral Spark', 'You react fast to fresh signals and turn messy vibes into shareable judgment.'],
      analyst: ['Clear Analyst', 'You ask for evidence, limits, and tradeoffs before making a high-pressure call.'],
      connector: ['Social Decoder', 'You catch changes in the room quickly and leave people space to be human.']
    },
    questionTemplates: {
      personality: ['What is your first reaction to this kind of quiz?', 'A friend asks for advice. What do you check first?', 'If you share the result, what should it highlight?', 'Final question: what kind of player are you?'],
      trivia: ['Which option best matches the key clue?', 'If you could keep one fact, which would it be?', 'Where is the trap in this question?', 'Final call: what is your answer?'],
      timed: ['Timer starts. What do you lock onto first?', 'What distraction do you eliminate next?', 'Half the time is gone. What now?', 'Sprint question: choose the safest answer.'],
      thisThat: ['Which side do you pick?', 'Weekend-you looks more like which one?', 'In a group chat, what role do you play?', 'Final choice: which sounds more like you?'],
      strategy: ['The scenario starts. What is your first move?', 'Signals are uncertain. How do you allocate resources?', 'Public pressure and cost both rise. What comes first?', 'Final decision: which path do you choose?'],
      map: ['On a blank map, what clue do you seek first?', 'If borders are fuzzy, how do you judge?', 'What most shapes civilizational expansion?', 'Final location call: which clue do you trust?'],
      daily: ['For today’s topic, what layer do you inspect first?', 'Which option would you send to a friend?', 'When an item is debatable, how do you judge?', 'Daily closer: pick one answer.'],
      template: ['What should your quiz title grab first?', 'How should the questions be paced?', 'What matters most on a result card?', 'Final pre-publish check?']
    },
    options: ['Instinct and emotional signal', 'Data, maps, or timelines', 'Social context and shareability', 'Risk, cost, and consequences']
  }
};

const QUIZZES = [
  ['ai-chat-analyzer', 'AI Chat Crush Test', 'AI 聊天心动测试', 'love', 'personality', 120, true],
  ['red-flag-scanner', 'Dating Green Flag Check', '恋爱绿灯检测', 'love', 'personality', 110, true],
  ['villain-mbti', 'Villain MBTI', '反派 MBTI', 'meme', 'personality', 100, true],
  ['kpop-stan-exam', 'K-pop Detail Exam', 'K-pop 细节考试', 'celebrity', 'trivia', 130, true],
  ['2026-internet-slang-exam', '2026 Internet Slang Exam', '2026 网络黑话考试', 'meme', 'trivia', 90, true],
  ['wwii-commander-1944', 'WWII Commander 1944', '二战指挥官 1944', 'war', 'strategy', 150, false],
  ['three-kingdoms-strategist', 'Three Kingdoms Advisor', '三国谋士测试', 'war', 'strategy', 130, false],
  ['world-map-blind-test', 'World Map Blind Test', '世界地图盲测', 'geography', 'map', 120, false],
  ['trader-personality-quiz', 'Trader Personality Quiz', '交易员人格测验', 'finance', 'personality', 120, false],
  ['cold-war-crisis-simulator', 'Cold War Crisis Simulator', '冷战危机决策模拟', 'war', 'strategy', 150, false],
  ['ai-replacement-risk', 'AI Replacement Risk', 'AI 替代风险测验', 'ai', 'strategy', 120, true],
  ['chaos-mode-quiz', 'Chaos Mode Quiz', '混乱模式测验', 'meme', 'timed', 100, true],
  ['date-vibe-decoder', 'First Date Vibe Check', '第一次约会气氛测试', 'love', 'thisThat', 90, true],
  ['friend-group-role', 'Group Chat Role', '群聊角色测试', 'meme', 'personality', 80, true],
  ['soft-launch-test', 'Soft Launch Readiness', '恋爱软官宣准备度', 'love', 'personality', 100, true],
  ['situationship-meter', 'Situationship Meter', '暧昧关系温度计', 'love', 'thisThat', 90, true],
  ['main-character-day', 'Main Character Day', '主角日测试', 'meme', 'personality', 80, true],
  ['group-chat-lawyer', 'Group Chat Lawyer Exam', '群聊律师资格考试', 'meme', 'trivia', 90, true],
  ['celebrity-blind-items', 'Celebrity Clue Sprint', '明星线索冲刺', 'celebrity', 'timed', 100, true],
  ['kpop-choreo-clues', 'K-pop Choreo Clues', 'K-pop 编舞线索题', 'celebrity', 'trivia', 100, true],
  ['idol-survival-producer', 'Idol Survival Producer Simulator', '偶像生存节目制作人模拟', 'celebrity', 'strategy', 120, true],
  ['movie-villain-roommate', 'Villain Roommate', '反派室友测试', 'meme', 'personality', 90, true],
  ['ai-boss-simulator', 'AI Boss Simulator', 'AI 老板模拟器', 'ai', 'strategy', 120, true],
  ['future-job-vibe', 'Future Work Vibe', '未来工作人格', 'ai', 'personality', 100, true],
  ['prompt-engineer-oracle', 'Prompt Engineer Oracle', '提示词工程师预言机', 'ai', 'trivia', 110, true],
  ['robot-coworker-test', 'Robot Coworker Test', '机器人同事测试', 'ai', 'thisThat', 90, true],
  ['roman-empire-speedrun', 'Roman Empire Speedrun', '罗马帝国速通题', 'war', 'timed', 130, false],
  ['napoleon-campaign-choices', 'Napoleon Campaign Choices', '拿破仑战役选择题', 'war', 'strategy', 130, false],
  ['policy-tradeoff-room', 'Policy Tradeoff Room', '政策取舍模拟室', 'war', 'strategy', 120, false],
  ['geopolitical-risk-desk', 'Geopolitical Risk Desk', '地缘风险分析台', 'war', 'strategy', 140, false],
  ['ancient-civilization-match', 'Ancient Civilization Match', '古文明匹配题', 'geography', 'trivia', 100, false],
  ['capital-city-sprint', 'Capital City Sprint', '首都城市冲刺', 'geography', 'timed', 110, false],
  ['trade-route-map', 'Trade Route Map Challenge', '贸易路线地图挑战', 'geography', 'map', 120, false],
  ['river-civilization-test', 'River Civilization Test', '大河文明测试', 'geography', 'map', 110, false],
  ['portfolio-risk-style', 'Portfolio Risk Style', '投资组合风险风格', 'finance', 'personality', 110, false],
  ['market-panic-simulator', 'Market Panic Simulator', '市场恐慌模拟器', 'finance', 'strategy', 130, false],
  ['budget-boss-challenge', 'Budget Boss Challenge', '预算管理挑战', 'finance', 'trivia', 100, false],
  ['risk-or-reward', 'Risk or Reward?', '风险还是回报？', 'finance', 'thisThat', 100, false],
  ['daily-brain-spark', 'Daily Brain Spark', '每日脑洞题', 'daily', 'daily', 100, true],
  ['daily-map-minute', 'Daily Map Minute', '每日地图一分钟', 'daily', 'map', 100, false],
  ['create-your-viral-quiz', 'Create Your Viral Quiz', '创建你的爆款测验', 'create', 'template', 80, true]
].map(([id, titleEn, titleZh, category, format, points, viral]) => ({ id, title: { en: titleEn, zh: titleZh }, category, format, points, viral }));

const CRUSH_QUIZ_CONTENT = {
  'ai-chat-analyzer': {
    copy: {
      en: 'Drop into the chat energy: mixed signals, late replies, tiny compliments, and the one message you keep rereading.',
      zh: '进入聊天现场：忽冷忽热、秒回又消失、细小夸奖，还有那句你反复看的消息。'
    },
    questions: {
      en: [
        ['They reply "hahaha wait that is so you" at 1:13 AM. Your honest read?', [
          ['They are flirting in lowercase', 'spark'],
          ['Cute, but I need two more signals', 'analyst'],
          ['They feel safe joking with me', 'connector'],
          ['Late-night chaos is not evidence', 'strategist']
        ]],
        ['You send a selfie-coded story. They react with one emoji, then start a new topic. What matters most?', [
          ['Which emoji, obviously', 'spark'],
          ['Whether they kept the conversation alive', 'analyst'],
          ['If the new topic was personal', 'connector'],
          ['The pattern across the whole week', 'strategist']
        ]],
        ['Their response time goes from 3 minutes to 3 hours. You do what?', [
          ['Post something fun and let fate work', 'spark'],
          ['Stop over-reading one data point', 'analyst'],
          ['Match the energy without punishing them', 'connector'],
          ['Protect my mood and log off', 'strategist']
        ]],
        ['The chat suddenly gets dry. Best next text?', [
          ['"Be honest, did my charm expire?"', 'spark'],
          ['A simple question with an easy answer', 'analyst'],
          ['A callback to an inside joke', 'connector'],
          ['Nothing. Let silence answer too', 'strategist']
        ]]
      ],
      zh: [
        ['TA 凌晨 1:13 回你「哈哈哈这也太像你了」。你的真实解读是？', [
          ['小写字母版调情，懂的都懂', 'spark'],
          ['可爱，但还要再看两个信号', 'analyst'],
          ['TA 跟我开玩笑很放松', 'connector'],
          ['深夜聊天不能直接当证据', 'strategist']
        ]],
        ['你发了张很像自拍暗示的动态。TA 只回一个表情，然后开新话题。重点是？', [
          ['当然是回了哪个表情', 'spark'],
          ['TA 有没有把聊天继续下去', 'analyst'],
          ['新话题够不够私人', 'connector'],
          ['看一整周的模式，不看单点', 'strategist']
        ]],
        ['TA 从 3 分钟回变成 3 小时回。你会？', [
          ['发点有趣的，让命运自己上班', 'spark'],
          ['提醒自己别过度解读一次延迟', 'analyst'],
          ['同步节奏，但不阴阳怪气', 'connector'],
          ['先保护情绪，退出聊天框', 'strategist']
        ]],
        ['聊天突然变干。最适合补哪一句？', [
          ['「说实话，我的魅力过期了吗？」', 'spark'],
          ['一个很容易回答的小问题', 'analyst'],
          ['抛一个只有你们懂的旧梗', 'connector'],
          ['不补。沉默也是答案', 'strategist']
        ]]
      ]
    }
  },
  'red-flag-scanner': {
    copy: {
      en: 'Not a panic quiz. This is a green-flag check for consistency, effort, boundaries, and main-character delusion control.',
      zh: '不是焦虑测试，而是检查稳定、用心、边界感，以及你有没有开太大恋爱滤镜。'
    },
    questions: {
      en: [
        ['They say "I am bad at texting" but plan the next hangout clearly. Your verdict?', [
          ['Green flag with low battery mode', 'connector'],
          ['Acceptable if the plan actually happens', 'analyst'],
          ['I still want one cute message', 'spark'],
          ['Words are cute, calendar is truth', 'strategist']
        ]],
        ['On a busy day, what behavior feels most dateable?', [
          ['A tiny "thinking of you" ping', 'spark'],
          ['A realistic update, not a novel', 'analyst'],
          ['They remember one detail I mentioned', 'connector'],
          ['They do not make me chase clarity', 'strategist']
        ]],
        ['They compliment you, then immediately ask for a favor. You notice...', [
          ['Whether the compliment felt specific', 'connector'],
          ['The timing is doing a lot', 'analyst'],
          ['I am flattered, unfortunately', 'spark'],
          ['Pattern check: is this a habit?', 'strategist']
        ]],
        ['Best sign someone is emotionally available?', [
          ['They can be playful without being confusing', 'spark'],
          ['They explain changes instead of disappearing', 'analyst'],
          ['They make space for your pace too', 'connector'],
          ['Their actions stay boringly consistent', 'strategist']
        ]]
      ],
      zh: [
        ['TA 说「我不太会聊天」，但下次见面安排得很清楚。你的判断？', [
          ['绿灯，只是手机电量低模式', 'connector'],
          ['可以，但前提是约定真的发生', 'analyst'],
          ['我还是想要一句可爱的消息', 'spark'],
          ['话术可爱，日历才是真相', 'strategist']
        ]],
        ['忙碌的一天里，什么行为最加分？', [
          ['一句很轻的「刚刚想到你」', 'spark'],
          ['现实的状态更新，不写小作文', 'analyst'],
          ['TA 记得我随口说过的细节', 'connector'],
          ['TA 不让我追着要确定性', 'strategist']
        ]],
        ['TA 夸完你，马上请你帮忙。你会注意到？', [
          ['这个夸奖够不够具体', 'connector'],
          ['这个时间点有点会安排', 'analyst'],
          ['糟糕，我还是有点受用', 'spark'],
          ['看模式：是不是经常这样', 'strategist']
        ]],
        ['情绪可用的人，最明显的信号是？', [
          ['可以暧昧，但不会故意制造混乱', 'spark'],
          ['有变化会解释，不是直接消失', 'analyst'],
          ['也尊重我的节奏', 'connector'],
          ['行动稳定到有点无聊', 'strategist']
        ]]
      ]
    }
  },
  'date-vibe-decoder': {
    copy: {
      en: 'Decode the first-date micro moments: eye contact, phone checks, awkward pauses, and whether the goodbye had sequel energy.',
      zh: '解码第一次约会的微妙瞬间：眼神、看手机、冷场，以及告别有没有下一集的感觉。'
    },
    questions: {
      en: [
        ['Awkward silence appears. You prefer...', [
          ['Laugh and name the awkwardness', 'spark'],
          ['Ask a low-pressure question', 'analyst'],
          ['Share something slightly embarrassing', 'connector'],
          ['Let the pause breathe for a second', 'strategist']
        ]],
        ['They check their phone once during dinner. Dealbreaker?', [
          ['Only if they do not come back warmer', 'connector'],
          ['Depends on context and frequency', 'analyst'],
          ['I will pretend not to notice, badly', 'spark'],
          ['One check is not a trial', 'strategist']
        ]],
        ['Best goodbye line?', [
          ['"This was dangerously fun"', 'spark'],
          ['"I would do this again"', 'analyst'],
          ['"Text me when you get home"', 'connector'],
          ['"Let us pick a day now"', 'strategist']
        ]],
        ['A date has sequel energy when...', [
          ['The banter follows you outside', 'spark'],
          ['Plans get specific without pressure', 'analyst'],
          ['You both get softer by the end', 'connector'],
          ['The vibe is clear, not exhausting', 'strategist']
        ]]
      ],
      zh: [
        ['突然冷场了。你更喜欢？', [
          ['笑出来，直接承认「有点尴尬」', 'spark'],
          ['问一个没压力的小问题', 'analyst'],
          ['分享一个轻微丢脸的小事', 'connector'],
          ['让沉默自然停一秒', 'strategist']
        ]],
        ['吃饭时 TA 看了一次手机。扣分吗？', [
          ['看完回来更投入就还好', 'connector'],
          ['看场景和频率，不单点判死刑', 'analyst'],
          ['我会假装没看到，但演技很差', 'spark'],
          ['一次看手机不是庭审', 'strategist']
        ]],
        ['最有下一次可能的告别是？', [
          ['「今天有点危险地好玩」', 'spark'],
          ['「我想再约一次」', 'analyst'],
          ['「到家跟我说一声」', 'connector'],
          ['「我们现在定个时间吧」', 'strategist']
        ]],
        ['一次约会有“下一集感”，通常是因为？', [
          ['走出店了还在互相接梗', 'spark'],
          ['计划变具体，但没有压迫感', 'analyst'],
          ['两个人越到后面越放松', 'connector'],
          ['气氛清楚，不耗电', 'strategist']
        ]]
      ]
    }
  },
  'soft-launch-test': {
    copy: {
      en: 'Are you ready for a soft launch, or are you about to post a blurry sleeve and start a private investigation?',
      zh: '你适合软官宣，还是会发一截模糊袖子然后引发全网侦探局？'
    },
    questions: {
      en: [
        ['Your ideal soft-launch photo is...', [
          ['Two drinks, one suspicious hand', 'spark'],
          ['A place tag with plausible deniability', 'analyst'],
          ['A tiny shared joke in the caption', 'connector'],
          ['Nothing until the relationship is real-real', 'strategist']
        ]],
        ['Friend comments "WHO IS THIS". You reply...', [
          ['"lower your voice"', 'spark'],
          ['"just a person with sleeves"', 'analyst'],
          ['"I will brief you later"', 'connector'],
          ['No reply. Let the court adjourn', 'strategist']
        ]],
        ['When is it too early to post?', [
          ['Before you know their coffee order', 'connector'],
          ['Before expectations are discussed', 'analyst'],
          ['Never, if the lighting is insane', 'spark'],
          ['Before consistency exists offline', 'strategist']
        ]],
        ['The perfect caption energy is...', [
          ['Accidentally obvious', 'spark'],
          ['Technically deniable', 'analyst'],
          ['Sweet but not performative', 'connector'],
          ['Private life, public peace', 'strategist']
        ]]
      ],
      zh: [
        ['你理想中的软官宣照片是？', [
          ['两杯饮料，一只可疑的手', 'spark'],
          ['一个定位，保留合理否认空间', 'analyst'],
          ['文案里放一个你们的小梗', 'connector'],
          ['关系真的稳定前，什么都不发', 'strategist']
        ]],
        ['朋友评论「这是谁？？？」你会回？', [
          ['「小点声」', 'spark'],
          ['「只是一个有袖子的人」', 'analyst'],
          ['「晚点给你开会说明」', 'connector'],
          ['不回。退庭', 'strategist']
        ]],
        ['什么时候发太早？', [
          ['还不知道 TA 咖啡怎么喝之前', 'connector'],
          ['还没聊过彼此期待之前', 'analyst'],
          ['光线绝美的话，没有太早', 'spark'],
          ['线下稳定性还不存在之前', 'strategist']
        ]],
        ['最好的软官宣文案气质是？', [
          ['不小心明显', 'spark'],
          ['技术上可以否认', 'analyst'],
          ['甜，但不表演', 'connector'],
          ['私生活，公开的平静', 'strategist']
        ]]
      ]
    }
  },
  'situationship-meter': {
    copy: {
      en: 'Measure the almost-relationship: are you building romance, collecting mixed signals, or running a one-person podcast?',
      zh: '测量这段“差一点关系”：是在升温，还是在收集混乱信号，还是你一个人在录情感播客？'
    },
    questions: {
      en: [
        ['They introduce you as "my friend" after three date-like nights. You think...', [
          ['Friend with cinematic tension?', 'spark'],
          ['We need a definition soon', 'analyst'],
          ['Maybe they are nervous in public', 'connector'],
          ['Labels matter when behavior gets costly', 'strategist']
        ]],
        ['Plans are always last-minute. Your move?', [
          ['Say yes only if I actually want to', 'connector'],
          ['Ask for a real plan next time', 'analyst'],
          ['One spontaneous night, for the plot', 'spark'],
          ['Stop rewarding low-effort timing', 'strategist']
        ]],
        ['The most honest "what are we" opener is...', [
          ['"Are we being cute or delusional?"', 'spark'],
          ['"I like this. What are you looking for?"', 'analyst'],
          ['"I want to understand where you are"', 'connector'],
          ['"I need clarity to keep investing"', 'strategist']
        ]],
        ['You know it is getting healthier when...', [
          ['Flirting feels easy again', 'spark'],
          ['Words and actions match', 'analyst'],
          ['Both people can ask for reassurance', 'connector'],
          ['Uncertainty stops running the schedule', 'strategist']
        ]]
      ],
      zh: [
        ['三次像约会的晚上后，TA 还介绍你是「朋友」。你想？', [
          ['朋友，但有电影级张力？', 'spark'],
          ['很快需要定义一下了', 'analyst'],
          ['也许 TA 公开场合会紧张', 'connector'],
          ['当投入变多，标签就有意义', 'strategist']
        ]],
        ['每次约你都很临时。你的动作是？', [
          ['我真的想去才答应', 'connector'],
          ['下次要求一个真正的计划', 'analyst'],
          ['为了剧情，可以冲一次', 'spark'],
          ['停止奖励低成本临时起意', 'strategist']
        ]],
        ['最诚实的「我们算什么」开场是？', [
          ['「我们是在可爱，还是在发疯？」', 'spark'],
          ['「我喜欢现在这样，你想要什么？」', 'analyst'],
          ['「我想理解你现在的位置」', 'connector'],
          ['「我要清楚一点，才知道怎么投入」', 'strategist']
        ]],
        ['什么时候说明这段关系更健康了？', [
          ['调情又变轻松了', 'spark'],
          ['话和行动对得上', 'analyst'],
          ['两个人都可以要一点安全感', 'connector'],
          ['不确定性不再安排你的日程', 'strategist']
        ]]
      ]
    }
  }
};

const LOVE_RESULTS = {
  en: {
    spark: ['Flirt Chaos Main Character', 'You make tiny signals feel cinematic. Your charm is high, but your best move is to keep the plot fun without turning every pause into a finale.'],
    analyst: ['Receipts-First Romantic', 'You are not cold, you are calibrated. You can enjoy the butterflies and still ask whether the behavior is actually consistent.'],
    connector: ['Soft Signal Reader', 'You notice tone, timing, and emotional safety. Your superpower is making the vibe warmer without abandoning your own needs.'],
    strategist: ['Boundary-Protected Lover', 'You like romance, but you refuse to let confusion rent a room in your brain. Clear energy, clear calendar, clear next step.']
  },
  zh: {
    spark: ['暧昧剧情主角', '你能把小信号看出电影感，魅力很足。最适合你的策略是：保持好玩，但别把每一次停顿都剪成大结局。'],
    analyst: ['带证据恋爱派', '你不是冷，你是校准过。你可以享受心动，也会检查对方行为到底稳不稳定。'],
    connector: ['温柔信号读取器', '你很会看语气、节奏和安全感。你的优势是让气氛变暖，同时不丢掉自己的需求。'],
    strategist: ['边界感恋爱选手', '你喜欢浪漫，但不允许混乱长期占用大脑。能量要清楚，日程要清楚，下一步也要清楚。']
  }
};

const storage = {
  get(key, fallback = null) {
    try {
      return window.localStorage.getItem(key) || fallback;
    } catch (_) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_) {
      // file:// previews can block storage; the quiz still works for the session.
    }
  }
};

const LANG_VERSION = 'en-default-2026-05-26';
const storedLangVersion = storage.get('arcadequiz-lang-version', '');
let lang = storedLangVersion === LANG_VERSION ? storage.get('arcadequiz-lang', 'en') : 'en';
storage.set('arcadequiz-lang-version', LANG_VERSION);
storage.set('arcadequiz-lang', lang);
let state = JSON.parse(storage.get('arcadequiz-state', '{"score":0,"streak":0,"completed":0}'));
let activeQuiz = null;
let activeQuestions = [];
let questionIndex = 0;
let answers = [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const t = () => I18N[lang];
const localQuizTitle = (quiz) => quiz.title[lang];
const quizUrl = (quiz) => `arcadequiz-play.html?id=${encodeURIComponent(quiz.id)}`;
const QUIZ_EMOJIS = {
  love: ['💬', '💘', '🫶', '🧠'],
  meme: ['😂', '🌀', '😈', '📱'],
  celebrity: ['🎤', '✨', '👀', '💃'],
  ai: ['🤖', '⚡', '💼', '🔮'],
  war: ['🗺️', '♟️', '🏛️', '⚔️'],
  geography: ['🌍', '🧭', '🏞️', '🏺'],
  finance: ['📈', '💰', '🎲', '🧮'],
  daily: ['🔥', '⏱️', '🧩', '🌟'],
  create: ['✍️', '🧪', '🚀', '🎯']
};

function quizEmoji(quiz) {
  const list = QUIZ_EMOJIS[quiz.category] || ['❓', '✨'];
  const index = Math.abs(quiz.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % list.length;
  return list[index];
}

function buildQuestions(quiz) {
  const custom = CRUSH_QUIZ_CONTENT[quiz.id]?.questions?.[lang];
  if (custom) {
    return custom.map(([text, options], index) => ({
      text,
      options: options.map(([label, trait], optionIndex) => ({
        label,
        trait,
        correct: optionIndex === ((quiz.id.length + index) % 4)
      }))
    }));
  }
  const base = t().questionTemplates[quiz.format] || t().questionTemplates.personality;
  const traits = ['spark', 'analyst', 'connector', 'strategist'];
  return base.map((text, index) => ({
    text: `${text} ${localQuizTitle(quiz)}`,
    options: t().options.map((label, optionIndex) => ({
      label,
      trait: traits[(optionIndex + index) % traits.length],
      correct: optionIndex === ((quiz.id.length + index) % 4)
    }))
  }));
}

function quizMeta(quiz) {
  return `${t().formats[quiz.format]} · ${t().categories[quiz.category]} · +${quiz.points} ${t().points}`;
}

function quizDetailCopy(quiz) {
  const custom = CRUSH_QUIZ_CONTENT[quiz.id]?.copy?.[lang];
  if (custom) return custom;
  if (quiz.format === 'strategy') {
    return lang === 'zh'
      ? '中立决策模拟：权衡信号、成本和不确定性。'
      : 'Neutral decision simulation: weigh signals, cost, and uncertainty.';
  }
  return lang === 'zh'
    ? '回答 3-5 道选择题，获得结果卡、积分奖励和分享文案。'
    : 'Answer 3-5 multiple-choice questions to get a result card, points, and share copy.';
}

function quizResult(quiz, trait) {
  if (CRUSH_QUIZ_CONTENT[quiz.id]) return LOVE_RESULTS[lang][trait] || LOVE_RESULTS[lang].spark;
  return t().results[trait] || t().results.spark;
}

function cardTemplate(quiz, size = '') {
  return `<article class="quiz-card ${size}" data-category="${quiz.category}">
    <a class="quiz-card-button buttonlike" href="${quizUrl(quiz)}" data-quiz-id="${quiz.id}">
      <span class="quiz-art ${quiz.category}"><i>${quizEmoji(quiz)}</i></span>
      <span class="quiz-card-body">
        <small>${quizMeta(quiz)}</small>
        <strong>${localQuizTitle(quiz)}</strong>
        <em>${quiz.viral ? 'Viral' : 'Deep'} · ${quiz.format === 'strategy' ? 'Neutral scenario' : 'Interactive'}</em>
      </span>
    </a>
  </article>`;
}

function renderStaticText() {
  $$('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (t()[key]) node.textContent = t()[key];
  });
  $('#quiz-lang-toggle').textContent = lang === 'zh' ? 'EN' : '中文';
}

function renderNav() {
  $('#quiz-nav').innerHTML = Object.entries(t().categories)
    .filter(([key]) => key !== 'create')
    .map(([key, label]) => `<a href="#section-${key}">${label}</a>`)
    .join('');
}

function renderDashboard() {
  const featured = QUIZZES[0];
  $('#featured-quiz').innerHTML = `<img class="quiz-feature-img" src="external-assets/local-icons/quiz-star.jpg" alt="" /><span>${t().today}</span><h1>${localQuizTitle(featured)}</h1><p>${quizMeta(featured)}</p><a class="quiz-primary buttonlike" href="${quizUrl(featured)}" data-quiz-id="${featured.id}">${t().play}</a>`;
  $('#trending-quizzes').innerHTML = `<h2>${t().trending}</h2>` + QUIZZES.slice(1, 5).map((quiz) => cardTemplate(quiz, 'compact')).join('');
  const daily = QUIZZES.find((quiz) => quiz.category === 'daily');
  $('#daily-module').innerHTML = `<span>${t().daily}</span><h2>${localQuizTitle(daily)}</h2><p>${quizMeta(daily)}</p><a class="quiz-ghost buttonlike" href="${quizUrl(daily)}" data-quiz-id="${daily.id}">${t().play}</a>`;
  updateStats();
}

function renderFormats() {
  const formats = [...new Set(QUIZZES.map((quiz) => quiz.format))];
  $('#format-strip').innerHTML = formats.map((format) => `<button class="buttonlike" type="button" data-format="${format}">${t().formats[format]}</button>`).join('');
}

function renderSections() {
  $('#quiz-sections').innerHTML = Object.entries(t().categories).map(([category, label]) => {
    const quizzes = QUIZZES.filter((quiz) => quiz.category === category);
    if (!quizzes.length) return '';
    return `<section class="quiz-category" id="section-${category}">
      <div class="quiz-section-head"><h2>${label}</h2><span>${quizzes.length} quizzes</span></div>
      <div class="quiz-feed">${quizzes.map((quiz) => cardTemplate(quiz)).join('')}</div>
    </section>`;
  }).join('');
}

function updateStats() {
  $('#user-score').textContent = state.score;
  $('#user-streak').textContent = state.streak;
  $('#user-completed').textContent = state.completed;
  storage.set('arcadequiz-state', JSON.stringify(state));
}

function openQuiz(id) {
  activeQuiz = QUIZZES.find((quiz) => quiz.id === id) || QUIZZES[0];
  activeQuestions = buildQuestions(activeQuiz);
  questionIndex = 0;
  answers = [];
  $('#quiz-modal').classList.add('open');
  $('#quiz-modal').setAttribute('aria-hidden', 'false');
  $('#quiz-result').hidden = true;
  $('#quiz-question').hidden = false;
  $('#quiz-modal-title').textContent = localQuizTitle(activeQuiz);
  $('#quiz-modal-format').textContent = quizMeta(activeQuiz);
  $('#quiz-modal-copy').textContent = quizDetailCopy(activeQuiz);
  renderQuestion();
}

function renderQuestion() {
  const question = activeQuestions[questionIndex];
  $('#quiz-progress-label').textContent = `${t().q}${lang === 'zh' ? '' : ' '}${questionIndex + 1} ${t().of} ${activeQuestions.length}`;
  $('#quiz-progress-bar').style.width = `${(questionIndex / activeQuestions.length) * 100}%`;
  $('#quiz-question').innerHTML = `<h3>${question.text}</h3><div class="quiz-options">${question.options.map((option, index) => `<button class="buttonlike" type="button" data-answer="${index}">${option.label}</button>`).join('')}</div>`;
}

function chooseAnswer(index) {
  answers.push(activeQuestions[questionIndex].options[index]);
  questionIndex += 1;
  if (questionIndex >= activeQuestions.length) showResult();
  else renderQuestion();
}

function showResult() {
  const score = answers.filter((answer) => answer.correct).length;
  const traits = answers.reduce((memo, answer) => {
    memo[answer.trait] = (memo[answer.trait] || 0) + 1;
    return memo;
  }, {});
  const topTrait = Object.entries(traits).sort((a, b) => b[1] - a[1])[0]?.[0] || 'spark';
  const result = quizResult(activeQuiz, topTrait);
  const reward = activeQuiz.points + score * 10;
  state.score += reward;
  state.streak += 1;
  state.completed += 1;
  updateStats();
  $('#quiz-progress-bar').style.width = '100%';
  $('#quiz-question').hidden = true;
  $('#quiz-result').hidden = false;
  const share = lang === 'zh'
    ? `我在 Arcadequiz 玩了「${localQuizTitle(activeQuiz)}」，结果是「${result[0]}」，拿到 ${reward} 分。`
    : `I played "${localQuizTitle(activeQuiz)}" on Arcadequiz, got "${result[0]}", and earned ${reward} points.`;
  $('#quiz-result').innerHTML = `<span>${t().result}</span><h3>${result[0]}</h3><p>${result[1]}</p><div class="quiz-reward">+${reward} ${t().points} · ${score}/${activeQuestions.length}</div><label>${t().share}<textarea readonly>${share}</textarea></label><div class="quiz-result-actions"><button class="quiz-primary buttonlike" type="button" data-quiz-id="${activeQuiz.id}">${t().again}</button><button class="quiz-ghost buttonlike" type="button" id="result-close">${t().close}</button></div>`;
}

function closeQuiz() {
  $('#quiz-modal').classList.remove('open');
  $('#quiz-modal').setAttribute('aria-hidden', 'true');
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const answerButton = event.target.closest('[data-answer]');
    if (answerButton) chooseAnswer(Number(answerButton.dataset.answer));
    if (event.target.id === 'result-close') closeQuiz();
    const follow = event.target.closest('.follow-column');
    if (follow) follow.textContent = t().followed;
  });
  $('#quiz-close').addEventListener('click', closeQuiz);
  $('#quiz-modal').addEventListener('click', (event) => {
    if (event.target.id === 'quiz-modal') closeQuiz();
  });
  $('#quiz-lang-toggle').addEventListener('click', () => {
    lang = lang === 'zh' ? 'en' : 'zh';
    storage.set('arcadequiz-lang-version', LANG_VERSION);
    storage.set('arcadequiz-lang', lang);
    render();
  });
  $('#quick-challenge').addEventListener('click', () => {
    const quiz = QUIZZES[Math.floor(Math.random() * QUIZZES.length)];
    location.href = quizUrl(quiz);
  });
}

function render() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  renderStaticText();
  renderNav();
  renderDashboard();
  renderFormats();
  renderSections();
}

window.ArcadequizShared = {
  I18N,
  QUIZZES,
  buildQuestions,
  getLang: () => lang,
  getState: () => ({ ...state }),
  localQuizTitle,
  quizMeta,
  quizDetailCopy,
  quizResult,
  quizUrl,
  quizEmoji,
  setLang(nextLang) {
    lang = nextLang;
    storage.set('arcadequiz-lang-version', LANG_VERSION);
    storage.set('arcadequiz-lang', lang);
  },
  updateProgress(points) {
    state.score += points;
    state.streak += 1;
    state.completed += 1;
    storage.set('arcadequiz-state', JSON.stringify(state));
    return { ...state };
  },
  text: t
};

if (document.body.classList.contains('quiz-page')) {
  render();
  bindEvents();
}

if (document.body.classList.contains('quiz-page') && window.ArcadeHubSEO) {
  window.ArcadeHubSEO.update({
    title: 'Arcadequiz - Viral Quizzes & Strategy Challenges',
    description: 'Play bilingual viral quizzes and strategy challenges across personality, trivia, maps, finance, history, and daily formats.',
    image: 'external-assets/brand/og-arcade-hub.svg',
    canonical: location.href
  });
}
