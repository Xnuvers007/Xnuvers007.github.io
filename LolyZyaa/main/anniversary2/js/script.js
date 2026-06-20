(function () {
  const canvas = document.getElementById("canvas-bg");
  const ctx = canvas.getContext("2d");
  let W,
    H,
    stars = [];
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  function initStars() {
    stars = [];
    const count = Math.floor((W * H) / 5000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        da: (Math.random() * 0.005 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
        speed: Math.random() * 0.08 + 0.02,
      });
    }
  }
  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach((s) => {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da = -s.da;
      s.y += s.speed;
      if (s.y > H) {
        s.y = 0;
        s.x = Math.random() * W;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,220,240,${s.a * 0.8})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  resize();
  initStars();
  drawStars();
  window.addEventListener("resize", () => {
    resize();
    initStars();
  });
})();
(function () {
  const container = document.getElementById("petals-container");
  const icons = [
    '<i class="fa-solid fa-heart"  style="color:#e8476a;font-size:VALpx;opacity:0.7"></i>',
    '<i class="fa-regular fa-heart" style="color:#f78ca0;font-size:VALpx;opacity:0.5"></i>',
    '<i class="fa-solid fa-star"   style="color:#d4a853;font-size:VALpx;opacity:0.5"></i>',
  ];
  function spawnPetal() {
    const el = document.createElement("div");
    el.classList.add("petal");
    const size = Math.random() * 14 + 8;
    const icon = icons[Math.floor(Math.random() * icons.length)].replace(
      /VAL/g,
      size,
    );
    el.innerHTML = icon;
    el.style.left = `${Math.random() * 100}vw`;
    el.style.animationDuration = `${Math.random() * 8 + 6}s`;
    el.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 12000);
  }
  setInterval(spawnPetal, 700);
})();
(function () {
  const START_DATE = new Date("2021-06-21T00:00:00");
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function update() {
    const now = new Date();
    const diff = now - START_DATE;
    if (diff < 0) return;
    let rem = diff;
    const ms = 1000;
    const secs = Math.floor(rem / ms);
    rem = rem % ms;
    const s = secs % 60;
    const m = Math.floor(secs / 60) % 60;
    const h = Math.floor(secs / 3600) % 24;
    const totalDays = Math.floor(secs / 86400);
    let yy = now.getFullYear() - START_DATE.getFullYear();
    let mm = now.getMonth() - START_DATE.getMonth();
    let finalDays = now.getDate() - START_DATE.getDate();

    if (finalDays < 0) {
      mm--;
      let prevMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
      finalDays += prevMonthDate.getDate();
    }
    if (mm < 0) {
      yy--;
      mm += 12;
    }
    yy = Math.max(0, yy);
    mm = Math.max(0, mm);
    finalDays = Math.max(0, finalDays);
    const cntYears = document.getElementById("cnt-years");
    if (!cntYears) return; // Prevent error if DOM not ready or cleared
    cntYears.textContent = pad(yy);
    document.getElementById("cnt-months").textContent = pad(mm);
    document.getElementById("cnt-days").textContent = pad(finalDays);
    document.getElementById("cnt-hours").textContent = pad(h);
    document.getElementById("cnt-mins").textContent = pad(m);
    document.getElementById("cnt-secs").textContent = pad(s);
  }
  update();
  setInterval(update, 1000);
})();
(function () {
  const reveals = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  reveals.forEach((el) => obs.observe(el));
})();
(function () {
  const btn = document.getElementById("music-btn");
  let playing = false;
  const bgMusic = new Audio("https://files.catbox.moe/8s8h2j.mp3");
  bgMusic.loop = true;
  btn.addEventListener("click", () => {
    playing = !playing;
    btn.classList.toggle("playing", playing);
    btn.querySelector("i").className = playing
      ? "fa-solid fa-compact-disc"
      : "fa-solid fa-music";
    if (playing) {
      bgMusic.play().catch((e) => console.log("Audio error:", e));
    } else {
      bgMusic.pause();
    }
  });
})();
(function () {
  const icons = [
    "fa-solid fa-heart",
    "fa-regular fa-heart",
    "fa-solid fa-star",
  ];
  const colors = ["#e8476a", "#f78ca0", "#d4a853", "#f0d08a", "#9b59b6"];
  let last = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - last < 60) return;
    last = now;
    const el = document.createElement("i");
    el.className = icons[Math.floor(Math.random() * icons.length)];
    el.classList.add("cursor-heart");
    el.style.left = e.clientX - 8 + "px";
    el.style.top = e.clientY - 8 + "px";
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.fontSize = Math.random() * 10 + 10 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  });
})();
(function () {
  const fill = document.getElementById("meter-fill");
  const pct = document.getElementById("meter-pct");
  let triggered = false;
  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        fill.style.width = "100%";
        let count = 0;
        const interval = setInterval(() => {
          count++;
          pct.textContent = count + "%";
          if (count >= 100) clearInterval(interval);
        }, 18);
      }
    },
    { threshold: 0.4 },
  );
  if (fill) obs.observe(fill.parentElement);
})();
(function () {
  const messages = [
    "kamu tuh rumah yang aku rindukan — bahkan pas lagi bareng kamu sekalipun.",
    "tiap pagi aku bangun, hal pertama yang aku syukuri itu kamu. serius.",
    "kalau aku dikasih satu permintaan, aku nggak minta apa-apa. udah ada kamu kan.",
    "senyum kamu hari ini udah cukup buat bikin hariku jauh lebih baik dari yang aku kira.",
    "aku nggak tau caranya berhenti sayang sama kamu. mungkin emang nggak ada caranya.",
    "bareng kamu, waktu kerasa cepet banget. sendiri, kerasa lama. jadi... tolong jangan kemana-mana ya.",
    "kamu bukan cuma pacar aku — kamu tuh orang yang paling aku mau ceritain hari aku, tiap hari.",
    "di antara semua kemungkinan yang ada, aku bersyukur banget kita saling nemu satu sama lain.",
    "sayang sama kamu itu bukan keputusan — itu udah naluri. alami. nggak pake mikir.",
    "kita emang sering ribut soal hal receh, tapi jujur aku tetep bersyukur punya kamu buat diajak ribut. 😂❤️",
  ];
  const btn = document.getElementById("shuffle-btn");
  const text = document.getElementById("randmsg-text");
  let lastIdx = -1;
  btn.addEventListener("click", () => {
    let idx;
    do {
      idx = Math.floor(Math.random() * messages.length);
    } while (idx === lastIdx);
    lastIdx = idx;
    text.style.opacity = "0";
    setTimeout(() => {
      text.textContent = messages[idx];
      text.style.opacity = "1";
    }, 300);
    launchConfetti(btn);
  });
})();
function launchConfetti(origin) {
  const colors = [
    "#e8476a",
    "#f78ca0",
    "#d4a853",
    "#f0d08a",
    "#9b59b6",
    "#fff",
    "#5a1e8c",
  ];
  const shapes = ["heart", "star", "circle", "square"];
  const count = 80;
  const rect =
    origin instanceof Element ? origin.getBoundingClientRect() : null;
  const ox = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const oy = rect ? rect.top : window.innerHeight / 2;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.classList.add("confetti-piece");
    const size = Math.random() * 10 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * 360;
    const spread = Math.random() * 300 - 150;
    const dur = Math.random() * 1.2 + 0.8;
    el.style.cssText = `
        left: ${ox + spread * 0.2}px;
        top:  ${oy}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? "50%" : "3px"};
        animation-duration: ${dur}s;
        animation-delay: ${Math.random() * 0.3}s;
      `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + 0.4) * 1000);
  }
}
let gachaOpened = false;
function openGacha() {
  if (gachaOpened) return;
  const icon = document.getElementById("gacha-icon");
  const result = document.getElementById("gacha-result");
  const coupons = [
    "🎟️ Kupon Nonton Netflix Bareng via Telepon",
    "🎟️ Kupon GoFood Gratis dari Aku",
    "🎟️ Kupon Bebas Ngambek 1 Hari Penuh",
    "🎟️ Kupon Peluk Virtual Unlimited",
    "🎟️ Kupon 'Kamu Boleh Minta Apa Aja Hari Ini'",
  ];
  icon.classList.add("shake");
  setTimeout(() => {
    icon.classList.remove("shake");
    icon.innerHTML = '<i class="fa-solid fa-box-open"></i>';
    icon.style.color = "var(--rose-light)";
    icon.style.transform = "scale(1.2)";
    const randomCoupon = coupons[Math.floor(Math.random() * coupons.length)];
    result.textContent = randomCoupon;
    result.style.opacity = "1";
    launchConfetti(document.getElementById("gacha-box"));
    gachaOpened = true;
  }, 500);
}
(function () {
  const btnNo = document.getElementById("btn-no");
  const proposalCard = document.querySelector(".proposal-card");
  function moveButton(e) {
    if (btnNo.parentElement !== proposalCard) {
      const rect = btnNo.getBoundingClientRect();
      btnNo.style.width = rect.width + "px";
      btnNo.style.height = rect.height + "px";
      proposalCard.appendChild(btnNo);
    }
    btnNo.style.position = "absolute";
    const maxX = proposalCard.offsetWidth - btnNo.offsetWidth - 20;
    const maxY = proposalCard.offsetHeight - btnNo.offsetHeight - 20;
    const newX = Math.max(20, Math.random() * maxX);
    const newY = Math.max(20, Math.random() * maxY);
    btnNo.style.left = newX + "px";
    btnNo.style.top = newY + "px";
    btnNo.style.zIndex = "99999";
    if (e) {
      e.preventDefault();
    }
  }
  btnNo.addEventListener("mouseover", moveButton);
  btnNo.addEventListener("click", moveButton);
  btnNo.addEventListener("touchstart", moveButton);
})();
function proposalAccepted() {
  Swal.fire({
    title: "Yeeeyyy! Love you 3000! ❤️",
    text: "LDR bentar lagi bakal kelar ya sayang! Aku pengen kalo ketemu mau pegang pipimu yang mbem (tembem) itu dan melihat mata yang indah darimu 🥰",
    icon: "success",
    confirmButtonText: "Iya Sayang!",
    confirmButtonColor: "#e8476a",
    background: "rgba(21, 8, 37, 0.95)",
    color: "#fff",
    backdrop: "rgba(0,0,0,0.6)",
  });
  launchConfetti(document.getElementById("btn-yes"));
  setTimeout(() => launchConfetti(document.body), 500);
  setTimeout(() => launchConfetti(document.body), 1000);
}
const quizQuestions = [
  {
    q: "Warna favorit kamu?",
    opts: ["💜 Ungu", "❤️ Merah", "🖤 Hitam", "💙 Biru"],
    ans: 0,
  },
  {
    q: "Makanan favorit kamu?",
    opts: ["🍔 Burger", "🥗 Gado-gado", "🍕 Pizza", "🍣 Sushi"],
    ans: 1,
  },
  {
    q: "Cemilan favorit kamu?",
    opts: ["🍩 Donat", "🍟 Kentang Goreng", "🥟 Pastel", "🍫 Coklat"],
    ans: 2,
  },
  {
    q: "Kamu paling suka dikasih apa?",
    opts: ["💐 Bunga", "📸 Foto spam dari aku", "🧸 Boneka", "💍 Perhiasan"],
    ans: 1,
  },
  {
    q: "Boneka favorit kamu?",
    opts: ["🐸 Keroppi", "🐱 Hello Kitty", "🐻 Teddy Bear", "🐰 Kelinci"],
    ans: 0,
  },
  {
    q: "Kamu suka begadang kapan?",
    opts: [
      "Setiap hari",
      "Pas lagi banyak tugas",
      "Saat libur",
      "Nggak pernah begadang",
    ],
    ans: 2,
  },
  {
    q: "Kamu paling suka apa selain aku?",
    opts: ["Netflix", "Tempe goreng 😭", "Tidur", "Jalan-jalan"],
    ans: 1,
  },
  {
    q: "Paling suka kalau aku cium di mana?",
    opts: ["Kening", "Pipi", "Bibir 😏", "Semuanya 🫣"],
    ans: 3,
  },
];
let currQ = 0;
let score = 0;
function loadQuiz() {
  if (currQ >= quizQuestions.length) {
    document.getElementById("quiz-card").innerHTML = `
        <h3 class="quiz-question" style="font-size: 2rem;">Yayy! Selesai 🎉</h3>
        <p style="font-size: 1.2rem; margin-bottom: 20px; color: var(--gold-light);">Tebakanku yang bener: ${score}/${quizQuestions.length}</p>
        <p style="font-size: 1.1rem; color: var(--text-muted)">${score === quizQuestions.length ? "Tuh kan, aku beneran merhatiin detil-detil kecil tentang kamu! 😍" : "Waduh, berarti aku masih harus banyak belajar nih tentang kamu! Maafin yaa 🤭"}</p>
      `;
    launchConfetti(document.getElementById("quiz-card"));
    return;
  }
  const q = quizQuestions[currQ];
  document.getElementById("q-curr").textContent = currQ + 1;
  document.getElementById("q-tot").textContent = quizQuestions.length;
  document.getElementById("quiz-question").textContent = q.q;
  document.getElementById("quiz-result-msg").textContent = "";
  const optsDiv = document.getElementById("quiz-options");
  optsDiv.innerHTML = "";
  q.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-btn";
    btn.textContent = opt;
    btn.onclick = () => checkQuiz(i, q.ans, btn);
    optsDiv.appendChild(btn);
  });
}
function checkQuiz(selected, correct, btn) {
  const btns = document.querySelectorAll(".quiz-btn");
  btns.forEach((b) => (b.disabled = true));
  const msg = document.getElementById("quiz-result-msg");
  if (selected === correct) {
    btn.classList.add("correct");
    msg.textContent = "BENERRR 😍 Terbukti kan aku perhatian!";
    msg.style.color = "#2ecc71";
    score++;
    launchConfetti(btn);
  } else {
    btn.classList.add("wrong");
    btns[correct].classList.add("correct");
    msg.textContent =
      "Eh salah ya? 😭 (Berarti tebakanku meleset nih, ajarin dong)";
    msg.style.color = "#e74c3c";
  }
  setTimeout(() => {
    currQ++;
    loadQuiz();
  }, 2000);
}
loadQuiz();
const emerBtn = document.getElementById("emergency-love");
const emerMsgs = [
  "Aku sayang kamu ❤️",
  "Aku serius sayang kamu ❤️",
  "Aku kangen kamu 😭",
  "Aku pengen peluk kamu 🥺",
  "Yaudah nikahin aku aja 😳💍",
];
let emerClickCount = 0;
emerBtn.addEventListener("mouseenter", () => {
  if (Math.random() > 0.4) {
    emerBtn.style.left = Math.random() * (window.innerWidth - 150) + "px";
    emerBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";
    emerBtn.style.right = "auto";
  }
});
emerBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Pesan Darurat 🚨",
    text: emerMsgs[emerClickCount],
    icon: "info",
    confirmButtonText: "Aww ❤️",
    confirmButtonColor: "#e8476a",
    background: "rgba(21, 8, 37, 0.95)",
    color: "#fff",
  });
  if (emerClickCount < emerMsgs.length - 1) {
    emerClickCount++;
  } else {
    launchConfetti(emerBtn);
  }
});
function showAchievement(text, duration = 4000) {
  const toast = document.getElementById("achieve-toast");
  const toastText = document.getElementById("achieve-toast-text");
  if (!toast || !toastText) return; // Prevent error on simulator reload
  toastText.innerHTML = text;
  toast.classList.add("show");
  setTimeout(() => {
    if (toast) toast.classList.remove("show");
  }, duration);
}
const funnyAchievements = [
  "🏆 Achievement Unlocked:<br><span style='font-size:0.9rem;font-weight:normal;color:var(--text-muted)'>Kuat Nahan Kangen (Padahal Tiap Hari Ngeluh)</span>",
  "🏆 Achievement Unlocked:<br><span style='font-size:0.9rem;font-weight:normal;color:var(--text-muted)'>Master Sleep Call (Tidur Sambil Ngikis gigi di VC)</span>",
  "🏆 Achievement Unlocked:<br><span style='font-size:0.9rem;font-weight:normal;color:var(--text-muted)'>Sabar Tingkat Dewa (Tahan Ngadepin Moodku)</span>",
  "❌ Achievement Failed:<br><span style='font-size:0.9rem;font-weight:normal;color:#ff4757'>Diet Bareng (Malah Laper dan Makan Malam-malam)</span>",
  "🏆 Achievement Unlocked:<br><span style='font-size:0.9rem;font-weight:normal;color:var(--text-muted)'>Spam Chat Terbanyak (Karena Aku Lama Bales)</span>",
];
let achIdx = 0;
function triggerNextAchievement() {
  if (achIdx < funnyAchievements.length) {
    showAchievement(funnyAchievements[achIdx], 4000);
    achIdx++;
    setTimeout(triggerNextAchievement, 5000);
  }
}
setTimeout(triggerNextAchievement, 5000);
let currPage = 1;
const totalPages = 7;
function updateBook() {
  for (let i = 1; i <= totalPages; i++) {
    const p = document.getElementById("page-" + i);
    if (i < currPage) {
      p.className = "page prev";
    } else if (i === currPage) {
      p.className = "page active";
    } else {
      p.className = "page";
    }
  }
  document.getElementById("page-indicator").textContent =
    `${currPage} / ${totalPages}`;
}
function nextPage() {
  if (currPage < totalPages) {
    currPage++;
    updateBook();
    if (currPage === totalPages) {
      setTimeout(
        () => launchConfetti(document.getElementById("storybook")),
        600,
      );
    }
  }
}
function prevPage() {
  if (currPage > 1) {
    currPage--;
    updateBook();
  }
}
