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
  ['crush-name-scanner', 'Crush Scanner', 'TA 是你的 Crush 吗？', 'love', 'personality', 150, true],
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
  'crush-name-scanner': {
    copy: {
      en: 'Drop their name, add an optional photo, and run a suspiciously personal vibe scan before the group chat asks for evidence.',
      zh: '输入 TA 的名字，也可以加一张照片做结果卡，然后扫描那些你嘴上说“很正常”的小信号。'
    },
    questions: {
      en: [
        ['{name} suddenly appears in your notifications. Your honest first reaction?', [
          ['Why am I smiling at glass and pixels?', 'spark'],
          ['Okay, log the signal but do not spiral', 'analyst'],
          ['Tiny mood lift. Very annoying. Very real', 'connector'],
          ['A notification is not a life event', 'strategist']
        ]],
        ['Someone says {name} in a random sentence. Your brain immediately...', [
          ['Turns the volume up for no reason', 'spark'],
          ['Checks whether my face betrayed me', 'analyst'],
          ['Pretends to be casual and fails softly', 'connector'],
          ['Registers it, then keeps functioning', 'strategist']
        ]],
        ['{name} replies "haha" instead of "lol." You decode that as...', [
          ['A coded romantic document, obviously', 'spark'],
          ['Probably nothing, but I am saving it', 'analyst'],
          ['Warmer tone. I said what I said', 'connector'],
          ['Same meaning, different keyboard behavior', 'strategist']
        ]],
        ['{name} leaves you on read for three hours. What happens next?', [
          ['I open the group chat courtroom', 'spark'],
          ['I remind myself one delay is not a pattern', 'analyst'],
          ['I breathe, then check once like a liar', 'connector'],
          ['I protect my mood and do literally anything else', 'strategist']
        ]],
        ['{name} posts a story. You are most likely to...', [
          ['Watch it, rewatch it, then act normal', 'spark'],
          ['Notice who else liked it because context matters', 'analyst'],
          ['Look for the tiny detail they wanted seen', 'connector'],
          ['Watch once. No forensic cinema today', 'strategist']
        ]],
        ['Your friend says, "You talk about {name} a lot." You say...', [
          ['"Lower your voice"', 'spark'],
          ['"I am just providing context"', 'analyst'],
          ['"Okay maybe a little"', 'connector'],
          ['"Noted. I will be normal now"', 'strategist']
        ]],
        ['If {name} liked someone else\'s photo, your emotional weather would be...', [
          ['Sunny with a chance of personal betrayal', 'spark'],
          ['Curious, but not filing a case yet', 'analyst'],
          ['A little weird, against my will', 'connector'],
          ['Stable. I am not dating a like button', 'strategist']
        ]],
        ['{name} asks to hang out one-on-one. You...', [
          ['Plan the outfit before the time is confirmed', 'spark'],
          ['Ask what the plan is so I can read the room', 'analyst'],
          ['Tell one friend and pretend it is not a briefing', 'connector'],
          ['Say yes if the plan is clear and respectful', 'strategist']
        ]],
        ['Brutal honesty: are you into {name}, or into being chosen by {name}?', [
          ['Do not ask me questions with consequences', 'spark'],
          ['Both are possible, unfortunately', 'analyst'],
          ['I want to be seen by them specifically', 'connector'],
          ['I can want attention without obeying it', 'strategist']
        ]],
        ['Final scan: if the result says you are cooked, what will you do?', [
          ['Laugh, share it, and deny nothing', 'spark'],
          ['Send it to a friend for peer review', 'analyst'],
          ['Scan another person immediately', 'connector'],
          ['Take the data and calm down gracefully', 'strategist']
        ]]
      ],
      zh: [
        ['只要 {name} 发消息，你的锁屏瞬间变成？', [
          ['红毯现场', 'spark'],
          ['一个我不该过度放大的数据点', 'analyst'],
          ['我一定会注意到的小情绪变化', 'connector'],
          ['只是通知，不是人生决定', 'strategist']
        ]],
        ['别人随口提到 {name}，你的大脑会？', [
          ['像群聊警报一样亮起来', 'spark'],
          ['检查自己有没有太明显', 'analyst'],
          ['假装正常，但演技很差', 'connector'],
          ['承认一下，然后继续做人', 'strategist']
        ]],
        ['你看到 {name} 今天特别好看。诚实一点：', [
          ['我变成没有发表计划的诗人', 'spark'],
          ['我会心动，但继续看实际行为', 'analyst'],
          ['我接下来 40 分钟都会变温柔', 'connector'],
          ['吸引是真的，节奏也是真的', 'strategist']
        ]],
        ['如果 {name} 已读你，你的内心旁白是？', [
          ['「这是我的反派起源故事」', 'spark'],
          ['「一次延迟不等于模式」', 'analyst'],
          ['「也许 TA 只是忙，先呼吸」', 'connector'],
          ['「我不参加注意力试镜」', 'strategist']
        ]],
        ['朋友会发现你喜欢 {name}，因为？', [
          ['我总在可疑的时间提到 TA', 'spark'],
          ['我已经有完整证据板', 'analyst'],
          ['我声音会变得烦人地温柔', 'connector'],
          ['我否认得太认真', 'strategist']
        ]],
        ['最终扫描：什么会让 {name} 真的值得？', [
          ['白天也成立的双向心动', 'spark'],
          ['稳定投入，不只是化学反应', 'analyst'],
          ['不用表演也被看见', 'connector'],
          ['清楚意图和平稳能量', 'strategist']
        ]]
      ]
    }
  },
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
        ]],
        ['They send a song with no context. You decode it as...', [
          ['A tiny confession wearing headphones', 'spark'],
          ['A clue, but lyrics need confirmation', 'analyst'],
          ['They wanted to share a mood with me', 'connector'],
          ['Nice, but playlists are not promises', 'strategist']
        ]],
        ['You accidentally leave them on read for a day. Your comeback?', [
          ['"I vanished for lore reasons"', 'spark'],
          ['"Sorry, long day. I am back"', 'analyst'],
          ['"I saw this and thought of you"', 'connector'],
          ['Own it once, then be more consistent', 'strategist']
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
        ]],
        ['TA 没头没尾发来一首歌。你会解读成？', [
          ['戴着耳机的小型告白', 'spark'],
          ['算线索，但歌词还需要确认', 'analyst'],
          ['TA 想把某种心情分享给我', 'connector'],
          ['很好听，但歌单不是承诺', 'strategist']
        ]],
        ['你不小心已读 TA 一整天。回场第一句？', [
          ['「我因为剧情需要消失了」', 'spark'],
          ['「抱歉，今天太满了，我回来了」', 'analyst'],
          ['「刚看到这个，突然想到你」', 'connector'],
          ['承认一次，然后以后稳定一点', 'strategist']
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
        ]],
        ['They cancel once, then offer two new times. You file it under...', [
          ['Green flag with calendar literacy', 'strategist'],
          ['A normal life thing, handled well', 'analyst'],
          ['They cared enough to repair the vibe', 'connector'],
          ['Still sad, but also kind of hot', 'spark']
        ]],
        ['Which behavior gives the fastest ick?', [
          ['Hot-cold texting as a personality', 'analyst'],
          ['Making you compete for basic effort', 'strategist'],
          ['Jokes that quietly make you smaller', 'connector'],
          ['Posting thirst traps while dodging plans', 'spark']
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
        ]],
        ['TA 取消一次，但主动给了两个新时间。你把它归类为？', [
          ['会用日历的绿灯选手', 'strategist'],
          ['正常生活状况，而且处理得好', 'analyst'],
          ['TA 有在修复气氛', 'connector'],
          ['还是有点失落，但也有点加分', 'spark']
        ]],
        ['哪种行为最快让你下头？', [
          ['把忽冷忽热当人格魅力', 'analyst'],
          ['让你竞争最基础的用心', 'strategist'],
          ['用玩笑悄悄贬低你', 'connector'],
          ['不约见面但疯狂发暧昧动态', 'spark']
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
        ]],
        ['They bring up an oddly specific thing you said last week. You feel...', [
          ['Seen in 4K', 'connector'],
          ['Impressed by the memory receipts', 'analyst'],
          ['Ready to make this my whole personality', 'spark'],
          ['Interested, but still pacing myself', 'strategist']
        ]],
        ['The bill arrives. Best vibe?', [
          ['No weird power move, just easy', 'connector'],
          ['A quick, respectful plan for splitting', 'analyst'],
          ['They make one playful line and handle it', 'spark'],
          ['Nobody turns money into a test', 'strategist']
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
        ]],
        ['TA 提起你上周随口说过的一个超小细节。你感觉？', [
          ['被 4K 看见了', 'connector'],
          ['记忆力证据很加分', 'analyst'],
          ['准备把这件事写进人生简介', 'spark'],
          ['有兴趣，但我继续稳住节奏', 'strategist']
        ]],
        ['账单来了。最舒服的气氛是？', [
          ['没有权力游戏，就是自然', 'connector'],
          ['快速、尊重地说清怎么分', 'analyst'],
          ['TA 开一句玩笑，然后利落处理', 'spark'],
          ['没人把钱变成测试题', 'strategist']
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
        ]],
        ['Your close friends already know because...', [
          ['I sent a 17-minute voice memo', 'spark'],
          ['I shared the evidence calmly', 'analyst'],
          ['They can hear it in my voice', 'connector'],
          ['I told only the people I trust', 'strategist']
        ]],
        ['Someone asks if you are dating. You say...', [
          ['"Define dating"', 'spark'],
          ['"We are seeing where it goes"', 'analyst'],
          ['"It is sweet, I am happy"', 'connector'],
          ['"I will share when it is settled"', 'strategist']
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
        ]],
        ['你的好朋友已经知道了，因为？', [
          ['我发过 17 分钟语音复盘', 'spark'],
          ['我冷静分享了证据链', 'analyst'],
          ['她们从我声音里听出来了', 'connector'],
          ['我只告诉了真正信任的人', 'strategist']
        ]],
        ['有人问你们是不是在一起。你会说？', [
          ['「先定义一下在一起」', 'spark'],
          ['「我们还在看看会怎么发展」', 'analyst'],
          ['「挺甜的，我很开心」', 'connector'],
          ['「稳定了我会说」', 'strategist']
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
        ]],
        ['They disappear for a weekend and return casual. Your boundary is...', [
          ['Ask the question with a smile, not a spiral', 'spark'],
          ['Name the pattern and request clarity', 'analyst'],
          ['Say how it felt without attacking', 'connector'],
          ['Step back until effort is visible', 'strategist']
        ]],
        ['The almost-relationship becomes real when...', [
          ['The flirting survives daylight', 'spark'],
          ['Both people say what they want', 'analyst'],
          ['Care shows up in boring moments', 'connector'],
          ['Plans, labels, and effort line up', 'strategist']
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
        ]],
        ['TA 周末消失，回来又像没事人。你的边界是？', [
          ['笑着问清楚，不让自己脑内暴走', 'spark'],
          ['指出模式，并要求清晰一点', 'analyst'],
          ['说出我的感受，但不攻击', 'connector'],
          ['先后退，直到看见真实投入', 'strategist']
        ]],
        ['“差一点关系”什么时候真的变成关系？', [
          ['暧昧在白天也成立', 'spark'],
          ['两个人都说清自己想要什么', 'analyst'],
          ['照顾出现在无聊的小事里', 'connector'],
          ['计划、身份和投入对齐', 'strategist']
        ]]
      ]
    }
  }
};

const LOVE_RESULTS = {
  en: {
    spark: ['Flirt Chaos Main Character', 'You make tiny signals feel cinematic. Your charm is high, but your best move is to keep the plot fun without turning every pause into a finale.', 'My crush style is Flirt Chaos Main Character: 80% sparkle, 20% overthinking, fully screenshot-worthy.'],
    analyst: ['Receipts-First Romantic', 'You are not cold, you are calibrated. You can enjoy the butterflies and still ask whether the behavior is actually consistent.', 'My crush style is Receipts-First Romantic: I believe in butterflies, but I also believe in evidence.'],
    connector: ['Soft Signal Reader', 'You notice tone, timing, and emotional safety. Your superpower is making the vibe warmer without abandoning your own needs.', 'My crush style is Soft Signal Reader: I can read the room, the text tone, and the emotional weather.'],
    strategist: ['Boundary-Protected Lover', 'You like romance, but you refuse to let confusion rent a room in your brain. Clear energy, clear calendar, clear next step.', 'My crush style is Boundary-Protected Lover: cute energy is welcome, confusion has to pay rent.']
  },
  zh: {
    spark: ['暧昧剧情主角', '你能把小信号看出电影感，魅力很足。最适合你的策略是：保持好玩，但别把每一次停顿都剪成大结局。', '我的心动风格是「暧昧剧情主角」：80% 会发光，20% 会脑补，适合截图发群聊。'],
    analyst: ['带证据恋爱派', '你不是冷，你是校准过。你可以享受心动，也会检查对方行为到底稳不稳定。', '我的心动风格是「带证据恋爱派」：我相信心动，也相信证据链。'],
    connector: ['温柔信号读取器', '你很会看语气、节奏和安全感。你的优势是让气氛变暖，同时不丢掉自己的需求。', '我的心动风格是「温柔信号读取器」：能读懂气氛、语气和对方的情绪天气。'],
    strategist: ['边界感恋爱选手', '你喜欢浪漫，但不允许混乱长期占用大脑。能量要清楚，日程要清楚，下一步也要清楚。', '我的心动风格是「边界感恋爱选手」：可爱欢迎，混乱请付房租。']
  }
};

const CRUSH_SCANNER_RESULTS = {
  en: {
    spark: ['You Are Cooked', '{name} is not just a person anymore. They are a notification, a plot device, and a minor threat to your emotional stability.', 'I scanned {name} and got "You Are Cooked." My bestie has been right this whole time.'],
    analyst: ['Delusion Loading... 72%', 'Some signals are real. Some are written, directed, and produced by your brain. The good news: you still know where the receipts are.', 'I scanned {name} and got "Delusion Loading... 72%." This is going to the group chat for peer review.'],
    connector: ['Soft Crush Detected', 'You are not fully gone, but {name} has started affecting your mood more than a normal person should. Respectfully suspicious.', 'I scanned {name} and got "Soft Crush Detected." I am still pretending this is casual.'],
    strategist: ['Bestie Intervention Recommended', 'You like the vibe, but you also know confusion is expensive. This crush can continue only if clarity starts paying rent.', 'I scanned {name} and got "Bestie Intervention Recommended." I will not be taking questions.']
  },
  zh: {
    spark: ['你已经上头了', '{name} 已经不只是一个普通人，而是通知栏、剧情装置，以及你情绪稳定的小型威胁。', '我测了 {name}，结果是「你已经上头了」。朋友可能早就看出来了。'],
    analyst: ['脑补加载中...72%', '有些信号是真的，有些是你大脑自编自导自演。好消息是：你还知道证据在哪里。', '我测了 {name}，结果是「脑补加载中...72%」。需要发给朋友复审。'],
    connector: ['轻度心动已检出', '你还没有完全沦陷，但 {name} 对你心情的影响已经超过普通人类标准。', '我测了 {name}，结果是「轻度心动已检出」。我还在假装这很普通。'],
    strategist: ['建议朋友介入', '你喜欢这个气氛，但也知道混乱很消耗。除非清晰度开始付房租，否则这段心动要谨慎。', '我测了 {name}，结果是「建议朋友介入」。暂不接受提问。']
  }
};

const CRUSH_STAGES = {
  en: ['Notification spike', 'Name reaction', 'Text autopsy', 'Read-receipt trial', 'Story surveillance', 'Bestie evidence', 'Jealousy weather', 'One-on-one alert', 'Brutal honesty', 'Final scan'],
  zh: ['聊天侦探模式', '信号检查', '主角时刻', '边界测试', '群聊诱饵', '结果卡预热']
};

const ANSWER_REACTIONS = {
  en: {
    spark: 'Logged: high sparkle, mild chaos.',
    analyst: 'Logged: receipts saved, delusion reduced.',
    connector: 'Logged: soft signal detected.',
    strategist: 'Logged: boundary shield activated.'
  },
  zh: {
    spark: '已记录：闪光值很高，混乱值微妙上升。',
    analyst: '已记录：证据链保存，脑补值下降。',
    connector: '已记录：温柔信号已捕捉。',
    strategist: '已记录：边界护盾已开启。'
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
let isAnswering = false;

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
      vibe: CRUSH_STAGES[lang][index % CRUSH_STAGES[lang].length],
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
  if (quiz.id === 'crush-name-scanner') return CRUSH_SCANNER_RESULTS[lang][trait] || CRUSH_SCANNER_RESULTS[lang].spark;
  if (CRUSH_QUIZ_CONTENT[quiz.id]) return LOVE_RESULTS[lang][trait] || LOVE_RESULTS[lang].spark;
  return t().results[trait] || t().results.spark;
}

function quizShareCopy(quiz, result, reward, targetName = '') {
  if (CRUSH_QUIZ_CONTENT[quiz.id] && result[2]) {
    const subject = targetName || profileFallbackName();
    if (quizNeedsProfile(quiz)) {
      const shareLine = personalizeText(result[2], subject);
      return shareLine;
    }
    return lang === 'zh'
      ? `${result[2]} 我在 Arcadequiz 拿到 ${reward} 分。你也测一下。`
      : `${result[2]} I got ${reward} points on Arcadequiz. Take yours.`;
  }
  return lang === 'zh'
    ? `我在 Arcadequiz 玩了「${localQuizTitle(quiz)}」，结果是「${result[0]}」，拿到 ${reward} 分。`
    : `I played "${localQuizTitle(quiz)}" on Arcadequiz, got "${result[0]}", and earned ${reward} points.`;
}

function quizNeedsProfile(quiz) {
  return quiz.id === 'crush-name-scanner';
}

function profileFallbackName() {
  return lang === 'zh' ? 'TA' : 'this person';
}

function personalizeText(value, name) {
  return value.replaceAll('{name}', name || profileFallbackName());
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
  const kicker = question.vibe ? `<div class="quiz-question-kicker">${question.vibe}</div>` : '';
  $('#quiz-question').innerHTML = `${kicker}<h3>${question.text}</h3><div class="quiz-options">${question.options.map((option, index) => `<button class="buttonlike" type="button" data-answer="${index}">${option.label}</button>`).join('')}</div><div class="quiz-answer-reaction" aria-live="polite"></div>`;
}

function chooseAnswer(index, button) {
  if (isAnswering) return;
  const selected = activeQuestions[questionIndex].options[index];
  isAnswering = true;
  answers.push(selected);
  $$('.quiz-options button').forEach((node) => { node.disabled = true; });
  if (button) button.classList.add('selected');
  const reaction = $('.quiz-answer-reaction');
  if (reaction) reaction.textContent = ANSWER_REACTIONS[lang][selected.trait] || '';
  window.setTimeout(() => {
    questionIndex += 1;
    isAnswering = false;
    if (questionIndex >= activeQuestions.length) showResult();
    else renderQuestion();
  }, CRUSH_QUIZ_CONTENT[activeQuiz.id] ? 620 : 160);
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
  const share = quizShareCopy(activeQuiz, result, reward);
  $('#quiz-result').innerHTML = `<span>${t().result}</span><h3>${result[0]}</h3><p>${result[1]}</p><div class="quiz-share-badge">${CRUSH_QUIZ_CONTENT[activeQuiz.id] ? (lang === 'zh' ? '适合发给朋友复盘' : 'Group-chat ready') : localQuizTitle(activeQuiz)}</div><div class="quiz-reward">+${reward} ${t().points} · ${score}/${activeQuestions.length}</div><label>${t().share}<textarea readonly>${share}</textarea></label><div class="quiz-result-actions"><button class="quiz-primary buttonlike" type="button" data-quiz-id="${activeQuiz.id}">${t().again}</button><button class="quiz-ghost buttonlike" type="button" data-copy-share>${lang === 'zh' ? '复制分享文案' : 'Copy share text'}</button><button class="quiz-ghost buttonlike" type="button" id="result-close">${t().close}</button></div>`;
}

function closeQuiz() {
  $('#quiz-modal').classList.remove('open');
  $('#quiz-modal').setAttribute('aria-hidden', 'true');
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const answerButton = event.target.closest('[data-answer]');
    if (answerButton) chooseAnswer(Number(answerButton.dataset.answer), answerButton);
    const copyShare = event.target.closest('[data-copy-share]');
    if (copyShare) {
      const textarea = $('#quiz-result textarea');
      if (textarea) {
        navigator.clipboard?.writeText(textarea.value);
        textarea.select();
        copyShare.textContent = lang === 'zh' ? '已复制' : 'Copied';
      }
    }
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
  quizShareCopy,
  quizNeedsProfile,
  profileFallbackName,
  personalizeText,
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
