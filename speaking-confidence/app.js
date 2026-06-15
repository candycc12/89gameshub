const screens = [...document.querySelectorAll(".screen")];
const goButtons = document.querySelectorAll("[data-go]");
const backButtons = document.querySelectorAll("[data-back]");
const quizProgressText = document.getElementById("quizProgressText");
const quizProgressBar = document.getElementById("quizProgressBar");
const quizCategory = document.getElementById("quizCategory");
const quizQuestion = document.getElementById("quizQuestion");
const quizHint = document.getElementById("quizHint");
const quizOptions = document.getElementById("quizOptions");
const quizContinue = document.getElementById("quizContinue");
const resultTitle = document.getElementById("resultTitle");
const resultSummary = document.getElementById("resultSummary");
const resultNow = document.getElementById("resultNow");
const resultGoal = document.getElementById("resultGoal");
const planName = document.getElementById("planName");
const dayList = document.getElementById("dayList");
const scenarioTitle = document.getElementById("scenarioTitle");
const scenarioPrompt = document.getElementById("scenarioPrompt");
const practiceAnswer = document.getElementById("practiceAnswer");
const feedbackCard = document.getElementById("feedbackCard");
const feedbackList = document.getElementById("feedbackList");
const clarityScore = document.getElementById("clarityScore");
const structureScore = document.getElementById("structureScore");
const toneScore = document.getElementById("toneScore");
const fillExample = document.getElementById("fillExample");
const analyzeAnswer = document.getElementById("analyzeAnswer");
const lessonVideo = document.getElementById("lessonVideo");
const playLesson = document.getElementById("playLesson");
const purchaseIntent = document.getElementById("purchaseIntent");
const intentCopy = document.getElementById("intentCopy");

const quizSteps = [
  {
    category: "Goal",
    question: "What speaking moment do you want to improve first?",
    hint: "Choose the moment you would pay to fix first.",
    options: [
      ["Interview answers", "nervous"],
      ["Meeting or class speaking", "unstructured"],
      ["Social conversations", "low"],
      ["Presentations or speeches", "overthinker"]
    ]
  },
  {
    category: "Pressure",
    question: "What usually happens right before you speak?",
    hint: "This tells us whether the first gap is pressure, structure, or confidence.",
    options: [
      ["My mind goes blank", "nervous"],
      ["I overthink every word", "overthinker"],
      ["I start talking without a clear point", "unstructured"],
      ["I worry people will judge me", "low"]
    ]
  },
  {
    category: "Structure",
    question: "When you answer a question, what is most often missing?",
    hint: "Your free lesson will train the weakest piece first.",
    options: [
      ["A strong opening sentence", "low"],
      ["A clear order", "unstructured"],
      ["A specific example", "overthinker"],
      ["A calm voice", "nervous"]
    ]
  },
  {
    category: "Confidence",
    question: "How often do you avoid speaking even when you have something to say?",
    hint: "Avoidance is a strong sign that confidence needs daily reps.",
    options: [
      ["Almost always", "low"],
      ["Often", "nervous"],
      ["Sometimes", "overthinker"],
      ["Rarely", "unstructured"]
    ]
  },
  {
    category: "Clarity",
    question: "Which sentence sounds most like you?",
    hint: "Pick the one that feels familiar, even if it is not perfect.",
    options: [
      ["I know it, but I cannot say it clearly.", "unstructured"],
      ["I prepare too much and still sound stiff.", "overthinker"],
      ["I speak quietly because I am unsure.", "low"],
      ["I get nervous once people look at me.", "nervous"]
    ]
  },
  {
    category: "Context",
    question: "Where would better communication help you most in the next 30 days?",
    hint: "The plan changes based on real situations, not generic lessons.",
    options: [
      ["Job interviews", "nervous"],
      ["School or college", "unstructured"],
      ["Work meetings", "overthinker"],
      ["Dating, friends, or social events", "low"]
    ]
  },
  {
    category: "Habit",
    question: "How much time can you practice per day?",
    hint: "Short daily reps work better than long lessons once a week.",
    options: [
      ["5 minutes", "low"],
      ["10 minutes", "unstructured"],
      ["15 minutes", "nervous"],
      ["20 minutes", "overthinker"]
    ]
  },
  {
    category: "Feedback",
    question: "What kind of feedback would help most?",
    hint: "This decides what your AI teacher should score first.",
    options: [
      ["Tell me if I sound clear", "unstructured"],
      ["Tell me if I sound confident", "low"],
      ["Tell me how to reduce anxiety", "nervous"],
      ["Tell me what to cut", "overthinker"]
    ]
  },
  {
    category: "Result",
    question: "What would make you feel progress after 7 days?",
    hint: "Choose the result that would feel worth paying for.",
    options: [
      ["I can answer without freezing", "nervous"],
      ["I can speak in a clear order", "unstructured"],
      ["I sound natural, not scripted", "overthinker"],
      ["I speak up more often", "low"]
    ]
  },
  {
    category: "Plan",
    question: "Which plan feels most useful right now?",
    hint: "This helps us package the first paid offer.",
    options: [
      ["Interview confidence plan", "nervous"],
      ["Clear answer structure plan", "unstructured"],
      ["Social confidence plan", "low"],
      ["Natural speaking plan", "overthinker"]
    ]
  }
];

const resultTypes = {
  nervous: {
    title: "Nervous Speaker",
    summary: "You may know what to say, but pressure makes your answer shrink or disappear.",
    now: "You may freeze, rush, or sound less capable than you really are.",
    goal: "Stay calm enough to give one clear answer with a reason and example.",
    plan: "7-Day Speaking Anxiety Reset",
    scenario: "Interview practice",
    prompt: "Tell me about a time you solved a problem under pressure.",
    days: [
      "Calm opening line",
      "Answer without freezing",
      "Use one specific example",
      "Slow down your delivery",
      "Handle a follow-up question",
      "Sound confident under pressure",
      "Final interview answer check"
    ]
  },
  overthinker: {
    title: "Overthinker",
    summary: "You may prepare too much, then sound careful, stiff, or less natural than you want.",
    now: "Your answer can become too polished, too long, or hard to follow.",
    goal: "Sound natural while keeping one strong point and one useful example.",
    plan: "7-Day Natural Speaking Plan",
    scenario: "Meeting practice",
    prompt: "Give your opinion on a project idea your team is discussing.",
    days: [
      "Cut the extra words",
      "Use a simple main point",
      "Add one example only",
      "Sound less scripted",
      "Respond to pushback",
      "Speak with warmer tone",
      "Final natural answer check"
    ]
  },
  unstructured: {
    title: "Unstructured Speaker",
    summary: "Your ideas may be good, but the listener has to work too hard to follow them.",
    now: "You may start speaking before your answer has a clear beginning, middle, and end.",
    goal: "Use a repeatable structure so your point lands quickly.",
    plan: "7-Day Clear Answer Structure Plan",
    scenario: "Class or meeting practice",
    prompt: "Explain why your group should choose one project idea.",
    days: [
      "Open with your point",
      "Give one reason",
      "Add evidence",
      "Put ideas in order",
      "Make your ending clear",
      "Answer a follow-up",
      "Final clarity check"
    ]
  },
  low: {
    title: "Low-confidence Communicator",
    summary: "You may hold back even when your idea is worth hearing.",
    now: "You may speak quietly, apologize too much, or let others take the floor.",
    goal: "Speak up with a clear point and a warmer, steadier tone.",
    plan: "7-Day Social Confidence Plan",
    scenario: "Social practice",
    prompt: "You want to join a conversation with people you do not know well. What do you say?",
    days: [
      "Start a small conversation",
      "Share one clear opinion",
      "Ask a natural question",
      "Join a group smoothly",
      "Disagree politely",
      "Recover after awkward silence",
      "Final social confidence check"
    ]
  }
};

let currentStep = 0;
let answers = Array(quizSteps.length).fill(null);
let selectedPlan = "seven";

function setRoute(route) {
  const safeRoute = ["home", "quiz", "result", "lesson", "paywall", "intent"].includes(route)
    ? route
    : "home";
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === safeRoute);
  });
  window.location.hash = safeRoute;
  window.scrollTo({ top: 0, behavior: "instant" });
  if (safeRoute === "quiz") renderQuiz();
  if (safeRoute === "result") renderResult();
  if (safeRoute === "lesson") renderLesson();
}

function renderQuiz() {
  const step = quizSteps[currentStep];
  quizProgressText.textContent = `${currentStep + 1} / ${quizSteps.length}`;
  quizProgressBar.style.width = `${((currentStep + 1) / quizSteps.length) * 100}%`;
  quizCategory.textContent = step.category;
  quizQuestion.textContent = step.question;
  quizHint.textContent = step.hint;
  quizOptions.innerHTML = "";

  step.options.forEach(([label], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = label;
    if (answers[currentStep] === index) button.classList.add("selected");
    button.addEventListener("click", () => {
      answers[currentStep] = index;
      renderQuiz();
    });
    quizOptions.appendChild(button);
  });

  quizContinue.disabled = answers[currentStep] === null;
  quizContinue.textContent = currentStep === quizSteps.length - 1 ? "View My Result" : "Continue";
}

function getResultKey() {
  const scores = { nervous: 0, overthinker: 0, unstructured: 0, low: 0 };
  answers.forEach((answer, index) => {
    if (answer === null) return;
    const key = quizSteps[index].options[answer][1];
    scores[key] += 1;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function getResult() {
  return resultTypes[getResultKey()];
}

function renderResult() {
  const result = getResult();
  resultTitle.textContent = result.title;
  resultSummary.textContent = result.summary;
  resultNow.textContent = result.now;
  resultGoal.textContent = result.goal;
  planName.textContent = result.plan;
  dayList.innerHTML = result.days
    .map((day, index) => `<div><span>${index + 1}</span><strong>${day}</strong><small>${index === 0 ? "Free" : "Locked"}</small></div>`)
    .join("");
}

function renderLesson() {
  const result = getResult();
  scenarioTitle.textContent = result.scenario;
  scenarioPrompt.textContent = result.prompt;
}

function scoreAnswer(text) {
  const normalized = text.trim().toLowerCase();
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;
  const hasReason = /\bbecause\b|\bso\b|\bthe reason\b|\bmy point\b/.test(normalized);
  const hasExample = /\bfor example\b|\bfor instance\b|\bone time\b|\bwhen\b/.test(normalized);
  const hasFiller = /\bmaybe\b|\bi guess\b|\bi don't know\b|\bkind of\b|\bsort of\b/.test(normalized);

  const clarity = Math.min(95, Math.max(35, 42 + wordCount * 2 + (hasReason ? 16 : 0) - (hasFiller ? 10 : 0)));
  const structure = Math.min(95, Math.max(30, 38 + (hasReason ? 22 : 0) + (hasExample ? 22 : 0) + (wordCount > 22 ? 10 : 0)));
  const tone = Math.min(95, Math.max(40, 64 - (hasFiller ? 14 : 0) + (wordCount > 18 ? 8 : 0)));

  const tips = [];
  tips.push(hasReason ? "Clear point: you gave a reason, so the listener can follow your thinking." : "Add a reason using: \"My point is... because...\"");
  tips.push(hasExample ? "Good evidence: your example makes the answer feel real." : "Add one specific example. One concrete moment is enough.");
  tips.push(hasFiller ? "Reduce unsure words like \"maybe\" or \"I guess\" so the answer sounds steadier." : "Tone is steady. Keep the ending short and confident.");

  return { clarity, structure, tone, tips };
}

function renderFeedback() {
  const text = practiceAnswer.value;
  if (!text.trim()) {
    practiceAnswer.focus();
    return;
  }
  const result = scoreAnswer(text);
  clarityScore.textContent = `${result.clarity}`;
  structureScore.textContent = `${result.structure}`;
  toneScore.textContent = `${result.tone}`;
  feedbackList.innerHTML = result.tips.map((tip) => `<li>${tip}</li>`).join("");
  feedbackCard.hidden = false;
  feedbackCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectPriceCard(card) {
  document.querySelectorAll(".price-card").forEach((item) => item.classList.remove("selected"));
  card.classList.add("selected");
  const input = card.querySelector("input");
  input.checked = true;
  selectedPlan = input.value;
}

goButtons.forEach((button) => {
  button.addEventListener("click", () => setRoute(button.dataset.go));
});

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep -= 1;
      renderQuiz();
    } else {
      setRoute("home");
    }
  });
});

quizContinue.addEventListener("click", () => {
  if (answers[currentStep] === null) return;
  if (currentStep < quizSteps.length - 1) {
    currentStep += 1;
    renderQuiz();
  } else {
    setRoute("result");
  }
});

fillExample.addEventListener("click", () => {
  practiceAnswer.value =
    "My point is that I can stay calm under pressure because I focus on the next useful step. For example, when a project changed at the last minute, I listed the urgent tasks, asked one teammate for help, and finished the most important part first.";
  renderFeedback();
});

analyzeAnswer.addEventListener("click", renderFeedback);

playLesson.addEventListener("click", () => {
  if (lessonVideo.paused) {
    lessonVideo.play();
    playLesson.textContent = "Ⅱ";
  } else {
    lessonVideo.pause();
    playLesson.textContent = "▶";
  }
});

lessonVideo.addEventListener("ended", () => {
  playLesson.textContent = "▶";
});

document.querySelectorAll(".price-card").forEach((card) => {
  card.addEventListener("click", () => selectPriceCard(card));
});

purchaseIntent.addEventListener("click", () => {
  const copy = {
    report: "You selected the $4.99 personalized report. In production, this should open a one-time checkout link.",
    seven: "You selected the $9.99 7-day plan. In production, this should open the recommended checkout link.",
    monthly: "You selected the $19.99 monthly plan. In production, this should open a subscription checkout link."
  };
  intentCopy.textContent = copy[selectedPlan];
  setRoute("intent");
});

window.addEventListener("hashchange", () => {
  const route = window.location.hash.replace("#", "") || "home";
  const activeRoute = document.querySelector(".screen.active")?.dataset.screen;
  if (route !== activeRoute) setRoute(route);
});

setRoute(window.location.hash.replace("#", "") || "home");
