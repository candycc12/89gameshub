const stages = [
  { range: "0-6", max: 6, title: "语言与习惯", copy: "感知、表达、情绪、生活习惯" },
  { range: "7-12", max: 12, title: "基础学习力", copy: "阅读、数学、表达、逻辑" },
  { range: "13-18", max: 18, title: "自驱与探索", copy: "学科能力、兴趣、项目体验" },
  { range: "19-25", max: 25, title: "专业与入门", copy: "专业选择、AI 素养、职业试炼" },
  { range: "26-40", max: 40, title: "职业成长", copy: "工作能力、管理、表达、财富" },
  { range: "41-60", max: 60, title: "复利人生", copy: "领导力、家庭、健康、再学习" },
  { range: "61-100", max: 100, title: "健康与传承", copy: "认知维护、兴趣、陪伴、记录" }
];

const personas = {
	  child: {
	    age: 7,
	    name: "Your child",
	    learnerLabel: "Child",
    stage: "Foundational Expression",
    goal: "Retell a short story with character, goal, reason, and sequence.",
    time: "10 minutes",
    duration: "10 min",
    taskType: "Story Expression",
    taskTitle: "Retell the story in three clear sentences.",
	    taskBody: "The AI listens first, then asks one follow-up question to test whether the child can add the missing reason.",
    hero: "Find your child's expression gap in 3 minutes.",
    challengeTitle: "Assessment → Result → Course → Interaction → Report",
    challengeCopy: "A short expression assessment becomes a focused 7-day course with daily AI coaching and a parent-ready report.",
    teacherTitle: "The AI found one missing piece: the reason behind the action.",
    unlockTitle: "Reason Link Lv.1",
    unlockCopy: "Use one reason sentence to explain why the character acted.",
    tomorrowTitle: "Story Sequence",
    tomorrowCopy: "Use first, then, and finally to retell the story clearly.",
    score: "B+",
	    progress: "The questionnaire suggests the first trial should test whether your child can add one reason sentence.",
    next: "Tomorrow's lesson will train sequence words: first, then, finally.",
    percent: 68,
    ops: {
      streak: 12,
      xp: 420,
      gems: 86,
      hearts: "5/5",
      league: "Pearl League",
      rank: "#8",
      prompt: "Complete one more lesson to enter the promotion zone.",
      reward: "+15 XP · +3 Gems",
      heartsIcon: "❤️❤️❤️❤️❤️",
      hints: 2,
      quests: [
        ["Finish one AI coaching interaction", 100],
        ["Retell the story in at least 3 sentences", 66],
        ["Keep the learning streak to Day 13", 92]
      ]
    },
    skills: [
      ["Story Understanding", 72, "#244d3d"],
      ["Oral Expression", 58, "#315f8a"],
      ["Focus Time", 64, "#9a6b18"],
      ["Reason Link", 46, "#a8484d"]
    ],
    diagnosis: [
      ["Assess", "Use a 3-minute story retell to check clarity and completeness."],
	      ["Detect", "The child may name the character and goal, but often misses the reason and sequence."],
      ["Assign", "Today's course trains one skill: adding a reason sentence."]
    ],
    steps: ["Listen to a short story", "Retell it in 3 sentences", "Answer one AI follow-up", "Receive expression feedback"],
    chat: [
	      ["ai", "Today we only have one task. Tell me in three sentences: who is the character, what does she want, and what happened at the end?"],
      ["user", "The bunny went to the forest. She wanted to send a letter to the moon."],
      ["ai", "Good. You named the character and the goal. One key part is missing: why did she want to send the letter? Add that sentence to pass."]
    ],
    archive: ["Assessment: completed one story retell", "Current gap: reason link is incomplete", "Next lesson: practice first, then, and finally"]
  },
  teen: {
    age: 18,
    name: "Alex",
    learnerLabel: "Alex",
    stage: "青年方向探索",
    goal: "判断自己适合的专业方向，并完成一个小项目验证。",
    time: "25 分钟",
    duration: "25 min",
    taskType: "职业探索",
    taskTitle: "比较游戏策划、AI 产品经理、数据分析三个方向。",
    taskBody: "AI 老师根据兴趣、能力和可训练性，要求学生用一个真实小任务验证方向，而不是只看职业介绍。",
    hero: "Alex，今天完成 1 个职业判断任务，就能保住 Diamond League 前 5。",
    challengeTitle: "今日关卡：把兴趣变成可训练能力",
    challengeCopy: "不要只说喜欢什么，今天要说清楚你愿意长期练什么。",
    teacherTitle: "老师会帮你把兴趣翻译成职业能力。",
    unlockTitle: "方向判断 Lv.2",
    unlockCopy: "把“我喜欢”升级成“我能训练”。",
    tomorrowTitle: "竞品拆解任务",
    tomorrowCopy: "用 300 字拆一款游戏为什么让玩家第二天回来。",
    score: "A-",
    progress: "能够把兴趣转成可训练能力，已经从“喜欢什么”进入“能做什么”的判断。",
    next: "明天完成一份 300 字竞品功能拆解，重点写清目标用户和留存作用。",
    percent: 74,
    ops: {
      streak: 21,
      xp: 980,
      gems: 132,
      hearts: "4/5",
      league: "Diamond League",
      rank: "第 5 名",
      prompt: "再完成 1 个项目任务，本周可晋级前 3。",
      reward: "+25 XP · +5 Gems",
      heartsIcon: "❤️❤️❤️❤️♡",
      hints: 1,
      quests: [
        ["完成一次职业方向判断", 100],
        ["提交 300 字竞品拆解", 40],
        ["邀请朋友一起完成 Quest", 20]
      ]
    },
    skills: [
      ["兴趣清晰度", 78, "#315f8a"],
      ["项目意识", 62, "#244d3d"],
      ["表达结构", 70, "#9a6b18"],
      ["现实验证", 54, "#a8484d"]
    ],
    diagnosis: [
      ["测一测", "让学生解释自己为什么喜欢某个方向。"],
      ["判一判", "区分“兴趣描述”和“可长期训练的能力”。"],
      ["排任务", "安排一个 30 分钟小项目验证职业方向。"]
    ],
    steps: ["选择 3 个职业方向", "写出喜欢原因", "补充可训练能力", "生成一周验证项目"],
    chat: [
      ["ai", "Alex，今天不聊梦想，聊训练。你说喜欢游戏策划，那你愿意长期练哪一个能力？"],
      ["user", "我愿意练玩法拆解和写方案。"],
      ["ai", "这就对了。你把兴趣说成了可训练能力。下一步：选一款游戏，拆它为什么让玩家第二天还想回来。"]
    ],
    archive: ["方向偏好：游戏策划 / AI 产品", "待验证能力：玩法拆解、方案表达", "明日任务：完成 300 字竞品拆解"]
  },
  adult: {
    age: 32,
    name: "Chen",
    learnerLabel: "Chen",
    stage: "职业能力提升",
    goal: "把 AI 用进真实工作流，提高分析、表达和决策质量。",
    time: "20 分钟",
    duration: "20 min",
    taskType: "AI 工作力",
    taskTitle: "用 AI 分析一份业务日报，并提出 3 个行动建议。",
    taskBody: "AI 老师会检查建议是否有指标依据、是否可执行、是否能被团队理解和复盘。",
    hero: "Chen，今天完成 1 条带指标的建议，就能从排行榜危险区回来。",
    challengeTitle: "今日关卡：建议必须绑定指标",
    challengeCopy: "你已经能提出动作了，今天练把动作和目标指标绑在一起。",
    teacherTitle: "老师发现你的动作感不错，但证据链还不稳。",
    unlockTitle: "指标表达 Lv.1",
    unlockCopy: "每个业务建议都必须对应一个目标指标。",
    tomorrowTitle: "五段式复盘",
    tomorrowCopy: "把建议拆成现象、原因、动作、指标、风险。",
    score: "B",
    progress: "能提出动作，但数据证据和复盘设计还不够完整。",
    next: "明天练习把一个运营建议拆成：现象、原因、动作、指标、风险。",
    percent: 61,
    ops: {
      streak: 8,
      xp: 760,
      gems: 64,
      hearts: "3/5",
      league: "Emerald League",
      rank: "第 11 名",
      prompt: "完成一次日报分析，可回到安全区。",
      reward: "+20 XP · +4 Gems",
      heartsIcon: "❤️❤️❤️♡♡",
      hints: 2,
      quests: [
        ["提交一条带指标的业务建议", 80],
        ["完成一次 AI 复盘", 60],
        ["今天 20 分钟深度训练", 25]
      ]
    },
    skills: [
      ["AI 工具使用", 66, "#244d3d"],
      ["数据归因", 52, "#a8484d"],
      ["业务表达", 70, "#315f8a"],
      ["行动设计", 58, "#9a6b18"]
    ],
    diagnosis: [
      ["测一测", "给一份业务日报，让学习者找异常并提出建议。"],
      ["判一判", "识别是否会从现象拆到原因、指标和动作。"],
      ["排任务", "先训练“一个建议必须绑定一个指标”。"]
    ],
    steps: ["读取业务日报", "找出一个异常", "提出 3 个动作", "AI 检查指标依据"],
    chat: [
      ["ai", "Chen，你的第二条建议方向对，但老板会追问：影响哪个指标？请补目标指标和预期变化。"],
      ["user", "目标是提高 D7 留存，先处理新手第 3 天任务断点。"],
      ["ai", "可以，已经更像业务建议了。再补一层：你准备用什么数据证明第 3 天任务断点是主要原因？"]
    ],
    archive: ["工作力短板：数据归因不稳定", "已完成：一次日报行动建议", "明日任务：现象、原因、动作、指标、风险五段式"]
  },
  senior: {
    age: 68,
    name: "Wang",
    learnerLabel: "Wang",
    stage: "健康认知陪伴",
    goal: "保持认知活跃、生活规律，并持续学习感兴趣的内容。",
    time: "12 分钟",
    duration: "12 min",
    taskType: "认知维护",
    taskTitle: "完成一次记忆力小游戏，并记录今天的睡眠和散步。",
    taskBody: "AI 老师用低压力方式陪伴练习，同时把健康记录整理给本人和家人查看。",
    hero: "Wang，今天 12 分钟练习后，可以打开家庭回忆宝箱。",
    challengeTitle: "今日关卡：把记忆和今天连接起来",
    challengeCopy: "不是背答案，而是用词语讲一句今天真实发生的小事。",
    teacherTitle: "老师会慢慢陪你练，不赶时间。",
    unlockTitle: "生活记忆 Lv.3",
    unlockCopy: "把词语、情绪和真实生活连接起来。",
    tomorrowTitle: "家庭照片回忆",
    tomorrowCopy: "看一张照片，说出人物、地点和一件小事。",
    score: "A",
    progress: "记忆表现稳定，能够把词语和真实生活连接起来。",
    next: "明天继续 12 分钟练习，并加入一次家庭照片回忆任务。",
    percent: 82,
    ops: {
      streak: 34,
      xp: 560,
      gems: 118,
      hearts: "5/5",
      league: "Ruby League",
      rank: "第 3 名",
      prompt: "今天保持 12 分钟练习，可打开家庭回忆宝箱。",
      reward: "+12 XP · +6 Gems",
      heartsIcon: "❤️❤️❤️❤️❤️",
      hints: 3,
      quests: [
        ["完成 5 词记忆练习", 100],
        ["记录一次散步或睡眠", 80],
        ["和家人分享成长摘要", 30]
      ]
    },
    skills: [
      ["记忆唤起", 82, "#244d3d"],
      ["生活规律", 76, "#315f8a"],
      ["情绪表达", 70, "#9a6b18"],
      ["家庭连接", 88, "#a8484d"]
    ],
    diagnosis: [
      ["测一测", "用低压力词语回忆和生活记录观察认知状态。"],
      ["判一判", "判断记忆、表达、情绪和生活规律是否稳定。"],
      ["排任务", "安排短时认知练习和家庭回忆任务。"]
    ],
    steps: ["记住 5 个词", "讲一句今天的小事", "记录睡眠和散步", "生成家人可见摘要"],
    chat: [
      ["ai", "Wang，今天很稳。你记住了 5 个词中的 4 个，我们用其中两个词讲一句今天发生的小事。"],
      ["user", "我今天散步时看见了花，也想起孙女上周送我的书。"],
      ["ai", "很好，这不是死记硬背，你把词语和真实生活连接起来了。明天我们用一张家庭照片继续。"]
    ],
    archive: ["认知状态：稳定", "生活记录：已记录散步和睡眠", "明日任务：家庭照片回忆"]
  }
};

let currentPersona = "child";
let activeLessonTaskIndex = 0;
const trialState = {
  completed: false,
  firstSubmitted: false,
  firstAnswer: "",
  firstFeedback: "",
  improvedAnswer: "",
  answer: "",
  feedback: "",
  passed: false,
  taskKey: ""
};

const pageNodes = document.querySelectorAll("[data-page]");
const routeLinks = document.querySelectorAll("[data-route]");
const stageRail = document.getElementById("stageRail");
const ageRange = document.getElementById("ageRange");
const ageOutput = document.getElementById("ageOutput");
const personaButtons = document.querySelectorAll(".persona-card");

const fields = {
  personaName: document.getElementById("personaName"),
  personaStage: document.getElementById("personaStage"),
  goalText: document.getElementById("goalText"),
  timeText: document.getElementById("timeText"),
  skillList: document.getElementById("skillList"),
  diagnosisFlow: document.getElementById("diagnosisFlow"),
  lessonDuration: document.getElementById("lessonDuration"),
  taskType: document.getElementById("taskType"),
  taskTitle: document.getElementById("taskTitle"),
	  taskBody: document.getElementById("taskBody"),
	  practiceStory: document.getElementById("practiceStory"),
	  practiceMethod: document.getElementById("practiceMethod"),
	  practiceExample: document.getElementById("practiceExample"),
	  sceneQuestion: document.getElementById("sceneQuestion"),
	  dubbingLine: document.getElementById("dubbingLine"),
	  firstAttemptText: document.getElementById("firstAttemptText"),
	  improvedAttemptText: document.getElementById("improvedAttemptText"),
	  rubricList: document.getElementById("rubricList"),
	  trialPrompt: document.getElementById("trialPrompt"),
	  interactionOptions: document.getElementById("interactionOptions"),
	  lessonSteps: document.getElementById("lessonSteps"),
  chatLog: document.getElementById("chatLog"),
  answerInput: document.getElementById("answerInput"),
  answerSubmit: document.getElementById("answerSubmit"),
  answerForm: document.getElementById("answerForm"),
  coachMode: document.getElementById("coachMode"),
	  scoreText: document.getElementById("scoreText"),
	  reportStatus: document.getElementById("reportStatus"),
	  reportQuizSignal: document.getElementById("reportQuizSignal"),
	  reportEvidence: document.getElementById("reportEvidence"),
	  progressText: document.getElementById("progressText"),
	  trialEvidenceCards: document.getElementById("trialEvidenceCards"),
  nextText: document.getElementById("nextText"),
  ringValue: document.getElementById("ringValue"),
  ringPercent: document.getElementById("ringPercent"),
  archiveList: document.getElementById("archiveList"),
  homeHeroTitle: document.getElementById("homeHeroTitle"),
  challengeBadge: document.getElementById("challengeBadge"),
  challengeTitle: document.getElementById("challengeTitle"),
  challengeCopy: document.getElementById("challengeCopy"),
  challengeReward: document.getElementById("challengeReward"),
  teacherTitle: document.getElementById("teacherTitle"),
  profileIntro: document.getElementById("profileIntro"),
  lessonHeroTitle: document.getElementById("lessonHeroTitle"),
  lessonIntro: document.getElementById("lessonIntro"),
  heartStatus: document.getElementById("heartStatus"),
  hintStatus: document.getElementById("hintStatus"),
  unlockTitle: document.getElementById("unlockTitle"),
  unlockCopy: document.getElementById("unlockCopy"),
  passLabel: document.getElementById("passLabel"),
  reportHeroTitle: document.getElementById("reportHeroTitle"),
  reportIntro: document.getElementById("reportIntro"),
  reportUnlock: document.getElementById("reportUnlock"),
  reportUnlockCopy: document.getElementById("reportUnlockCopy"),
	  tomorrowTitle: document.getElementById("tomorrowTitle"),
	  tomorrowCopy: document.getElementById("tomorrowCopy"),
	  reportCta: document.getElementById("reportCta"),
	  finishLesson: document.getElementById("finishLesson")
		};

const opsFields = {
  mobileStage: document.getElementById("mobileStage"),
  mobileStreak: document.getElementById("mobileStreak"),
  mobileXp: document.getElementById("mobileXp"),
  homeStreak: document.getElementById("homeStreak"),
  homeXp: document.getElementById("homeXp"),
  homeGems: document.getElementById("homeGems"),
  lessonReward: document.getElementById("lessonReward"),
  opsStreak: document.getElementById("opsStreak"),
  opsXp: document.getElementById("opsXp"),
  opsGems: document.getElementById("opsGems"),
  opsHearts: document.getElementById("opsHearts"),
  opsLeague: document.getElementById("opsLeague"),
  opsRank: document.getElementById("opsRank"),
  opsPrompt: document.getElementById("opsPrompt"),
  questList: document.getElementById("questList")
};

const quizNodes = {
  back: document.getElementById("quizBack"),
  stepText: document.getElementById("quizStepText"),
  progress: document.getElementById("quizProgress"),
  category: document.getElementById("quizCategory"),
  question: document.getElementById("quizQuestion"),
  hint: document.getElementById("quizHint"),
  options: document.getElementById("quizOptions"),
  continue: document.getElementById("quizContinue"),
  footerText: document.getElementById("quizFooterText")
};

const quizSteps = [
  {
    type: "question",
    category: "Profile",
    question: "How old is your child?",
    hint: "The course changes by age because expression skills develop in stages.",
    options: [
      ["6-7", "Early reader"],
      ["8-10", "Growing speaker"],
      ["11-12", "Pre-teen"],
      ["13+", "Teen"]
    ]
  },
  {
    type: "question",
    category: "Profile",
    question: "What does your child need most right now?",
    hint: "This helps us create a focused 7-day course, not a generic lesson list.",
    options: [
      ["💬", "Speak with more confidence"],
      ["📚", "Retell stories clearly"],
      ["🧠", "Organize ideas before speaking"],
      ["🤝", "Handle small social conflicts"]
    ]
  },
  {
    type: "question",
    category: "Challenge",
    question: "Does speaking in front of a group make your child nervous?",
    hint: "This tells us how much confidence support to include.",
    options: [
      ["😬", "Yes, all the time"],
      ["🙂", "Yes, sometimes"],
      ["😌", "Never"]
    ]
  },
  {
    type: "scale",
    category: "Current Level",
    question: "My child often knows what they want to say, but it comes out differently.",
    hint: "Do you agree with this statement?",
    options: [
      ["❌", "Strongly disagree"],
      ["👎", "Somewhat disagree"],
      ["➖", "Neutral"],
      ["👍", "Somewhat agree"],
      ["✅", "Strongly agree"]
    ]
  },
  {
    type: "question",
    category: "Story Skills",
    question: "When your child retells a story, what is usually missing?",
    hint: "The first lesson will target the weakest story component.",
    options: [
      ["👤", "Who the story is about"],
      ["🎯", "What the character wants"],
      ["🔗", "Why it happened"],
      ["➡️", "What happened first, next, and last"]
    ]
  },
  {
    type: "insight",
    category: "Insight",
    question: "The problem is not your child's ideas. It is untrained expression.",
    hint: "Children often understand more than they can explain. Short daily practice closes that gap.",
    options: []
  },
  {
    type: "question",
    category: "Reading",
    question: "After reading, how often can your child explain the story clearly?",
    hint: "This helps us decide whether to start with comprehension or expression.",
    options: [
      ["✅", "Almost always"],
      ["🙂", "Sometimes"],
      ["😕", "Rarely"],
      ["❓", "I am not sure"]
    ]
  },
  {
    type: "question",
    category: "Classroom",
    question: "What usually happens when a teacher asks a question?",
    hint: "The course can train classroom speaking moments if needed.",
    options: [
      ["🙋", "Raises hand and answers"],
      ["🤔", "Knows it but stays quiet"],
      ["😳", "Gets nervous and forgets"],
      ["🗣", "Answers but too briefly"]
    ]
  },
  {
    type: "question",
    category: "Practice Style",
    question: "What kind of speaker do you want your child to become?",
    hint: "This gives the course a clear end state.",
    options: [
      ["🌟", "Confident storyteller"],
      ["🙋", "Brave classroom speaker"],
      ["🤝", "Warm social communicator"],
      ["🧠", "Clear logical thinker"]
    ]
  },
  {
    type: "question",
    category: "Goals",
    question: "What stands in the way of consistent progress?",
    hint: "This helps us tune the course rhythm.",
    options: [
      ["😵", "Overthinking"],
      ["🧭", "Not knowing where to start"],
      ["😳", "Fear of judgment"],
      ["📅", "Busy schedule"],
      ["🔁", "Hard to commit"]
    ]
  },
  {
    type: "question",
    category: "Parent Role",
    question: "How do you want to support the course at home?",
    hint: "Parents can be hands-off or receive daily prompts.",
    options: [
      ["📩", "Just send me the report"],
      ["🧩", "Give me one parent prompt per day"],
      ["👪", "Let us do a short task together"],
      ["📊", "Show me progress only"]
    ]
  },
  {
    type: "question",
    category: "Time",
    question: "How much time can your child practice each day?",
    hint: "Short daily practice usually works better than long lessons.",
    options: [
      ["⏱", "5 minutes"],
      ["✅", "10 minutes"],
      ["💪", "15 minutes"],
      ["🔥", "20+ minutes"]
    ]
  },
  {
    type: "insight",
    category: "Trial Ready",
    question: "Your child's first expression trial is ready.",
    hint: "The next screen is not a course list. It is one short coached lesson that tests whether your child can improve one real answer.",
    options: []
  }
];

let quizIndex = 0;
const quizAnswers = new Array(quizSteps.length).fill(null);

const courseTemplates = {
  join: {
    taskType: "Join the Game",
    taskTitle: "Ask to join a game without sounding awkward.",
    taskBody: "A real school social scenario: the child wants to join classmates who are already playing. The lesson trains a request that is polite, specific, and easy to accept.",
    unlockTitle: "Join In Lv.1",
    unlockCopy: "Ask to join with a polite request and one helpful role.",
    passLabel: "Use request + role + friendly tone to pass",
    aiPrompt: "Two classmates are already playing a playground game. You want to join, but you do not want to interrupt awkwardly. Say one sentence that asks to join and offers a helpful role.",
    trialPrompt: "Write what you would say to join the game.",
    sceneQuestion: "What should Kai say if he wants to join the game?",
    dubbingLine: "Can I join? I can...",
    checkFocus: "joining a group without sounding awkward",
    material: "Kai sees two classmates playing a score game during recess. He wants to join, but they already started. If he only stands nearby, nobody notices. If he only says 'Can I play?', they may not know how to include him.",
    method: "Can I join? + I can help by... + Friendly close",
    example: "Can I join the next round? I can help keep score, and I will follow the rules.",
    choices: [
      ["Too vague", "Can I play?"],
      ["Better", "Can I join the next round? I can "],
      ["Strong", "Can I join the next round? I can help keep score, and "]
    ],
    rubric: ["Asks to join politely.", "Offers one clear role or contribution.", "Sounds friendly instead of demanding."]
  },
  character: {
    taskType: "Character Clarity",
    taskTitle: "Name who the story is about before adding details.",
    taskBody: "The AI asks the child to identify the main character, then checks whether every sentence still connects to that character.",
    unlockTitle: "Character Clarity Lv.1",
    unlockCopy: "Start every retell with a clear who.",
    passLabel: "Name the character and keep the answer on topic",
    aiPrompt: "Today's task is simple: tell me who the story is about, what that character wants, and one thing they did.",
    trialPrompt: "Write one answer that names Mia and says what she did.",
    sceneQuestion: "Who is the main character in this scene?",
    dubbingLine: "I am Mia. I found the map, and I...",
    checkFocus: "who the story is about",
    material: "Mia found a tiny map under her desk. She followed it to the school garden and discovered a lost class photo.",
    method: "Who + Want + Did",
    example: "Mia is the main character. She wanted to solve the map mystery, so she followed it to the garden.",
    choices: [
      ["Mia wanted to ", "Mia wanted to "],
      ["The main character is ", "The main character is Mia. She "],
      ["Mia did this: ", "Mia did this: "]
    ],
    rubric: ["Names the main character first.", "Keeps every sentence connected to that character.", "Does not jump into random details."]
  },
  goal: {
    taskType: "Goal Clarity",
    taskTitle: "Explain what the character wants in one clear sentence.",
    taskBody: "The AI checks whether the child can move from naming events to explaining the character's goal.",
    unlockTitle: "Goal Clarity Lv.1",
    unlockCopy: "Make the character's goal clear before retelling the plot.",
    passLabel: "Add what the character wants to pass",
    aiPrompt: "Tell me the character's goal in one sentence. What did the character want, and what did they try to do?",
    trialPrompt: "Write one sentence that explains what Noah wanted and what he did.",
    sceneQuestion: "What did Noah want to do when he saw the smoke?",
    dubbingLine: "I saw smoke near the playground, so I...",
    checkFocus: "what the character wants",
    material: "Noah saw smoke near the playground. He ran to tell the teacher before the younger kids arrived.",
    method: "Character + Wanted to + Action",
    example: "Noah wanted to keep the younger kids safe, so he ran to tell the teacher about the smoke.",
    choices: [
      ["Noah wanted to ", "Noah wanted to "],
      ["So he ", "Noah wanted to keep them safe, so he "],
      ["Goal + action", "Noah wanted to keep the younger kids safe, so he ran to "]
    ],
    rubric: ["Says what the character wanted.", "Connects the goal to the action.", "Uses one complete sentence."]
  },
  reason: {
    taskType: "Reason Builder",
    taskTitle: "Turn a short answer into a clear opinion with evidence.",
    taskBody: "The AI captures the child's natural answer first, then teaches one reusable frame: choice, because, example.",
    unlockTitle: "Reason Builder Lv.1",
    unlockCopy: "Give a clear choice, one reason, and one concrete example.",
    passLabel: "Use choice, because, and one example to pass",
    aiPrompt: "A teacher asks the class to choose tomorrow's activity. Give a full answer with your choice, your reason, and one example.",
    trialPrompt: "Answer the teacher: should the class choose a reading corner or a game day? Explain your choice.",
    sceneQuestion: "Which activity should the class choose, and why?",
    dubbingLine: "I choose the reading corner because...",
    checkFocus: "giving a reason with evidence",
    material: "The class earned 30 minutes of free activity. Some students want a cozy reading corner. Others want a game day. The teacher asks each student to explain one choice.",
    method: "Choice + Because + Example",
    example: "I choose the reading corner because it helps everyone calm down after lunch. For example, students can read quietly, share favorite books, and come back ready to learn.",
    choices: [
      ["I choose", "I choose the reading corner because "],
      ["Because", "I choose game day because "],
      ["For example", "I choose the reading corner because it helps the class focus. For example, "]
    ],
    rubric: ["Makes one clear choice.", "Uses because to explain the reason.", "Adds one concrete example, not only a feeling."]
  },
  sequence: {
    taskType: "Story Sequence",
    taskTitle: "Retell the story with first, then, and finally.",
    taskBody: "The AI helps the child put story events into a clear order instead of listing random details.",
    unlockTitle: "Story Sequence Lv.1",
    unlockCopy: "Use first, then, and finally to make the story easy to follow.",
    passLabel: "Use first, then, and finally to pass",
    aiPrompt: "Retell the story using three words: first, then, and finally. Keep each part short.",
    trialPrompt: "Retell the paper boat story using first, then, and finally.",
    sceneQuestion: "What happened first, then, and finally?",
    dubbingLine: "First I found the boat. Then...",
    checkFocus: "what happened first, next, and last",
    material: "A paper boat floated into Leo's yard. He opened it, read a message, and returned it to the child next door.",
    method: "First + Then + Finally",
    example: "First, Leo found a paper boat. Then, he read the message inside. Finally, he returned it to the child next door.",
    choices: [
      ["First", "First, Leo "],
      ["Then", "First, Leo found a paper boat. Then, he "],
      ["Finally", "First, Leo found a paper boat. Then, he read the message. Finally, he "]
    ],
    rubric: ["Uses first, then, and finally.", "Puts events in the correct order.", "Keeps the retell under four sentences."]
  },
  confidence: {
    taskType: "Classroom Answer",
    taskTitle: "Turn a quiet moment into one safe, complete answer.",
    taskBody: "The AI trains a low-pressure classroom response: start with I think, add because, then point to one clue.",
    unlockTitle: "Safe Answer Lv.1",
    unlockCopy: "Give one classroom answer without freezing or stopping at one word.",
    passLabel: "Use I think, because, and one clue to pass",
    aiPrompt: "Imagine the teacher asks a question and you are not fully sure. Give a safe answer with: I think..., because..., one clue is...",
    trialPrompt: "Answer the teacher: why did the character ask a friend for help?",
    sceneQuestion: "How can you answer even if you are not 100% sure?",
    dubbingLine: "I think she asked for help because...",
    checkFocus: "opening with a safe complete answer",
    material: "In the story, Ava could not finish the science poster alone. She asked Sam for help, and they finished it before the bell. The teacher asks: why did Ava ask for help?",
    method: "I think + Because + One clue",
    example: "I think Ava asked for help because the poster was too hard to finish alone. One clue is that she finished faster after Sam joined her.",
    choices: [
      ["I think", "I think Ava asked for help because "],
      ["Because", "Ava asked for help because "],
      ["One clue", "I think Ava asked for help because the poster was hard. One clue is "]
    ],
    rubric: ["Starts with a safe phrase like I think.", "Uses because to give a reason.", "Points to one clue from the story."]
  },
  organize: {
    taskType: "Idea Structure",
    taskTitle: "Organize one answer before speaking.",
    taskBody: "The AI gives the child a tiny structure: point, reason, example.",
    unlockTitle: "Idea Structure Lv.1",
    unlockCopy: "Use point, reason, example to make an answer easier to understand.",
    passLabel: "Use point, reason, and example to pass",
    aiPrompt: "Answer with this structure: my point is..., my reason is..., for example...",
    trialPrompt: "Choose garden or reading project, then answer with point, reason, and example.",
    sceneQuestion: "Which project should the class choose?",
    dubbingLine: "My point is that we should choose...",
    checkFocus: "organizing ideas before speaking",
    material: "Question: Should the class choose a garden project or a reading project this month?",
    method: "Point + Reason + Example",
    example: "My point is that we should choose the garden project. My reason is that everyone can help. For example, some students can water plants and others can make labels.",
    choices: [
      ["My point", "My point is "],
      ["My reason", "My point is that we should choose the garden project. My reason is "],
      ["For example", "My point is that we should choose the garden project. My reason is everyone can help. For example, "]
    ],
    rubric: ["States one clear point.", "Gives one reason.", "Adds one concrete example."]
  },
  social: {
    taskType: "Social Expression",
    taskTitle: "Practice one warm conflict sentence.",
    taskBody: "The AI trains the child to say what they feel and what they need without blaming.",
    unlockTitle: "Warm Words Lv.1",
    unlockCopy: "Use I feel and I need to handle a small social conflict.",
    passLabel: "Use I feel and I need to pass",
    aiPrompt: "A friend takes your turn in a game. Say one calm sentence using: I feel... and I need...",
    trialPrompt: "Write one calm sentence using I feel and I need.",
    sceneQuestion: "What can you say when a friend interrupts you?",
    dubbingLine: "I feel interrupted when...",
    checkFocus: "handling small social conflicts",
    material: "A friend starts speaking while you are explaining your idea to the group.",
    method: "I feel + When + I need",
    example: "I feel interrupted when I am still explaining, and I need one minute to finish my idea.",
    choices: [
      ["I feel", "I feel "],
      ["When", "I feel interrupted when "],
      ["I need", "I feel interrupted when I am explaining, and I need "]
    ],
    rubric: ["Uses I feel instead of blame.", "Names the situation clearly.", "Asks for one specific next action."]
  }
};

const answerSignals = {
  join: ["join", "next round", "can i", "help", "score", "rules", "play", "friendly"],
  character: ["who", "character", "girl", "boy", "bunny", "rabbit", "child", "she", "he"],
  goal: ["want", "wanted", "goal", "try", "tried", "hope", "needed"],
  reason: ["because", "choose", "choice", "example", "reading", "game", "focus", "reason"],
  sequence: ["first", "then", "finally", "next", "last", "after"],
  confidence: ["i think", "because", "clue", "help", "ava", "friend", "poster"],
  organize: ["point", "reason", "example", "because", "for example"],
  social: ["i feel", "i need", "please", "when you"]
};

function createTask(key) {
  return { key, ...courseTemplates[key] };
}

function resetTrialState() {
  trialState.completed = false;
  trialState.firstSubmitted = false;
  trialState.firstAnswer = "";
  trialState.firstFeedback = "";
  trialState.improvedAnswer = "";
  trialState.answer = "";
  trialState.feedback = "";
  trialState.passed = false;
  trialState.taskKey = "";
}

function evaluateTrialAnswer(text, task) {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const signals = answerSignals[task.key] || [];
  const matchedSignals = signals.filter((signal) => lower.includes(signal));
  const hasEnoughLength = trimmed.length >= 18;
  const passed = hasEnoughLength && (matchedSignals.length >= 2 || task.key === "confidence");
  const missing = [];
  if (!hasEnoughLength) missing.push("answer is too short");
  if (matchedSignals.length === 0) missing.push(`does not show ${task.checkFocus}`);
  if (matchedSignals.length === 1 && task.key !== "confidence") missing.push("needs one more specific detail");

  return {
    passed,
    matchedSignals,
    feedback: passed
      ? `Trial feedback: this answer uses ${task.method}. It is enough for a first trial lesson.`
      : `Trial feedback: not enough to mark this skill as complete yet. Missing: ${missing.join(", ")}.`
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCoachingHint(task, result) {
  if (!task) return "Try again with one complete sentence.";
  if (task.key === "join") {
    return "Good first try. Now make it easier for the other kids to say yes: ask for the next round, offer one helpful role, and sound friendly. Try: Can I join the next round? I can ___, and I will ___.";
  }
  if (task.key === "reason") {
    return "Good first try. Now upgrade it into a complete answer: I choose ___ because ___. For example, ___. A strong answer does not just say what you like. It gives another person a reason to agree.";
  }
  if (task.key === "organize") {
    return "Good first try. Now make it easier to follow: My point is ___. My reason is ___. For example, ___.";
  }
  if (task.key === "confidence") {
    return "Good first try. Now make it safer and clearer: I think ___ because ___. One clue is ___. This helps a child speak even when they are not 100% sure.";
  }
  const missingText = result.matchedSignals.length
    ? "Good start. Now make the answer easier for another person to follow."
    : `Start by showing ${task.checkFocus}.`;
  return `${missingText} Use this frame: ${task.method}. Keep it short, but include one specific detail from the scene.`;
}

function describeAnswerGrowth(task) {
  if (!trialState.firstAnswer || !trialState.improvedAnswer) {
    return "No before/after evidence yet.";
  }
  if (trialState.passed) {
    if (task.key === "join") {
      return "The second answer changed from a vague request into a usable school sentence: it asks for a specific moment, offers a role, and lowers the social friction for the other kids.";
    }
    if (task.key === "reason") {
      return "The second answer moved from a short preference to a complete opinion: choice, reason, and example. That is the first skill behind confident classroom speaking.";
    }
    if (task.key === "confidence") {
      return "The second answer moved from a nervous short response to a safe classroom answer: I think, because, and one clue. This is useful because it gives the child a way to start speaking before they feel perfect.";
    }
    return `The second answer is usable because it follows ${task.method} and gives the teacher something specific to respond to.`;
  }
  return `The second answer is longer, but it still needs a clearer ${task.checkFocus}. This should be practiced before moving ahead.`;
}

function renderTrialEvidenceCards(task) {
  if (!fields.trialEvidenceCards) return;
  if (!trialState.completed) {
    const baseline = trialState.firstAnswer
      ? `<article><span>First try saved</span><p>${escapeHtml(trialState.firstAnswer)}</p></article>`
      : `<article><span>No trial answer</span><p>The report will show evidence after the child completes one coached retry.</p></article>`;
    fields.trialEvidenceCards.innerHTML = baseline;
    return;
  }
  fields.trialEvidenceCards.innerHTML = `
    <article>
      <span>Before coaching</span>
      <p>${escapeHtml(trialState.firstAnswer)}</p>
    </article>
    <article>
      <span>After one hint</span>
      <p>${escapeHtml(trialState.improvedAnswer)}</p>
    </article>
    <article class="evidence-result">
      <span>What changed</span>
      <p>${escapeHtml(describeAnswerGrowth(task))}</p>
    </article>
  `;
}

function updateTrialDisplay() {
  if (fields.firstAttemptText) {
    fields.firstAttemptText.textContent = trialState.firstAnswer || "Submit the first answer to capture the baseline.";
  }
  if (fields.improvedAttemptText) {
    fields.improvedAttemptText.textContent = trialState.improvedAnswer || "Try again after the AI gives a hint.";
  }
  if (fields.finishLesson) {
    fields.finishLesson.textContent = trialState.completed ? "View Trial Report" : "Finish Trial First";
    fields.finishLesson.disabled = !trialState.completed;
  }
  if (fields.answerSubmit) {
    fields.answerSubmit.textContent = trialState.firstSubmitted ? "Submit Improved Answer" : "Submit First Try";
  }
  if (fields.answerInput) {
    fields.answerInput.placeholder = trialState.firstSubmitted
      ? "Second try: use the AI hint and make the answer clearer."
      : "First try: type what the child would naturally say.";
  }
}

function getStageSummary() {
  const need = quizAnswers[1];
  const nervous = quizAnswers[2];
  const expressionStuck = quizAnswers[3];
  const storyGap = quizAnswers[4];
  const readingClarity = quizAnswers[6];
  let risk = 1;
  if (nervous === 0) risk += 1;
  if (expressionStuck >= 3) risk += 1;
  if (readingClarity >= 2) risk += 1;
  if (storyGap >= 2) risk += 1;
  const level = risk >= 4 ? "Stage 2" : risk >= 3 ? "Stage 1+" : "Stage 1";
  const label = risk >= 4 ? "Needs structure" : risk >= 3 ? "Emerging expression" : "Ready for trial";
  const comments = {
    0: "Confidence appears to be the first training target.",
    1: "Story retell is the best first trial because it is easy to observe.",
    2: "The first gap appears to be organizing ideas before speaking.",
    3: "Social communication may be worth testing with a simple scenario."
  };
  return {
    score: `${level}: ${label}`,
    comment: comments[need] || "Story retell is the best first trial because it is easy to observe."
  };
}

function uniqueTasks(keys) {
  return keys.filter((key, index) => keys.indexOf(key) === index).map(createTask);
}

function buildCourseFromQuizAnswers() {
  const need = quizAnswers[1];
  const nervous = quizAnswers[2];
  const expressionStuck = quizAnswers[3];
  const storyGap = quizAnswers[4];
  const readingClarity = quizAnswers[6];
  const classroom = quizAnswers[7];
  const speakerGoal = quizAnswers[8];
  const blocker = quizAnswers[9];
  const parentRole = quizAnswers[10];
  const dailyTime = quizAnswers[11];

  const storyGapKeys = ["character", "goal", "reason", "sequence"];
  const primary = "join";

  const support = [];
  support.push(
    need === 0 ? "confidence" :
    need === 2 ? "organize" :
    need === 3 ? "social" :
    storyGapKeys[storyGap] || "reason"
  );
  if (readingClarity >= 2) support.push("character");
  if (classroom === 1 || classroom === 2 || nervous === 0) support.push("confidence");
  if (speakerGoal === 3 || expressionStuck >= 3) support.push("organize");
  if (speakerGoal === 2) support.push("social");
  if (blocker === 1) support.push("sequence");

  const tasks = uniqueTasks([primary, ...support, "social", "confidence", "organize"]).slice(0, 5);
  const firstTask = tasks[0];
  const timeLabels = ["5 min", "10 min", "15 min", "20 min"];
  const parentModes = ["Daily report only", "One parent prompt per day", "Parent-child mini task", "Progress dashboard"];
  const time = timeLabels[dailyTime] || "10 min";
  const parentMode = parentModes[parentRole] || "Daily report only";
  const storySignal = quizSteps[4].options[storyGap]?.[1] || "Why it happened";
  const needSignal = quizSteps[1].options[need]?.[1] || "Retell stories clearly";
  const classroomSignal = quizSteps[7].options[classroom]?.[1] || "Answers but too briefly";

  personas.child = {
    ...personas.child,
    duration: time,
    time,
    stage: `Personal ${firstTask.taskType} Course`,
    goal: `Start with ${firstTask.checkFocus}, then unlock the next expression skill.`,
    taskType: firstTask.taskType,
    taskTitle: firstTask.taskTitle,
    taskBody: firstTask.taskBody,
    teacherTitle: `The quiz found the smallest gap: ${firstTask.checkFocus}.`,
    unlockTitle: firstTask.unlockTitle,
    unlockCopy: firstTask.unlockCopy,
	    tomorrowTitle: tasks[1]?.taskType || "Story Sequence",
	    tomorrowCopy: tasks[1]?.taskTitle || "Use first, then, and finally to retell the story clearly.",
	    progress: `The questionnaire suggests the first trial should test ${firstTask.checkFocus}. This is not a learning result yet.`,
    next: `Tomorrow's lesson will train ${tasks[1]?.checkFocus || "story sequence"}.`,
    reportQuizSignal: `Quiz signal: parent selected "${needSignal}" and the story retell gap was "${storySignal}". Classroom signal: "${classroomSignal}".`,
    reportEvidence: `Today's AI check used "${firstTask.method}". Pass standard: ${firstTask.rubric.join(" / ")}.`,
    passLabel: firstTask.passLabel,
    skills: [
      ["Story Understanding", firstTask.key === "character" ? 54 : 70, "#244d3d"],
      ["Oral Expression", firstTask.key === "confidence" ? 46 : 58, "#315f8a"],
      ["Idea Structure", firstTask.key === "organize" ? 44 : 62, "#9a6b18"],
      [firstTask.unlockTitle.replace(" Lv.1", ""), 42, "#a8484d"]
    ],
    diagnosis: [
      ["Quiz Signal", `Parent selected: ${storySignal}.`],
      ["Current Gap", `The first course should train ${firstTask.checkFocus}, not a generic speaking lesson.`],
      ["Assigned Plan", `${tasks.length} micro-tasks, ${time} per day, ${parentMode.toLowerCase()}.`]
    ],
    courseTasks: tasks,
    steps: tasks.map((task) => task.taskTitle),
	    chat: [
	      ["ai", `Your questionnaire suggests we should test ${firstTask.checkFocus} first.`],
	      ["ai", firstTask.aiPrompt]
    ],
    archive: [
      `Quiz result: ${firstTask.taskType}`,
      `Current gap: ${firstTask.checkFocus}`,
      `Home support: ${parentMode}`
    ]
	  };
	  activeLessonTaskIndex = 0;
	  resetTrialState();
	}

function getStageIndex(age) {
  return stages.findIndex((stage) => age <= stage.max);
}

function renderStages(age) {
  const activeIndex = getStageIndex(age);
  stageRail.innerHTML = stages
    .map(
      (stage, index) => `
        <article class="stage-card ${index === activeIndex ? "active" : ""}">
          <span>${stage.range}</span>
          <strong>${stage.title}</strong>
          <p>${stage.copy}</p>
        </article>
      `
    )
    .join("");
}

function renderSkills(skills) {
  fields.skillList.innerHTML = skills
    .map(
      ([name, level, color]) => `
        <div class="skill-row">
          <header>
            <span>${name}</span>
            <span>${level}%</span>
          </header>
          <div class="bar" style="--skill-color: ${color}">
            <span style="--level: ${level}%"></span>
          </div>
        </div>
      `
    )
    .join("");
}

function setRing(percent) {
  if (!fields.ringValue || !fields.ringPercent) return;
  const circumference = 301.6;
  const offset = circumference - (percent / 100) * circumference;
  fields.ringValue.style.setProperty("--offset", offset);
  fields.ringPercent.textContent = `${percent}%`;
}

function renderDiagnosis(persona) {
  fields.diagnosisFlow.innerHTML = persona.diagnosis
    .map(
      ([title, copy], index) => `
        <div class="flow-step">
          <span>${index + 1}</span>
          <div>
            <strong>${title}</strong>
            <p>${copy}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function renderLessonSteps(persona) {
  const steps = persona.courseTasks || persona.steps.map((step, index) => ({
    key: `step-${index}`,
    taskTitle: step
  }));
  fields.lessonSteps.innerHTML = steps
    .map(
      (step, index) => `
        <button class="lesson-step ${index === activeLessonTaskIndex ? "active" : ""} ${index < activeLessonTaskIndex ? "done" : ""}" type="button" data-lesson-task="${index}">
          <span>${index + 1}</span>
          <p><strong>${step.taskType || `Task ${index + 1}`}</strong>${step.taskTitle}</p>
        </button>
      `
    )
    .join("");
}

function renderChat(persona) {
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  const chat = task
    ? [
        ["ai", `This task came from the quiz answer about ${task.checkFocus}.`],
        ["ai", task.aiPrompt]
      ]
    : persona.chat;
  fields.chatLog.innerHTML = chat
    .map(([role, text]) => messageTemplate(role, role === "ai" ? "89 Teacher" : persona.learnerLabel, text))
    .join("");
}

function applyLessonTask(persona) {
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  if (!task) return;
  fields.taskType.textContent = task.taskType;
  fields.taskTitle.textContent = task.taskTitle;
  fields.taskBody.textContent = task.taskBody;
  fields.practiceStory.textContent = task.material;
  fields.practiceMethod.textContent = task.method;
  fields.practiceExample.textContent = task.example;
  fields.sceneQuestion.textContent = task.sceneQuestion;
  fields.dubbingLine.textContent = task.dubbingLine;
  fields.trialPrompt.textContent = task.trialPrompt;
  fields.interactionOptions.innerHTML = (task.choices || [])
    .map(
      ([label, value]) => `
        <button type="button" data-choice-starter="${value}">
          <span>${label}</span>
        </button>
      `
    )
    .join("");
  fields.rubricList.innerHTML = task.rubric.map((item) => `<li>${item}</li>`).join("");
  fields.unlockTitle.textContent = task.unlockTitle;
  fields.unlockCopy.textContent = task.unlockCopy;
  fields.passLabel.textContent = task.passLabel;
  fields.lessonHeroTitle.textContent = `Day 1 Course: ${task.taskType}`;
  fields.lessonIntro.textContent = `This trial tests one observable skill: ${task.checkFocus}. The child answers once, gets one coaching hint, then retries.`;
  updateTrialDisplay();
  updateReportForTask(persona, task);
}

function updateReportForTask(persona, task = persona.courseTasks?.[activeLessonTaskIndex]) {
  if (!task) return;
  const nextTask = persona.courseTasks?.[activeLessonTaskIndex + 1] || persona.courseTasks?.[0];
  const summary = getStageSummary();
  renderTrialEvidenceCards(task);
  if (!trialState.completed) {
    fields.reportHeroTitle.textContent = "Initial questionnaire summary";
    fields.reportStatus.textContent = trialState.firstSubmitted
      ? `${summary.score}. First try saved, coached retry not completed.`
      : `${summary.score}. No trial lesson completed yet.`;
    fields.scoreText.textContent = "B-";
    fields.progressText.textContent = trialState.firstSubmitted
      ? "One baseline answer is saved. The child still needs one coached retry before this becomes a trial report."
      : `First trial to complete: "${task.taskTitle}"`;
    fields.reportEvidence.textContent = trialState.firstSubmitted
      ? `Teacher note: the first answer gives us a baseline. Ask the child to retry with ${task.method}, then we can judge the actual change.`
      : `Preliminary comment: ${summary.comment}`;
    fields.nextText.textContent = trialState.firstSubmitted
      ? "Return to the trial lesson and submit the improved answer."
      : "Complete the first trial lesson to generate a real course report.";
    fields.reportIntro.textContent = "This is a preliminary parent summary. It becomes a course report only after one real coached retry.";
    fields.reportUnlock.textContent = "No course report yet";
    fields.reportUnlockCopy.textContent = "A report appears after the child submits a first try and one improved answer.";
    fields.tomorrowTitle.textContent = "First trial lesson";
    fields.tomorrowCopy.textContent = task.taskTitle;
    fields.reportCta.textContent = trialState.firstSubmitted ? "Finish First Trial" : "Start First Trial";
    fields.reportCta.dataset.go = "lesson";
    return;
  }
  fields.reportHeroTitle.textContent = "Trial lesson report";
  fields.reportStatus.textContent = `${summary.score}. First trial completed.`;
  fields.scoreText.textContent = trialState.passed ? "B" : "C+";
  fields.progressText.textContent = "The report below is based only on the two answers submitted in this trial.";
  fields.reportEvidence.textContent = task.key === "join"
    ? `Coach note: ${describeAnswerGrowth(task)} This is useful because joining a game is not only about confidence. It is about giving other children an easy way to include you.`
    : `Teacher note: ${describeAnswerGrowth(task)}`;
  fields.nextText.textContent = nextTask && nextTask !== task
    ? `Next lesson trains ${nextTask.taskType}: ${nextTask.taskTitle}`
    : `Next lesson repeats ${task.taskType} with a harder scene.`;
  fields.reportIntro.textContent = "A short teacher-style report is ready from the child's actual trial answers.";
  fields.reportUnlock.textContent = trialState.passed ? task.unlockTitle : "Needs one more try";
  fields.reportUnlockCopy.textContent = trialState.passed
    ? `${task.unlockCopy} Unlock the next lesson with the 7-day plan.`
    : "The answer is not ready yet. The paid plan should repeat this skill before opening a harder task.";
  fields.reportCta.textContent = "Unlock Next Lesson";
  fields.reportCta.dataset.go = "plan";
  fields.tomorrowTitle.textContent = nextTask?.taskType || persona.tomorrowTitle;
  fields.tomorrowCopy.textContent = nextTask?.taskTitle || persona.tomorrowCopy;
}

function selectLessonTask(index) {
  const persona = personas[currentPersona];
  if (!persona.courseTasks || !persona.courseTasks[index]) return;
  activeLessonTaskIndex = index;
  resetTrialState();
  applyLessonTask(persona);
  renderLessonSteps(persona);
  renderChat(persona);
  fields.answerInput.value = "";
  updateTrialDisplay();
}

function renderArchive(persona) {
  fields.archiveList.innerHTML = persona.archive
    .map(
      (item) => `
        <div class="archive-item">
          <span></span>
          <p>${item}</p>
        </div>
      `
    )
    .join("");
}

function renderOps(persona) {
  const ops = persona.ops;
  opsFields.mobileStage.textContent = persona.stage;
  opsFields.mobileStreak.textContent = `${ops.streak}🔥`;
  opsFields.mobileXp.textContent = `${ops.xp} XP`;
  opsFields.homeStreak.textContent = `${ops.streak}-day streak`;
  opsFields.homeXp.textContent = `${ops.xp} XP`;
  opsFields.homeGems.textContent = `${ops.gems} Gems`;
  opsFields.lessonReward.textContent = trialState.completed
    ? "Trial report ready"
    : trialState.firstSubmitted
      ? "Step 2: improve the answer"
      : "Step 1: capture first try";
  if (opsFields.opsLeague) opsFields.opsLeague.textContent = trialState.completed ? "Trial done" : "Not started";
  if (opsFields.opsRank) opsFields.opsRank.textContent = "Choose plan";
  if (opsFields.opsPrompt) {
    opsFields.opsPrompt.textContent = trialState.completed
      ? "The next recommendation is based on the submitted answer and questionnaire."
      : "Unlock the next interactive lesson after choosing a 7-day plan.";
  }
  const tasks = persona.courseTasks || [];
  opsFields.questList.innerHTML = tasks.slice(0, 3)
    .map(
      (task, index) => `
        <div class="quest-item">
          <div>
            <strong>${index === 0 ? "Current check" : `Next check ${index}`}: ${task.taskType}</strong>
            <span>${index === 0 && trialState.completed ? "done" : "pending"}</span>
          </div>
          <p>${task.taskTitle}</p>
        </div>
      `
    )
    .join("");
}

function renderQuiz() {
  if (!quizNodes.question) return;
  const step = quizSteps[quizIndex];
  const selected = quizAnswers[quizIndex];
  quizNodes.stepText.textContent = `${quizIndex + 1} / ${quizSteps.length}`;
  quizNodes.progress.style.width = `${((quizIndex + 1) / quizSteps.length) * 100}%`;
  quizNodes.category.textContent = step.category;
  quizNodes.question.textContent = step.question;
  quizNodes.hint.textContent = step.hint;
  quizNodes.back.disabled = quizIndex === 0;
  quizNodes.continue.disabled = step.type !== "insight" && selected === null;
  quizNodes.continue.textContent = quizIndex === quizSteps.length - 1 ? "Start First Trial" : "Continue";
  quizNodes.footerText.textContent =
    quizIndex === quizSteps.length - 1
      ? "Start one coached expression lesson before seeing the report."
      : `Answer ${quizSteps.length} quick questions to unlock the course plan.`;
	  if (step.type === "insight") {
      const summary = getStageSummary();
	    quizNodes.options.innerHTML = `
	      <div class="questionnaire-insight compact-summary" aria-label="Preliminary questionnaire summary">
	        <article>
	          <span>Preliminary rating</span>
	          <strong>${summary.score}</strong>
	          <p>${summary.comment}</p>
	        </article>
	      </div>
	    `;
	    return;
	  }
  quizNodes.options.innerHTML = step.options
    .map(
      ([icon, label], index) => `
        <button class="quiz-option ${selected === index ? "selected" : ""}" type="button" data-quiz-option="${index}">
          <span>${icon}</span>
          <strong>${label}</strong>
          <i></i>
        </button>
      `
    )
    .join("");
}

function messageTemplate(role, label, text) {
  return `
    <div class="message ${role}">
      <span>${label}</span>
      <p>${text}</p>
    </div>
  `;
}

function setPersona(key) {
  currentPersona = key;
  activeLessonTaskIndex = 0;
  const persona = personas[key];
  personaButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.persona === key);
  });

  ageRange.value = persona.age;
  ageOutput.textContent = `${persona.age}`;
  renderStages(persona.age);

  fields.personaName.textContent = `${persona.name}'s Assessment Result`;
  fields.personaStage.textContent = persona.stage;
  fields.goalText.textContent = persona.goal;
  fields.timeText.textContent = persona.time;
  fields.lessonDuration.textContent = persona.duration;
  fields.taskType.textContent = persona.taskType;
  fields.taskTitle.textContent = persona.taskTitle;
  fields.taskBody.textContent = persona.taskBody;
  fields.scoreText.textContent = persona.score;
  fields.reportQuizSignal.textContent = persona.reportQuizSignal || `Quiz signal: ${persona.teacherTitle}`;
  fields.reportEvidence.textContent = persona.reportEvidence || `AI checked today's answer against the course pass standard.`;
  fields.progressText.textContent = persona.progress;
  fields.nextText.textContent = persona.next;
  fields.coachMode.textContent = persona.age < 13 ? "Parent visible" : "Guided";
  fields.homeHeroTitle.textContent = persona.hero;
  fields.challengeBadge.textContent = persona.age === 7 ? "Cold Start MVP" : `🔥 ${persona.ops.streak}-day streak`;
  fields.challengeTitle.textContent = persona.challengeTitle;
  fields.challengeCopy.textContent = persona.challengeCopy;
  fields.challengeReward.textContent = persona.age === 7 ? "Assessment → Course → Report" : persona.ops.reward;
  fields.teacherTitle.textContent = persona.teacherTitle;
  fields.profileIntro.textContent = `The assessment found ${persona.name}'s smallest current gap and assigned one focused course task.`;
  fields.lessonHeroTitle.textContent = `Day 1 Course: ${persona.taskType}`;
  fields.lessonIntro.textContent = persona.challengeCopy;
  fields.heartStatus.textContent = persona.ops.heartsIcon;
  fields.hintStatus.textContent = `${persona.ops.hints} hints left`;
  fields.unlockTitle.textContent = persona.unlockTitle;
  fields.unlockCopy.textContent = persona.unlockCopy;
  fields.passLabel.textContent = persona.passLabel || (persona.age < 13 ? "Add one reason sentence to pass" : "Add one piece of evidence to pass");
  fields.reportHeroTitle.textContent = `${persona.name} completed Day 1.`;
  fields.reportIntro.textContent = `Skill unlocked: ${persona.unlockTitle}. Tomorrow will continue with the next lesson.`;
  fields.reportUnlock.textContent = persona.unlockTitle;
  fields.reportUnlockCopy.textContent = persona.unlockCopy;
  fields.tomorrowTitle.textContent = persona.tomorrowTitle;
  fields.tomorrowCopy.textContent = persona.tomorrowCopy;

  renderSkills(persona.skills);
  renderDiagnosis(persona);
  renderLessonSteps(persona);
  renderChat(persona);
  applyLessonTask(persona);
  renderArchive(persona);
  renderOps(persona);
  setRing(persona.percent);
}

function setRoute(route) {
  const safeRoute = ["landing", "plan", "lesson", "report"].includes(route) ? route : "landing";
  const funnelRoutes = ["landing", "plan", "lesson", "report"];
  if (safeRoute === "landing") {
    quizIndex = 0;
    quizAnswers.fill(null);
    renderQuiz();
  }
  pageNodes.forEach((page) => page.classList.toggle("active", page.dataset.page === safeRoute));
  routeLinks.forEach((link) => link.classList.toggle("active", link.dataset.route === safeRoute));
  document.body.classList.toggle("landing-mode", funnelRoutes.includes(safeRoute));

  if (window.location.hash !== `#${safeRoute}`) {
    history.pushState(null, "", `#${safeRoute}`);
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

function aiReplyFor(text, persona) {
  const trimmed = text.trim();
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  const taskTitle = task?.taskType || persona.taskType;
  const focus = task?.checkFocus || "the missing detail";
  const signals = answerSignals[task?.key] || [];
  const lower = trimmed.toLowerCase();
  const matchedSignals = signals.filter((signal) => lower.includes(signal));

  if (!trimmed) {
    return `Start with the method: ${task?.method || "one clear sentence"}. Use the practice material above, then I will check it against the pass standard.`;
  }

  if (lower.includes("hint") || lower.includes("try again")) {
    return `Hint for ${taskTitle}: use this frame: ${task?.method || "one clear sentence"}. You can copy the structure, but change the words to fit the story.`;
  }

  if (lower.includes("check")) {
    return `Send the child's actual answer and I will check it against three standards: ${task?.rubric.join(" / ") || focus}.`;
  }

  const result = evaluateTrialAnswer(trimmed, task);
  if (!result.passed) return result.feedback;
  return `${result.feedback} Next time, we can make it faster and more natural.`;
}

routeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setRoute(link.dataset.route);
  });
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => setRoute(button.dataset.go));
});

if (fields.reportCta) {
  fields.reportCta.addEventListener("click", () => setRoute(fields.reportCta.dataset.go));
}

if (quizNodes.options) {
  quizNodes.options.addEventListener("click", (event) => {
    const option = event.target.closest("[data-quiz-option]");
    if (!option) return;
    quizAnswers[quizIndex] = Number(option.dataset.quizOption);
    renderQuiz();
  });
}

if (quizNodes.continue) {
	  quizNodes.continue.addEventListener("click", () => {
    if (quizSteps[quizIndex].type !== "insight" && quizAnswers[quizIndex] === null) return;
    if (quizIndex < quizSteps.length - 1) {
      quizIndex += 1;
      renderQuiz();
      return;
    }
	    buildCourseFromQuizAnswers();
	    setPersona("child");
	    setRoute("plan");
	  });
	}

if (quizNodes.back) {
  quizNodes.back.addEventListener("click", () => {
    if (quizIndex === 0) return;
    quizIndex -= 1;
    renderQuiz();
  });
}

personaButtons.forEach((button) => {
  button.addEventListener("click", () => setPersona(button.dataset.persona));
});

ageRange.addEventListener("input", (event) => {
  const age = Number(event.target.value);
  ageOutput.textContent = `${age}`;
  renderStages(age);
});

document.querySelectorAll("[data-hint]").forEach((button) => {
  button.addEventListener("click", () => {
    const persona = personas[currentPersona];
    fields.chatLog.insertAdjacentHTML(
      "beforeend",
      messageTemplate("user", persona.learnerLabel, button.dataset.hint)
    );
    fields.chatLog.insertAdjacentHTML(
      "beforeend",
      messageTemplate("ai", "89 Teacher", aiReplyFor(button.dataset.hint, persona))
    );
    fields.chatLog.scrollTop = fields.chatLog.scrollHeight;
  });
});

document.querySelectorAll("[data-starter]").forEach((button) => {
  button.addEventListener("click", () => {
    fields.answerInput.value = button.dataset.starter;
    fields.answerInput.focus();
  });
});

if (fields.interactionOptions) {
  fields.interactionOptions.addEventListener("click", (event) => {
    const option = event.target.closest("[data-choice-starter]");
    if (!option) return;
    fields.answerInput.value = option.dataset.choiceStarter;
    fields.answerInput.focus();
  });
}

if (fields.lessonSteps) {
  fields.lessonSteps.addEventListener("click", (event) => {
    const task = event.target.closest("[data-lesson-task]");
    if (!task) return;
    selectLessonTask(Number(task.dataset.lessonTask));
  });
}

fields.answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const persona = personas[currentPersona];
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  const answer = fields.answerInput.value.trim();
  const result = task ? evaluateTrialAnswer(answer, task) : { passed: false, feedback: "No active trial task." };
  if (!trialState.firstSubmitted) {
    trialState.firstSubmitted = Boolean(answer);
    trialState.firstAnswer = answer;
    trialState.firstFeedback = result.feedback;
    trialState.feedback = `First try saved. ${buildCoachingHint(task, result)}`;
    trialState.passed = false;
    trialState.completed = false;
    trialState.taskKey = task?.key || "";
  } else {
    trialState.improvedAnswer = answer;
    trialState.answer = answer;
    trialState.feedback = result.feedback;
    trialState.passed = result.passed;
    trialState.completed = Boolean(answer);
    trialState.taskKey = task?.key || "";
  }
  fields.chatLog.insertAdjacentHTML(
    "beforeend",
    messageTemplate("user", persona.learnerLabel, answer || "I do not know how to answer yet.")
  );
  fields.chatLog.insertAdjacentHTML(
    "beforeend",
    messageTemplate("ai", "89 Teacher", trialState.feedback || aiReplyFor(answer, persona))
  );
  if (trialState.firstSubmitted && !trialState.completed && task?.choices?.[0]) {
    fields.answerInput.value = task.choices[0][1];
    fields.answerInput.select();
  } else {
    fields.answerInput.value = "";
  }
  updateTrialDisplay();
  updateReportForTask(persona, task);
  renderOps(persona);
  fields.chatLog.scrollTop = fields.chatLog.scrollHeight;
});

window.addEventListener("popstate", () => {
  setRoute(window.location.hash.replace("#", "") || "landing");
});

renderStages(7);
buildCourseFromQuizAnswers();
setPersona("child");
renderQuiz();
setRoute(window.location.hash.replace("#", "") || "landing");
