document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     TELEGRAM
  ========================================== */

  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();

    try {
      tg.setHeaderColor("#080808");
      tg.setBackgroundColor("#080808");
    } catch (e) {}
  }


  /* =========================================
     HELPERS
  ========================================== */

  const $ = (selector) =>
    document.querySelector(selector);

  const $$ = (selector) =>
    document.querySelectorAll(selector);


  /* =========================================
     AUTH ELEMENTS
  ========================================== */

  const auth = $("#auth");

  const loginScreen = $("#loginScreen");
  const registerScreen = $("#registerScreen");

  const loginBtn = $("#loginBtn");
  const createAccountBtn = $("#createAccountBtn");
  const backToLogin = $("#backToLogin");

  const startBtn = $("#start");

  const loginError = $("#loginError");
  const registerError = $("#error");

  const shell = $("#shell");


  /* =========================================
     APP ELEMENTS
  ========================================== */

  const views = $$(".view");
  const navButtons = $$(".bottom-nav [data-view]");

  const nickname = $("#nickname");
  const avatarInput = $("#avatarInput");
  const avatarPreview = $("#avatarPreview");

  let avatar = "";
  let selectedChoice = "";
  let stake = 50;


  /* =========================================
     AUTH SCREENS
  ========================================== */

  function showLogin() {

    loginScreen?.classList.add("active");
    registerScreen?.classList.remove("active");

    loginError.textContent = "";
    registerError.textContent = "";
  }


  function showRegister() {

    loginScreen?.classList.remove("active");
    registerScreen?.classList.add("active");

    loginError.textContent = "";
    registerError.textContent = "";

    setTimeout(() => {
      nickname?.focus();
    }, 100);
  }


  function openApp() {

    auth?.classList.remove("active");
    shell?.classList.add("active");

    showView("home");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }


  /* =========================================
     VIEWS
  ========================================== */

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
      behavior: "smooth"
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


  /* =========================================
     AVATAR
  ========================================== */

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


    element.appendChild(img);
  }


  function compressAvatar(file) {

    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();


        reader.onload = () => {

          const image =
            new Image();


          image.onload = () => {

            const canvas =
              document.createElement(
                "canvas"
              );


            const maxSize = 600;

            let width =
              image.width;

            let height =
              image.height;


            if (width > height) {

              if (width > maxSize) {

                height =
                  height *
                  maxSize /
                  width;

                width =
                  maxSize;
              }

            } else {

              if (height > maxSize) {

                width =
                  width *
                  maxSize /
                  height;

                height =
                  maxSize;
              }

            }


            canvas.width =
              width;

            canvas.height =
              height;


            const ctx =
              canvas.getContext(
                "2d"
              );


            ctx.drawImage(
              image,
              0,
              0,
              width,
              height
            );


            resolve(
              canvas.toDataURL(
                "image/jpeg",
                0.82
              )
            );

          };


          image.onerror = reject;

          image.src =
            reader.result;
        };


        reader.onerror = reject;

        reader.readAsDataURL(file);

      }
    );
  }


  avatarInput?.addEventListener(
    "change",
    async (event) => {

      const file =
        event.target.files?.[0];


      if (!file) return;


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        registerError.textContent =
          "Выбери изображение.";

        return;
      }


      if (
        file.size >
        12 * 1024 * 1024
      ) {

        registerError.textContent =
          "Фото должно быть меньше 12 МБ.";

        return;
      }


      try {

        registerError.textContent =
          "Загрузка фото...";


        avatar =
          await compressAvatar(
            file
          );


        setAvatar(
          avatarPreview,
          avatar
        );


        registerError.textContent =
          "";

      } catch (error) {

        registerError.textContent =
          "Не удалось загрузить фото.";

      }

    }
  );


  /* =========================================
     APPLY USER
  ========================================== */

  function applyUser(
    name,
    avatarSrc
  ) {

    if (name) {

      const nameElement =
        $("#name");

      const profileName =
        $("#profileName");


      if (nameElement) {
        nameElement.textContent =
          name;
      }


      if (profileName) {
        profileName.textContent =
          name;
      }

    }


    if (avatarSrc) {

      setAvatar(
        $("#homeAvatar"),
        avatarSrc
      );


      setAvatar(
        $("#profileAvatar"),
        avatarSrc
      );

    }

  }


  /* =========================================
     CREATE ACCOUNT
  ========================================== */

  createAccountBtn?.addEventListener(
    "click",
    () => {

      showRegister();

    }
  );


  backToLogin?.addEventListener(
    "click",
    () => {

      showLogin();

    }
  );


  startBtn?.addEventListener(
    "click",
    async () => {

      const name =
        nickname.value.trim();


      if (name.length < 2) {

        registerError.textContent =
          "Введи ник минимум из 2 символов.";

        nickname.focus();

        return;
      }


      if (name.length > 20) {

        registerError.textContent =
          "Ник должен быть не длиннее 20 символов.";

        nickname.focus();

        return;
      }


      /* сохраняем аккаунт */

      localStorage.setItem(
        "queen_username",
        name
      );


      if (avatar) {

        try {

          localStorage.setItem(
            "queen_avatar",
            avatar
          );

        } catch (e) {

          console.warn(
            "Не удалось сохранить аватар",
            e
          );

        }

      }


      applyUser(
        name,
        avatar
      );


      /* после регистрации сразу в приложение */

      openApp();

    }
  );


  /* =========================================
     LOGIN
  ========================================== */

  loginBtn?.addEventListener(
    "click",
    () => {

      const savedName =
        localStorage.getItem(
          "queen_username"
        );


      const savedAvatar =
        localStorage.getItem(
          "queen_avatar"
        );


      if (!savedName) {

        loginError.textContent =
          "Аккаунт не найден. Сначала создай аккаунт.";

        return;
      }


      avatar =
        savedAvatar || "";


      applyUser(
        savedName,
        savedAvatar
      );


      openApp();

    }
  );


  /* =========================================
     FLIP
  ========================================== */

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


  $("#flipPlay")?.addEventListener(
    "click",
    () => {

      const result =
        $("#flipResult");

      const coin =
        $("#coin");

      const coinsElement =
        $("#coins");


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


      setTimeout(
        () => {

          coin.style.transform =
            "rotateY(0deg)";


          if (
            outcome ===
            selectedChoice
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


          const formatted =
            coins.toLocaleString(
              "ru-RU"
            );


          coinsElement.textContent =
            formatted;


          const profileCoins =
            $("#profileCoins");


          if (profileCoins) {

            profileCoins.textContent =
              formatted;

          }

        },
        450
      );

    }
  );


  /* =========================================
     FLIP CHOICES
  ========================================== */

  $$(".choice").forEach(
    (button) => {

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

    }
  );


  /* =========================================
     OPEN OTHER VIEWS
  ========================================== */

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


  /* =========================================
     MINI GAMES
  ========================================== */

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
              "Fortune: ежедневная награда будет доступна после подключения экономики.";

          }


          if (
            button.dataset.mode ===
            "upgrader"
          ) {

            notice.textContent =
              "Upgrader: система улучшений готовится к подключению.";

          }

        }
      );

    }
  );


  /* =========================================
     STYLE
  ========================================== */

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


  /* =========================================
     PARTY
  ========================================== */

  $$("#party .secondary-btn").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          button.textContent =
            "Party скоро будет доступна";

        }
      );

    }
  );


  /* =========================================
     IMPORTANT:
     ALWAYS START ON LOGIN
  ========================================== */

  if (auth) {
    auth.classList.add("active");
  }


  if (shell) {
    shell.classList.remove("active");
  }


  if (loginScreen) {
    loginScreen.classList.add("active");
  }


  if (registerScreen) {
    registerScreen.classList.remove("active");
  }


  /* =========================================
     LOAD SAVED USER FOR LOGIN
     BUT DO NOT ENTER APP AUTOMATICALLY
  ========================================== */

  const savedName =
    localStorage.getItem(
      "queen_username"
    );


  const savedAvatar =
    localStorage.getItem(
      "queen_avatar"
    );


  if (savedName) {

    avatar =
      savedAvatar || "";

    /*
      ВАЖНО:
      Здесь мы НЕ вызываем openApp().
      Пользователь должен сам нажать
      "Войти в Queen".
    */

  }

});
