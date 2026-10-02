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


  const onboarding = $("#onboarding");
  const shell = $("#shell");

  const views = $$(".view");
  const nav = $$(".bottom-nav [data-view]");

  const nick = $("#nickname");
  const file = $("#avatarInput");
  const preview = $("#avatarPreview");
  const error = $("#error");


  let avatar = "";
  let selectedChoice = "";
  let stake = 50;


  /* ==================== NAVIGATION ==================== */

  function show(id) {

    views.forEach((view) => {
      view.classList.toggle(
        "active",
        view.id === id
      );
    });


    nav.forEach((button) => {
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


  nav.forEach((button) => {

    button.addEventListener("click", () => {
      show(button.dataset.view);
    });

  });


  /* ==================== AVATAR ==================== */

  function setAvatar(element, src) {

    if (!element || !src) return;

    element.innerHTML = "";

    const img =
      document.createElement("img");

    img.src = src;

    img.alt = "Аватар";

    element.appendChild(img);
  }


  /*
    Сжимаем фото перед сохранением.
    Так аватар не ломает localStorage из-за
    слишком большого исходного файла.
  */

  function compressAvatar(file) {

    return new Promise((resolve, reject) => {

      const reader =
        new FileReader();


      reader.onload = () => {

        const image =
          new Image();


        image.onload = () => {

          const canvas =
            document.createElement("canvas");


          const maxSize = 600;

          let width = image.width;
          let height = image.height;


          if (width > height) {

            if (width > maxSize) {
              height =
                height * maxSize / width;

              width = maxSize;
            }

          } else {

            if (height > maxSize) {
              width =
                width * maxSize / height;

              height = maxSize;
            }

          }


          canvas.width = width;
          canvas.height = height;


          const ctx =
            canvas.getContext("2d");


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

        image.src = reader.result;
      };


      reader.onerror = reject;

      reader.readAsDataURL(file);

    });

  }


  file?.addEventListener(
    "change",
    async (event) => {

      const selectedFile =
        event.target.files?.[0];


      if (!selectedFile) return;


      if (
        !selectedFile.type.startsWith("image/")
      ) {

        error.textContent =
          "Выбери изображение.";

        return;
      }


      if (
        selectedFile.size >
        12 * 1024 * 1024
      ) {

        error.textContent =
          "Фото должно быть меньше 12 МБ.";

        return;
      }


      try {

        error.textContent =
          "Загрузка фото...";


        avatar =
          await compressAvatar(
            selectedFile
          );


        setAvatar(
          preview,
          avatar
        );


        error.textContent = "";

      } catch (e) {

        error.textContent =
          "Не удалось загрузить фото.";

      }

    }
  );


  /* ==================== LOGIN ==================== */

  $("#start")?.addEventListener(
    "click",
    () => {

      const name =
        nick.value.trim();


      if (name.length < 2) {

        error.textContent =
          "Введи ник минимум из 2 символов.";

        nick.focus();

        return;
      }


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


      $("#name").textContent =
        name;

      $("#profileName").textContent =
        name;


      if (avatar) {

        setAvatar(
          $("#homeAvatar"),
          avatar
        );

        setAvatar(
          $("#profileAvatar"),
          avatar
        );

        setAvatar(
          $("#profileTop"),
          avatar
        );

      }


      onboarding.classList.remove(
        "active"
      );

      shell.classList.add(
        "active"
      );


      show("home");

    }
  );


  /* ==================== RESTORE USER ==================== */

  const savedName =
    localStorage.getItem(
      "queen_username"
    );

  const savedAvatar =
    localStorage.getItem(
      "queen_avatar"
    );


  if (savedName) {

    nick.value =
      savedName;

    $("#name").textContent =
      savedName;

    $("#profileName").textContent =
      savedName;
  }


  if (savedAvatar) {

    avatar =
      savedAvatar;


    setAvatar(
      preview,
      avatar
    );

    setAvatar(
      $("#homeAvatar"),
      avatar
    );

    setAvatar(
      $("#profileAvatar"),
      avatar
    );

    setAvatar(
      $("#profileTop"),
      avatar
    );

  }


  /* ==================== TOP PROFILE ==================== */

  $("#profileTop")?.addEventListener(
    "click",
    () => show("profile")
  );


  /* ==================== MINI GAME OPEN ==================== */

  $$("[data-open]").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          show(
            button.dataset.open
          );

        }
      );

    }
  );


  /* ==================== FLIP CHOICE ==================== */

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


  /* ==================== STAKE ==================== */

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


  /* ==================== FLIP GAME ==================== */

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


  /* ==================== GAMES ==================== */

  $$("[data-mode]").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const notice =
            $("#gameNotice");


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


  /* ==================== STYLE ==================== */

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


  /* ==================== PARTY ==================== */

  $(".secondary-btn")?.addEventListener(
    "click",
    (event) => {

      event.currentTarget.textContent =
        "Party скоро будет доступна";

    }
  );


  /* ==================== START ==================== */

  show("home");

});
