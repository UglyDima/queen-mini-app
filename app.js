document.addEventListener("DOMContentLoaded", () => {

  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();

    try {
      tg.setHeaderColor("#080808");
      tg.setBackgroundColor("#080808");
    } catch (e) {}
  }


  const $ = (selector) =>
    document.querySelector(selector);

  const $$ = (selector) =>
    document.querySelectorAll(selector);


  const auth = $("#auth");
  const loginBtn = $("#loginBtn");
  const loginError = $("#loginError");
  const shell = $("#shell");

  const views = $$(".view");
  const navButtons = $$(".bottom-nav [data-view]");

  let selectedChoice = "";
  let stake = 50;


  /* =========================
     OPEN APP
  ========================== */

  function enterQueen() {

    const savedName =
      localStorage.getItem("queen_username");

    const savedAvatar =
      localStorage.getItem("queen_avatar");


    if (!savedName) {

      loginError.textContent =
        "Профиль ещё не создан.";

      return;
    }


    $("#profileName").textContent =
      savedName;


    setAvatar(
      $("#profileAvatar"),
      savedAvatar
    );


    auth.classList.remove("active");
    shell.classList.add("active");


    showView("profile");
  }


  /* =========================
     LOGIN
  ========================== */

  loginBtn?.addEventListener(
    "click",
    () => {

      loginError.textContent = "";

      enterQueen();

    }
  );


  /* =========================
     AVATAR
  ========================== */

  function setAvatar(element, src) {

    if (!element) return;


    if (!src) {

      element.innerHTML = "♙";

      return;
    }


    element.innerHTML = "";


    const img =
      document.createElement("img");


    img.src = src;
    img.alt = "Аватар";


    img.style.width = "100%";
    img.style.height = "100%";
    img.style.display = "block";
    img.style.objectFit = "cover";
    img.style.objectPosition = "center";


    element.appendChild(img);
  }


  /* =========================
     NAVIGATION
  ========================== */

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

    button.addEventListener(
      "click",
      () => {

        showView(
          button.dataset.view
        );

      }
    );

  });


  /* =========================
     FLIP CHOICE
  ========================== */

  $$(".choice").forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        selectedChoice =
          button.dataset.choice;


        $$(".choice").forEach(
          (item) => {

            item.classList.remove(
              "selected"
            );

          }
        );


        button.classList.add(
          "selected"
        );

      }
    );

  });


  /* =========================
     STAKE
  ========================== */

  $$("[data-stake]").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          stake =
            Number(
              button.dataset.stake
            );


          $$("[data-stake]").forEach(
            (item) => {

              item.classList.remove(
                "selected"
              );

            }
          );


          button.classList.add(
            "selected"
          );

        }
      );

    }
  );


  /* =========================
     FLIP GAME
  ========================== */

  $("#flipPlay")?.addEventListener(
    "click",
    () => {

      const result =
        $("#flipResult");

      const coin =
        $("#coin");

      const coinsElement =
        $("#profileCoins");


      if (!selectedChoice) {

        result.textContent =
          "Сначала выбери Орёл или Решка.";

        return;
      }


      let coins =
        Number(
          (coinsElement.textContent || "1500")
            .replace(/\s/g, "")
        );


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


        if (
          outcome === selectedChoice
        ) {

          coins += stake;

          result.textContent =
            `Выпало: ${
              outcome === "heads"
                ? "Орёл"
                : "Решка"
            } • +${stake} Coins`;

        } else {

          coins -= stake;

          result.textContent =
            `Выпало: ${
              outcome === "heads"
                ? "Орёл"
                : "Решка"
            } • −${stake} Coins`;

        }


        coinsElement.textContent =
          coins.toLocaleString(
            "ru-RU"
          );

      }, 450);

    }
  );


  /* =========================
     OPEN GAME
  ========================== */

  $$("[data-open]").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showView(
            button.dataset.open
          );

        }
      );

    }
  );


  /* =========================
     GAME NOTICES
  ========================== */

  $$("[data-mode]").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const notice =
            $("#gameNotice");


          if (!notice) return;


          if (
            button.dataset.mode ===
            "fortune"
          ) {

            notice.textContent =
              "Fortune скоро будет доступна.";

          }


          if (
            button.dataset.mode ===
            "upgrader"
          ) {

            notice.textContent =
              "Upgrader скоро будет доступен.";

          }

        }
      );

    }
  );


  /* =========================
     STYLE
  ========================== */

  $$(".style-item").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          $$(".style-item").forEach(
            (item) => {

              item.classList.remove(
                "selected"
              );

            }
          );


          button.classList.add(
            "selected"
          );

        }
      );

    }
  );


  /* =========================
     PARTY
  ========================== */

  $("#party .secondary-btn")?.addEventListener(
    "click",
    (event) => {

      event.currentTarget.textContent =
        "Party скоро будет доступна";

    }
  );


  /* =========================
     START STATE
  ========================== */

  auth.classList.add("active");
  shell.classList.remove("active");

});
