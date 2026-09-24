(() => {
"use strict";

const $ = (s) => document.querySelector(s);
const canvas = $("#game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const ui = {
  menu: $("#menu"), heroGrid: $("#heroGrid"), playBtn: $("#playBtn"),
  dialog: $("#dialog"), dialogKicker: $("#dialogKicker"), dialogTitle: $("#dialogTitle"),
  dialogText: $("#dialogText"), dialogBtn: $("#dialogBtn"),
  ending: $("#ending"), replayBtn: $("#replayBtn"),
  pauseMenu: $("#pauseMenu"), pauseBtn: $("#pauseBtn"), resumeBtn: $("#resumeBtn"),
  backMenuBtn: $("#backMenuBtn"), hud: $("#hud"), mobile: $("#mobile"),
  hudPortrait: $("#hudPortrait"), hudName: $("#hudName"), hudRole: $("#hudRole"),
  hpFill: $("#hpFill"), hpText: $("#hpText"), chapterLabel: $("#chapterLabel"),
  objectiveLabel: $("#objectiveLabel"), coinLabel: $("#coinLabel"), gemLabel: $("#gemLabel"),
  skillLabel: $("#skillLabel"), endingHero: $("#endingHero"),
  endingCoins: $("#endingCoins"), endingGems: $("#endingGems"), rotateHint: $("#rotateHint")
};

const ASSET = (file) => `assets/${file}`;
const imageFiles = {
  arka: "hero_portraits/arka.png", selene: "hero_portraits/selene.png", raga: "hero_portraits/raga.png", nira: "hero_portraits/nira.png",
  slime: "slime.png", goblin: "goblin.png", bat: "bat.png", skeleton: "skeleton.png",
  orc: "orc.png", dark_mage: "dark_mage.png", morvath: "morvath.png",
  checkpoint: "checkpoint.png", coin: "coin.png", gem: "gem.png", heart: "heart.png", chest: "chest.png",
  world1: "world1_lumina.png", world2: "world2_forest.png", world3: "world3_mine.png",
  world4: "world4_sky.png", world5: "world5_castle.png"
};
const ANIM_META = {"slime":{"idle":{"file":"monster_anim/slime_idle.png","frames":4,"cellW":256,"cellH":220},"move":{"file":"monster_anim/slime_move.png","frames":4,"cellW":269,"cellH":220},"attack":{"file":"monster_anim/slime_attack.png","frames":3,"cellW":363,"cellH":220},"hurt":{"file":"monster_anim/slime_hurt.png","frames":2,"cellW":299,"cellH":220},"death":{"file":"monster_anim/slime_death.png","frames":4,"cellW":342,"cellH":220}},"goblin":{"idle":{"file":"monster_anim/goblin_idle.png","frames":3,"cellW":256,"cellH":220},"move":{"file":"monster_anim/goblin_move.png","frames":4,"cellW":275,"cellH":221},"attack":{"file":"monster_anim/goblin_attack.png","frames":5,"cellW":409,"cellH":228},"hurt":{"file":"monster_anim/goblin_hurt.png","frames":2,"cellW":256,"cellH":220},"death":{"file":"monster_anim/goblin_death.png","frames":4,"cellW":371,"cellH":220}},"bat":{"idle":{"file":"monster_anim/bat_idle.png","frames":4,"cellW":389,"cellH":220},"move":{"file":"monster_anim/bat_move.png","frames":4,"cellW":293,"cellH":220},"attack":{"file":"monster_anim/bat_attack.png","frames":3,"cellW":378,"cellH":254},"hurt":{"file":"monster_anim/bat_hurt.png","frames":2,"cellW":280,"cellH":228},"death":{"file":"monster_anim/bat_death.png","frames":4,"cellW":373,"cellH":228}},"skeleton":{"idle":{"file":"monster_anim/skeleton_idle.png","frames":3,"cellW":256,"cellH":248},"move":{"file":"monster_anim/skeleton_move.png","frames":4,"cellW":256,"cellH":248},"attack":{"file":"monster_anim/skeleton_attack.png","frames":4,"cellW":347,"cellH":287},"hurt":{"file":"monster_anim/skeleton_hurt.png","frames":2,"cellW":256,"cellH":220},"death":{"file":"monster_anim/skeleton_death.png","frames":4,"cellW":372,"cellH":220}},"orc":{"idle":{"file":"monster_anim/orc_idle.png","frames":3,"cellW":278,"cellH":268},"move":{"file":"monster_anim/orc_move.png","frames":4,"cellW":342,"cellH":247},"attack":{"file":"monster_anim/orc_attack.png","frames":4,"cellW":391,"cellH":309},"hurt":{"file":"monster_anim/orc_hurt.png","frames":2,"cellW":281,"cellH":232},"death":{"file":"monster_anim/orc_death.png","frames":4,"cellW":412,"cellH":220}},"dark_mage":{"idle":{"file":"monster_anim/dark_mage_idle.png","frames":6,"cellW":256,"cellH":246},"move":{"file":"monster_anim/dark_mage_move.png","frames":6,"cellW":341,"cellH":303},"attack":{"file":"monster_anim/dark_mage_attack.png","frames":3,"cellW":256,"cellH":278},"hurt":{"file":"monster_anim/dark_mage_hurt.png","frames":2,"cellW":256,"cellH":220},"death":{"file":"monster_anim/dark_mage_death.png","frames":5,"cellW":298,"cellH":220}},"morvath":{"idle":{"file":"monster_anim/morvath_idle.png","frames":8,"cellW":256,"cellH":221},"move":{"file":"monster_anim/morvath_move.png","frames":6,"cellW":314,"cellH":220},"attack":{"file":"monster_anim/morvath_attack.png","frames":6,"cellW":345,"cellH":229},"hurt":{"file":"monster_anim/morvath_hurt.png","frames":3,"cellW":256,"cellH":220},"death":{"file":"monster_anim/morvath_death.png","frames":5,"cellW":256,"cellH":220}}};
const HERO_ANIM_META = {"arka":{"idle":{"file":"hero_anim_v3/arka_idle.png","frames":6,"cellW":141,"cellH":162,"fps":4},"run":{"file":"hero_anim_v3/arka_run.png","frames":8,"cellW":197,"cellH":191,"fps":9},"jump":{"file":"hero_anim_v3/arka_jump.png","frames":4,"cellW":209,"cellH":190,"fps":7},"attack":{"file":"hero_anim_v3/arka_attack.png","frames":6,"cellW":291,"cellH":193,"fps":11},"skill":{"file":"hero_anim_v3/arka_skill.png","frames":8,"cellW":216,"cellH":193,"fps":9},"hurt":{"file":"hero_anim_v3/arka_hurt.png","frames":3,"cellW":171,"cellH":137,"fps":7}},"raga":{"idle":{"file":"hero_anim/raga_idle.png","frames":4,"cellW":165,"cellH":217},"run":{"file":"hero_anim/raga_run.png","frames":4,"cellW":222,"cellH":201},"jump":{"file":"hero_anim/raga_jump.png","frames":3,"cellW":214,"cellH":227},"attack":{"file":"hero_anim/raga_attack.png","frames":5,"cellW":378,"cellH":152},"skill":{"file":"hero_anim/raga_skill.png","frames":4,"cellW":329,"cellH":172},"hurt":{"file":"hero_anim/raga_hurt.png","frames":2,"cellW":163,"cellH":144}},"nira":{"idle":{"file":"hero_anim/nira_idle.png","frames":4,"cellW":159,"cellH":197},"run":{"file":"hero_anim/nira_run.png","frames":4,"cellW":220,"cellH":193},"jump":{"file":"hero_anim/nira_jump.png","frames":4,"cellW":170,"cellH":183},"attack":{"file":"hero_anim/nira_attack.png","frames":6,"cellW":271,"cellH":182},"skill":{"file":"hero_anim/nira_skill.png","frames":5,"cellW":237,"cellH":246},"hurt":{"file":"hero_anim/nira_hurt.png","frames":2,"cellW":150,"cellH":100}},"selene":{"idle":{"file":"hero_anim_v2/selene_idle_7fps.png","frames":6,"cellW":171,"cellH":170,"fps":4},"run":{"file":"hero_anim_v2/selene_run_7fps.png","frames":8,"cellW":197,"cellH":184,"fps":10},"jump":{"file":"hero_anim_v2/selene_jump_7fps.png","frames":4,"cellW":184,"cellH":182,"fps":6},"attack":{"file":"hero_anim_v2/selene_attack_4fps_clean.png","frames":6,"cellW":256,"cellH":172,"fps":9},"skill":{"file":"hero_anim_v2/selene_skill_4fps_clean.png","frames":8,"cellW":245,"cellH":188,"fps":8},"hurt":{"file":"hero_anim_v2/selene_hurt_7fps.png","frames":3,"cellW":187,"cellH":132,"fps":8}}};
const heroAnimationFiles = {};
for (const [heroKey, states] of Object.entries(HERO_ANIM_META)) {
  for (const [stateName, info] of Object.entries(states)) {
    heroAnimationFiles[`hero_${heroKey}_${stateName}`] = info.file;
  }
}

const animationFiles = {};
for (const [type, states] of Object.entries(ANIM_META)) {
  for (const [stateName, info] of Object.entries(states)) {
    animationFiles[`anim_${type}_${stateName}`] = info.file;
  }
}

const images = {};
let assetsReady = false;

async function loadImages() {
  const allImageFiles = {...imageFiles, ...animationFiles, ...heroAnimationFiles};
  const jobs = Object.entries(allImageFiles).map(([key, file]) => new Promise(resolve => {
    const im = new Image();
    im.onload = () => { images[key] = im; resolve(); };
    im.onerror = () => { console.warn("Asset gagal dimuat:", file); resolve(); };
    im.src = ASSET(file);
  }));
  await Promise.all(jobs);
  assetsReady = true;
}


const HERO_RENDER = {
  arka:   { scale: 84 / 162, yOffset: 0 },
  selene: { scale: 0.549020, yOffset: 0 },
  raga:   { scale: 84 / 203, yOffset: 0 },
  nira:   { scale: 84 / 184, yOffset: 0 }
};

const HEROES = {
  arka: {
    name: "Arka", role: "Ksatria Fajar", hp: 160, speed: 300, jump: 720,
    attackDamage: 34, attackRange: 98, ranged: false, cooldown: 4.4,
    skill: "Tebasan Surya", desc: "Tebasan cahaya besar: 100 damage + knockback."
  },
  selene: {
    name: "Selene", role: "Penyihir Bintang", hp: 105, speed: 282, jump: 700,
    attackDamage: 27, projectileSpeed: 760, ranged: true, cooldown: 5.7,
    skill: "Nova Astral", desc: "Ledakan sihir di sekitar: 82 damage."
  },
  raga: {
    name: "Raga", role: "Penjaga Tombak", hp: 190, speed: 255, jump: 660,
    attackDamage: 40, attackRange: 138, ranged: false, cooldown: 7,
    skill: "Benteng Angin", desc: "Mendapat 80 shield dan kebal sesaat."
  },
  nira: {
    name: "Nira", role: "Pemburu Bayangan", hp: 120, speed: 345, jump: 735,
    attackDamage: 29, projectileSpeed: 900, ranged: true, cooldown: 5,
    skill: "Hujan Panah", desc: "Lima proyektil menyebar ke depan."
  }
};

const WORLD_INFO = [
  {
    roman: "I", name: "DESA LUMINA", bg: "world1",
    introTitle: "Fajar yang Padam",
    intro: "Lumina dulu menjadi desa pertama yang melihat matahari setiap pagi. Kini kabut hitam menutup menara lonceng dan warga mengungsi ke timur. Sebuah pecahan Segel Fajar bereaksi terhadapmu. Sebelum mengejar Morvath, kamu harus membuka kembali jalan desa dan mencari tahu siapa yang memimpin serangan.",
    clear: "Gerbang Lumina kembali terbuka. Dari lambang pada baju para penyerang, kamu menemukan tanda pasukan yang bergerak menuju Hutan Bisikan. Pecahan pertama berdenyut semakin kuat saat kamu menghadap ke arah hutan.",
    enemyPool: ["slime", "goblin"],
    boss: { type: "goblin", name: "GORUK — KAPTEN PENJARAH", hp: 520, damage: 26, speed: 115, scale: 1.9 }
  },
  {
    roman: "II", name: "HUTAN BISIKAN", bg: "world2",
    introTitle: "Suara di Balik Pepohonan",
    intro: "Hutan Bisikan tidak pernah benar-benar sunyi. Daun-daunnya menyimpan suara para penjaga tua. Namun kini suara itu berubah menjadi peringatan. Akar raksasa menutup jalan, reruntuhan kuil ditumbuhi lumut, dan makhluk hutan menyerang siapa pun yang mendekat.",
    clear: "Di dalam kuil, kamu menemukan pecahan kedua. Sebuah ukiran kuno menunjukkan Tambang Bara di selatan sebagai tempat Morvath menambang kristal untuk memperkuat Gerbang Malam.",
    enemyPool: ["slime", "goblin", "bat"],
    boss: { type: "bat", name: "VESPERA — RATU KELELAWAR", hp: 650, damage: 24, speed: 125, scale: 2.25, flying: true }
  },
  {
    roman: "III", name: "TAMBANG BARA", bg: "world3",
    introTitle: "Jantung Tambang",
    intro: "Panas dari Tambang Bara terasa bahkan sebelum pintu besinya terlihat. Para penambang telah pergi, tetapi tungku masih menyala. Pasukan Morvath menggali kristal merah dari lapisan terdalam. Semakin jauh kamu masuk, semakin jelas bahwa mereka sedang membangun sesuatu yang jauh lebih besar daripada senjata biasa.",
    clear: "Inti kristal dihancurkan dan pecahan ketiga berhasil direbut. Dari ruang pengawas tambang, sebuah peta menunjukkan jalur menuju Menara Langit—tempat pasukan Morvath memindahkan kristal melalui portal udara.",
    enemyPool: ["skeleton", "orc", "dark_mage"],
    boss: { type: "orc", name: "BRAKKA — PENJAGA TUNGKU", hp: 940, damage: 34, speed: 92, scale: 2.15 }
  },
  {
    roman: "IV", name: "MENARA LANGIT", bg: "world4",
    introTitle: "Di Atas Awan",
    intro: "Menara Langit dahulu menghubungkan kota-kota terapung Elyndra. Kini jembatannya pecah dan angin membawa serpihan bangunan di antara awan. Dari sini, untuk pertama kalinya, Benteng Malam terlihat jelas di cakrawala.",
    clear: "Pecahan keempat ditemukan di ruang observatorium. Sebelum runtuh, kristal di menara memproyeksikan pesan terakhir dari penjaga kerajaan: Morvath sudah menunggu di Benteng Malam dengan pecahan terakhir.",
    enemyPool: ["bat", "skeleton", "dark_mage"],
    boss: { type: "dark_mage", name: "ASTERION — PENYIHIR MENARA", hp: 860, damage: 27, speed: 72, scale: 2.0, caster: true }
  },
  {
    roman: "V", name: "BENTENG MALAM", bg: "world5",
    introTitle: "Jalan Terakhir",
    intro: "Empat pecahan Segel Fajar kini bersamamu. Benteng Malam berdiri di hadapanmu seperti luka di dunia. Gerbangnya terbuka, seolah Morvath memang ingin kamu masuk. Tidak ada lagi desa yang harus diselamatkan, tidak ada lagi jalan memutar—hanya singgasana Raja Iblis.",
    clear: "",
    enemyPool: ["orc", "dark_mage", "skeleton", "bat"],
    boss: { type: "morvath", name: "MORVATH — RAJA IBLIS", hp: 1650, damage: 38, speed: 86, scale: 1.85, caster: true }
  }
];

const STAGE_NAMES = [
  ["Gerbang yang Retak", "Jalan Pengungsian", "Benteng Desa", "Kapten Penjarah"],
  ["Jalur Lumut", "Akar Tua", "Kuil Bisikan", "Ratu Kelelawar"],
  ["Lorong Besi", "Ruang Tungku", "Poros Kristal", "Penjaga Tungku"],
  ["Jembatan Awan", "Reruntuhan Terapung", "Puncak Observatorium", "Penyihir Menara"],
  ["Tembok Luar", "Penjara Bayangan", "Koridor Singgasana", "Raja Iblis"]
];

const NORMAL_STAGE_LEN = 1800;
const BOSS_STAGE_LEN = 1300;
const WORLD_LEN = NORMAL_STAGE_LEN * 3 + BOSS_STAGE_LEN; // 6700
const FLOOR_Y = 620;
const GRAVITY = 1900;
const TOTAL_W = WORLD_LEN * WORLD_INFO.length;

const sections = [];
for (let w = 0; w < WORLD_INFO.length; w++) {
  const base = w * WORLD_LEN;
  for (let s = 0; s < 3; s++) {
    sections.push({
      world: w, stage: s + 1, boss: false,
      start: base + s * NORMAL_STAGE_LEN,
      length: NORMAL_STAGE_LEN,
      name: STAGE_NAMES[w][s]
    });
  }
  sections.push({
    world: w, stage: 4, boss: true,
    start: base + NORMAL_STAGE_LEN * 3,
    length: BOSS_STAGE_LEN,
    name: STAGE_NAMES[w][3]
  });
}

let screenW = innerWidth, screenH = innerHeight, dpr = 1, sceneScale = 1, viewW = 1280, viewH = 720;
function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  const r = canvas.getBoundingClientRect();
  screenW = r.width; screenH = r.height;
  canvas.width = Math.round(screenW * dpr);
  canvas.height = Math.round(screenH * dpr);
  sceneScale = screenH / 720;
  viewH = 720;
  viewW = screenW / sceneScale;
  ctx.setTransform(dpr * sceneScale, 0, 0, dpr * sceneScale, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ui.rotateHint.classList.toggle("hidden", !(matchMedia("(pointer:coarse)").matches && innerHeight > innerWidth));
}
addEventListener("resize", resize);
resize();

let selected = null;
let state = "menu";
let last = 0;
let cameraX = 0;
let sectionIndex = 0;
let enemies = [], projectiles = [], collectibles = [], effects = [], platforms = [], hazards = [];
let coins = 0, gems = 0;
let triggered = new Set();
let bossAlive = null;
let stageBanner = { text: "", sub: "", timer: 0 };

const player = {
  x: 120, y: 420, w: 45, h: 66, vx: 0, vy: 0, grounded: false, facing: 1,
  hp: 100, maxHp: 100, shield: 0, inv: 0, attackTimer: 0, skillTimer: 0,
  checkpoint: 120, hero: null, runTime: 0, animTime: 0, runAnimDistance: 0, lastAnimState: "",
  actionState: "", actionAnim: 0, actionDuration: 0, hurtAnim: 0,
  maxJumps: 2, jumpsLeft: 2
};

const input = { x: 0, jump: false, attack: false, skill: false };
const keys = Object.create(null);

function cardHTML(key, h) {
  return `<article class="heroCard" data-hero="${key}">
    <img src="${ASSET(imageFiles[key])}" alt="${h.name}">
    <h3>${h.name}</h3>
    <span class="role">${h.role}</span>
    <p><b>HP ${h.hp}</b> · SPD ${h.speed}<br><b>${h.skill}</b><br>${h.desc}</p>
  </article>`;
}
ui.heroGrid.innerHTML = Object.entries(HEROES).map(([k, h]) => cardHTML(k, h)).join("");
ui.heroGrid.addEventListener("click", e => {
  const card = e.target.closest(".heroCard");
  if (!card) return;
  selected = card.dataset.hero;
  document.querySelectorAll(".heroCard").forEach(c => c.classList.toggle("selected", c === card));
  ui.playBtn.disabled = false;
});

function showStory(kicker, title, text, onDone) {
  state = "dialog";
  ui.dialogKicker.textContent = kicker;
  ui.dialogTitle.textContent = title;
  ui.dialogText.textContent = text;
  ui.dialog.classList.remove("hidden");
  ui.dialogBtn.onclick = () => {
    ui.dialog.classList.add("hidden");
    state = "playing";
    if (onDone) onDone();
  };
}

function showWorldIntro(world) {
  const w = WORLD_INFO[world];
  const key = `intro-${world}`;
  if (triggered.has(key)) return;
  triggered.add(key);
  showStory(`WORLD ${w.roman} — ${w.name}`, w.introTitle, w.intro);
}

function showBossIntro(world) {
  const w = WORLD_INFO[world];
  const key = `boss-intro-${world}`;
  if (triggered.has(key)) return;
  triggered.add(key);
  const lines = [
    "Di ujung benteng desa, pemimpin para penjarah menutup gerbang dengan pasukannya. Untuk meninggalkan Lumina, kamu harus melewatinya.",
    "Suara kepakan besar menggema dari langit-langit kuil. Sang penjaga hutan telah jatuh di bawah pengaruh energi gelap.",
    "Pintu tungku terbuka. Sosok raksasa berdiri di depan inti kristal dan mengangkat gada besinya. Jalan keluar berada tepat di belakangnya.",
    "Di puncak menara, penyihir Morvath menunggu di antara lingkaran sihir. Ia tahu kamu membawa tiga pecahan Segel Fajar.",
    "Singgasana hitam berdiri di ujung aula. Morvath bangkit dan tersenyum seolah seluruh perjalananmu memang bagian dari rencananya."
  ];
  showStory(`BOSS — ${w.boss.name}`, STAGE_NAMES[world][3], lines[world], () => spawnWorldBoss(world));
}

function showWorldClear(world) {
  if (world >= WORLD_INFO.length - 1) return;
  const key = `clear-${world}`;
  if (triggered.has(key)) return;
  triggered.add(key);
  showStory(`WORLD ${WORLD_INFO[world].roman} SELESAI`, "Satu Pecahan Kembali", WORLD_INFO[world].clear, () => {
    player.hp = Math.min(player.maxHp, player.hp + Math.ceil(player.maxHp * 0.45));
  });
}

function stageTitle(sec) {
  const worldNo = sec.world + 1;
  const stageNo = sec.boss ? "BOSS" : `${worldNo}-${sec.stage}`;
  stageBanner.text = sec.boss ? `WORLD ${WORLD_INFO[sec.world].roman} — BOSS` : `STAGE ${stageNo}`;
  stageBanner.sub = sec.name;
  stageBanner.timer = 2.4;
}

function buildWorldGeometry() {
  platforms = [];
  hazards = [];

  for (const sec of sections) {
    if (sec.boss) {
      platforms.push({ x: sec.start, y: FLOOR_Y, w: sec.length, h: 140, world: sec.world });
      // boss arena ledges
      platforms.push({ x: sec.start + 220, y: 485, w: 190, h: 24, world: sec.world });
      platforms.push({ x: sec.start + sec.length - 410, y: 470, w: 190, h: 24, world: sec.world });
      continue;
    }

    for (let m = 0; m < 3; m++) {
      const ms = sec.start + m * 600;
      const gap = 90 + ((sec.world + sec.stage + m) % 2) * 30;
      const floorW = 600 - gap;
      platforms.push({ x: ms, y: FLOOR_Y, w: floorW, h: 140, world: sec.world });

      // Make the last module connect safely to the next section.
      if (m === 2) {
        platforms.push({ x: ms + floorW, y: FLOOR_Y, w: gap + 5, h: 140, world: sec.world });
      } else if (sec.world === 2 || sec.world === 4) {
        hazards.push({ x: ms + floorW, y: FLOOR_Y + 18, w: gap, h: 100, world: sec.world, type: "lava" });
      }

      const pattern = (sec.world + sec.stage + m) % 3;
      if (pattern === 0) {
        platforms.push({ x: ms + 150, y: 505, w: 170, h: 24, world: sec.world });
        platforms.push({ x: ms + 345, y: 420, w: 155, h: 24, world: sec.world });
      } else if (pattern === 1) {
        platforms.push({ x: ms + 120, y: 470, w: 155, h: 24, world: sec.world });
        platforms.push({ x: ms + 315, y: 390, w: 165, h: 24, world: sec.world });
        platforms.push({ x: ms + 470, y: 500, w: 95, h: 24, world: sec.world });
      } else {
        platforms.push({ x: ms + 210, y: 445, w: 210, h: 24, world: sec.world });
      }
    }
  }
}

function spawnEnemy(x, type, world = 0, bossConfig = null) {
  const base = {
    slime: [48, 44, 75, 60, 17],
    goblin: [44, 58, 95, 85, 18],
    bat: [52, 42, 80, 95, 17],
    skeleton: [38, 62, 110, 72, 20],
    orc: [55, 70, 170, 58, 26],
    dark_mage: [44, 66, 135, 55, 24],
    morvath: [92, 120, 1000, 74, 34]
  }[type];

  const cfg = bossConfig || {};
  const isFlying = cfg.flying || type === "bat";
  const e = {
    x,
    y: isFlying ? 360 : FLOOR_Y - base[1],
    baseY: isFlying ? 360 : FLOOR_Y - base[1],
    w: base[0], h: base[1],
    hp: cfg.hp || base[2], maxHp: cfg.hp || base[2],
    speed: cfg.speed || base[3], damage: cfg.damage || base[4],
    type, world, vx: (cfg.speed || base[3]) * (Math.random() > .5 ? 1 : -1),
    dead: false, flash: 0, shoot: 1 + Math.random(),
    boss: !!bossConfig, bossName: cfg.name || "", scale: cfg.scale || 1.25,
    flying: isFlying, caster: cfg.caster || type === "dark_mage" || type === "morvath",
    animTime: Math.random() * 0.6, attackAnim: 0, facing: 1,
    deathTimer: 0, deathDuration: 0.78, defeatHandled: false,
    arenaMin: null, arenaMax: null,
    aiState: "chase", stateTimer: 0, attackHitDone: false, attackKind: "",
    bossCooldown: .55 + Math.random() * .35
  };
  enemies.push(e);
  return e;
}

function spawnWorldBoss(world) {
  if (bossAlive && !bossAlive.dead) return;
  const sec = sections.find(s => s.world === world && s.boss);
  const cfg = WORLD_INFO[world].boss;
  bossAlive = spawnEnemy(sec.start + sec.length * 0.66, cfg.type, world, cfg);
  // Boss wajib tetap berada di dalam arena. Sebelumnya knockback/AI bisa membuat boss kabur ke stage lain.
  bossAlive.arenaMin = sec.start + 70;
  bossAlive.arenaMax = sec.start + sec.length - 85;
  bossAlive.x = Math.max(bossAlive.arenaMin, Math.min(bossAlive.x, bossAlive.arenaMax - bossAlive.w));
}

function spawnStageContent() {
  enemies = [];
  collectibles = [];
  projectiles = [];
  effects = [];
  bossAlive = null;

  for (const sec of sections) {
    if (sec.boss) continue;
    const pool = WORLD_INFO[sec.world].enemyPool;
    const enemyCount = 3 + Math.floor(sec.world / 2);
    for (let i = 0; i < enemyCount; i++) {
      const x = sec.start + 260 + i * ((sec.length - 430) / enemyCount);
      const type = pool[(i + sec.stage + sec.world) % pool.length];
      spawnEnemy(x, type, sec.world);
    }

    for (let i = 0; i < 8; i++) {
      const x = sec.start + 180 + i * 185;
      collectibles.push({
        type: i === 6 ? "gem" : "coin", x, y: 350 - (i % 3) * 48,
        w: 28, h: 28, taken: false, bob: Math.random() * 6.28
      });
    }

    if (sec.stage === 2) {
      collectibles.push({ type: "heart", x: sec.start + 1420, y: 455, w: 30, h: 30, taken: false, bob: Math.random() * 6.28 });
    }
    if (sec.stage === 3) {
      collectibles.push({ type: "chest", x: sec.start + 1540, y: FLOOR_Y - 55, w: 58, h: 55, taken: false, bob: 0 });
    }
  }
}

function startGame() {
  if (!selected) return;
  const h = HEROES[selected];
  player.hero = h;
  player.x = 120; player.y = 420; player.vx = 0; player.vy = 0;
  player.maxHp = h.hp; player.hp = h.hp; player.shield = 0; player.inv = 0;
  player.attackTimer = 0; player.skillTimer = 0; player.checkpoint = 120; player.facing = 1;
  player.runTime = 0; player.animTime = 0; player.runAnimDistance = 0; player.lastAnimState = ""; player.actionState = ""; player.actionAnim = 0; player.actionDuration = 0; player.hurtAnim = 0; player.maxJumps = 2; player.jumpsLeft = 2;

  coins = 0; gems = 0; cameraX = 0; sectionIndex = 0; triggered = new Set();
  buildWorldGeometry();
  spawnStageContent();
  stageTitle(sections[0]);

  ui.menu.classList.add("hidden");
  ui.ending.classList.add("hidden");
  ui.pauseMenu.classList.add("hidden");
  ui.hud.classList.remove("hidden");
  if (matchMedia("(pointer:coarse)").matches || innerWidth < 900) ui.mobile.classList.remove("hidden");
  updateHud();
  showWorldIntro(0);
}
ui.playBtn.onclick = startGame;
ui.replayBtn.onclick = () => {
  ui.ending.classList.add("hidden");
  ui.menu.classList.remove("hidden");
  ui.hud.classList.add("hidden");
  ui.mobile.classList.add("hidden");
  state = "menu";
};

function backToMenu() {
  state = "menu";
  ui.pauseMenu.classList.add("hidden");
  ui.menu.classList.remove("hidden");
  ui.hud.classList.add("hidden");
  ui.mobile.classList.add("hidden");
}
ui.backMenuBtn.onclick = backToMenu;

function setPause(pause = true) {
  if (pause && state === "playing") {
    state = "paused";
    ui.pauseMenu.classList.remove("hidden");
  } else if (!pause && state === "paused") {
    state = "playing";
    ui.pauseMenu.classList.add("hidden");
  }
}
ui.pauseBtn.onclick = () => setPause(true);
ui.resumeBtn.onclick = () => setPause(false);

function realOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function floorCollision(body, prevY) {
  body.grounded = false;
  for (const p of platforms) {
    if (body.x + body.w <= p.x || body.x >= p.x + p.w) continue;
    if (body.vy >= 0 && prevY + body.h <= p.y + 4 && body.y + body.h >= p.y && body.y + body.h <= p.y + 48) {
      body.y = p.y - body.h;
      body.vy = 0;
      body.grounded = true;
      if (body === player) body.jumpsLeft = body.maxJumps;
    }
  }
}

function hurtPlayer(amount, knock = 0) {
  if (player.inv > 0) return;
  let d = amount;
  if (player.shield > 0) {
    const a = Math.min(d, player.shield);
    player.shield -= a;
    d -= a;
  }
  player.hp -= d;
  player.inv = .82;
  player.hurtAnim = .28;
  player.animTime = 0;
  player.vx += knock;
  player.vy = -250;
  effects.push({ x: player.x + 20, y: player.y + 30, life: .4, text: `-${amount}` });
  if (player.hp <= 0) respawn();
}

function respawn() {
  player.hp = player.maxHp;
  player.shield = 0;
  player.x = player.checkpoint;
  player.y = 390;
  player.vx = 0;
  player.vy = 0;
  player.inv = 1.4;
  player.hurtAnim = 0;
  player.actionAnim = 0;
  player.actionState = "";
  player.jumpsLeft = player.maxJumps;
  projectiles = projectiles.filter(p => p.owner === "player");
}

function hurtEnemy(e, dmg, knock = 0) {
  if (e.dead) return;
  e.hp -= dmg;
  e.flash = .12;
  if (!e.boss) e.vx += knock;
  effects.push({ x: e.x + e.w / 2, y: e.y, life: .45, text: `-${dmg}` });
  if (e.hp <= 0) {
    e.hp = 0;
    e.dead = true;
    e.vx = 0;
    e.attackAnim = 0;
    e.animTime = 0;
    e.deathTimer = e.deathDuration;
    if (e.boss && !e.defeatHandled) {
      e.defeatHandled = true;
      setTimeout(() => onBossDefeated(e), Math.round(e.deathDuration * 1000));
    }
  }
}

function onBossDefeated(e) {
  bossAlive = null;
  const world = e.world;
  if (world === WORLD_INFO.length - 1) {
    winGame();
    return;
  }
  setTimeout(() => showWorldClear(world), 550);
}

function getHeroActionDuration(stateName, fallback) {
  const info = HERO_ANIM_META[selected] && HERO_ANIM_META[selected][stateName];
  if (info && info.fps && info.frames) return info.frames / info.fps;
  return fallback;
}

function attack() {
  if (player.attackTimer > 0 || (player.actionState === "attack" && player.actionAnim > 0)) return;
  const h = player.hero;
  player.attackTimer = .48;
  player.actionState = "attack";
  player.actionDuration = selected === "arka" ? getHeroActionDuration("attack", .32) : (selected === "selene" ? 0.72 : getHeroActionDuration("attack", .32));
  player.actionAnim = player.actionDuration;
  player.animTime = 0;
  if (h.ranged) {
    projectiles.push({ owner: "player", x: player.x + player.w / 2, y: player.y + 22, w: 18, h: 9,
      vx: h.projectileSpeed * player.facing, vy: 0, damage: h.attackDamage, life: 1.8 });
  } else {
    const hb = { x: player.facing > 0 ? player.x + player.w : player.x - h.attackRange, y: player.y + 6, w: h.attackRange, h: player.h - 6 };
    enemies.forEach(e => { if (!e.dead && realOverlap(hb, e)) hurtEnemy(e, h.attackDamage, player.facing * 220); });
  }
}

function skill() {
  if (player.skillTimer > 0) return;
  const h = player.hero;
  player.skillTimer = h.cooldown;
  player.actionState = "skill";
  player.actionDuration = selected === "arka" ? getHeroActionDuration("skill", .58) : (selected === "selene" ? 1.02 : getHeroActionDuration("skill", .58));
  player.actionAnim = player.actionDuration;
  player.animTime = 0;
  if (selected === "arka") {
    const hb = { x: player.x - 100, y: player.y - 55, w: player.w + 200, h: player.h + 105 };
    enemies.forEach(e => { if (!e.dead && realOverlap(hb, e)) hurtEnemy(e, 100, Math.sign((e.x + e.w / 2) - (player.x + player.w / 2)) * 360); });
    effects.push({ kind: "ring", x: player.x + player.w / 2, y: player.y + player.h / 2, r: 18, max: 150, life: .45 });
  } else if (selected === "selene") {
    enemies.forEach(e => {
      const dx = e.x - player.x, dy = e.y - player.y;
      if (Math.hypot(dx, dy) < 240) hurtEnemy(e, 82, Math.sign(dx) * 260);
    });
    effects.push({ kind: "ring", x: player.x + player.w / 2, y: player.y + player.h / 2, r: 20, max: 240, life: .55 });
  } else if (selected === "raga") {
    player.shield = Math.min(160, player.shield + 80);
    player.inv = 1.3;
    effects.push({ kind: "shield", x: player.x, y: player.y, life: 1.2 });
  } else if (selected === "nira") {
    [-.34, -.17, 0, .17, .34].forEach(s => projectiles.push({ owner: "player", x: player.x + 22, y: player.y + 22, w: 17, h: 7,
      vx: 840 * player.facing, vy: s * 520, damage: 32, life: 1.55 }));
  }
}

function enemyShoot(e) {
  e.attackAnim = Math.max(e.attackAnim || 0, e.boss ? .62 : .48);
  e.animTime = 0;
  const dx = (player.x + player.w / 2) - (e.x + e.w / 2);
  const dy = (player.y + player.h / 2) - (e.y + e.h / 2);
  const m = Math.hypot(dx, dy) || 1;
  const s = e.boss ? 385 : 300;
  projectiles.push({ owner: "enemy", x: e.x + e.w / 2, y: e.y + 25, w: e.boss ? 20 : 13, h: e.boss ? 20 : 13,
    vx: dx / m * s, vy: dy / m * s, damage: e.boss ? Math.ceil(e.damage * .7) : 16, life: 4 });
}

function getSectionAt(x) {
  let low = 0, high = sections.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const s = sections[mid];
    if (x < s.start) high = mid - 1;
    else if (x >= s.start + s.length) low = mid + 1;
    else return mid;
  }
  return Math.max(0, Math.min(sections.length - 1, low));
}

function enterSection(idx) {
  sectionIndex = idx;
  const sec = sections[idx];
  player.checkpoint = sec.start + 80;
  stageTitle(sec);

  if (sec.stage === 1 && !sec.boss) {
    showWorldIntro(sec.world);
  }
  if (sec.boss) {
    showBossIntro(sec.world);
  }
}

function updatePlayer(dt) {
  const h = player.hero;
  player.animTime += dt;
  player.actionAnim = Math.max(0, player.actionAnim - dt);
  player.hurtAnim = Math.max(0, player.hurtAnim - dt);
  if (player.actionAnim <= 0) player.actionState = "";
  let mx = input.x;
  if (keys.KeyA || keys.ArrowLeft) mx = -1;
  if (keys.KeyD || keys.ArrowRight) mx = 1;
  player.vx = mx * h.speed;
  if (Math.abs(mx) > .08) {
    player.facing = Math.sign(mx);
    player.runTime += dt;
    // Frame run mengikuti jarak nyata yang ditempuh.
    // Joystick pelan = animasi ikut pelan, lari penuh = animasi lebih cepat.
    player.runAnimDistance += Math.abs(player.vx) * dt;
  }

  if (input.jump || keys.Space || keys.ArrowUp) {
    if (player.grounded || player.jumpsLeft > 0) {
      const wasGrounded = player.grounded;
      player.vy = -h.jump;
      player.grounded = false;
      player.jumpsLeft = Math.max(0, player.jumpsLeft - 1);
      effects.push({
        x: player.x + player.w / 2,
        y: player.y + player.h / 2,
        life: .45,
        text: wasGrounded ? "JUMP" : "DOUBLE JUMP"
      });
    }
    input.jump = false; keys.Space = false; keys.ArrowUp = false;
  }
  if (input.attack || keys.KeyJ) { attack(); input.attack = false; keys.KeyJ = false; }
  if (input.skill || keys.KeyK) { skill(); input.skill = false; keys.KeyK = false; }

  const prevY = player.y;
  player.vy += GRAVITY * dt;
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  // Boss rooms cannot be skipped while the boss is alive.
  const sec = sections[sectionIndex];
  if (sec.boss && bossAlive) {
    const rightGate = sec.start + sec.length - 80;
    player.x = Math.min(player.x, rightGate - player.w);
  }

  player.x = Math.max(0, Math.min(TOTAL_W - player.w, player.x));
  floorCollision(player, prevY);

  for (const hz of hazards) {
    if (realOverlap(player, hz)) {
      hurtPlayer(45, -player.facing * 80);
      player.y = Math.min(player.y, FLOOR_Y - player.h - 8);
    }
  }

  if (player.y > viewH + 260) respawn();

  player.inv = Math.max(0, player.inv - dt);
  player.attackTimer = Math.max(0, player.attackTimer - dt);
  player.skillTimer = Math.max(0, player.skillTimer - dt);

  const idx = getSectionAt(player.x + player.w / 2);
  if (idx !== sectionIndex) enterSection(idx);

  const target = player.x - viewW * .38;
  cameraX += (target - cameraX) * Math.min(1, dt * 6.5);
  cameraX = Math.max(0, Math.min(TOTAL_W - viewW, cameraX));
}


function bossMeleeProfile(e) {
  if (e.type === "goblin") return {range: 105, windup: .30, active: .28, recover: .42, lunge: 2.1, reach: 82};
  if (e.type === "bat") return {range: 145, windup: .28, active: .42, recover: .48, lunge: 3.4, reach: 58};
  if (e.type === "orc") return {range: 150, windup: .52, active: .36, recover: .60, lunge: 1.55, reach: 118};
  if (e.type === "morvath") return {range: 165, windup: .34, active: .34, recover: .48, lunge: 2.15, reach: 115};
  return {range: 110, windup: .35, active: .30, recover: .48, lunge: 2, reach: 80};
}

function startBossMelee(e) {
  const p = bossMeleeProfile(e);
  e.aiState = "windup";
  e.attackKind = "melee";
  e.stateTimer = p.windup;
  e.attackHitDone = false;
  e.vx = 0;
  e.facing = Math.sign((player.x + player.w / 2) - (e.x + e.w / 2)) || e.facing || 1;
  if (e.flying) e.attackTargetY = Math.max(250, Math.min(FLOOR_Y - e.h - 8, player.y + player.h / 2 - e.h / 2));
  e.animTime = 0;
}

function startBossCast(e) {
  e.aiState = "windup";
  e.attackKind = "cast";
  e.stateTimer = e.type === "dark_mage" ? .52 : .42;
  e.attackHitDone = false;
  e.vx = 0;
  e.facing = Math.sign((player.x + player.w / 2) - (e.x + e.w / 2)) || e.facing || 1;
  e.animTime = 0;
}

function updateBossAI(e, dt) {
  const dx = (player.x + player.w / 2) - (e.x + e.w / 2);
  const dist = Math.abs(dx);
  const melee = bossMeleeProfile(e);
  e.bossCooldown = Math.max(0, (e.bossCooldown || 0) - dt);

  if (e.aiState === "windup") {
    e.vx *= Math.max(0, 1 - dt * 10);
    if (e.flying && e.attackKind === "melee" && Number.isFinite(e.attackTargetY)) {
      e.y += (e.attackTargetY - e.y) * Math.min(1, dt * 8);
    }
    e.stateTimer -= dt;
    if (e.stateTimer <= 0) {
      e.aiState = "attack";
      e.animTime = 0;
      if (e.attackKind === "cast") {
        e.stateTimer = .34;
        e.attackAnim = .50;
      } else {
        e.stateTimer = melee.active;
        e.attackAnim = melee.active;
      }
    }
    return;
  }

  if (e.aiState === "attack") {
    e.stateTimer -= dt;

    if (e.attackKind === "cast") {
      if (!e.attackHitDone && e.stateTimer <= .22) {
        enemyShoot(e);
        e.attackHitDone = true;
      }
      e.vx *= Math.max(0, 1 - dt * 12);
    } else {
      // Serangan fisik hanya memberi damage saat bagian aktif menyentuh pemain.
      const phase = 1 - Math.max(0, e.stateTimer) / melee.active;
      const push = phase < .68 ? e.speed * melee.lunge : e.speed * .35;
      e.vx += (e.facing * push - e.vx) * Math.min(1, dt * 12);
      e.x += e.vx * dt;
      if (e.flying && Number.isFinite(e.attackTargetY)) {
        e.y += (e.attackTargetY - e.y) * Math.min(1, dt * 10);
      }

      if (!e.attackHitDone && phase > .28 && phase < .82) {
        const hitbox = {
          x: e.facing > 0 ? e.x + e.w * .55 : e.x - melee.reach,
          y: e.y + e.h * .12,
          w: melee.reach,
          h: e.h * .78
        };
        if (realOverlap(hitbox, player)) {
          hurtPlayer(e.damage, e.facing * 270);
          e.attackHitDone = true;
        }
      }
    }

    if (e.stateTimer <= 0) {
      e.aiState = "recover";
      e.stateTimer = e.attackKind === "cast" ? .62 : melee.recover;
      e.vx *= .2;
    }
    return;
  }

  if (e.aiState === "recover") {
    e.stateTimer -= dt;
    e.vx *= Math.max(0, 1 - dt * 8);
    if (e.flying) e.y += (330 - e.y) * Math.min(1, dt * 4);
    if (e.stateTimer <= 0) {
      e.aiState = "chase";
      e.bossCooldown = .35;
    }
    return;
  }

  // CHASE: gerakan diinterpolasi agar tidak patah-patah.
  const desired = Math.sign(dx || 1) * e.speed;
  e.vx += (desired - e.vx) * Math.min(1, dt * (e.flying ? 3.5 : 5.5));
  e.facing = Math.sign(dx || e.facing || 1);

  if (e.flying) {
    e.x += e.vx * dt;
    const targetY = 330 + Math.sin(performance.now() * .0025) * 38;
    e.y += (targetY - e.y) * Math.min(1, dt * 3.2);
  } else {
    e.x += e.vx * dt;
  }

  if (e.bossCooldown <= 0) {
    if (e.type === "dark_mage") {
      if (dist < 680) startBossCast(e);
    } else if (e.type === "morvath") {
      if (dist <= melee.range) startBossMelee(e);
      else if (dist < 720) startBossCast(e);
    } else if (dist <= melee.range) {
      startBossMelee(e);
    }
  }
}

function updateEnemies(dt) {
  for (const e of enemies) {
    e.animTime = (e.animTime || 0) + dt;
    e.attackAnim = Math.max(0, (e.attackAnim || 0) - dt);

    if (e.dead) {
      e.deathTimer = Math.max(0, (e.deathTimer || 0) - dt);
      continue;
    }

    e.flash = Math.max(0, e.flash - dt);
    const dx = player.x - e.x;

    if (e.boss) {
      updateBossAI(e, dt);

      // Boss selalu terkunci di arena.
      if (e.arenaMin != null && e.arenaMax != null) {
        e.x = Math.max(e.arenaMin, Math.min(e.x, e.arenaMax - e.w));
      }
      continue;
    }

    // Musuh biasa: lebih santai, baru mengejar ketika pemain cukup dekat.
    if (e.flying) {
      const desired = Math.abs(dx) < 390 ? Math.sign(dx || 1) * e.speed : e.vx;
      e.vx += (desired - e.vx) * Math.min(1, dt * 4);
      e.x += e.vx * dt;
      e.y = e.baseY + Math.sin(performance.now() * .004 + e.x * .01) * 34;
    } else {
      if (Math.abs(dx) < 310) {
        const desired = Math.sign(dx || 1) * e.speed;
        e.vx += (desired - e.vx) * Math.min(1, dt * 5);
      }
      e.x += e.vx * dt;
      const probe = e.x + (e.vx > 0 ? e.w + 10 : -10);
      const safe = platforms.some(p => probe >= p.x && probe <= p.x + p.w && Math.abs(e.y + e.h - p.y) < 20);
      if (!safe) e.vx *= -1;
    }

    if (Math.abs(e.vx) > 1) e.facing = Math.sign(e.vx);

    if (e.caster) {
      e.shoot -= dt;
      if (e.shoot <= 0 && Math.abs(dx) < 680) {
        enemyShoot(e);
        e.shoot = 2.7;
      }
    }

    if (realOverlap(player, e)) {
      e.attackAnim = Math.max(e.attackAnim, .32);
      hurtPlayer(e.damage, Math.sign(player.x - e.x) * 210);
    }
  }
  enemies = enemies.filter(e => !e.dead || e.deathTimer > 0);
}

function updateProjectiles(dt) {
  for (const p of projectiles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    if (p.owner === "player") {
      for (const e of enemies) {
        if (!e.dead && realOverlap(p, e)) {
          hurtEnemy(e, p.damage, Math.sign(p.vx) * 120);
          p.life = 0;
          break;
        }
      }
    } else if (realOverlap(p, player)) {
      hurtPlayer(p.damage, Math.sign(p.vx) * 150);
      p.life = 0;
    }
  }
  projectiles = projectiles.filter(p => p.life > 0 && p.x > -100 && p.x < TOTAL_W + 100 && p.y > -200 && p.y < 900);
}

function updateCollectibles(dt) {
  for (const c of collectibles) {
    if (c.taken) continue;
    c.bob += dt * 2.8;
    const box = { x: c.x, y: c.y + Math.sin(c.bob) * 7, w: c.w, h: c.h };
    if (realOverlap(player, box)) {
      c.taken = true;
      if (c.type === "coin") coins++;
      if (c.type === "gem") gems++;
      if (c.type === "heart") player.hp = Math.min(player.maxHp, player.hp + 38);
      if (c.type === "chest") { coins += 10; gems += 3; player.hp = player.maxHp; }
      effects.push({ x: c.x, y: c.y, life: .55, text: c.type === "chest" ? "+ TREASURE" : "+1" });
    }
  }
}

function updateEffects(dt) {
  for (const e of effects) e.life -= dt;
  effects = effects.filter(e => e.life > 0);
  stageBanner.timer = Math.max(0, stageBanner.timer - dt);
}

function updateHud() {
  const h = player.hero;
  if (!h) return;
  const sec = sections[sectionIndex];
  const wi = WORLD_INFO[sec.world];
  ui.hudPortrait.src = ASSET(imageFiles[selected]);
  ui.hudName.textContent = h.name;
  ui.hudRole.textContent = h.role;
  ui.hpFill.style.transform = `scaleX(${Math.max(0, player.hp / player.maxHp)})`;
  ui.hpText.textContent = `HP ${Math.ceil(player.hp)}/${player.maxHp}` + (player.shield > 0 ? ` · Shield ${Math.ceil(player.shield)}` : "");
  ui.chapterLabel.textContent = `WORLD ${wi.roman} — ${wi.name}`;
  ui.objectiveLabel.textContent = sec.boss ? `${sec.name} · Kalahkan boss` : `Stage ${sec.world + 1}-${sec.stage} · ${sec.name}`;
  ui.coinLabel.textContent = `🪙 ${coins}`;
  ui.gemLabel.textContent = `💎 ${gems}`;
  const jumpText = player.grounded ? "Double Jump siap" : `Jump tersisa: ${player.jumpsLeft}`;
  ui.skillLabel.textContent = (player.skillTimer <= 0 ? `${h.skill}: SIAP` : `${h.skill}: ${player.skillTimer.toFixed(1)}s`) + ` · ${jumpText}`;
}

function winGame() {
  if (state === "ending") return;
  setTimeout(() => {
    state = "ending";
    ui.endingHero.textContent = `Pahlawan: ${player.hero.name}`;
    ui.endingCoins.textContent = `Koin: ${coins}`;
    ui.endingGems.textContent = `Gem: ${gems}`;
    ui.ending.classList.remove("hidden");
    ui.mobile.classList.add("hidden");
  }, 700);
}

function worldForCamera() {
  return Math.max(0, Math.min(WORLD_INFO.length - 1, Math.floor((cameraX + viewW * .5) / WORLD_LEN)));
}
function worldImage(index) { return images[WORLD_INFO[index].bg]; }
function drawCover(im, x, y, w, h) {
  if (!im) return;
  const sr = im.width / im.height, dr = w / h;
  let sx = 0, sy = 0, sw = im.width, sh = im.height;
  if (sr > dr) { sw = im.height * dr; sx = (im.width - sw) / 2; }
  else { sh = im.width / dr; sy = (im.height - sh) / 2; }
  ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h);
}

function drawBackground() {
  const idx = worldForCamera();
  const im = worldImage(idx);
  ctx.fillStyle = ["#26334a", "#112a26", "#3d2018", "#8bc5ec", "#171125"][idx];
  ctx.fillRect(0, 0, viewW, viewH);
  if (im) drawCover(im, 0, 0, viewW, viewH);
  const grad = ctx.createLinearGradient(0, 0, 0, viewH);
  grad.addColorStop(0, "rgba(5,10,18,.05)");
  grad.addColorStop(1, "rgba(5,10,18,.46)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, viewW, viewH);
}

function platformColor(world) { return ["#714f31", "#315b3b", "#743822", "#b4d6e8", "#332645"][world]; }
function edgeColor(world) { return ["#7ea65b", "#6ca15c", "#b3572d", "#eef8ff", "#5b3b69"][world]; }
function drawPlatforms() {
  ctx.save();
  ctx.translate(-cameraX, 0);
  for (const p of platforms) {
    if (p.x + p.w < cameraX - 100 || p.x > cameraX + viewW + 100) continue;
    ctx.fillStyle = platformColor(p.world);
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = edgeColor(p.world);
    ctx.fillRect(p.x, p.y, p.w, 9);
    ctx.fillStyle = "rgba(0,0,0,.17)";
    for (let x = p.x + 12; x < p.x + p.w; x += 42) ctx.fillRect(x, p.y + 24, 20, 5);
  }
  for (const hz of hazards) {
    if (hz.x + hz.w < cameraX - 100 || hz.x > cameraX + viewW + 100) continue;
    ctx.fillStyle = hz.world === 2 ? "#f04b25" : "#9d2449";
    ctx.fillRect(hz.x, hz.y, hz.w, hz.h);
    ctx.fillStyle = "rgba(255,230,130,.75)";
    for (let x = hz.x + 6; x < hz.x + hz.w; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, hz.y + 10);
      ctx.lineTo(x + 8, hz.y - 6);
      ctx.lineTo(x + 16, hz.y + 10);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawCheckpoints() {
  ctx.save();
  ctx.translate(-cameraX, 0);
  for (const sec of sections) {
    const x = sec.start + 55;
    if (x < cameraX - 80 || x > cameraX + viewW + 80) continue;
    const im = images.checkpoint;
    if (im) {
      ctx.globalAlpha = player.checkpoint >= sec.start ? 1 : .35;
      ctx.drawImage(im, x, FLOOR_Y - 95, 45, 92);
      ctx.globalAlpha = 1;
    }
  }
  ctx.restore();
}

function getPlayerAnimState() {
  if (player.hurtAnim > 0) return "hurt";
  if (player.actionAnim > 0 && player.actionState) return player.actionState;
  if (!player.grounded) return "jump";
  if (Math.abs(player.vx) > 12) return "run";
  return "idle";
}

function getPlayerAnimFrame(stateName, info) {
  const count = Math.max(1, info.frames || 1);
  if (stateName === "attack" || stateName === "skill") {
    const duration = Math.max(.001, player.actionDuration || .35);
    const progress = Math.max(0, Math.min(.999, 1 - player.actionAnim / duration));
    // Limited-animation feel: tahan pose lebih lama, tetap menyelesaikan animasi.
    const raw = Math.floor(progress * count);
    return Math.min(count - 1, raw);
  }
  if (stateName === "hurt") {
    const progress = Math.max(0, Math.min(.999, 1 - player.hurtAnim / .28));
    return Math.min(count - 1, Math.floor(progress * count));
  }
  if (stateName === "jump") {
    const t = Math.max(-1, Math.min(1, player.vy / 650));
    const progress = (t + 1) / 2;
    return Math.min(count - 1, Math.floor(progress * count));
  }
  if (stateName === "run" && selected !== "arka") {
    const stridePerFrame = 27;
    return Math.floor(player.runAnimDistance / stridePerFrame) % count;
  }

  const fps = info.fps || 6;
  return Math.floor(player.animTime * fps) % count;
}

function drawPlayer() {
  const states = HERO_ANIM_META[selected];
  let stateName = getPlayerAnimState();

  if (player.lastAnimState !== stateName) {
    player.animTime = 0;
    if (stateName === "run") player.runAnimDistance = 0;
    player.lastAnimState = stateName;
  }

  let info = states && (states[stateName] || states.idle);
  let im = info ? images[`hero_${selected}_${stateName}`] : null;

  // fallback bila asset animasi gagal dimuat
  if (!info || !im) {
    im = images[selected];
    if (!im) return;
    ctx.save();
    ctx.translate(-cameraX, 0);
    const dw = 56, dh = 78, x = player.x + (player.w - dw) / 2, y = player.y + player.h - dh;
    if (player.facing < 0) {
      ctx.translate(x + dw, y); ctx.scale(-1, 1); ctx.drawImage(im, 0, 0, dw, dh);
    } else ctx.drawImage(im, x, y, dw, dh);
    ctx.restore();
    return;
  }

  const frame = getPlayerAnimFrame(stateName, info);
  const sx = frame * info.cellW;

  // Semua state memakai skala sumber yang sama untuk hero yang sama.
  // Ini menjaga badan karakter tidak tiba-tiba membesar/mengecil saat
  // idle, run, jump, attack, atau skill. Efek serangan tetap boleh lebih lebar.
  const render = HERO_RENDER[selected] || { scale: 0.46, yOffset: 0 };
  const targetW = info.cellW * render.scale;
  const targetH = info.cellH * render.scale;
  const dx = player.x + player.w / 2 - targetW / 2;
  const dy = player.y + player.h - targetH + render.yOffset;

  ctx.save();
  ctx.translate(-cameraX, 0);
  if (player.inv > 0 && Math.floor(player.inv * 18) % 2 === 0) ctx.globalAlpha = .42;

  if (player.facing < 0) {
    ctx.translate(dx + targetW, dy);
    ctx.scale(-1, 1);
    ctx.drawImage(im, sx, 0, info.cellW, info.cellH, 0, 0, targetW, targetH);
  } else {
    ctx.drawImage(im, sx, 0, info.cellW, info.cellH, dx, dy, targetW, targetH);
  }
  ctx.restore();

  if (player.shield > 0) {
    ctx.save();
    ctx.translate(-cameraX, 0);
    ctx.strokeStyle = "rgba(100,210,255,.9)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(player.x + 22, player.y + 32, 46, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function getEnemyAnimState(e) {
  if (e.dead) return "death";
  if (e.flash > 0) return "hurt";
  if ((e.attackAnim || 0) > 0) return "attack";
  if (e.flying || Math.abs(e.vx) > 8) return "move";
  return "idle";
}

function getEnemyAnimFrame(e, stateName, info) {
  const count = Math.max(1, info.frames || 1);
  if (stateName === "death") {
    const duration = e.deathDuration || .78;
    const progress = Math.max(0, Math.min(1, 1 - (e.deathTimer || 0) / duration));
    return Math.min(count - 1, Math.floor(progress * count));
  }
  const fps = stateName === "attack" ? 11 : stateName === "hurt" ? 10 : stateName === "move" ? 8 : 5;
  return Math.floor((e.animTime || 0) * fps) % count;
}

function drawAnimatedEnemy(e) {
  const states = ANIM_META[e.type];
  if (!states) return false;
  let stateName = getEnemyAnimState(e);
  let info = states[stateName] || states.move || states.idle;
  if (!info) return false;
  const im = images[`anim_${e.type}_${stateName}`] || images[`anim_${e.type}_move`] || images[`anim_${e.type}_idle`];
  if (!im) return false;

  const frame = getEnemyAnimFrame(e, stateName, info);
  const sx = frame * info.cellW;
  const sy = 0;

  const scaleBase = e.boss ? (e.scale || 1.8) * 1.55 : 1.75;
  const dh = e.h * scaleBase;
  const dw = dh * (info.cellW / info.cellH);
  const dx = e.x + e.w / 2 - dw / 2;
  const dy = e.y + e.h - dh;

  ctx.save();
  if (e.flash > 0 && !e.dead) ctx.globalAlpha = .72;
  if ((e.facing || 1) < 0) {
    ctx.translate(dx + dw, dy);
    ctx.scale(-1, 1);
    ctx.drawImage(im, sx, sy, info.cellW, info.cellH, 0, 0, dw, dh);
  } else {
    ctx.drawImage(im, sx, sy, info.cellW, info.cellH, dx, dy, dw, dh);
  }
  ctx.restore();
  return true;
}

function drawEnemies() {
  ctx.save();
  ctx.translate(-cameraX, 0);
  for (const e of enemies) {
    if (e.x + e.w < cameraX - 220 || e.x > cameraX + viewW + 220) continue;

    if (!drawAnimatedEnemy(e)) {
      const im = images[e.type];
      if (!im) continue;
      if (e.flash > 0) ctx.globalAlpha = .55;
      const scale = e.scale || (e.boss ? 1.8 : 1.25);
      const dw = e.w * scale, dh = e.h * scale;
      ctx.drawImage(im, e.x - (dw - e.w) / 2, e.y + e.h - dh, dw, dh);
      ctx.globalAlpha = 1;
    }

    if (!e.boss && !e.dead) {
      ctx.fillStyle = "rgba(0,0,0,.6)";
      ctx.fillRect(e.x, e.y - 11, e.w, 6);
      ctx.fillStyle = "#ff6b6b";
      ctx.fillRect(e.x, e.y - 11, e.w * Math.max(0, e.hp / e.maxHp), 6);
    }
  }
  ctx.restore();
}

function drawBossBar() {
  if (!bossAlive || bossAlive.dead || state === "menu") return;
  const ratio = Math.max(0, bossAlive.hp / bossAlive.maxHp);
  const w = Math.min(560, viewW * .56);
  const x = (viewW - w) / 2;
  const y = 88;
  ctx.fillStyle = "rgba(5,8,16,.82)";
  ctx.fillRect(x - 12, y - 28, w + 24, 54);
  ctx.fillStyle = "#f7d694";
  ctx.font = "700 15px Georgia,serif";
  ctx.textAlign = "center";
  ctx.fillText(bossAlive.bossName, viewW / 2, y - 8);
  ctx.fillStyle = "rgba(255,255,255,.14)";
  ctx.fillRect(x, y, w, 12);
  ctx.fillStyle = "#e53945";
  ctx.fillRect(x, y, w * ratio, 12);
  ctx.textAlign = "left";
}

function drawCollectibles() {
  ctx.save();
  ctx.translate(-cameraX, 0);
  for (const c of collectibles) {
    if (c.taken || c.x < cameraX - 80 || c.x > cameraX + viewW + 80) continue;
    const im = images[c.type];
    if (!im) continue;
    const y = c.y + Math.sin(c.bob) * 7;
    const s = c.type === "chest" ? 1.05 : 1.1;
    ctx.drawImage(im, c.x, y, c.w * s, c.h * s);
  }
  ctx.restore();
}

function drawProjectiles() {
  ctx.save();
  ctx.translate(-cameraX, 0);
  for (const p of projectiles) {
    ctx.fillStyle = p.owner === "player" ? "#f9dc78" : "#fa416d";
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
  ctx.shadowBlur = 0;
}

function drawEffects() {
  ctx.save();
  ctx.translate(-cameraX, 0);
  for (const e of effects) {
    if (e.kind === "ring") {
      const t = 1 - e.life / .55, r = e.r + (e.max - e.r) * t;
      ctx.strokeStyle = `rgba(255,240,160,${Math.max(0, e.life * 1.8)})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(e.x, e.y, r, 0, Math.PI * 2);
      ctx.stroke();
    } else if (e.kind === "shield") {
      ctx.strokeStyle = `rgba(100,210,255,${Math.max(0, e.life)})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(player.x + 22, player.y + 32, 52, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.globalAlpha = Math.min(1, e.life * 2);
      ctx.fillStyle = "#fff7d6";
      ctx.font = "700 16px system-ui";
      ctx.fillText(e.text, e.x, e.y - e.life * 35);
      ctx.globalAlpha = 1;
    }
  }
  ctx.restore();
}

function drawStageBanner() {
  if (stageBanner.timer <= 0 || state !== "playing") return;
  const t = stageBanner.timer;
  const alpha = Math.min(1, (2.4 - t) * 2.5, t * 2.5);
  ctx.save();
  ctx.globalAlpha = alpha;
  const boxW = Math.min(500, viewW * .68);
  const x = (viewW - boxW) / 2;
  const y = 150;
  ctx.fillStyle = "rgba(4,10,20,.74)";
  ctx.fillRect(x, y, boxW, 76);
  ctx.strokeStyle = "rgba(247,214,148,.45)";
  ctx.strokeRect(x, y, boxW, 76);
  ctx.textAlign = "center";
  ctx.fillStyle = "#f7d694";
  ctx.font = "700 15px Georgia,serif";
  ctx.fillText(stageBanner.text, viewW / 2, y + 27);
  ctx.fillStyle = "#f8fafc";
  ctx.font = "800 24px system-ui";
  ctx.fillText(stageBanner.sub, viewW / 2, y + 55);
  ctx.textAlign = "left";
  ctx.restore();
}

function drawProgress() {
  if (state !== "playing" && state !== "paused") return;
  const sec = sections[sectionIndex];
  const local = Math.max(0, Math.min(1, (player.x - sec.start) / sec.length));
  const w = 220, h = 5, x = viewW / 2 - w / 2, y = 58;
  ctx.fillStyle = "rgba(255,255,255,.14)";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "rgba(247,214,148,.9)";
  ctx.fillRect(x, y, w * local, h);
}

function render() {
  drawBackground();
  drawPlatforms();
  drawCheckpoints();
  drawCollectibles();
  drawEnemies();
  drawProjectiles();
  drawPlayer();
  drawEffects();
  drawBossBar();
  drawProgress();
  drawStageBanner();
  if (state === "menu" && !assetsReady) {
    ctx.fillStyle = "#fff";
    ctx.font = "16px system-ui";
    ctx.fillText("Memuat asset...", 20, 30);
  }
}

function loop(t) {
  const dt = Math.min((t - last) / 1000 || 0, .033);
  last = t;
  if (state === "playing") {
    updatePlayer(dt);
    updateEnemies(dt);
    updateProjectiles(dt);
    updateCollectibles(dt);
    updateEffects(dt);
    updateHud();
  }
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

addEventListener("keydown", e => {
  keys[e.code] = true;
  if (["Space", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
  if (e.code === "Escape") {
    if (state === "playing") setPause(true);
    else if (state === "paused") setPause(false);
  }
});
addEventListener("keyup", e => keys[e.code] = false);

canvas.addEventListener("pointerdown", e => {
  if (state !== "playing") return;
  if (e.button === 0) input.attack = true;
  if (e.button === 2) input.skill = true;
});
canvas.addEventListener("contextmenu", e => e.preventDefault());

function press(id, fn) {
  $(id).addEventListener("pointerdown", e => { e.preventDefault(); fn(); });
}
press("#jumpBtn", () => input.jump = true);
press("#attackBtn", () => input.attack = true);
press("#skillBtn", () => input.skill = true);

const base = $("#stickBase"), knob = $("#stickKnob");
let ptr = null;
function stickMove(e) {
  const r = base.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, max = r.width * .31;
  let dx = e.clientX - cx, dy = e.clientY - cy, len = Math.hypot(dx, dy);
  if (len > max) { dx = dx / len * max; dy = dy / len * max; }
  knob.style.transform = `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px))`;
  input.x = Math.abs(dx / max) < .12 ? 0 : dx / max;
}
base.addEventListener("pointerdown", e => {
  e.preventDefault();
  ptr = e.pointerId;
  base.setPointerCapture(ptr);
  stickMove(e);
});
base.addEventListener("pointermove", e => { if (e.pointerId === ptr) stickMove(e); });
function resetStick(e) {
  if (e.pointerId !== ptr) return;
  ptr = null;
  input.x = 0;
  knob.style.transform = "translate(-50%,-50%)";
}
base.addEventListener("pointerup", resetStick);
base.addEventListener("pointercancel", resetStick);

loadImages();
})();
