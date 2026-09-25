
const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const $ = (selector) => document.querySelector(selector);

const state = {
  nickname: "Queen",
  level: 1,
  crowns: 0,
  coins: 1500,
  gems: 30,
  avatar: "♛"
};

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

  $("#topAvatar").textContent = state.avatar;
  $("#mainAvatar").textContent = state.avatar;
  $("#profileAvatar").textContent = state.avatar;
  $("#avatarPreview").textContent = state.avatar;
}

function showView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("active");
  });

  const selectedView = $(`#${viewName}View`);

  if (selectedView) {
    selectedView.classList.add("active");
  }

  document.querySelectorAll(".nav-button").forEach((button) => {
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

function openApp() {
  $("#onboarding").classList.remove("active");
  $("#appShell").classList.add("active");
  showView("home");
  updateProfile();
}

$("#startButton").addEventListener("click", () => {
  const nickname = $("#nicknameInput").value.trim();

  if (nickname.length < 2) {
    $("#nicknameInput").focus();
    $("#nicknameInput").style.borderColor = "#ff3d9a";
    return;
  }

  state.nickname = nickname.slice(0, 20);
  openApp();
});

$("#nicknameInput").addEventListener("input", () => {
  $("#nicknameInput").style.borderColor = "";
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    showView(button.dataset.view);
  });
});

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;

    alert(`${mode} скоро будет доступен ✨`);
  });
});

document.querySelectorAll("[data-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    const result = Math.random() > 0.5
      ? "Орел"
      : "Решка";

    $("#flipResult").textContent =
      `Выпало: ${result} ✨`;

    state.coins += 25;
    updateProfile();
  });
});

$("#avatarPicker").addEventListener("click", () => {
  const avatars = ["♛", "♡", "✦", "✧", "☾", "♢"];
  const currentIndex = avatars.indexOf(state.avatar);

  state.avatar = avatars[
    (currentIndex + 1) % avatars.length
  ];

  updateProfile();
});

updateProfile();

