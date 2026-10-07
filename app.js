document.addEventListener("DOMContentLoaded", () => {

  /* ==================== TELEGRAM ==================== */

  const tg = window.Telegram?.WebApp;

  if (tg) {
    try {
      tg.ready();
      tg.expand();

      tg.setHeaderColor("#070707");
      tg.setBackgroundColor("#070707");

      if (tg.disableVerticalSwipes) {
        tg.disableVerticalSwipes();
      }
    } catch (error) {
      console.warn("Telegram WebApp setup:", error);
    }
  }


  /* ==================== HELPERS ==================== */

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);


  /* ==================== ELEMENTS ==================== */

  const auth = $("#auth");
  const shell = $("#shell");

  const loginBtn = $("#loginBtn");
  const loginError = $("#loginError");

  const views = $$(".view");
  const navButtons = $$(".bottom-nav [data-view]");


  /* ==================== STATE ==================== */

  let selectedChoice = "";
  let stake = 50;

  let coins = 1500;
  let gems = 30;
  let crowns = 0;
  let level = 1;


  /* ==================== PROFILE ==================== */

  function getSavedProfile() {
    const username = localStorage.getItem("queen_username");
    const avatar = localStorage.getItem("queen_avatar");

    return {
      username: username ? username.trim() : "",
      avatar: avatar || ""
    };
  }


  function setAvatar(element, src) {
    if (!element) return;

    element.innerHTML = "";

    if (!src) {
      element.textContent = "♙";
      return;
    }

    const img = document.createElement("img");

    img.src = src;
    img.alt = "Аватар";

    img.onload = () => {
      element.innerHTML = "";
      element.appendChild(img);
    };

    img.onerror = () => {
      element.textContent = "♙";
    };

    element.style.overflow = "hidden";

    element.appendChild(img);
  }


  function loadProfile() {
    const profile = getSavedProfile();

    if (!profile.username) {
      return false;
    }

    $("#profileName").textContent = profile.username;

    setAvatar(
      $("#profileAvatar"),
      profile.avatar
    );

    $("#profileCrowns").textContent = crowns;
    $("#profileLevel").textContent =
      String(level).padStart(2, "0");

    $("#profileCoins").textContent =
      coins.toLocaleString("ru-RU");

    $("#profileGems").textContent =
      gems.toLocaleString("ru-RU");

    return true;
  }


  /* ==================== LOGIN ==================== */

  function enterQueen() {

    loginError.textContent = "";

    const profileExists = loadProfile();

    if (!profileExists) {
      loginError.textContent =
        "Аккаунт Queen не найден.";
      return;
    }

    auth.classList.remove("active");
    shell.classList.add("active");

    showView("profile");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }


  loginBtn?.addEventListener("click", enterQueen);


  /* ==================== NAVIGATION ==================== */

  function showView(id) {

    views.forEach((view) => {
      view.classList.toggle(
        "active",
        view.id === id
      );
    });


    navButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.view === id
      );
    });


    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }


  navButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const target = button.dataset.view;

      if (!target) return;

      showView(target);

    });

  });


  /* ==================== FLIP CHOICE ==================== */

  $$(".choice").forEach((button) => {

    button.addEventListener("click", () => {

      selectedChoice = button.dataset.choice || "";

      $$(".choice").forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

    });

  });


  /* ==================== STAKE ==================== */

  $$("[data-stake]").forEach((button) => {

    button.addEventListener("click", () => {

      stake = Number(button.dataset.stake);

      if (!Number.isFinite(stake)) {
        stake = 50;
      }

      $$("[data-stake]").forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

    });

  });


  /* ==================== FLIP GAME ==================== */

  $("#flipPlay")?.addEventListener("click", () => {

    const result = $("#flipResult");
    const coin = $("#coin");

    if (!selectedChoice) {
      result.textContent =
        "Сначала выбери Орёл или Решка.";
      return;
    }


    if (coins < stake) {
      result.textContent =
        "Недостаточно Coins.";
      return;
    }


    const outcome =
      Math.random() < 0.5
        ? "heads"
        : "tails";


    coin.style.transform =
      "rotateY(720deg)";


    setTimeout(() => {

      coin.style.transform =
        "rotateY(0deg)";


      const outcomeName =
        outcome === "heads"
          ? "Орёл"
          : "Решка";


      if (outcome === selectedChoice) {

        coins += stake;

        result.textContent =
          `Выпало: ${outcomeName} • +${stake} Coins`;

      } else {

        coins -= stake;

        result.textContent =
          `Выпало: ${outcomeName} • −${stake} Coins`;

      }


      $("#profileCoins").textContent =
        coins.toLocaleString("ru-RU");

    }, 450);

  });


  /* ==================== GAME LINKS ==================== */

  $$("[data-open]").forEach((button) => {

    button.addEventListener("click", () => {

      const target = button.dataset.open;

      if (!target) return;

      showView(target);

    });

  });


  /* ==================== COMING SOON GAMES ==================== */

  $$("[data-mode]").forEach((button) => {

    button.addEventListener("click", () => {

      const notice = $("#gameNotice");

      if (!notice) return;


      if (button.dataset.mode === "fortune") {
        notice.textContent =
          "Fortune скоро будет доступна.";
      }


      if (button.dataset.mode === "upgrader") {
        notice.textContent =
          "Upgrader скоро будет доступен.";
      }

    });

  });


  /* ==================== STYLE ==================== */

  $$(".style-item").forEach((button) => {

    button.addEventListener("click", () => {

      $$(".style-item").forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

    });

  });


  /* ==================== PARTY ==================== */

  $("#party .secondary-btn")?.addEventListener(
    "click",
    (event) => {

      event.currentTarget.textContent =
        "Party скоро будет доступна";

    }
  );


  /* ==================== INITIAL STATE ==================== */

  /*
    ВАЖНО:
    Queen всегда начинается с экрана входа.
    Мы НЕ открываем профиль автоматически,
    даже если queen_username уже сохранён.
  */

  auth.classList.add("active");
  shell.classList.remove("active");

  showView("profile");

});
