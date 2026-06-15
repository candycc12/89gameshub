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
const numberGrid = document.getElementById("numberGrid");
const startGame = document.getElementById("startGame");
const finishGame = document.getElementById("finishGame");
const timeLeft = document.getElementById("timeLeft");
const hitCount = document.getElementById("hitCount");
const missCount = document.getElementById("missCount");
const gameStatus = document.getElementById("gameStatus");
const resultTitle = document.getElementById("resultTitle");
const resultSummary = document.getElementById("resultSummary");
const resultNow = document.getElementById("resultNow");
const resultGoal = document.getElementById("resultGoal");
const quizSignal = document.getElementById("quizSignal");
const gameSignal = document.getElementById("gameSignal");
const planName = document.getElementById("planName");
const dayList = document.getElementById("dayList");
const breathCount = document.getElementById("breathCount");
const startReset = document.getElementById("startReset");
const buildReset = document.getElementById("buildReset");
const focusTask = document.getElementById("focusTask");
const focusDistractor = document.getElementById("focusDistractor");
const resetCard = document.getElementById("resetCard");
const resetTitle = document.getElementById("resetTitle");
const resetList = document.getElementById("resetList");
const purchaseIntent = document.getElementById("purchaseIntent");
const intentCopy = document.getElementById("intentCopy");

const quizSteps = [
  {
    category: "Pattern",
    question: "When does your focus break most often?",
    hint: "Choose the pattern that happens most often.",
    options: [
      ["Before I even start", "starter"],
      ["When another task pops up", "switcher"],
      ["After 10-15 minutes", "stamina"],
      ["When there is too much information", "overloaded"]
    ]
  },
  {
    category: "Work Style",
    question: "What do you usually do when a task feels hard?",
    hint: "This shows whether your first training should target start friction or overload.",
    options: [
      ["Delay it until later", "starter"],
      ["Check messages or tabs", "switcher"],
      ["Push through, then crash", "stamina"],
      ["Keep rereading the instructions", "overloaded"]
    ]
  },
  {
    category: "Environment",
    question: "What distracts you fastest?",
    hint: "The paid plan changes based on your most common distractor.",
    options: [
      ["Phone notifications", "switcher"],
      ["Messy task list", "overloaded"],
      ["Boredom", "stamina"],
      ["Not knowing where to begin", "starter"]
    ]
  },
  {
    category: "Learning",
    question: "For study or homework, what is the biggest issue?",
    hint: "Parents and students often see different versions of the same attention gap.",
    options: [
      ["Getting seated and started", "starter"],
      ["Jumping between subjects", "switcher"],
      ["Losing energy halfway through", "stamina"],
      ["Feeling stuck by too many steps", "overloaded"]
    ]
  },
  {
    category: "Energy",
    question: "How does your focus feel after a short break?",
    hint: "Recovery speed matters for a 7-day plan.",
    options: [
      ["Still hard to restart", "starter"],
      ["I return to a different task", "switcher"],
      ["A little better, but fades again", "stamina"],
      ["Better only if someone simplifies it", "overloaded"]
    ]
  },
  {
    category: "Procrastination",
    question: "What best explains your procrastination?",
    hint: "This separates attention issues from planning issues.",
    options: [
      ["Starting feels uncomfortable", "starter"],
      ["Everything feels urgent", "switcher"],
      ["I cannot sustain effort long enough", "stamina"],
      ["The task feels too complex", "overloaded"]
    ]
  },
  {
    category: "Daily Training",
    question: "What kind of focus exercise sounds easiest to repeat?",
    hint: "The best plan is one you can actually do for 7 days.",
    options: [
      ["A 2-minute start ritual", "starter"],
      ["Blocking one distractor", "switcher"],
      ["Short focus sprints", "stamina"],
      ["Breaking tasks into smaller steps", "overloaded"]
    ]
  },
  {
    category: "Goal",
    question: "What would make this feel worth paying for?",
    hint: "Choose the result you most want in the next 7 days.",
    options: [
      ["I start tasks faster", "starter"],
      ["I stop switching so much", "switcher"],
      ["I stay focused longer", "stamina"],
      ["I feel less mentally overloaded", "overloaded"]
    ]
  }
];

const resultTypes = {
  starter: {
    title: "Distracted Starter",
    summary: "Your attention may break before deep work begins. The first win is making the start smaller and easier.",
    now: "You may spend more energy preparing, delaying, or reopening the task than actually working.",
    goal: "Start one task in under two minutes and create a visible first win.",
    plan: "7-Day Start Faster Plan",
    quizSignal: "Starting friction",
    days: [
      "2-minute start ritual",
      "One-task desk setup",
      "First visible win",
      "Restart after interruption",
      "Boredom bridge",
      "Homework/work launch routine",
      "Final start-speed check"
    ]
  },
  switcher: {
    title: "Task Switcher",
    summary: "Your focus may be leaking through frequent context switching, notifications, and open loops.",
    now: "You may move between tabs, messages, and tasks before one thing has enough time to settle.",
    goal: "Protect one focus block and return to the same task after interruptions.",
    plan: "7-Day Distraction Shield Plan",
    quizSignal: "Task switching",
    days: [
      "Remove one digital distractor",
      "Single-task focus block",
      "Interruptions parking lot",
      "Return-to-task drill",
      "Notification audit",
      "Deep work mini-session",
      "Final distraction check"
    ]
  },
  stamina: {
    title: "Low Stamina Focuser",
    summary: "Your start may be fine, but attention fades before the task is finished.",
    now: "You may focus for a short burst, then drift, slow down, or need another break.",
    goal: "Build focus stamina with short sprints, recovery, and visible progress.",
    plan: "7-Day Focus Stamina Plan",
    quizSignal: "Focus endurance",
    days: [
      "10-minute focus sprint",
      "Energy check-in",
      "Short break reset",
      "Two-sprint practice",
      "Finish-line cue",
      "Longer focus block",
      "Final stamina check"
    ]
  },
  overloaded: {
    title: "Overloaded Thinker",
    summary: "Your attention may collapse when the task has too many steps, choices, or details.",
    now: "You may reread, reorganize, or feel stuck because the task is mentally crowded.",
    goal: "Reduce mental load by turning one messy task into a simple next step.",
    plan: "7-Day Mental Load Reset",
    quizSignal: "Cognitive overload",
    days: [
      "Simplify the task",
      "Pick the next step",
      "Reduce choices",
      "Visual checklist",
      "One-page work setup",
      "Decision-light focus block",
      "Final overload check"
    ]
  }
};

let currentStep = 0;
let answers = Array(quizSteps.length).fill(null);
let selectedPlan = "seven";
let gameTimer = null;
let gameSeconds = 30;
let hits = 0;
let misses = 0;
let gameCompleted = false;
const targetDigit = "7";

function setRoute(route) {
  const safeRoute = ["home", "quiz", "game", "result", "lesson", "paywall", "intent"].includes(route)
    ? route
    : "home";
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === safeRoute);
  });
  window.location.hash = safeRoute;
  window.scrollTo({ top: 0, behavior: "instant" });
  if (safeRoute === "quiz") renderQuiz();
  if (safeRoute === "game") renderGameGrid(false);
  if (safeRoute === "result") renderResult();
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
  quizContinue.textContent = currentStep === quizSteps.length - 1 ? "Start Focus Sprint" : "Continue";
}

function getQuizResultKey() {
  const scores = { starter: 0, switcher: 0, stamina: 0, overloaded: 0 };
  answers.forEach((answer, index) => {
    if (answer === null) return;
    scores[quizSteps[index].options[answer][1]] += 1;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function getFinalResultKey() {
  const scores = { starter: 0, switcher: 0, stamina: 0, overloaded: 0 };
  answers.forEach((answer, index) => {
    if (answer === null) return;
    scores[quizSteps[index].options[answer][1]] += 1;
  });
  if (misses >= 6) scores.switcher += 2;
  if (hits <= 5 && gameCompleted) scores.stamina += 2;
  if (hits >= 10 && misses >= 3) scores.overloaded += 1;
  if (!gameCompleted) scores.starter += 1;
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function getResult() {
  return resultTypes[getFinalResultKey()];
}

function renderGameGrid(active) {
  const digits = Array.from({ length: 24 }, () => String(Math.floor(Math.random() * 9) + 1));
  for (let i = 0; i < 7; i += 1) {
    digits[Math.floor(Math.random() * digits.length)] = targetDigit;
  }
  numberGrid.innerHTML = "";
  digits.forEach((digit) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = digit;
    button.disabled = !active;
    button.className = digit === targetDigit ? "target-number" : "noise-number";
    button.addEventListener("click", () => {
      if (!active || button.disabled) return;
      if (digit === targetDigit) {
        hits += 1;
        button.classList.add("correct");
      } else {
        misses += 1;
        button.classList.add("wrong");
      }
      button.disabled = true;
      updateGameStats();
    });
    numberGrid.appendChild(button);
  });
}

function updateGameStats() {
  timeLeft.textContent = String(gameSeconds);
  hitCount.textContent = String(hits);
  missCount.textContent = String(misses);
}

function startFocusSprint() {
  hits = 0;
  misses = 0;
  gameSeconds = 30;
  gameCompleted = false;
  startGame.hidden = true;
  finishGame.hidden = true;
  gameStatus.textContent = "Testing";
  updateGameStats();
  renderGameGrid(true);
  clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    gameSeconds -= 1;
    if (gameSeconds % 6 === 0 && gameSeconds > 0) renderGameGrid(true);
    updateGameStats();
    if (gameSeconds <= 0) finishFocusSprint();
  }, 1000);
}

function finishFocusSprint() {
  clearInterval(gameTimer);
  gameCompleted = true;
  gameStatus.textContent = "Complete";
  startGame.hidden = false;
  startGame.textContent = "Retake Sprint";
  finishGame.hidden = false;
  [...numberGrid.querySelectorAll("button")].forEach((button) => {
    button.disabled = true;
  });
}

function renderResult() {
  const result = getResult();
  const quizResult = resultTypes[getQuizResultKey()];
  resultTitle.textContent = result.title;
  resultSummary.textContent = result.summary;
  resultNow.textContent = result.now;
  resultGoal.textContent = result.goal;
  planName.textContent = result.plan;
  quizSignal.textContent = quizResult.quizSignal;
  gameSignal.textContent = gameCompleted ? `${hits} hits / ${misses} misses` : "Sprint skipped";
  dayList.innerHTML = result.days
    .map((day, index) => `<div><span>${index + 1}</span><strong>${day}</strong><small>${index === 0 ? "Free" : "Locked"}</small></div>`)
    .join("");
}

function runResetAnimation() {
  let count = 1;
  breathCount.textContent = String(count);
  startReset.disabled = true;
  startReset.textContent = "Resetting";
  const resetTimer = setInterval(() => {
    count += 1;
    breathCount.textContent = String(count);
    if (count >= 4) {
      clearInterval(resetTimer);
      startReset.disabled = false;
      startReset.textContent = "Restart Reset";
    }
  }, 900);
}

function buildResetPlan() {
  const task = focusTask.value.trim() || "one clear task";
  const distractor = focusDistractor.value.trim() || "one distractor";
  resetTitle.textContent = "Your 10-minute reset is ready.";
  resetList.innerHTML = [
    `Write the task as one finish line: "${task}."`,
    `Move or block the distractor: ${distractor}.`,
    "Set a 10-minute timer and stop when the first visible win is done.",
    "If attention breaks, return to the same task instead of choosing a new one."
  ].map((item) => `<li>${item}</li>`).join("");
  resetCard.hidden = false;
  resetCard.scrollIntoView({ behavior: "smooth", block: "start" });
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
    setRoute("game");
  }
});

startGame.addEventListener("click", startFocusSprint);
finishGame.addEventListener("click", () => setRoute("result"));
startReset.addEventListener("click", runResetAnimation);
buildReset.addEventListener("click", buildResetPlan);

document.querySelectorAll(".price-card").forEach((card) => {
  card.addEventListener("click", () => selectPriceCard(card));
});

purchaseIntent.addEventListener("click", () => {
  const copy = {
    profile: "You selected the $4.99 Focus Profile. In production, this should open a one-time checkout link.",
    seven: "You selected the $9.99 7-day focus plan. In production, this should open the recommended checkout link.",
    monthly: "You selected the $19.99 monthly focus training plan. In production, this should open a subscription checkout link."
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
