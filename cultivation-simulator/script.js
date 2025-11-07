document.addEventListener("DOMContentLoaded", () => {
  const navWingCalculator = document.getElementById("nav-wing-calculator");
  const navElixirCalculator = document.getElementById("nav-elixir-calculator");
  const navWorldCalculator = document.getElementById("nav-world-calculator");
  const navChangelog = document.getElementById("nav-changelog"); // added
  const navComments = document.getElementById("nav-comments");
  const pageWingCalculator = document.getElementById("page-wing-calculator");
  const pageElixirCalculator = document.getElementById(
    "page-elixir-calculator"
  );
  const pageWorldCalculator = document.getElementById("page-world-calculator");
  const pageChangelog = document.getElementById("page-changelog"); // added
  const pageComments = document.getElementById("page-comments");

  const navLinks = [navWingCalculator, navElixirCalculator, navWorldCalculator, navChangelog, navComments]; // updated
  const pages = [pageWingCalculator, pageElixirCalculator, pageWorldCalculator, pageChangelog, pageComments]; // updated

  pageWingCalculator.classList.add("visible");

  function showPage(pageToShow) {
    const animDuration = 360;
    pages.forEach((p) => {
      if (p === pageToShow) {
        p.classList.remove("hidden", "leaving");
        void p.offsetWidth;
        p.classList.add("visible");
      } else if (!p.classList.contains("hidden")) {
        p.classList.remove("visible");
        p.classList.add("leaving");
        setTimeout(() => {
          p.classList.add("hidden");
          p.classList.remove("leaving");
        }, animDuration);
      } else {
        p.classList.remove("visible", "leaving");
      }
    });
  }

  function setActiveLink(linkToActivate) {
    navLinks.forEach((link) => link && link.classList.remove("active"));
    if (linkToActivate) linkToActivate.classList.add("active");
  }

  navComments &&
    navComments.addEventListener("click", () => {
      showPage(pageComments);
      setActiveLink(navComments);
      loadComments(); 
    });

  navWingCalculator && navWingCalculator.addEventListener("click", () => {
    showPage(pageWingCalculator);
    setActiveLink(navWingCalculator);
  });
  navElixirCalculator && navElixirCalculator.addEventListener("click", () => {
    showPage(pageElixirCalculator);
    setActiveLink(navElixirCalculator);
  });
  navWorldCalculator && navWorldCalculator.addEventListener("click", () => {
    showPage(pageWorldCalculator);
    setActiveLink(navWorldCalculator);
  });
  navChangelog && navChangelog.addEventListener("click", () => { // added
    showPage(pageChangelog);
    setActiveLink(navChangelog);
  });

  const installBtn = document.getElementById("install-btn");
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredPrompt = e;
    // show custom install button
    installBtn && installBtn.classList.add('show');
    if (installBtn) installBtn.setAttribute('aria-hidden', 'false');
  });

  installBtn && installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${choice.outcome}`);
    if (choice.outcome === "accepted") {
        console.log("User accepted the install prompt");
    } else {
        console.log("User dismissed the install prompt");
    }
    // hide install button after user choice
    installBtn.classList.remove('show');
    installBtn.setAttribute('aria-hidden', 'true');
    deferredPrompt = null;
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        console.log("SW registered", reg.scope);
      })
      .catch((err) => {
        console.warn("SW registration failed", err);
      });
  }
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle");
  const overlay = document.getElementById("sidebar-overlay");
  const toggleSidebar = () => {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
  };
  toggleBtn.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);
  const elixirData = {
    rarities: [
      { name: "Common", value: 1, id: "common", defaultChecked: true },
      { name: "Good", value: 2, id: "good", defaultChecked: true },
      { name: "Sturdy", value: 3, id: "sturdy", defaultChecked: false },
      { name: "Rare", value: 4, id: "rare", defaultChecked: false },
      { name: "Perfect", value: 5, id: "perfect", defaultChecked: false },
      { name: "Scarce", value: 6, id: "scarce", defaultChecked: false },
      { name: "Epic", value: 8, id: "epic", defaultChecked: false },
      { name: "Legendary", value: 10, id: "legendary", defaultChecked: false },
      { name: "Immortal", value: 14, id: "immortal", defaultChecked: false },
      { name: "Myth", value: 20, id: "myth", defaultChecked: false },
      { name: "Eternal", value: 28, id: "eternal", defaultChecked: false },
    ],
    stats: [
      { name: "Attack", id: "attack", isPercentage: false },
      {
        name: "Critical Hit Damage",
        id: "crit",
        isPercentage: true,
        decimals: 2,
      },
      {
        name: "Talisman Damage",
        id: "talisman",
        isPercentage: true,
        decimals: 3,
      },
      { name: "HP", id: "hp", isPercentage: false },
      { name: "Skill Damage", id: "skill", isPercentage: true, decimals: 3 },
    ],
    colors: {
      common: { bg: "#dcdcdc", text: "#333333" },
      good: { bg: "#90ee90", text: "#333333" },
      sturdy: { bg: "#00ffff", text: "#333333" },
      rare: { bg: "#32cd32", text: "#ffffff" },
      perfect: { bg: "#1e90ff", text: "#ffffff" },
      scarce: { bg: "#dda0dd", text: "#333333" },
      epic: { bg: "#ff8c00", text: "#ffffff" },
      legendary: { bg: "#9932cc", text: "#ffffff" },
      immortal: { bg: "#ff1493", text: "#ffffff" },
      myth: { bg: "#ff4500", text: "#ffffff" },
      eternal: { bg: "#ffd700", text: "#333333" },
    },
  };

  const elixirAbsorbData = {
    common: {
      attack: 100,
      crit: 0.01,
      talisman: 0.001,
      hp: 10000,
      skill: 0.002,
    },
    good: { attack: 200, crit: 0.02, talisman: 0.002, hp: 20000, skill: 0.004 },
    sturdy: {
      attack: 300,
      crit: 0.03,
      talisman: 0.003,
      hp: 30000,
      skill: 0.006,
    },
    rare: { attack: 400, crit: 0.04, talisman: 0.004, hp: 40000, skill: 0.008 },
    perfect: {
      attack: 600,
      crit: 0.05,
      talisman: 0.005,
      hp: 60000,
      skill: 0.01,
    },
    scarce: {
      attack: 800,
      crit: 0.06,
      talisman: 0.006,
      hp: 80000,
      skill: 0.012,
    },
    epic: {
      attack: 1200,
      crit: 0.08,
      talisman: 0.008,
      hp: 120000,
      skill: 0.016,
    },
    legendary: {
      attack: 1600,
      crit: 0.1,
      talisman: 0.01,
      hp: 160000,
      skill: 0.02,
    },
    immortal: {
      attack: 2400,
      crit: 0.14,
      talisman: 0.014,
      hp: 240000,
      skill: 0.028,
    },
    myth: { attack: 4000, crit: 0.2, talisman: 0.02, hp: 400000, skill: 0.04 },
    eternal: {
      attack: 6000,
      crit: 0.28,
      talisman: 0.028,
      hp: 600000,
      skill: 0.056,
    },
  };

  const checkboxContainer = document.getElementById(
    "elixir-checkbox-container"
  );
  const sectionsContainer = document.getElementById(
    "elixir-sections-container"
  );
  const totalsContainer = document.getElementById("elixir-totals-container");
  const absorbTotalsContainer = document.getElementById(
    "elixir-absorb-totals-container"
  );

  function formatStatNumber(num) {
    if (num >= 1000000000)
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    if (num >= 1000000)
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toLocaleString("id-ID");
  }

  function calculateElixirTotals() {
    const pointTotals = {},
      absorbTotals = {};
    elixirData.stats.forEach((stat) => {
      pointTotals[stat.id] = 0;
      absorbTotals[stat.id] = 0;
    });

    elixirData.rarities.forEach((rarity) => {
      const checkbox = document.getElementById(`elixir-check-${rarity.id}`);
      if (checkbox && checkbox.checked) {
        elixirData.stats.forEach((stat) => {
          const input = document.getElementById(
            `elixir-qty-${rarity.id}-${stat.id}`
          );
          const quantity = parseInt(input.value) || 0;
          pointTotals[stat.id] += quantity * rarity.value;
          absorbTotals[stat.id] +=
            quantity * elixirAbsorbData[rarity.id][stat.id];
        });
      }
    });

    elixirData.stats.forEach((stat) => {
      const totalEl = document.getElementById(`elixir-total-${stat.id}`);
      if (totalEl) totalEl.textContent = formatStatNumber(pointTotals[stat.id]);

      const absorbTotalEl = document.getElementById(
        `elixir-absorb-total-${stat.id}`
      );
      if (absorbTotalEl) {
        absorbTotalEl.textContent = stat.isPercentage
          ? `${absorbTotals[stat.id].toFixed(stat.decimals)}%`
          : formatStatNumber(absorbTotals[stat.id]);
      }
    });
  }

  function initElixirCalculator() {
    if (!checkboxContainer) return;

    elixirData.rarities.forEach((rarity) => {
      const div = document.createElement("div");
      const checkboxId = `elixir-check-${rarity.id}`;
      const colors = elixirData.colors[rarity.id];
      div.innerHTML = `
                        <input type="checkbox" id="${checkboxId}" class="hidden elixir-checkbox" ${
        rarity.defaultChecked ? "checked" : ""
      }>
                        <label for="${checkboxId}" class="elixir-checkbox-label" style="background-color: ${
        colors.bg
      }; color: ${colors.text};">
                            ${rarity.name}
                        </label>
                    `;
      checkboxContainer.appendChild(div);
    });

    elixirData.rarities.forEach((rarity) => {
      const section = document.createElement("div");
      section.id = `elixir-section-${rarity.id}`;
      section.className = `p-6 border-2 border-indigo-500/20 rounded-xl ${
        !rarity.defaultChecked ? "hidden" : ""
      }`;
      section.style.background =
        "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.03))";

      let inputsHTML = "";
      elixirData.stats.forEach((stat) => {
        inputsHTML += `
                            <div class="input-group">
                                <label for="elixir-qty-${rarity.id}-${stat.id}">${stat.name}</label>
                                <input type="number" id="elixir-qty-${rarity.id}-${stat.id}" class="input-field" value="0" min="0">
                            </div>
                        `;
      });

      const colors = elixirData.colors[rarity.id];
      section.innerHTML = `
                        <h4 class="text-lg font-bold text-white mb-4 pb-2 border-b-2" style="border-color: ${colors.bg}; color: ${colors.bg};">${rarity.name}</h4>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            ${inputsHTML}
                        </div>
                    `;
      sectionsContainer.appendChild(section);
    });

    elixirData.stats.forEach((stat) => {
      const pointDiv = document.createElement("div");
      pointDiv.className =
        "text-center p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/5";
      pointDiv.innerHTML = `
                        <div class="text-sm text-gray-400 mb-2">${stat.name}</div>
                        <div id="elixir-total-${stat.id}" class="text-3xl font-bold text-indigo-400">0</div>
                    `;
      totalsContainer.appendChild(pointDiv);

      const absorbDiv = document.createElement("div");
      absorbDiv.className =
        "text-center p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/5";
      absorbDiv.innerHTML = `
                        <div class="text-sm text-gray-400 mb-2">${stat.name}</div>
                        <div id="elixir-absorb-total-${stat.id}" class="text-3xl font-bold text-emerald-400">0</div>
                    `;
      absorbTotalsContainer.appendChild(absorbDiv);
    });

    elixirData.rarities.forEach((rarity) => {
      const checkbox = document.getElementById(`elixir-check-${rarity.id}`);
      const section = document.getElementById(`elixir-section-${rarity.id}`);
      if (checkbox && section) {
        checkbox.addEventListener("change", () => {
          section.classList.toggle("hidden", !checkbox.checked);
          calculateElixirTotals();
        });
      }

      elixirData.stats.forEach((stat) => {
        const input = document.getElementById(
          `elixir-qty-${rarity.id}-${stat.id}`
        );
        if (input) input.addEventListener("input", calculateElixirTotals);
      });
    });

    calculateElixirTotals();
  }
  const worldData = {
    Easy: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `World Easy ${i + 1}`,
    })),
    Normal: Array.from({ length: 20 }, (_, i) => ({
      id: i + 21,
      name: `World Normal ${i + 1}`,
    })),
    Hard: Array.from({ length: 20 }, (_, i) => ({
      id: i + 41,
      name: `World Hard ${i + 1}`,
    })),
    Expert: Array.from({ length: 20 }, (_, i) => ({
      id: i + 61,
      name: `World Expert ${i + 1}`,
    })),
    Master: Array.from({ length: 20 }, (_, i) => ({
      id: i + 81,
      name: `World Master ${i + 1}`,
    })),
  };

  const worldStats = {
    1: { xp: 500, ore: 1, coins: 1500 },
    2: { xp: 500, ore: 1, coins: 1500 },
    3: { xp: 500, ore: 1, coins: 1500 },
    4: { xp: 500, ore: 2, coins: 1500 },
    5: { xp: 500, ore: 2, coins: 1500 },
    6: { xp: 550, ore: 2, coins: 1500 },
    7: { xp: 550, ore: 2, coins: 2000 },
    8: { xp: 550, ore: 3, coins: 2600 },
    9: { xp: 600, ore: 3, coins: 3200 },
    10: { xp: 600, ore: 3, coins: 3200 },
    11: { xp: 700, ore: 3, coins: 3500 },
    12: { xp: 1000, ore: 3, coins: 3500 },
    13: { xp: 1000, ore: 4, coins: 3500 },
    14: { xp: 1000, ore: 4, coins: 3800 },
    15: { xp: 1000, ore: 4, coins: 4000 },
    16: { xp: 1000, ore: 4, coins: 4100 },
    17: { xp: 1500, ore: 4, coins: 4200 },
    18: { xp: 1500, ore: 5, coins: 4600 },
    19: { xp: 2000, ore: 5, coins: 5000 },
    20: { xp: 2000, ore: 5, coins: 7600 },
    21: { xp: 2500, ore: 5, coins: 8600 },
    22: { xp: 2500, ore: 5, coins: 9300 },
    23: { xp: 3000, ore: 5, coins: 10000 },
    24: { xp: 3000, ore: 6, coins: 10600 },
    25: { xp: 3500, ore: 6, coins: 11300 },
    26: { xp: 3500, ore: 6, coins: 12000 },
    27: { xp: 3500, ore: 6, coins: 13300 },
    28: { xp: 4500, ore: 6, coins: 14000 },
    29: { xp: 4500, ore: 7, coins: 14600 },
    30: { xp: 5000, ore: 7, coins: 16000 },
    31: { xp: 5000, ore: 7, coins: 16600 },
    32: { xp: 5000, ore: 7, coins: 17300 },
    33: { xp: 5500, ore: 7, coins: 18000 },
    34: { xp: 5500, ore: 7, coins: 18600 },
    35: { xp: 6000, ore: 8, coins: 19300 },
    36: { xp: 6500, ore: 8, coins: 20600 },
    37: { xp: 6500, ore: 8, coins: 20600 },
    38: { xp: 6500, ore: 8, coins: 22600 },
    39: { xp: 7000, ore: 9, coins: 22600 },
    40: { xp: 7500, ore: 9, coins: 26000 },
    41: { xp: 8500, ore: 9, coins: 50000 },
    42: { xp: 8500, ore: 9, coins: 52600 },
    43: { xp: 9500, ore: 9, coins: 56000 },
    44: { xp: 9500, ore: 9, coins: 57300 },
    45: { xp: 10000, ore: 10, coins: 59300 },
    46: { xp: 10000, ore: 10, coins: 61300 },
    47: { xp: 10000, ore: 10, coins: 63300 },
    48: { xp: 11000, ore: 10, coins: 64600 },
    49: { xp: 11000, ore: 10, coins: 66600 },
    50: { xp: 11000, ore: 11, coins: 67600 },
    51: { xp: 12000, ore: 11, coins: 70600 },
    52: { xp: 12000, ore: 11, coins: 72600 },
    53: { xp: 12000, ore: 12, coins: 74600 },
    54: { xp: 13000, ore: 11, coins: 76600 },
    55: { xp: 13000, ore: 11, coins: 78000 },
    56: { xp: 16500, ore: 12, coins: 79300 },
    57: { xp: 18500, ore: 12, coins: 81300 },
    58: { xp: 20500, ore: 12, coins: 82000 },
    59: { xp: 25000, ore: 12, coins: 84600 },
    60: { xp: 27500, ore: 12, coins: 86600 },
    61: { xp: 31500, ore: 13, coins: 100400 },
    62: { xp: 32300, ore: 13, coins: 101000 },
    63: { xp: 32800, ore: 13, coins: 101200 },
    64: { xp: 33200, ore: 13, coins: 101600 },
    65: { xp: 33700, ore: 13, coins: 103000 },
    66: { xp: 34200, ore: 13, coins: 104900 },
    67: { xp: 35000, ore: 14, coins: 106500 },
    68: { xp: 35500, ore: 14, coins: 108700 },
    69: { xp: 35900, ore: 14, coins: 110300 },
    70: { xp: 36900, ore: 14, coins: 112300 },
    71: { xp: 41800, ore: 14, coins: 125300 },
    72: { xp: 42300, ore: 15, coins: 127500 },
    73: { xp: 43100, ore: 15, coins: 129900 },
    74: { xp: 44100, ore: 15, coins: 132000 },
    75: { xp: 44400, ore: 15, coins: 134400 },
    76: { xp: 46000, ore: 15, coins: 137100 },
    77: { xp: 46300, ore: 16, coins: 139700 },
    78: { xp: 47200, ore: 16, coins: 143700 },
    79: { xp: 48100, ore: 16, coins: 145200 },
    80: { xp: 49400, ore: 16, coins: 148300 },
    81: { xp: 50000, ore: 16, coins: 152800 },
    82: { xp: 52000, ore: 16, coins: 154800 },
    83: { xp: 52800, ore: 16, coins: 157200 },
    84: { xp: 53600, ore: 16, coins: 160400 },
    85: { xp: 54400, ore: 16, coins: 163600 },
    86: { xp: 55600, ore: 16, coins: 167600 },
    87: { xp: 57200, ore: 16, coins: 171200 },
    88: { xp: 58400, ore: 16, coins: 174400 },
    89: { xp: 59200, ore: 16, coins: 180600 },
    90: { xp: 60000, ore: 17, coins: 181600 },
    91: { xp: 60800, ore: 18, coins: 183080 },
    92: { xp: 62800, ore: 19, coins: 187080 },
    93: { xp: 64800, ore: 19, coins: 191080 },
    94: { xp: 65000, ore: 19, coins: 195080 },
    95: { xp: 66800, ore: 19, coins: 201080 },
    96: { xp: 68800, ore: 19, coins: 203080 },
    97: { xp: 70800, ore: 19, coins: 205480 },
    98: { xp: 73000, ore: 19, coins: 211080 },
    99: { xp: 76560, ore: 19, coins: 215080 },
    100: { xp: 78800, ore: 19, coins: 219080 },
  };

  let comparisonData = [];

  function calculateWorldRates() {
    const worldId = document.getElementById("world-select").value;
    if (!worldId || !worldStats[worldId]) return;

    const stats = worldStats[worldId];
    const expGainRate =
      parseFloat(document.getElementById("exp-gain-rate").value) / 100 || 1;
    const oreDropRate =
      parseFloat(document.getElementById("ore-drop-rate").value) / 100 || 1;
    const goldDropRate =
      parseFloat(document.getElementById("gold-drop-rate").value) / 100 || 1;
    const expExtraDrop =
      parseFloat(document.getElementById("exp-extra-drop").value) || 0;
    const goldExtraDrop =
      parseFloat(document.getElementById("gold-extra-drop").value) || 0;
    const clearTime =
      parseFloat(document.getElementById("clear-time").value) || 0;

    const timeFactor = clearTime > 0 ? 3600 / (clearTime + 5) : 0;

    const xpHour = timeFactor * (stats.xp + 460 * expExtraDrop) * expGainRate;
    const oreHour = timeFactor * stats.ore * oreDropRate;
    const coinsHour =
      timeFactor * (stats.coins + 460 * goldExtraDrop) * goldDropRate;
    const clearsHour = timeFactor;

    document.getElementById("base-xp").textContent =
      stats.xp.toLocaleString("id-ID");
    document.getElementById("base-ore").textContent =
      stats.ore.toLocaleString("id-ID");
    document.getElementById("base-coins").textContent =
      stats.coins.toLocaleString("id-ID");

    document.getElementById("result-xp").textContent =
      Math.round(xpHour).toLocaleString("id-ID");
    document.getElementById("result-ore").textContent =
      Math.round(oreHour).toLocaleString("id-ID");
    document.getElementById("result-coins").textContent =
      Math.round(coinsHour).toLocaleString("id-ID");
    document.getElementById("result-clears").textContent =
      clearsHour.toFixed(1);
  }

  function populateWorlds() {
    const difficulty = document.getElementById("difficulty-select").value;
    const worldSelect = document.getElementById("world-select");
    worldSelect.innerHTML = "";
    if (worldData[difficulty]) {
      worldData[difficulty].forEach((world) => {
        const option = document.createElement("option");
        option.value = world.id;
        option.textContent = `${world.name} (${world.id})`;
        worldSelect.appendChild(option);
      });
    }
    calculateWorldRates();
  }

  function renderCompareTable() {
    const container = document.getElementById("compare-container");
    if (comparisonData.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500 mt-4 text-center">Add worlds to compare their rates.</p>';
      return;
    }

    const table = document.createElement("table");
    table.className = "compare-table";
    table.innerHTML = `
                    <thead>
                        <tr>
                            <th>World</th>
                            <th>Exp/Hour</th>
                            <th>Ore/Hour</th>
                            <th>Gold/Hour</th>
                            <th>Clears/Hour</th>
                            <th>Clear Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${comparisonData
                          .map(
                            (data) => `
                            <tr>
                                <td class="font-semibold">${data.name}</td>
                                <td>${data.xp.toLocaleString("id-ID")}</td>
                                <td>${data.ore.toLocaleString("id-ID")}</td>
                                <td>${data.coins.toLocaleString("id-ID")}</td>
                                <td>${data.clears}</td>
                                <td>${data.clearTime}s</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                `;
    container.innerHTML = "";
    container.appendChild(table);
  }

  function addToCompare() {
    const worldSelect = document.getElementById("world-select");
    const selectedOption = worldSelect.options[worldSelect.selectedIndex];

    const worldName = selectedOption.textContent;
    const xpHour =
      parseInt(
        document.getElementById("result-xp").textContent.replace(/\./g, "")
      ) || 0;
    const oreHour =
      parseInt(
        document.getElementById("result-ore").textContent.replace(/\./g, "")
      ) || 0;
    const coinsHour =
      parseInt(
        document.getElementById("result-coins").textContent.replace(/\./g, "")
      ) || 0;
    const clearsHour = document.getElementById("result-clears").textContent;
    const clearTime = document.getElementById("clear-time").value;

    comparisonData.push({
      name: worldName,
      xp: xpHour,
      ore: oreHour,
      coins: coinsHour,
      clears: clearsHour,
      clearTime: clearTime,
    });

    renderCompareTable();
  }

  function clearCompare() {
    comparisonData = [];
    renderCompareTable();
  }

  function initWorldCalculator() {
    const difficultySelect = document.getElementById("difficulty-select");
    if (!difficultySelect) return;

    Object.keys(worldData).forEach((difficulty) => {
      const option = document.createElement("option");
      option.value = difficulty;
      option.textContent = difficulty;
      difficultySelect.appendChild(option);
    });

    difficultySelect.addEventListener("change", populateWorlds);

    const inputs = [
      "difficulty-select",
      "world-select",
      "exp-gain-rate",
      "ore-drop-rate",
      "gold-drop-rate",
      "exp-extra-drop",
      "gold-extra-drop",
      "clear-time",
    ];
    inputs.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calculateWorldRates);
    });

    document
      .getElementById("compare-btn")
      .addEventListener("click", addToCompare);
    document
      .getElementById("clear-compare-btn")
      .addEventListener("click", clearCompare);

    populateWorlds();
    renderCompareTable();
  }
  const wingRarityData = {
    scarce: { value: 6, name: "Scarce" },
    epic: { value: 7, name: "Epic" },
    legendary: { value: 8, name: "Legendary" },
    immortal: { value: 9, name: "Immortal" },
    myth: { value: 10, name: "Myth" },
    eternal: { value: 11, name: "Eternal" },
    celestial: { value: 12, name: "Celestial" },
  };

  const WING_LEVEL_MULTIPLIER = 0.0000555555555555556;

  function populateWingRaritySelects() {
    const selects = [
      document.getElementById("atbm-rarity"),
      document.getElementById("coeff-rarity"),
    ];
    selects.forEach((select) => {
      if (!select) return;
      select.innerHTML = "";
      for (const key in wingRarityData) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = wingRarityData[key].name;
        select.appendChild(option);
      }
      select.value = "scarce";
    });
  }

  function calculateWingBaseFormula(level, rarityValue) {
    if (rarityValue <= 5) return 0;
    const term1 = 0.05 + (level - 1) * WING_LEVEL_MULTIPLIER;
    const term2 = 1 + (rarityValue - 5) * 0.1;
    const term3 = 6.25;
    const term4 = (rarityValue - 5) / 7;
    return term1 * term2 * term3 * term4;
  }

  function calculateATBM() {
    const wingCoeff =
      parseFloat(document.getElementById("atbm-wing-coeff").value) || 0;
    const level = parseInt(document.getElementById("atbm-level").value) || 1;
    const rarityValue =
      wingRarityData[document.getElementById("atbm-rarity").value].value;
    const baseResult = calculateWingBaseFormula(level, rarityValue);
    const finalATBM = wingCoeff * baseResult * 100;
    document.getElementById(
      "atbm-final-result"
    ).textContent = `${finalATBM.toFixed(3)}%`;
  }

  function calculateCoefficient() {
    const atbmPercent =
      parseFloat(document.getElementById("coeff-atbm-percent").value) || 0;
    const level = parseInt(document.getElementById("coeff-level").value) || 1;
    const rarityValue =
      wingRarityData[document.getElementById("coeff-rarity").value].value;
    const baseResult = calculateWingBaseFormula(level, rarityValue);
    let wingCoeff = 0;
    if (baseResult !== 0) {
      wingCoeff = atbmPercent / 100 / baseResult;
    }
    document.getElementById("coeff-final-result").textContent =
      wingCoeff.toFixed(5);
  }

  ["atbm-wing-coeff", "atbm-level", "atbm-rarity"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", calculateATBM);
  });

  ["coeff-atbm-percent", "coeff-level", "coeff-rarity"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", calculateCoefficient);
  });
  populateWingRaritySelects();
  calculateATBM();
  calculateCoefficient();
  initElixirCalculator();
  initWorldCalculator();

  const commentForm = document.getElementById("comment-form");
const commentsListContainer = document.getElementById("comments-list-container");
const commentStatus = document.getElementById("comment-status");
const commentSubmitBtn = document.getElementById("comment-submit-btn");

const COMMENTS_API_URL = "https://bansos.optikl.ink/cultivation-simulator/comments.php";

// Fungsi untuk memuat komentar dari server
async function loadComments() {
  if (!commentsListContainer) return;
  commentsListContainer.innerHTML = '<p class="text-gray-400">Memuat komentar...</p>';

  try {
    const response = await fetch(COMMENTS_API_URL, {
      method: "GET",
      cache: "no-cache", // Selalu ambil data terbaru
    });

    if (!response.ok) {
      throw new Error(`Gagal memuat: ${response.statusText}`);
    }

    const comments = await response.json();

    if (comments.length === 0) {
      commentsListContainer.innerHTML = '<p class="text-gray-500">Belum ada komentar.</p>';
      return;
    }

    // Render komentar
    commentsListContainer.innerHTML = ""; // Kosongkan
    comments.forEach((comment) => {
      const commentEl = document.createElement("div");
      commentEl.className = "comment-item p-4 rounded-lg bg-slate-800/50 border border-slate-700/50";

      // Format tanggal (opsional tapi bagus)
      const date = new Date(comment.created_at);
      const formattedDate = date.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

      commentEl.innerHTML = `
        <div class="flex justify-between items-center mb-2">
          <span class="font-bold text-indigo-400">${escapeHTML(comment.username)}</span>
          <span class="text-xs text-gray-500">${formattedDate}</span>
        </div>
        <p class="text-gray-300 whitespace-pre-wrap">${escapeHTML(comment.comment_text)}</p>
      `;
      commentsListContainer.appendChild(commentEl);
    });
  } catch (error) {
    commentsListContainer.innerHTML = `<p class="text-red-400">Error: Tidak dapat mengambil komentar. ${error.message}</p>`;
  }
}

async function handleCommentSubmit(e) {
  e.preventDefault();
  if (!commentForm) return;

  const username = document.getElementById("comment-username").value;
  const comment_text = document.getElementById("comment-text").value;

  commentSubmitBtn.disabled = true;
  commentSubmitBtn.textContent = "Mengirim...";
  commentStatus.textContent = "";

  try {
    const response = await fetch(COMMENTS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "submit",
        username: username,
        comment_text: comment_text,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.status !== 'success') {
      throw new Error(result.message || "Terjadi kesalahan.");
    }

    // Berhasil
    commentStatus.className = "text-center mt-4 text-green-400";
    commentStatus.textContent = "Komentar berhasil dikirim!";
    commentForm.reset();
    loadComments(); // Muat ulang komentar

  } catch (error) {
    commentStatus.className = "text-center mt-4 text-red-400";
    commentStatus.textContent = `Error: ${error.message}`;
  } finally {
    commentSubmitBtn.disabled = false;
    commentSubmitBtn.textContent = "Kirim Komentar";
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m];
  });
}

if (commentForm) {
  commentForm.addEventListener("submit", handleCommentSubmit);
}

  const CONFIG_KEY = "cultools_config_v1";

  function debounce(fn, wait = 400) {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  function buildConfigObject() {
    const cfg = { wing: {}, world: {}, elixir: {}, compare: comparisonData || [], settings: {} };

    cfg.wing.atbmWingCoeff = document.getElementById("atbm-wing-coeff")?.value || "";
    cfg.wing.atbmLevel = document.getElementById("atbm-level")?.value || "";
    cfg.wing.atbmRarity = document.getElementById("atbm-rarity")?.value || "";
    cfg.wing.coeffAtbmPercent = document.getElementById("coeff-atbm-percent")?.value || "";
    cfg.wing.coeffLevel = document.getElementById("coeff-level")?.value || "";
    cfg.wing.coeffRarity = document.getElementById("coeff-rarity")?.value || "";

    cfg.world.difficulty = document.getElementById("difficulty-select")?.value || "";
    cfg.world.worldId = document.getElementById("world-select")?.value || "";
    cfg.world.clearTime = document.getElementById("clear-time")?.value || "";
    cfg.world.goldDropRate = document.getElementById("gold-drop-rate")?.value || "";
    cfg.world.oreDropRate = document.getElementById("ore-drop-rate")?.value || "";
    cfg.world.expGainRate = document.getElementById("exp-gain-rate")?.value || "";
    cfg.world.goldExtraDrop = document.getElementById("gold-extra-drop")?.value || "";
    cfg.world.expExtraDrop = document.getElementById("exp-extra-drop")?.value || "";

    cfg.elixir.rarities = {};
    elixirData.rarities.forEach((rarity) => {
      const checkbox = document.getElementById(`elixir-check-${rarity.id}`);
      const obj = { checked: !!(checkbox && checkbox.checked), quantities: {} };
      elixirData.stats.forEach((stat) => {
        const input = document.getElementById(`elixir-qty-${rarity.id}-${stat.id}`);
        obj.quantities[stat.id] = input ? input.value : 0;
      });
      cfg.elixir.rarities[rarity.id] = obj;
    });

    const reminderEl = document.getElementById("reminder-enabled");
    const reminderTimeEl = document.getElementById("reminder-time");
    if (reminderEl) cfg.settings.reminder = reminderEl.value;
    if (reminderTimeEl) cfg.settings.reminderTime = reminderTimeEl.value;

    return cfg;
  }

  const debouncedSaveConfig = debounce(() => {
    try {
      const cfg = buildConfigObject();
      localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
      showTemporaryToast("Config saved");
    } catch (e) {
      console.warn("Save config failed", e);
    }
  }, 600);

  function saveConfigImmediate() {
    try {
      const cfg = buildConfigObject();
      localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
    } catch (e) {
      console.warn("Save config immediate failed", e);
    }
  }

  function loadConfig() {
    try {
      const raw = localStorage.getItem(CONFIG_KEY);
      if (!raw) return;
      const cfg = JSON.parse(raw);

      if (cfg.wing) {
        if (cfg.wing.atbmWingCoeff !== undefined) document.getElementById("atbm-wing-coeff") && (document.getElementById("atbm-wing-coeff").value = cfg.wing.atbmWingCoeff);
        if (cfg.wing.atbmLevel !== undefined) document.getElementById("atbm-level") && (document.getElementById("atbm-level").value = cfg.wing.atbmLevel);
        if (cfg.wing.atbmRarity !== undefined) document.getElementById("atbm-rarity") && (document.getElementById("atbm-rarity").value = cfg.wing.atbmRarity);
        if (cfg.wing.coeffAtbmPercent !== undefined) document.getElementById("coeff-atbm-percent") && (document.getElementById("coeff-atbm-percent").value = cfg.wing.coeffAtbmPercent);
        if (cfg.wing.coeffLevel !== undefined) document.getElementById("coeff-level") && (document.getElementById("coeff-level").value = cfg.wing.coeffLevel);
        if (cfg.wing.coeffRarity !== undefined) document.getElementById("coeff-rarity") && (document.getElementById("coeff-rarity").value = cfg.wing.coeffRarity);
      }

      if (cfg.world) {
        if (cfg.world.difficulty !== undefined && document.getElementById("difficulty-select")) document.getElementById("difficulty-select").value = cfg.world.difficulty;
        populateWorlds();
        if (cfg.world.worldId !== undefined && document.getElementById("world-select")) document.getElementById("world-select").value = cfg.world.worldId;
        if (cfg.world.clearTime !== undefined) document.getElementById("clear-time") && (document.getElementById("clear-time").value = cfg.world.clearTime);
        if (cfg.world.goldDropRate !== undefined) document.getElementById("gold-drop-rate") && (document.getElementById("gold-drop-rate").value = cfg.world.goldDropRate);
        if (cfg.world.oreDropRate !== undefined) document.getElementById("ore-drop-rate") && (document.getElementById("ore-drop-rate").value = cfg.world.oreDropRate);
        if (cfg.world.expGainRate !== undefined) document.getElementById("exp-gain-rate") && (document.getElementById("exp-gain-rate").value = cfg.world.expGainRate);
        if (cfg.world.goldExtraDrop !== undefined) document.getElementById("gold-extra-drop") && (document.getElementById("gold-extra-drop").value = cfg.world.goldExtraDrop);
        if (cfg.world.expExtraDrop !== undefined) document.getElementById("exp-extra-drop") && (document.getElementById("exp-extra-drop").value = cfg.world.expExtraDrop);
      }

      if (cfg.elixir && cfg.elixir.rarities) {
        elixirData.rarities.forEach((rarity) => {
          const data = cfg.elixir.rarities[rarity.id];
          const checkbox = document.getElementById(`elixir-check-${rarity.id}`);
          const section = document.getElementById(`elixir-section-${rarity.id}`);
          if (data) {
            if (checkbox) checkbox.checked = !!data.checked;
            if (section) section.classList.toggle("hidden", !data.checked);
            elixirData.stats.forEach((stat) => {
              const input = document.getElementById(`elixir-qty-${rarity.id}-${stat.id}`);
              if (input && data.quantities && data.quantities[stat.id] !== undefined) input.value = data.quantities[stat.id];
            });
          }
        });
      }

      if (cfg.compare && Array.isArray(cfg.compare)) {
        comparisonData = cfg.compare;
        renderCompareTable();
      }

      if (cfg.settings) {
        if (document.getElementById("reminder-enabled") && cfg.settings.reminder !== undefined) document.getElementById("reminder-enabled").value = cfg.settings.reminder;
        if (document.getElementById("reminder-time") && cfg.settings.reminderTime !== undefined) document.getElementById("reminder-time").value = cfg.settings.reminderTime;
      }

      calculateWorldRates();
      calculateATBM();
      calculateCoefficient();
      calculateElixirTotals();
    } catch (e) {
      console.warn("Load config failed", e);
    }
  }

  function clearConfig() {
    try {
      localStorage.removeItem(CONFIG_KEY);

      comparisonData = [];
      renderCompareTable();

      document.getElementById("atbm-wing-coeff") && (document.getElementById("atbm-wing-coeff").value = "0");
      document.getElementById("atbm-level") && (document.getElementById("atbm-level").value = "1");
      document.getElementById("atbm-rarity") && (document.getElementById("atbm-rarity").value = "scarce");
      document.getElementById("coeff-atbm-percent") && (document.getElementById("coeff-atbm-percent").value = "0");
      document.getElementById("coeff-level") && (document.getElementById("coeff-level").value = "1");
      document.getElementById("coeff-rarity") && (document.getElementById("coeff-rarity").value = "scarce");

      document.getElementById("difficulty-select") && (document.getElementById("difficulty-select").value = Object.keys(worldData)[0]);
      populateWorlds();
      document.getElementById("clear-time") && (document.getElementById("clear-time").value = "0");
      document.getElementById("gold-drop-rate") && (document.getElementById("gold-drop-rate").value = "100");
      document.getElementById("ore-drop-rate") && (document.getElementById("ore-drop-rate").value = "100");
      document.getElementById("exp-gain-rate") && (document.getElementById("exp-gain-rate").value = "100");
      document.getElementById("gold-extra-drop") && (document.getElementById("gold-extra-drop").value = "0");
      document.getElementById("exp-extra-drop") && (document.getElementById("exp-extra-drop").value = "0");
      calculateWorldRates();

      elixirData.rarities.forEach((rarity) => {
        const checkbox = document.getElementById(`elixir-check-${rarity.id}`);
        const section = document.getElementById(`elixir-section-${rarity.id}`);
        if (checkbox) checkbox.checked = !!rarity.defaultChecked;
        if (section) section.classList.toggle("hidden", !rarity.defaultChecked);
        elixirData.stats.forEach((stat) => {
          const input = document.getElementById(`elixir-qty-${rarity.id}-${stat.id}`);
          if (input) input.value = 0;
        });
      });
      calculateElixirTotals();

      document.getElementById("reminder-enabled") && (document.getElementById("reminder-enabled").value = "off");
      document.getElementById("reminder-time") && (document.getElementById("reminder-time").value = "12:00");

      showTemporaryToast("Config cleared");
    } catch (e) {
      console.warn("Clear config failed", e);
    }
  }

  function wireAutoSave() {
    const inputs = Array.from(document.querySelectorAll("input, select, textarea"));
    inputs.forEach((el) => {
      if (el.type === "file") return;
      el.addEventListener("input", debouncedSaveConfig, { passive: true });
      el.addEventListener("change", debouncedSaveConfig, { passive: true });
    });
    const oldAddToCompare = addToCompare;
    window.addToCompare = function () { oldAddToCompare(); saveConfigImmediate(); };
    const oldClearCompare = clearCompare;
    window.clearCompare = function () { oldClearCompare(); saveConfigImmediate(); };
  }

  const clearBtn = document.getElementById("clear-config-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (!confirm("Are you sure you want to clear all saved configuration?")) return;
      clearConfig();
    });
  }

  setTimeout(() => {
    loadConfig();
    wireAutoSave();
  }, 120);

  const origAdd = addToCompare;
  addToCompare = function () {
    origAdd();
    saveConfigImmediate();
  };
  const origClear = clearCompare;
  clearCompare = function () {
    origClear();
    saveConfigImmediate();
  };
});
