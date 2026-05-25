const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const ui = {
  redPercent: document.querySelector('#redPercent'),
  bluePercent: document.querySelector('#bluePercent'),
  redBar: document.querySelector('#redBar'),
  blueBar: document.querySelector('#blueBar'),
  clock: document.querySelector('#clock'),
  roundLabel: document.querySelector('#roundLabel'),
  round: document.querySelector('#round'),
  coins: document.querySelector('#coins'),
  rolls: document.querySelector('#rolls'),
  supportStatus: document.querySelector('#supportStatus'),
  feed: document.querySelector('#feed'),
  audioToggle: document.querySelector('#audioToggle'),
  redSupportBtn: document.querySelector('#redSupportBtn'),
  blueSupportBtn: document.querySelector('#blueSupportBtn'),
  chatForm: document.querySelector('#chatForm'),
  chatInput: document.querySelector('#chatInput'),
  diceBoard: document.querySelector('#diceBoard'),
  buyRollBtn: document.querySelector('#buyRollBtn'),
  rollDiceBtn: document.querySelector('#rollDiceBtn'),
  autoRollBtn: document.querySelector('#autoRollBtn'),
  diceFace: document.querySelector('#diceFace'),
  rollHint: document.querySelector('#rollHint'),
  autoRollHint: document.querySelector('#autoRollHint')
};

const W = canvas.width;
const H = canvas.height;
const params = new URLSearchParams(window.location.search);
const previewRound = Number(params.get('round'));
const testMode = params.get('test') === '1';
const initialRound = Number.isFinite(previewRound) && previewRound > 0 ? Math.floor(previewRound) : (testMode ? 5 : 1);

const team = {
  red: { name: 'Red Legion', color: '#ef3f49', edge: '#ff7780', dark: '#681d2b' },
  blue: { name: 'Blue Alliance', color: '#2ab7ff', edge: '#78e3ff', dark: '#104d79' },
  orange: { color: '#ff9a2f', edge: '#ffd06f' },
  violet: { color: '#b944ff', edge: '#ef94ff' },
  green: { color: '#3ad16f', edge: '#a6ff9b' }
};

const regions = [
  { id: 'r1', owner: 'red', pts: [[0, 150], [290, 150], [330, 322], [230, 440], [0, 392]], terrain: '#c7494c' },
  { id: 'r2', owner: 'red', pts: [[0, 392], [230, 440], [310, 560], [268, 720], [0, 752]], terrain: '#dc6041' },
  { id: 'r3', owner: 'blue', pts: [[290, 150], [720, 150], [720, 386], [490, 405], [330, 322]], terrain: '#22a9d7' },
  { id: 'r4', owner: 'blue', pts: [[490, 405], [720, 386], [720, 640], [520, 676], [310, 560], [330, 322]], terrain: '#31c3c9' },
  { id: 'r5', owner: 'orange', pts: [[0, 752], [268, 720], [360, 856], [310, 1030], [0, 1110]], terrain: '#f89b2d' },
  { id: 'r6', owner: 'green', pts: [[310, 560], [520, 676], [512, 875], [360, 856], [268, 720]], terrain: '#4ad76f' },
  { id: 'r7', owner: 'violet', pts: [[360, 856], [512, 875], [720, 790], [720, 1138], [310, 1218], [310, 1030]], terrain: '#b34dff' },
  { id: 'r8', owner: 'blue', pts: [[520, 676], [720, 640], [720, 790], [512, 875]], terrain: '#3c83ff' },
  { id: 'r9', owner: 'red', pts: [[0, 1110], [310, 1030], [310, 1218], [0, 1280]], terrain: '#b33254' }
];

const bases = [
  { id: 'A1', x: 118, y: 236, owner: 'red', level: 4, garrison: 320 },
  { id: 'A2', x: 244, y: 330, owner: 'red', level: 3, garrison: 260 },
  { id: 'A3', x: 132, y: 522, owner: 'red', level: 5, garrison: 410 },
  { id: 'A4', x: 266, y: 690, owner: 'red', level: 3, garrison: 210 },
  { id: 'B1', x: 592, y: 246, owner: 'blue', level: 4, garrison: 330 },
  { id: 'B2', x: 492, y: 402, owner: 'blue', level: 3, garrison: 250 },
  { id: 'B3', x: 616, y: 590, owner: 'blue', level: 5, garrison: 430 },
  { id: 'B4', x: 520, y: 760, owner: 'blue', level: 3, garrison: 240 },
  { id: 'C1', x: 360, y: 560, owner: 'red', level: 6, garrison: 470 },
  { id: 'C2', x: 430, y: 705, owner: 'blue', level: 6, garrison: 455 },
  { id: 'N1', x: 170, y: 930, owner: 'red', level: 2, garrison: 150 },
  { id: 'N2', x: 548, y: 1018, owner: 'blue', level: 2, garrison: 160 }
];

const routes = [
  ['A1', 'A2'], ['A2', 'C1'], ['A3', 'C1'], ['A4', 'C1'], ['C1', 'C2'],
  ['B1', 'B2'], ['B2', 'C2'], ['B3', 'C2'], ['B4', 'C2'], ['N1', 'C1'], ['N2', 'C2'], ['B4', 'N2'], ['A4', 'N1']
];

const state = {
  round: initialRound,
  timeLeft: 60,
  coins: 120,
  rolls: 2,
  dicePos: 0,
  diceValue: 3,
  diceRolling: false,
  autoRoll: false,
  supportSide: 'blue',
  territory: .5,
  redPower: 50,
  bluePower: 50,
  redShield: 0,
  blueShield: 0,
  redBoost: 0,
  blueBoost: 0,
  lastTime: 0,
  coinTick: 0,
  aiSkill: 4,
  convoyTick: 0,
  feed: 0,
  ending: 0,
  shake: 0,
  headline: '',
  headlineLife: 0,
  warnedTen: false,
  convoys: [],
  fx: [],
  pulses: []
};

let autoRollTimer = 0;
let holdRollTimer = 0;
let holdRollActive = false;
let suppressNextRollClick = false;

const names = ['Mika', 'Taozi', 'Nova', 'Ace', 'Kai', 'Luna', 'Juno', 'Blaze', 'Leo', 'Mina'];
const comments = ['border is hot', 'take the outpost', 'deploy now', 'frontline is moving', 'boost the guild', 'hold the base', 'map control wins'];
const campaigns = [
  {
    title: 'Rubicon Crossing',
    subtitle: 'Legions race across the river line.',
    tone: '#d9f2ff',
    accent: '#c5363e',
    style: 'river',
    baseSkin: 'roman',
    unitSkin: 'legion',
    mapTone: '#31495d',
    labels: [
      { text: 'RUBICON RIVER', x: 246, y: 470, angle: -1.18, size: 21 },
      { text: 'SPQR FORWARD CAMP', x: 138, y: 294, angle: -.08, size: 16 },
      { text: 'LEGION SHIELD WALL', x: 412, y: 548, angle: .14, size: 16 }
    ],
    bonus: 15
  },
  {
    title: 'Siege of Alesia',
    subtitle: 'Twin siege rings tighten around the center.',
    tone: '#ffdca3',
    accent: '#b87a35',
    style: 'siege',
    baseSkin: 'fort',
    unitSkin: 'siege',
    mapTone: '#5c4934',
    labels: [
      { text: 'ALESIA SIEGE RING', x: 370, y: 500, angle: -.08, size: 20 },
      { text: 'PALISADE LINE', x: 505, y: 668, angle: .52, size: 16 },
      { text: 'SIEGE TOWERS', x: 240, y: 738, angle: -.24, size: 16 }
    ],
    bonus: 18
  },
  {
    title: 'Battle of Cannae',
    subtitle: 'The center bends, the flanks decide.',
    tone: '#ffe7b3',
    accent: '#ef3f49',
    style: 'flanks',
    baseSkin: 'camp',
    unitSkin: 'cavalry',
    mapTone: '#695334',
    labels: [
      { text: 'CANNAE KILL ZONE', x: 338, y: 568, angle: -.04, size: 20 },
      { text: 'CAVALRY FLANK', x: 116, y: 706, angle: -.42, size: 17 },
      { text: 'CAVALRY FLANK', x: 534, y: 704, angle: .42, size: 17 }
    ],
    bonus: 20
  },
  {
    title: 'Teutoburg Ambush',
    subtitle: 'Forest cover hides fast raid routes.',
    tone: '#c7f9cc',
    accent: '#3ad16f',
    style: 'forest',
    baseSkin: 'forest',
    unitSkin: 'ambush',
    mapTone: '#274637',
    labels: [
      { text: 'TEUTOBURG FOREST', x: 344, y: 394, angle: -.08, size: 21 },
      { text: 'AMBUSH ROUTE', x: 210, y: 552, angle: .45, size: 17 },
      { text: 'FALLEN LOG TRAP', x: 446, y: 676, angle: -.2, size: 16 }
    ],
    bonus: 16
  }
];
const diceFaces = ['1', '2', '3', '4', '5', '6'];
const diceTiles = [
  { type: 'deploy', icon: 'ATK', label: 'Attack' },
  { type: 'coins', icon: '+8', label: 'Coins' },
  { type: 'fortify', icon: 'DEF', label: 'Guard' },
  { type: 'raid', icon: 'RAID', label: 'Raid' },
  { type: 'boost', icon: 'SPD', label: 'Speed' },
  { type: 'coins', icon: '+12', label: 'Coins' },
  { type: 'deploy', icon: 'ATK', label: 'Attack' },
  { type: 'coins', icon: '+6', label: 'Coins' },
  { type: 'fortify', icon: 'DEF', label: 'Guard' },
  { type: 'boost', icon: 'SPD', label: 'Speed' },
  { type: 'raid', icon: 'RAID', label: 'Raid' },
  { type: 'coins', icon: '+10', label: 'Coins' }
];
const announcerLines = {
  start: 'Guild war is live. Pick a side and push the border.',
  redRound: 'New round. You are fighting for Red Legion.',
  blueRound: 'New round. You are fighting for Blue Alliance.',
  redDeploy: 'Red Legion deploys. Convoys rolling.',
  blueDeploy: 'Blue Alliance deploys. Convoys rolling.',
  redFortify: 'Red Legion fortifies the frontline.',
  blueFortify: 'Blue Alliance fortifies the frontline.',
  redBoost: 'Red Legion boost. Border under attack.',
  blueBoost: 'Blue Alliance boost. Border under attack.',
  ten: 'Ten seconds left. Fight for the border.',
  redWin: 'Red Legion takes the map.',
  blueWin: 'Blue Alliance takes the map.'
};

const audio = {
  ctx: null,
  master: null,
  music: null,
  sfx: null,
  enabled: true,
  voiceEnabled: false,
  started: false,
  musicTimer: null,
  beat: 0,
  drone: [],
  host: {},
  hostMissing: new Set(),
  currentHost: null,
  lastVoice: 0,
  lastImpact: 0
};

const hostClips = {};

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function ensureAudio() {
  if (!audio.enabled) return;
  if (!audio.ctx) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
      audio.enabled = false;
      ui.audioToggle.classList.add('muted');
      ui.audioToggle.textContent = 'No Audio';
      return;
    }
    audio.ctx = new AudioCtor();
    audio.master = audio.ctx.createGain();
    audio.music = audio.ctx.createGain();
    audio.sfx = audio.ctx.createGain();
    audio.master.gain.value = .95;
    audio.music.gain.value = .46;
    audio.sfx.gain.value = .95;
    audio.music.connect(audio.master);
    audio.sfx.connect(audio.master);
    audio.master.connect(audio.ctx.destination);
  }
  if (audio.ctx.state === 'suspended') audio.ctx.resume();
  if (!audio.started) startMusic();
}

function startMusic() {
  if (!audio.ctx || audio.started) return;
  audio.started = true;
  audio.beat = 0;
  startDrone();
  playMusicBeat();
  audio.musicTimer = setInterval(playMusicBeat, 375);
  setHeadline('GUILD WAR LIVE', 1.8);
  playHost('start');
}

function stopMusic() {
  if (audio.musicTimer) clearInterval(audio.musicTimer);
  audio.musicTimer = null;
  audio.started = false;
  for (const node of audio.drone) {
    try { node.stop(); } catch (error) {}
  }
  audio.drone.length = 0;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function toggleAudio() {
  audio.enabled = !audio.enabled;
  ui.audioToggle.classList.toggle('muted', !audio.enabled);
  ui.audioToggle.textContent = audio.enabled ? 'Audio On' : 'Muted';
  if (audio.enabled) {
    ensureAudio();
    sound('select');
    speak('Battle audio online.', true);
  } else {
    stopMusic();
  }
}

function startDrone() {
  const notes = [55, 82.41];
  for (const freq of notes) {
    const osc = audio.ctx.createOscillator();
    const gain = audio.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    gain.gain.value = .004;
    osc.connect(gain);
    gain.connect(audio.music);
    osc.start();
    audio.drone.push(osc);
  }
}

function playMusicBeat() {
  if (!audio.enabled || !audio.ctx) return;
  const strong = audio.beat % 4 === 0;
  const half = audio.beat % 2 === 0;
  if (strong || half) drum(strong ? 118 : 86, strong ? .42 : .28);
  if (audio.beat % 4 === 2) snare();
  if (audio.beat % 2 === 1) noiseHat(.075);
  if (audio.beat % 8 === 0) brassStab(196);
  if (audio.beat % 8 === 3) brassStab(246.94);
  if (audio.beat % 8 === 6) brassStab(220);
  bassPulse(audio.beat % 4 === 0 ? 98 : 130.81);
  audio.beat += 1;
}

function tone(freq, duration, type = 'sine', gainValue = .18, dest = audio.sfx, slideTo = null) {
  if (!audio.enabled || !audio.ctx) return;
  const now = audio.ctx.currentTime;
  const osc = audio.ctx.createOscillator();
  const gain = audio.ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
  gain.gain.setValueAtTime(.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + .015);
  gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(now);
  osc.stop(now + duration + .03);
}

function drum(freq, gainValue) {
  tone(freq, .22, 'sine', gainValue, audio.music, 38);
}

function bassPulse(freq) {
  tone(freq, .18, 'square', .10, audio.music, freq * .88);
}

function brassStab(freq) {
  tone(freq, .16, 'sawtooth', .065, audio.music, freq * .99);
  tone(freq * 1.5, .14, 'triangle', .032, audio.music);
}

function snare() {
  noiseBurst(.11, .12, audio.music, 2600);
  tone(185, .09, 'triangle', .06, audio.music, 150);
}

function noiseHat(gainValue = .08) {
  if (!audio.enabled || !audio.ctx) return;
  const now = audio.ctx.currentTime;
  const buffer = audio.ctx.createBuffer(1, audio.ctx.sampleRate * .08, audio.ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const source = audio.ctx.createBufferSource();
  const filter = audio.ctx.createBiquadFilter();
  const gain = audio.ctx.createGain();
  filter.type = 'highpass';
  filter.frequency.value = 5200;
  gain.gain.setValueAtTime(gainValue, now);
  gain.gain.exponentialRampToValueAtTime(.0001, now + .08);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.music);
  source.start(now);
}

function sound(name) {
  if (!audio.enabled || !audio.ctx || audio.ctx.state === 'suspended') return;
  if (name === 'select') {
    tone(760, .08, 'triangle', .14);
    tone(1020, .1, 'triangle', .08);
  } else if (name === 'deploy') {
    tone(180, .18, 'sawtooth', .25, audio.sfx, 300);
    setTimeout(() => tone(420, .13, 'square', .16), 70);
    noiseBurst(.08, .12, audio.sfx, 1800);
  } else if (name === 'fortify') {
    tone(360, .24, 'triangle', .20);
    setTimeout(() => tone(610, .2, 'triangle', .14), 90);
    setTimeout(() => tone(780, .14, 'triangle', .10), 180);
  } else if (name === 'boost') {
    tone(240, .38, 'sawtooth', .24, audio.sfx, 900);
    setTimeout(() => tone(980, .18, 'square', .16), 160);
    noiseBurst(.16, .18, audio.sfx, 2200);
  } else if (name === 'impact') {
    tone(96, .2, 'sine', .28, audio.sfx, 42);
    noiseBurst(.11, .18, audio.sfx, 1200);
  } else if (name === 'chat') {
    tone(920, .08, 'triangle', .12);
  } else if (name === 'win') {
    [392, 523.25, 659.25].forEach((freq, i) => setTimeout(() => tone(freq, .32, 'triangle', .22), i * 110));
  }
}

function noiseBurst(duration = .12, gainValue = .16, dest = audio.sfx, cutoff = 1400) {
  if (!audio.enabled || !audio.ctx) return;
  const now = audio.ctx.currentTime;
  const buffer = audio.ctx.createBuffer(1, audio.ctx.sampleRate * duration, audio.ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const source = audio.ctx.createBufferSource();
  const filter = audio.ctx.createBiquadFilter();
  const gain = audio.ctx.createGain();
  filter.type = 'lowpass';
  filter.frequency.value = cutoff;
  gain.gain.value = gainValue;
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  source.start(now);
}

function playHost(key) {
  return;
  if (!audio.enabled) return;
  if (audio.hostMissing.has(key)) return;
  let clip = audio.host[key];
  if (!clip && hostClips[key]) {
    clip = new Audio(hostClips[key]);
    clip.preload = 'auto';
    clip.volume = .95;
    clip.addEventListener('error', () => {
      audio.hostMissing.add(key);
      delete audio.host[key];
    }, { once: true });
    audio.host[key] = clip;
  }
  if (!clip) return;
  if (audio.currentHost && audio.currentHost !== clip) {
    audio.currentHost.pause();
    audio.currentHost.currentTime = 0;
  }
  audio.currentHost = clip;
  clip.currentTime = 0;
  if (audio.music) {
    audio.music.gain.cancelScheduledValues(audio.ctx.currentTime);
    audio.music.gain.setTargetAtTime(.18, audio.ctx.currentTime, .04);
  }
  clip.onended = () => {
    if (audio.music && audio.enabled) audio.music.gain.setTargetAtTime(.46, audio.ctx.currentTime, .12);
  };
  clip.play().catch(() => {
    audio.hostMissing.add(key);
    if (audio.music && audio.enabled) audio.music.gain.setTargetAtTime(.46, audio.ctx.currentTime, .12);
  });
}

function speak(text, force = false) {
  if (!audio.voiceEnabled || !audio.enabled || !('speechSynthesis' in window)) return;
  const now = performance.now();
  if (!force && now - audio.lastVoice < 2400) return;
  audio.lastVoice = now;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1.05;
  utterance.pitch = .88;
  utterance.volume = .82;
  window.speechSynthesis.speak(utterance);
}

function teamName(side) {
  return team[side].name;
}

function otherSide(side) {
  return side === 'red' ? 'blue' : 'red';
}

function currentCampaign() {
  if (state.round % 5 !== 0) return null;
  return campaigns[(state.round / 5 - 1) % campaigns.length];
}

function base(id) {
  return bases.find(item => item.id === id);
}

function sideBases(side) {
  return bases.filter(item => item.owner === side);
}

function frontlineBase(side) {
  return side === 'red' ? base('C1') : base('C2');
}

function enemyFrontline(side) {
  return side === 'red' ? base('C2') : base('C1');
}

function setSupport(side) {
  state.supportSide = side;
  ui.redSupportBtn.classList.toggle('active', side === 'red');
  ui.blueSupportBtn.classList.toggle('active', side === 'blue');
  addFeed(`You support ${teamName(side)}.`, side);
  if (audio.ctx) sound('select');
}

function renderDiceBoard() {
  ui.diceBoard.replaceChildren(...diceTiles.map((tile, index) => {
    const item = document.createElement('div');
    item.className = `tile ${tile.type}${index === state.dicePos ? ' active' : ''}`;
    item.innerHTML = `<b>${tile.icon}</b><small>${tile.label}</small>`;
    return item;
  }));
}

function buyRoll() {
  ensureAudio();
  if (state.coins < 10 || state.ending > 0) {
    addFeed('Need 10 coins to buy a roll.', 'gold');
    sound('chat');
    return;
  }
  state.coins -= 10;
  state.rolls += 1;
  addFeed('Bought 1 dice roll. Roll to trigger a board event.', 'gold');
  setHeadline('+1 DICE ROLL', 1.1);
  sound('select');
  syncUi();
}

function clearAutoRollTimer() {
  if (!autoRollTimer) return;
  clearTimeout(autoRollTimer);
  autoRollTimer = 0;
}

function canAutoRoll() {
  return state.rolls > 0 && !state.diceRolling && state.ending <= 0;
}

function setAutoRoll(active, silent = false) {
  const next = Boolean(active) && state.ending <= 0;
  if (next && state.rolls <= 0) {
    state.autoRoll = false;
    clearAutoRollTimer();
    if (!silent) {
      addFeed('Buy rolls first, then Auto can keep throwing.', 'gold');
      sound('chat');
    }
    syncUi();
    return;
  }
  if (state.autoRoll === next) return;
  state.autoRoll = next;
  if (next) {
    if (!silent) addFeed('Auto Roll on. It will use available rolls only.', 'gold');
    scheduleAutoRoll(120);
  } else {
    clearAutoRollTimer();
    if (!silent) addFeed('Auto Roll off.', 'gold');
  }
  syncUi();
}

function scheduleAutoRoll(delay = 360) {
  clearAutoRollTimer();
  if (!state.autoRoll || state.ending > 0) return;
  autoRollTimer = setTimeout(() => {
    autoRollTimer = 0;
    if (state.ending > 0) {
      setAutoRoll(false, true);
      stopHoldRoll();
      return;
    }
    if (state.rolls <= 0) {
      if (state.autoRoll) {
        state.autoRoll = false;
        addFeed('Auto Roll stopped. Buy more rolls to continue.', 'gold');
        sound('chat');
      }
      stopHoldRoll();
      syncUi();
      return;
    }
    if (canAutoRoll()) {
      rollDice(true);
    } else {
      scheduleAutoRoll(160);
    }
  }, delay);
}

function stopHoldRoll() {
  clearTimeout(holdRollTimer);
  holdRollTimer = 0;
  if (!holdRollActive) return;
  holdRollActive = false;
  ui.rollDiceBtn.classList.remove('holding');
  syncUi();
}

function rollDice(fromAuto = false) {
  ensureAudio();
  if (state.diceRolling || state.ending > 0) return;
  if (state.rolls <= 0) {
    addFeed('No rolls left. Spend coins to buy another roll.', 'gold');
    sound('chat');
    if (fromAuto) setAutoRoll(false, true);
    return;
  }
  state.rolls -= 1;
  state.diceRolling = true;
  ui.rollDiceBtn.disabled = true;
  ui.buyRollBtn.disabled = true;
  const value = Math.floor(rand(1, 7));
  state.diceValue = value;
  setHeadline(`ROLL ${value}`, 1.1);
  sound('boost');
  let step = 0;
  const tick = setInterval(() => {
    step += 1;
    state.dicePos = (state.dicePos + 1) % diceTiles.length;
    ui.diceFace.textContent = diceFaces[(step - 1) % 6];
    renderDiceBoard();
    sound('select');
    if (step >= value) {
      clearInterval(tick);
      state.diceRolling = false;
      ui.diceFace.textContent = diceFaces[value - 1];
      applyDiceTile(diceTiles[state.dicePos]);
      syncUi();
      if (state.autoRoll) scheduleAutoRoll(420);
    }
  }, 210);
}

function applyDiceTile(tile) {
  const side = state.supportSide;
  if (tile.type === 'deploy') {
    useDeploy(true);
  } else if (tile.type === 'fortify') {
    useFortify(true);
  } else if (tile.type === 'boost') {
    useBoost(true);
  } else if (tile.type === 'coins') {
    const reward = Number(tile.icon.replace('+', '')) || 8;
    state.coins = Math.min(999, state.coins + reward);
    addFeed(`Dice reward: +${reward} coins. Buy more rolls.`, 'gold');
    setHeadline(`+${reward} COINS`, 1.2);
    burst(frontlineBase(side).x, frontlineBase(side).y, '#ffd166', 24);
    sound('win');
  } else if (tile.type === 'raid') {
    deploy(side, 3, 1.45);
    state.territory = clamp(state.territory + (side === 'blue' ? .014 : -.014), .08, .92);
    addFeed(`Raid tile: ${teamName(side)} launches a fast strike.`, side);
    setHeadline('RAID STRIKE', 1.2);
    sound('deploy');
  }
  renderDiceBoard();
}

function addFeed(text, type = '') {
  const msg = document.createElement('div');
  msg.className = `msg ${type}`;
  msg.textContent = text;
  ui.feed.prepend(msg);
  while (ui.feed.children.length > 6) ui.feed.lastElementChild.remove();
  setTimeout(() => msg.remove(), 4700);
}

function setHeadline(text, life = 1.8) {
  state.headline = text;
  state.headlineLife = life;
}

function addPulse(x, y, side, radius = 95, life = .95) {
  state.pulses.push({ x, y, side, radius, life, max: life });
}

function burst(x, y, color, count = 18) {
  for (let i = 0; i < count; i += 1) {
    state.fx.push({
      x,
      y,
      vx: rand(-110, 110),
      vy: rand(-120, 65),
      life: rand(.28, .78),
      max: .78,
      color,
      r: rand(2, 6)
    });
  }
}

function spawnConvoy(side, from, to, strength = 1) {
  state.convoys.push({
    side,
    from: from.id,
    to: to.id,
    x: from.x,
    y: from.y,
    t: 0,
    speed: rand(.22, .32) * strength,
    strength
  });
}

function deploy(side, amount = 5, strength = 1) {
  const starts = sideBases(side).filter(item => item.id !== (side === 'red' ? 'C1' : 'C2'));
  const target = enemyFrontline(side);
  for (let i = 0; i < amount; i += 1) {
    const from = starts[Math.floor(rand(0, starts.length))];
    spawnConvoy(side, from, target, strength);
  }
}

function useDeploy(fromDice = false) {
  if ((!fromDice && state.coins < 8) || state.ending > 0) return;
  ensureAudio();
  const side = state.supportSide;
  if (!fromDice) state.coins -= 8;
  state[`${side}Boost`] = clamp(state[`${side}Boost`] + .18, 0, 1.4);
  deploy(side, 6, 1.2);
  setHeadline('DEPLOY TROOPS');
  addFeed(`${fromDice ? 'Dice event' : 'Deploy'}: ${teamName(side)} convoys are moving.`, side);
  sound('deploy');
  playHost(`${side}Deploy`);
  speak(announcerLines[`${side}Deploy`]);
}

function useFortify(fromDice = false) {
  if ((!fromDice && state.coins < 6) || state.ending > 0) return;
  ensureAudio();
  const side = state.supportSide;
  const home = frontlineBase(side);
  if (!fromDice) state.coins -= 6;
  state[`${side}Shield`] = 5.8;
  addPulse(home.x, home.y, side, 125, 1.3);
  burst(home.x, home.y, team[side].edge, 28);
  setHeadline('FORTIFY OUTPOST');
  addFeed(`${fromDice ? 'Dice event' : 'Fortify'}: ${teamName(side)} frontline is shielded.`, side);
  sound('fortify');
  playHost(`${side}Fortify`);
  speak(announcerLines[`${side}Fortify`]);
}

function useBoost(fromDice = false) {
  if ((!fromDice && state.coins < 10) || state.ending > 0) return;
  ensureAudio();
  const side = state.supportSide;
  if (!fromDice) state.coins -= 10;
  state[`${side}Boost`] = clamp(state[`${side}Boost`] + .42, 0, 1.8);
  state.territory = clamp(state.territory + (side === 'blue' ? .025 : -.025), .08, .92);
  deploy(side, 3, 1.65);
  addPulse(enemyFrontline(side).x, enemyFrontline(side).y, side, 150, 1.1);
  setHeadline('BORDER UNDER ATTACK');
  addFeed(`${fromDice ? 'Dice event' : 'Boost'}: ${teamName(side)} pushes the border.`, 'gold');
  sound('boost');
  playHost(`${side}Boost`);
  speak(announcerLines[`${side}Boost`], true);
}

function aiMove() {
  const side = otherSide(state.supportSide);
  if (Math.random() > .42) {
    state[`${side}Boost`] = clamp(state[`${side}Boost`] + .22, 0, 1.5);
    deploy(side, 4, 1.1);
    addFeed(`${names[Math.floor(rand(0, names.length))]} deployed for ${teamName(side)}.`, side);
  } else {
    const home = frontlineBase(side);
    state[`${side}Shield`] = 4.2;
    addPulse(home.x, home.y, side, 110, 1.2);
    addFeed(`${teamName(side)} fortified the frontline.`, side);
  }
}

function resetRound(winner) {
  setAutoRoll(false, true);
  stopHoldRoll();
  state.ending = 3;
  const supportWon = state.supportSide === winner;
  state.coins += supportWon ? 25 : 10;
  setHeadline(`${teamName(winner).toUpperCase()} WINS`, 3);
  addFeed(`${teamName(winner)} wins. ${supportWon ? 'Support bonus +25 coins.' : 'Participation bonus +10 coins.'}`, supportWon ? 'gold' : winner);
  sound('win');
  playHost(`${winner}Win`);
  speak(announcerLines[`${winner}Win`], true);
}

function resetRoundState(round) {
  setAutoRoll(false, true);
  stopHoldRoll();
  state.round = round;
  state.timeLeft = 60;
  state.warnedTen = false;
  state.territory = .5;
  state.redPower = 50;
  state.bluePower = 50;
  state.redShield = 0;
  state.blueShield = 0;
  state.redBoost = 0;
  state.blueBoost = 0;
  state.coinTick = 0;
  state.aiSkill = 4;
  state.convoyTick = 0;
  state.feed = 0;
  state.ending = 0;
  state.shake = 0;
  state.headlineLife = 0;
  state.convoys.length = 0;
  state.fx.length = 0;
  state.pulses.length = 0;
  state.rolls = Math.max(state.rolls, currentCampaign() ? 2 : 1);
  state.diceRolling = false;
  state.autoRoll = false;
  setSupport(round % 2 === 0 ? 'red' : 'blue');
  renderDiceBoard();
  deploy('red', 5, 1);
  deploy('blue', 5, 1);
  const campaign = currentCampaign();
  if (campaign) {
    setHeadline(campaign.title.toUpperCase(), 2);
    addFeed(`Test jump: ${campaign.title}.`, 'gold');
  }
  syncUi();
}

function startNextRound() {
  setAutoRoll(false, true);
  stopHoldRoll();
  state.round += 1;
  const campaign = currentCampaign();
  state.timeLeft = 60;
  state.warnedTen = false;
  state.territory = .5;
  state.redPower = 50;
  state.bluePower = 50;
  state.redShield = 0;
  state.blueShield = 0;
  state.redBoost = 0;
  state.blueBoost = 0;
  state.coinTick = 0;
  state.convoys.length = 0;
  state.fx.length = 0;
  state.pulses.length = 0;
  state.ending = 0;
  state.rolls = Math.max(state.rolls, campaign ? 2 : 1);
  if (campaign) {
    state.coins = Math.min(999, state.coins + campaign.bonus);
  }
  state.diceRolling = false;
  state.autoRoll = false;
  setSupport(state.round % 2 === 0 ? 'red' : 'blue');
  if (campaign) {
    addFeed(`Campaign Round: ${campaign.title}. Bonus +${campaign.bonus} coins.`, 'gold');
    addFeed(campaign.subtitle, 'gold');
    setHeadline(campaign.title.toUpperCase(), 2.5);
  }
  playHost(state.supportSide === 'red' ? 'redRound' : 'blueRound');
  speak(state.supportSide === 'red' ? announcerLines.redRound : announcerLines.blueRound, true);
  deploy('red', 4, 1);
  deploy('blue', 4, 1);
}

function update(dt) {
  if (state.ending > 0) {
    state.ending -= dt;
    updateFx(dt);
    if (state.ending <= 0) startNextRound();
    return;
  }

  state.timeLeft -= dt;
  state.coinTick -= dt;
  state.aiSkill -= dt;
  state.convoyTick -= dt;
  state.feed -= dt;
  state.redShield = Math.max(0, state.redShield - dt);
  state.blueShield = Math.max(0, state.blueShield - dt);
  state.redBoost = Math.max(0, state.redBoost - dt * .16);
  state.blueBoost = Math.max(0, state.blueBoost - dt * .16);
  state.headlineLife = Math.max(0, state.headlineLife - dt);
  state.shake = Math.max(0, state.shake - dt);

  if (!state.warnedTen && state.timeLeft <= 10) {
    state.warnedTen = true;
    setHeadline('FINAL PUSH', 1.6);
    playHost('ten');
    speak(announcerLines.ten, true);
  }

  if (state.coinTick <= 0) {
    state.coinTick = 2;
    state.coins = Math.min(999, state.coins + 1);
  }

  if (state.convoyTick <= 0) {
    state.convoyTick = rand(1.3, 2.2);
    deploy('red', 1, .9 + state.redBoost);
    deploy('blue', 1, .9 + state.blueBoost);
  }

  if (state.aiSkill <= 0) {
    state.aiSkill = rand(4.2, 7);
    aiMove();
  }

  if (state.feed <= 0) {
    state.feed = rand(1.4, 2.6);
    const type = Math.random() > .5 ? 'blue' : 'red';
    addFeed(`${names[Math.floor(rand(0, names.length))]}: ${comments[Math.floor(rand(0, comments.length))]}`, type);
  }

  updateConvoys(dt);
  updateTerritory(dt);
  updateFx(dt);

  if (state.timeLeft <= 0 || state.territory <= .07 || state.territory >= .93) {
    resetRound(state.territory >= .5 ? 'blue' : 'red');
  }
}

function updateConvoys(dt) {
  for (const convoy of state.convoys) {
    convoy.t += convoy.speed * dt;
    const from = base(convoy.from);
    const to = base(convoy.to);
    const arc = Math.sin(clamp(convoy.t, 0, 1) * Math.PI) * 24;
    convoy.x = from.x + (to.x - from.x) * convoy.t;
    convoy.y = from.y + (to.y - from.y) * convoy.t - arc;
    if (convoy.t >= 1 && !convoy.done) {
      convoy.done = true;
      const shield = to.owner === 'red' ? state.redShield : state.blueShield;
      const impact = .011 * convoy.strength * (shield > 0 && to.owner !== convoy.side ? .45 : 1);
      state.territory = clamp(state.territory + (convoy.side === 'blue' ? impact : -impact), .05, .95);
      burst(to.x, to.y, team[convoy.side].edge, 12);
      addPulse(to.x, to.y, convoy.side, 70, .55);
      state.shake = .08;
      if (performance.now() - audio.lastImpact > 140) {
        audio.lastImpact = performance.now();
        sound('impact');
      }
    }
  }
  state.convoys = state.convoys.filter(convoy => convoy.t < 1.08).slice(-90);
}

function updateTerritory(dt) {
  const redField = state.convoys.filter(c => c.side === 'red').length + state.redBoost * 9 + (state.redShield > 0 ? 2 : 0);
  const blueField = state.convoys.filter(c => c.side === 'blue').length + state.blueBoost * 9 + (state.blueShield > 0 ? 2 : 0);
  state.territory = clamp(state.territory + (blueField - redField) * .00011 * dt, .05, .95);
  state.bluePower = Math.round(state.territory * 100);
  state.redPower = 100 - state.bluePower;
}

function updateFx(dt) {
  for (const p of state.fx) {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 165 * dt;
  }
  for (const pulse of state.pulses) pulse.life -= dt;
  state.fx = state.fx.filter(p => p.life > 0).slice(-320);
  state.pulses = state.pulses.filter(p => p.life > 0).slice(-30);
}

function draw() {
  const sx = state.shake ? rand(-7, 7) * state.shake * 6 : 0;
  const sy = state.shake ? rand(-7, 7) * state.shake * 6 : 0;
  ctx.save();
  ctx.translate(sx, sy);
  drawMap();
  drawRoutes();
  drawBorder();
  drawBases();
  drawConvoys();
  drawPulses();
  drawFx();
  drawHeadline();
  ctx.restore();
}

function drawMap() {
  const campaign = currentCampaign();
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, campaign ? mix('#2f3044', campaign.mapTone, .45) : '#2f3044');
  bg.addColorStop(.58, campaign ? mix('#333248', campaign.mapTone, .35) : '#333248');
  bg.addColorStop(1, '#242033');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  for (const region of regions) drawRegion(region);
  drawMountains();
  drawCampaignLayer();
  drawMiniHud();
}

function drawCampaignLayer() {
  const campaign = currentCampaign();
  if (!campaign) return;

  ctx.save();
  drawCampaignBanner(campaign);
  if (campaign.style === 'river') drawRubiconElements(campaign);
  if (campaign.style === 'siege') drawSiegeElements(campaign);
  if (campaign.style === 'flanks') drawFlankElements(campaign);
  if (campaign.style === 'forest') drawForestElements(campaign);
  drawCampaignLabels(campaign);
  ctx.restore();
}

function drawCampaignLabels(campaign) {
  for (const label of campaign.labels) {
    drawMapLabel(label.text, label.x, label.y, label.angle, label.size, campaign.tone);
  }
}

function drawMapLabel(text, x, y, angle = 0, size = 18, color = '#fff') {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `900 ${size}px Arial Black, Arial`;
  ctx.lineWidth = 7;
  ctx.strokeStyle = 'rgba(3, 5, 10, .86)';
  ctx.fillStyle = color;
  ctx.globalAlpha = .9;
  ctx.strokeText(text, 0, 0);
  ctx.fillText(text, 0, 0);
  ctx.globalAlpha = .5;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const width = ctx.measureText(text).width;
  ctx.beginPath();
  ctx.moveTo(-width / 2, size * .82);
  ctx.lineTo(width / 2, size * .82);
  ctx.stroke();
  ctx.restore();
}

function drawCampaignBanner(campaign) {
  ctx.save();
  ctx.globalAlpha = .92;
  ctx.fillStyle = 'rgba(7, 10, 18, .58)';
  ctx.strokeStyle = campaign.tone;
  ctx.lineWidth = 2;
  ctx.roundRect(42, 172, 390, 58, 10);
  ctx.fill();
  ctx.globalAlpha = .55;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = campaign.tone;
  ctx.font = '900 22px Arial Black, Arial';
  ctx.textAlign = 'left';
  ctx.fillText('CAMPAIGN ROUND', 62, 196);
  ctx.fillStyle = '#fff';
  ctx.font = '800 18px Arial';
  ctx.fillText(campaign.title, 62, 218);
  ctx.fillStyle = 'rgba(255,255,255,.74)';
  ctx.textAlign = 'left';
  ctx.font = '700 14px Arial';
  ctx.fillText('+BONUS COINS', 306, 211);
  ctx.restore();
}

function drawStandard(x, y, side = 'red') {
  const cfg = team[side];
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = '#f3d49b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, -44);
  ctx.lineTo(0, 32);
  ctx.stroke();
  ctx.fillStyle = cfg.color;
  ctx.strokeStyle = cfg.edge;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(34, -26);
  ctx.lineTo(0, -14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = '900 11px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(side === 'red' ? 'SPQR' : 'EAGLE', 16, -25);
  ctx.restore();
}

function drawArrow(fromX, fromY, toX, toY, color) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.quadraticCurveTo((fromX + toX) / 2, (fromY + toY) / 2 - 80, toX, toY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.translate(toX, toY);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-22, -10);
  ctx.lineTo(-16, 0);
  ctx.lineTo(-22, 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawBridge(x, y, rotation = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillStyle = 'rgba(108, 73, 38, .9)';
  ctx.strokeStyle = 'rgba(255, 226, 174, .8)';
  ctx.lineWidth = 3;
  ctx.fillRect(-58, -14, 116, 28);
  ctx.strokeRect(-58, -14, 116, 28);
  ctx.strokeStyle = 'rgba(38, 25, 17, .75)';
  for (let i = -48; i <= 48; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, -14);
    ctx.lineTo(i, 14);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRomanShield(x, y, side, scale = 1) {
  const cfg = team[side];
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = cfg.color;
  ctx.strokeStyle = '#ffe2a8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.quadraticCurveTo(25, -18, 18, 24);
  ctx.quadraticCurveTo(0, 36, -18, 24);
  ctx.quadraticCurveTo(-25, -18, 0, -24);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#ffe2a8';
  ctx.font = '900 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(side === 'red' ? 'XIII' : 'X', 0, 6);
  ctx.restore();
}

function drawWatchTower(x, y, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(82, 50, 24, .96)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.fillRect(-15, -18, 30, 28);
  ctx.strokeRect(-15, -18, 30, 28);
  ctx.beginPath();
  ctx.moveTo(-21, -18);
  ctx.lineTo(0, -36);
  ctx.lineTo(21, -18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.45)';
  ctx.beginPath();
  ctx.moveTo(-18, 22);
  ctx.lineTo(-10, 10);
  ctx.moveTo(18, 22);
  ctx.lineTo(10, 10);
  ctx.stroke();
  ctx.restore();
}

function drawPalisade(x, y, rx, ry, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  for (let i = 0; i < 28; i += 1) {
    const a = i / 28 * Math.PI * 2;
    const px = x + Math.cos(a) * rx;
    const py = y + Math.sin(a) * ry;
    ctx.beginPath();
    ctx.moveTo(px, py - 12);
    ctx.lineTo(px, py + 12);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCrescent(x, y, radius, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 9;
  ctx.globalAlpha = .7;
  ctx.beginPath();
  ctx.arc(x, y, radius, Math.PI * .12, Math.PI * .88);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y + 22, radius * .72, Math.PI * 1.14, Math.PI * 1.86);
  ctx.stroke();
  ctx.restore();
}

function drawCavalryMark(x, y, side, scale = 1) {
  const cfg = team[side];
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = cfg.color;
  ctx.strokeStyle = '#fff4c8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 2, 28, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(18, -6);
  ctx.lineTo(40, -24);
  ctx.lineTo(34, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.arc(-14, 17, 5, 0, Math.PI * 2);
  ctx.arc(16, 17, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFallenLogs(x, y, rotation = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.strokeStyle = 'rgba(94, 55, 29, .95)';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-54, -10);
  ctx.lineTo(52, 18);
  ctx.moveTo(-40, 26);
  ctx.lineTo(44, -24);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(220, 176, 112, .8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-54, -10);
  ctx.lineTo(52, 18);
  ctx.moveTo(-40, 26);
  ctx.lineTo(44, -24);
  ctx.stroke();
  ctx.restore();
}

function drawAmbushMask(x, y, side, scale = 1) {
  const cfg = team[side];
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = cfg.dark;
  ctx.strokeStyle = '#c7f9cc';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(25, -4);
  ctx.lineTo(16, 28);
  ctx.lineTo(-16, 28);
  ctx.lineTo(-25, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#c7f9cc';
  ctx.beginPath();
  ctx.arc(-8, 0, 4, 0, Math.PI * 2);
  ctx.arc(8, 0, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRubiconElements(campaign) {
  ctx.save();
  ctx.strokeStyle = campaign.tone;
  ctx.lineWidth = 17;
  ctx.globalAlpha = .22;
  ctx.beginPath();
  ctx.moveTo(204, 176);
  ctx.bezierCurveTo(266, 332, 198, 476, 304, 616);
  ctx.bezierCurveTo(402, 752, 336, 888, 442, 1080);
  ctx.stroke();
  ctx.lineWidth = 8;
  ctx.globalAlpha = .72;
  ctx.beginPath();
  ctx.moveTo(190, 180);
  ctx.bezierCurveTo(250, 330, 192, 468, 292, 610);
  ctx.bezierCurveTo(390, 752, 326, 880, 430, 1070);
  ctx.stroke();
  ctx.globalAlpha = .95;
  drawBridge(300, 580, -.28);
  drawStandard(248, 436, 'red');
  drawStandard(410, 612, 'blue');
  drawRomanShield(334, 525, 'red', 1.1);
  drawRomanShield(382, 646, 'blue', 1.1);
  ctx.restore();
}

function drawSiegeElements(campaign) {
  ctx.save();
  ctx.strokeStyle = campaign.tone;
  ctx.lineWidth = 6;
  ctx.globalAlpha = .6;
  ctx.setLineDash([18, 9]);
  ctx.beginPath();
  ctx.ellipse(394, 632, 132, 100, -.12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(394, 632, 206, 162, -.12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = campaign.accent;
  for (const [x, y] of [[276, 552], [510, 540], [256, 710], [540, 722]]) {
    drawWatchTower(x, y, campaign.accent);
  }
  drawPalisade(394, 632, 156, 118, campaign.tone);
  ctx.restore();
}

function drawFlankElements(campaign) {
  ctx.save();
  ctx.globalAlpha = .72;
  drawArrow(112, 505, 348, 574, 'rgba(255, 209, 102, .82)');
  drawArrow(610, 512, 392, 584, 'rgba(255, 209, 102, .82)');
  drawArrow(156, 820, 350, 690, 'rgba(255, 77, 82, .76)');
  drawArrow(600, 832, 420, 710, 'rgba(53, 185, 255, .76)');
  ctx.globalAlpha = .96;
  drawCrescent(360, 618, 178, campaign.tone);
  drawCavalryMark(172, 720, 'red', 1.15);
  drawCavalryMark(560, 720, 'blue', 1.15);
  ctx.restore();
}

function drawForestElements(campaign) {
  ctx.save();
  ctx.globalAlpha = .7;
  ctx.fillStyle = campaign.tone;
  for (let i = 0; i < 28; i += 1) {
    const x = 70 + (i * 97) % 590;
    const y = 255 + (i * 113) % 780;
    ctx.beginPath();
    ctx.moveTo(x, y - 26);
    ctx.lineTo(x + 24, y + 20);
    ctx.lineTo(x - 24, y + 20);
    ctx.closePath();
    ctx.fill();
  }
  drawArrow(112, 360, 324, 560, 'rgba(199, 249, 204, .78)');
  drawArrow(650, 380, 444, 620, 'rgba(199, 249, 204, .78)');
  ctx.globalAlpha = .9;
  drawFallenLogs(338, 570, -.24);
  drawFallenLogs(442, 700, .18);
  drawAmbushMask(248, 474, 'red', 1.1);
  drawAmbushMask(520, 540, 'blue', 1.1);
  ctx.restore();
}

function drawRegion(region) {
  const owner = region.id === 'r6'
    ? (state.territory > .52 ? 'blue' : state.territory < .48 ? 'red' : region.owner)
    : region.owner;
  const tint = team[owner] ? team[owner].color : region.terrain;
  ctx.save();
  ctx.beginPath();
  region.pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 150, W, 1100);
  grad.addColorStop(0, mix(region.terrain, tint, .32));
  grad.addColorStop(1, mix(region.terrain, '#1b2034', .18));
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = team[owner]?.edge || 'rgba(255,255,255,.45)';
  ctx.lineWidth = 4;
  ctx.globalAlpha = .85;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.clip();
  ctx.fillStyle = 'rgba(255,255,255,.06)';
  for (let i = 0; i < 14; i += 1) {
    const x = ((region.id.charCodeAt(1) * 41 + i * 83) % W);
    const y = 190 + ((region.id.charCodeAt(1) * 73 + i * 97) % 920);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 18, y + 36);
    ctx.lineTo(x - 16, y + 36);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function mix(a, b, amount) {
  const ah = parseInt(a.replace('#', ''), 16);
  const bh = parseInt(b.replace('#', ''), 16);
  const ar = ah >> 16, ag = ah >> 8 & 255, ab = ah & 255;
  const br = bh >> 16, bg = bh >> 8 & 255, bb = bh & 255;
  const rr = ar + amount * (br - ar);
  const rg = ag + amount * (bg - ag);
  const rb = ab + amount * (bb - ab);
  return `rgb(${rr | 0},${rg | 0},${rb | 0})`;
}

function drawMountains() {
  ctx.fillStyle = 'rgba(47, 34, 68, .25)';
  for (let i = 0; i < 24; i += 1) {
    const x = 20 + (i * 71) % 660;
    const y = 260 + (i * 137) % 810;
    ctx.beginPath();
    ctx.moveTo(x, y + 30);
    ctx.lineTo(x + 18, y);
    ctx.lineTo(x + 38, y + 30);
    ctx.closePath();
    ctx.fill();
  }
}

function drawRoutes() {
  ctx.save();
  ctx.setLineDash([8, 10]);
  ctx.lineCap = 'round';
  for (const [fromId, toId] of routes) {
    const from = base(fromId);
    const to = base(toId);
    ctx.strokeStyle = 'rgba(255,255,255,.62)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo((from.x + to.x) / 2, (from.y + to.y) / 2 - 26, to.x, to.y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBorder() {
  const x = 360 + (state.territory - .5) * 360;
  const glow = state.redBoost + state.blueBoost + Math.sin(performance.now() / 120) * .2;
  ctx.save();
  ctx.lineWidth = 9 + glow * 2;
  ctx.strokeStyle = state.territory >= .5 ? 'rgba(96,229,255,.86)' : 'rgba(255,100,100,.86)';
  ctx.shadowColor = ctx.strokeStyle;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(x - 24, 190);
  ctx.bezierCurveTo(x + 40, 330, x - 60, 460, x + 12, 590);
  ctx.bezierCurveTo(x + 80, 710, x - 40, 830, x + 42, 990);
  ctx.stroke();
  ctx.restore();
}

function drawBases() {
  for (const item of bases) drawBase(item);
}

function drawBase(item) {
  const campaign = currentCampaign();
  const cfg = team[item.owner];
  const active = item.id === 'C1' && state.redShield > 0 || item.id === 'C2' && state.blueShield > 0;
  ctx.save();
  ctx.translate(item.x, item.y);
  ctx.fillStyle = 'rgba(0,0,0,.33)';
  ctx.beginPath();
  ctx.ellipse(0, 34, 36, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  if (campaign?.baseSkin === 'roman') {
    drawRomanBaseIcon(cfg, item.owner, active);
  } else if (campaign?.baseSkin === 'fort') {
    drawFortBaseIcon(cfg, item.owner, active);
  } else if (campaign?.baseSkin === 'camp') {
    drawCampBaseIcon(cfg, item.owner, active);
  } else if (campaign?.baseSkin === 'forest') {
    drawForestBaseIcon(cfg, item.owner, active);
  } else {
    drawModernBaseIcon(cfg, item.owner, active);
  }
  ctx.font = '700 14px Arial';
  ctx.fillText(item.id, 0, 56);
  ctx.font = '11px Arial';
  ctx.fillText(`Lv.${item.level}`, 0, 70);
  ctx.restore();
}

function drawModernBaseIcon(cfg, owner, active) {
  ctx.fillStyle = cfg.dark;
  ctx.strokeStyle = cfg.edge;
  ctx.lineWidth = active ? 6 : 4;
  ctx.beginPath();
  ctx.moveTo(0, -34);
  ctx.lineTo(28, -16);
  ctx.lineTo(22, 22);
  ctx.lineTo(0, 38);
  ctx.lineTo(-22, 22);
  ctx.lineTo(-28, -16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = cfg.color;
  ctx.fillRect(-13, -17, 26, 24);
  ctx.fillStyle = '#fff';
  ctx.font = '700 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(owner === 'red' ? 'RL' : 'BA', 0, 1);
}

function drawRomanBaseIcon(cfg, owner, active) {
  ctx.save();
  ctx.translate(22, -36);
  ctx.strokeStyle = '#ffe2a8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -16);
  ctx.lineTo(0, 24);
  ctx.stroke();
  ctx.fillStyle = cfg.color;
  ctx.strokeStyle = '#ffe2a8';
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.lineTo(34, -5);
  ctx.lineTo(0, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#fff4c8';
  ctx.font = '900 8px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(owner === 'red' ? 'SPQR' : 'AUX', 17, -4);
  ctx.restore();
  ctx.fillStyle = cfg.dark;
  ctx.strokeStyle = '#ffe2a8';
  ctx.lineWidth = active ? 6 : 4;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.quadraticCurveTo(34, -26, 26, 22);
  ctx.quadraticCurveTo(0, 42, -26, 22);
  ctx.quadraticCurveTo(-34, -26, 0, -38);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = cfg.color;
  ctx.fillRect(-16, -16, 32, 25);
  ctx.fillStyle = '#ffe2a8';
  ctx.font = '900 13px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(owner === 'red' ? 'SPQR' : 'X', 0, 2);
}

function drawFortBaseIcon(cfg, owner, active) {
  ctx.save();
  ctx.strokeStyle = '#ffdca3';
  ctx.lineWidth = 3;
  for (let i = -36; i <= 36; i += 12) {
    ctx.beginPath();
    ctx.moveTo(i, 26);
    ctx.lineTo(i, 44);
    ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle = '#6b4726';
  ctx.strokeStyle = active ? cfg.edge : '#ffdca3';
  ctx.lineWidth = active ? 6 : 4;
  ctx.fillRect(-28, -24, 56, 46);
  ctx.strokeRect(-28, -24, 56, 46);
  ctx.fillStyle = cfg.color;
  for (let i = -24; i <= 18; i += 14) ctx.fillRect(i, -36, 10, 18);
  ctx.fillStyle = '#fff3c6';
  ctx.font = '900 14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(owner === 'red' ? 'I' : 'II', 0, 3);
}

function drawCampBaseIcon(cfg, owner, active) {
  ctx.save();
  ctx.strokeStyle = '#ffe7b3';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-30, -30);
  ctx.lineTo(-30, 30);
  ctx.moveTo(30, -30);
  ctx.lineTo(30, 30);
  ctx.stroke();
  ctx.fillStyle = cfg.color;
  ctx.beginPath();
  ctx.moveTo(-30, -30);
  ctx.lineTo(-5, -22);
  ctx.lineTo(-30, -14);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(30, -30);
  ctx.lineTo(5, -22);
  ctx.lineTo(30, -14);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = cfg.dark;
  ctx.strokeStyle = active ? cfg.edge : '#ffe7b3';
  ctx.lineWidth = active ? 6 : 4;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(34, 22);
  ctx.lineTo(-34, 22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = cfg.color;
  ctx.fillRect(-18, 2, 36, 20);
  ctx.fillStyle = '#fff3c6';
  ctx.font = '900 13px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(owner === 'red' ? 'L' : 'CAV', 0, 16);
}

function drawForestBaseIcon(cfg, owner, active) {
  ctx.save();
  ctx.fillStyle = 'rgba(199, 249, 204, .82)';
  for (const [x, y] of [[-28, -34], [0, -48], [28, -34]]) {
    ctx.beginPath();
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x + 16, y + 16);
    ctx.lineTo(x - 16, y + 16);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
  ctx.fillStyle = cfg.dark;
  ctx.strokeStyle = active ? cfg.edge : '#c7f9cc';
  ctx.lineWidth = active ? 6 : 4;
  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.lineTo(34, -8);
  ctx.lineTo(22, 34);
  ctx.lineTo(-22, 34);
  ctx.lineTo(-34, -8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#c7f9cc';
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.lineTo(18, 12);
  ctx.lineTo(-18, 12);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = cfg.color;
  ctx.fillRect(-13, 14, 26, 10);
  ctx.fillStyle = '#fff';
  ctx.font = '900 11px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(owner === 'red' ? 'AMB' : 'SCOUT', 0, 3);
}

function drawConvoys() {
  const campaign = currentCampaign();
  for (const convoy of state.convoys) {
    const cfg = team[convoy.side];
    ctx.save();
    ctx.translate(convoy.x, convoy.y);
    ctx.rotate(convoy.side === 'red' ? .08 : -.08);
    if (campaign?.unitSkin === 'legion') {
      drawLegionUnit(cfg, convoy.side);
    } else if (campaign?.unitSkin === 'siege') {
      drawSiegeUnit(cfg);
    } else if (campaign?.unitSkin === 'cavalry') {
      drawCavalryUnit(cfg);
    } else if (campaign?.unitSkin === 'ambush') {
      drawAmbushUnit(cfg);
    } else {
      drawModernUnit(cfg);
    }
    ctx.restore();
  }
}

function drawModernUnit(cfg) {
  ctx.fillStyle = 'rgba(0,0,0,.32)';
  ctx.fillRect(-15, 8, 34, 8);
  ctx.fillStyle = cfg.color;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.fillRect(-16, -8, 32, 18);
  ctx.strokeRect(-16, -8, 32, 18);
  ctx.fillStyle = '#111827';
  ctx.fillRect(-9, 10, 7, 5);
  ctx.fillRect(7, 10, 7, 5);
}

function drawLegionUnit(cfg, side) {
  ctx.save();
  ctx.scale(1.18, 1.18);
  ctx.fillStyle = 'rgba(0,0,0,.32)';
  ctx.fillRect(-18, 12, 38, 7);
  ctx.fillStyle = cfg.color;
  ctx.strokeStyle = '#ffe2a8';
  ctx.lineWidth = 2;
  for (let i = -15; i <= 15; i += 10) {
    ctx.beginPath();
    ctx.moveTo(i, -16);
    ctx.quadraticCurveTo(i + 9, -8, i + 5, 12);
    ctx.quadraticCurveTo(i, 19, i - 5, 12);
    ctx.quadraticCurveTo(i - 9, -8, i, -16);
    ctx.fill();
    ctx.stroke();
  }
  ctx.fillStyle = '#ffe2a8';
  ctx.font = '900 8px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(side === 'red' ? 'SPQR' : 'X', 0, 2);
  ctx.strokeStyle = '#ffe2a8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-24, -24);
  ctx.lineTo(-4, -2);
  ctx.moveTo(24, -24);
  ctx.lineTo(4, -2);
  ctx.stroke();
  ctx.restore();
}

function drawSiegeUnit(cfg) {
  ctx.save();
  ctx.scale(1.18, 1.18);
  ctx.fillStyle = 'rgba(0,0,0,.34)';
  ctx.fillRect(-18, 14, 40, 7);
  ctx.fillStyle = '#7a4d24';
  ctx.strokeStyle = '#ffdca3';
  ctx.lineWidth = 2;
  ctx.fillRect(-17, -18, 34, 30);
  ctx.strokeRect(-17, -18, 34, 30);
  ctx.fillStyle = cfg.color;
  ctx.fillRect(-12, -28, 24, 11);
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.arc(-10, 15, 5, 0, Math.PI * 2);
  ctx.arc(10, 15, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffdca3';
  ctx.font = '900 8px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('TOWER', 0, -5);
  ctx.restore();
}

function drawCavalryUnit(cfg) {
  ctx.save();
  ctx.scale(1.16, 1.16);
  ctx.fillStyle = 'rgba(0,0,0,.34)';
  ctx.fillRect(-20, 13, 44, 7);
  ctx.fillStyle = cfg.color;
  ctx.strokeStyle = '#ffe7b3';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(-2, 0, 24, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(14, -6);
  ctx.lineTo(32, -18);
  ctx.lineTo(27, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.arc(-10, 12, 4, 0, Math.PI * 2);
  ctx.arc(12, 12, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffe7b3';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-8, -12);
  ctx.lineTo(24, -30);
  ctx.stroke();
  ctx.restore();
}

function drawAmbushUnit(cfg) {
  ctx.save();
  ctx.scale(1.18, 1.18);
  ctx.fillStyle = 'rgba(0,0,0,.34)';
  ctx.fillRect(-16, 11, 36, 7);
  ctx.fillStyle = '#c7f9cc';
  ctx.beginPath();
  ctx.moveTo(-18, -14);
  ctx.lineTo(0, -30);
  ctx.lineTo(18, -14);
  ctx.lineTo(11, 10);
  ctx.lineTo(-11, 10);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = cfg.color;
  ctx.fillRect(-12, -4, 24, 16);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeRect(-12, -4, 24, 16);
  ctx.fillStyle = '#0e2419';
  ctx.font = '900 7px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('HIDE', 0, 7);
  ctx.restore();
}

function drawPulses() {
  for (const pulse of state.pulses) {
    const alpha = clamp(pulse.life / pulse.max, 0, 1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = team[pulse.side].edge;
    ctx.fillStyle = team[pulse.side].color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, pulse.radius * (1.05 - alpha * .45), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = alpha * .95;
    ctx.stroke();
    ctx.restore();
  }
}

function drawFx() {
  for (const p of state.fx) {
    ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawMiniHud() {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,.5)';
  ctx.strokeStyle = 'rgba(255,255,255,.25)';
  ctx.lineWidth = 2;
  ctx.roundRect(18, 1110, 150, 54, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#74ff93';
  ctx.beginPath();
  ctx.arc(38, 1134, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '700 15px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Watching: 2', 52, 1138);
  ctx.restore();
}

function drawHeadline() {
  if (state.headlineLife <= 0) return;
  const alpha = clamp(state.headlineLife, 0, 1);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = 'center';
  ctx.font = '900 46px Arial Black, Arial';
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(0,0,0,.72)';
  ctx.fillStyle = '#fff';
  ctx.strokeText(state.headline, W / 2, 372);
  ctx.fillText(state.headline, W / 2, 372);
  ctx.restore();
}

function syncUi() {
  const blue = Math.round(state.territory * 100);
  const red = 100 - blue;
  ui.redPercent.textContent = `${red}%`;
  ui.bluePercent.textContent = `${blue}%`;
  ui.redBar.style.width = `${red}%`;
  ui.blueBar.style.width = `${blue}%`;
  ui.clock.textContent = `${Math.max(0, Math.ceil(state.timeLeft))}`;
  ui.roundLabel.childNodes[0].nodeValue = currentCampaign() ? 'Campaign ' : 'Guild War ';
  ui.round.textContent = state.round;
  ui.coins.textContent = state.coins;
  ui.rolls.textContent = state.rolls;
  ui.supportStatus.textContent = state.supportSide === 'red' ? 'Red' : 'Blue';
  ui.diceFace.textContent = diceFaces[state.diceValue - 1];
  ui.rollHint.textContent = state.rolls > 0 || state.autoRoll ? 'Roll' : 'Buy rolls';
  ui.autoRollBtn.classList.toggle('active', state.autoRoll);
  ui.autoRollBtn.setAttribute('aria-pressed', state.autoRoll ? 'true' : 'false');
  ui.autoRollHint.textContent = state.autoRoll ? 'On' : 'Off';
  ui.buyRollBtn.disabled = state.coins < 10 || state.diceRolling || state.ending > 0;
  ui.rollDiceBtn.disabled = state.ending > 0 || (state.rolls <= 0 && !state.autoRoll) || (state.diceRolling && !state.autoRoll);
  ui.autoRollBtn.disabled = state.ending > 0 || (state.rolls <= 0 && !state.autoRoll);
}

function loop(ts) {
  const dt = Math.min(.033, (ts - state.lastTime) / 1000 || .016);
  state.lastTime = ts;
  update(dt);
  draw();
  syncUi();
  requestAnimationFrame(loop);
}

document.addEventListener('pointerdown', ensureAudio, { once: true });
ui.audioToggle.addEventListener('click', toggleAudio);
ui.redSupportBtn.addEventListener('click', () => {
  ensureAudio();
  setSupport('red');
});
ui.blueSupportBtn.addEventListener('click', () => {
  ensureAudio();
  setSupport('blue');
});
ui.buyRollBtn.addEventListener('click', buyRoll);
function endRollHoldGesture() {
  const wasHolding = holdRollActive;
  stopHoldRoll();
  if (wasHolding) {
    setTimeout(() => { suppressNextRollClick = false; }, 300);
  }
}
ui.rollDiceBtn.addEventListener('pointerdown', () => {
  if (ui.rollDiceBtn.disabled || state.autoRoll || state.ending > 0) return;
  clearTimeout(holdRollTimer);
  holdRollTimer = setTimeout(() => {
    if (ui.rollDiceBtn.disabled || state.ending > 0 || state.rolls <= 0) return;
    holdRollActive = true;
    suppressNextRollClick = true;
    ui.rollDiceBtn.classList.add('holding');
    state.autoRoll = false;
    addFeed('Auto Roll on. Tap Roll again to stop.', 'gold');
    sound('select');
    setAutoRoll(true, true);
    syncUi();
  }, 450);
});
['pointerup', 'pointercancel', 'pointerleave'].forEach(type => {
  ui.rollDiceBtn.addEventListener(type, endRollHoldGesture);
});
document.addEventListener('pointerup', endRollHoldGesture);
document.addEventListener('pointercancel', endRollHoldGesture);
ui.rollDiceBtn.addEventListener('click', event => {
  if (suppressNextRollClick) {
    event.preventDefault();
    suppressNextRollClick = false;
    return;
  }
  if (state.autoRoll) {
    event.preventDefault();
    setAutoRoll(false);
    return;
  }
  rollDice();
});
ui.autoRollBtn.addEventListener('click', () => {
  ensureAudio();
  setAutoRoll(!state.autoRoll);
});
ui.chatForm.addEventListener('submit', event => {
  event.preventDefault();
  ensureAudio();
  const text = ui.chatInput.value.trim().replace(/\s+/g, ' ');
  if (!text) return;
  const lower = text.toLowerCase();
  const taggedSide = lower.includes('#red') ? 'red' : lower.includes('#blue') ? 'blue' : state.supportSide;
  addFeed(`You: ${text}`, taggedSide);
  sound('chat');
  ui.chatInput.value = '';
});
canvas.addEventListener('pointerdown', event => {
  if (event.target !== canvas) return;
  ensureAudio();
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width * W;
  setSupport(x < W / 2 ? 'red' : 'blue');
});

if (testMode) {
  const testButton = document.createElement('button');
  testButton.className = 'test-round-button';
  testButton.type = 'button';
  testButton.textContent = 'Test Round 5';
  testButton.addEventListener('click', () => resetRoundState(5));
  document.querySelector('.stage').append(testButton);
}

if (!ctx.roundRect) {
  ctx.roundRect = function roundRect(x, y, width, height, radius) {
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    return this;
  };
}

addFeed('Guild War started: every border is a frontline.', 'gold');
setSupport('blue');
renderDiceBoard();
deploy('red', 5, 1);
deploy('blue', 5, 1);
requestAnimationFrame(loop);
