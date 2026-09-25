
const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}


/* =========================
   STATE
========================= */

const state = {
  nickname: "Queen",
  level: 1,
  crowns: 0,
  coins: 1500,
  gems: 30,
  avatar: null,
  selectedBet: 10
};


/* =========================
   HELPERS
========================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

function setImage(selector, imageUrl) {
  const element = $(selector);

  if (!element) return;

  element.src = imageUrl;
  element.parentElement.classList.add("has-image");
}

function updateProfile() {
  $("#topNickname").textContent = state.nickname;
  $("#mainNickname").textContent = state.nickname;
  $("#profileNickname").textContent = state.nickname;

  $("#topLevel").textContent = state.level;
  $("#mainLevel").textContent = state.level;
  $("#profileLevel").textContent = state.level;

  $("#crownCount").textContent = state.crowns;
  $("#profileCrowns").textContent = state.crowns;

  $("#coinCount").textContent = state.coins;
  $("#profileCoins").textContent = state.coins;

  $("#gemCount").textContent = state.gems;
  $("#profileGems").textContent = state.gems;

  if (state.avatar) {
    setImage("#topAvatar", state.avatar);
    setImage("#mainAvatar", state.avatar);
    setImage("#profileAvatar", state.avatar);
  }
}


/* =========================
   NAVIGATION
========================= */

function showScreen(screenId) {
  $$(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const screen = $(`#${screenId}`);

  if (screen) {
    screen.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function showView(viewName) {
  $$(".view").forEach((view) => {
    view.classList.remove("active");
  });

  const selectedView = $(`#${viewName}View`);

  if (selectedView) {
    selectedView.classList.add("active");
  }

  $$(".nav-button").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.view === viewName
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   ONBOARDING
========================= */

$("#unlockButton").addEventListener("click", () => {
  showScreen("setup");
});

$$("[data-back]").forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.back);
  });
});

$("#finishSetup").addEventListener("click", () => {
  const nickname = $("#nicknameInput").value.trim();

  if (nickname.length < 2) {
    $("#nicknameInput").focus();
    $("#nicknameInput").style.borderColor = "#ff2f96";
    return;
  }

  state.nickname = nickname.slice(0, 20);

  updateProfile();
  showScreen("appShell");
  showView("home");
});

$("#nicknameInput").addEventListener("input", () => {
  $("#nicknameInput").style.borderColor = "";
});


/* =========================
   AVATAR UPLOAD
========================= */

function loadAvatar(file) {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const imageUrl = event.target.result;

    state.avatar = imageUrl;

    setImage("#avatarPreview", imageUrl);
    $("#avatarPreview").parentElement.classList.add("has-image");

    updateProfile();
  };

  reader.readAsDataURL(file);
}

$("#avatarUpload").addEventListener("change", (event) => {
  loadAvatar(event.target.files[0]);
});

$("#profileAvatarUpload").addEventListener("change", (event) => {
  loadAvatar(event.target.files[0]);
});


/* =========================
   VIEW NAVIGATION
========================= */

$$("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const viewName = button.dataset.view;

    if (!viewName) return;

    showView(viewName);
  });
});


/* =========================
   BACK TO HOME
========================= */

$$(".back-to-home").forEach((button) => {
  button.addEventListener("click", () => {
    showView("home");
  });
});


/* =========================
   COIN BETTING
========================= */

$$("[data-bet]").forEach((button) => {
  button.addEventListener("click", () => {
    const bet = Number(button.dataset.bet);

    if (!Number.isFinite(bet) || bet <= 0) {
      return;
    }

    state.selectedBet = bet;

    $$(".bet-options button").forEach((item) => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");

    $("#selectedBet").textContent = bet;
    $("#flipResult").textContent = "";
  });
});

$$("[data-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    const choice = button.dataset.choice;
    const bet = state.selectedBet;

    if (state.coins < bet) {
      $("#flipResult").textContent = "Недостаточно Coins.";
      return;
    }

    state.coins -= bet;

    const result = Math.random() < 0.5
      ? "heads"
      : "tails";

    const won = choice === result;

    if (won) {
      const profit = Math.max(1, Math.floor(bet * 0.1));

      state.coins += bet + profit;

      $("#flipResult").textContent =
        `Победа! +${profit} Coins ✨`;
    } else {
      $("#flipResult").textContent =
        "В этот раз не повезло.";
    }

    updateProfile();
  });
});


/* =========================
   OTHER MODES
========================= */

$$("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;

    if (mode === "Feed") {
      alert("Лента появится в следующем обновлении ✨");
      return;
    }

    alert(`${mode} скоро будет доступен ✨`);
  });
});


/* =========================
   INITIALIZATION
========================= */

updateProfile();

const defaultBet = $("[data-bet='10']");

if (defaultBet) {
  defaultBet.classList.add("selected");
}
