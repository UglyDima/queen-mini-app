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
      console.warn("Telegram setup:", error);
    }
  }


  /* ==================== HELPERS ==================== */

  const $ = (selector) =>
    document.querySelector(selector);

  const $$ = (selector) =>
    document.querySelectorAll(selector);


  /* ==================== ELEMENTS ==================== */

  const auth = $("#auth");
  const shell = $("#shell");

  const loginBtn = $("#loginBtn");
  const loginError = $("#loginError");

  const views = $$(".view");
  const navButtons = $$(".bottom-nav [data-view]");


  /* ==================== STATE ==================== */

  let battleRating = 1000;

  let battleWins = 0;
  let battleLosses = 0;

  let battleStreak = 0;
  let battleVotes = 0;

  let level = 1;
  let crowns = 0;


  /* ==================== PROFILE ==================== */

  function getProfile() {

    return {
      username:
        localStorage.getItem("queen_username")?.trim() || "",

      avatar:
        localStorage.getItem("queen_avatar") || ""
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

      element.innerHTML = "";

      element.textContent = "♙";

    };


    element.appendChild(img);

  }


  function updateBattleStats() {

    const total =
      battleWins + battleLosses;


    const winRate =
      total > 0
        ? Math.round(
            (battleWins / total) * 100
          )
        : 0;


    $("#battleRating").textContent =
      battleRating.toLocaleString("ru-RU");


    $("#battleWinRate").textContent =
      `${winRate}%`;


    $("#battleStreak").textContent =
      battleStreak;


    $("#battleVotes").textContent =
      battleVotes.toLocaleString("ru-RU");


    $("#profileBattleRating").textContent =
      battleRating.toLocaleString("ru-RU");


    $("#profileProfileWinRate").textContent =
      `${winRate}%`;

  }


  function loadProfile() {

    const profile = getProfile();


    if (!profile.username) {
      return false;
    }


    $("#profileName").textContent =
      profile.username;


    setAvatar(
      $("#profileAvatar"),
      profile.avatar
    );


    $("#profileCrowns").textContent =
      crowns;


    $("#profileLevel").textContent =
      String(level).padStart(2, "0");


    updateBattleStats();


    return true;

  }


  /* ==================== LOGIN ==================== */

  function enterQueen() {

    loginError.textContent = "";


    if (!loadProfile()) {

      loginError.textContent =
        "Аккаунт Queen не найден.";

      return;

    }


    auth.classList.remove("active");

    shell.classList.add("active");


    showView("battle");


    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  }


  loginBtn?.addEventListener(
    "click",
    enterQueen
  );


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

    button.addEventListener(
      "click",
      () => {

        const target =
          button.dataset.view;

        if (!target) return;

        showView(target);

      }
    );

  });


  /* ==================== BATTLE VOTING ==================== */

  $$(".vote-btn").forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const choice =
          button.dataset.vote;

        if (!choice) return;


        $$(".vote-btn").forEach((item) => {

          item.classList.remove(
            "selected"
          );

        });


        button.classList.add(
          "selected"
        );


        battleVotes += 1;


        const result =
          $("#voteResult");


        const name =
          choice === "luna"
            ? "Luna"
            : "Mila";


        result.textContent =
          `Ты проголосовал за ${name} ❤️`;


        updateBattleStats();

      }
    );

  });


  /* ==================== MOST LOVED ==================== */

  $("#mostLovedBtn")?.addEventListener(
    "click",
    () => {

      const block =
        $("#mostLoved");

      block.classList.toggle("hidden");


      const visible =
        !block.classList.contains(
          "hidden"
        );


      $("#mostLovedBtn").textContent =
        visible
          ? "× Hide Most Loved"
          : "❤️ Most Loved";

    }
  );


  /* ==================== STYLE ==================== */

  $$(".style-item").forEach((button) => {

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

  });


  /* ==================== PARTY ==================== */

  $("#party .secondary-btn")?.addEventListener(
    "click",
    (event) => {

      event.currentTarget.textContent =
        "Party скоро будет доступна";

    }
  );


  /* ==================== REAL PHOTO ==================== */

  $("#realPhotoBtn")?.addEventListener(
    "click",
    () => {

      const notice =
        $("#realPhotoBtn");


      notice.textContent = "✓";


      setTimeout(() => {

        notice.textContent = "+";

      }, 1600);

    }
  );


  /* ==================== GAMES ==================== */

  const gamePanel =
    $("#gamePanel");

  const gamePanelContent =
    $("#gamePanelContent");

  const gameNotice =
    $("#gameNotice");


  function openGame(game) {

    gamePanel.classList.remove(
      "hidden"
    );


    gameNotice.textContent = "";


    if (game === "fortuna") {
      renderFortuna();
    }


    if (game === "upx") {
      renderUpX();
    }


    if (game === "ttt") {
      renderTicTacToe();
    }


    if (game === "fruit") {
      renderFruitDrop();
    }

  }


  function closeGame() {

    gamePanel.classList.add(
      "hidden"
    );

    gamePanelContent.innerHTML = "";

  }


  $("#closeGame")?.addEventListener(
    "click",
    closeGame
  );


  $$("[data-game]").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          openGame(
            button.dataset.game
          );

        }
      );

    }
  );


  /* ==================== FORTUNA ==================== */

  function renderFortuna() {

    gamePanelContent.innerHTML = `

      <div class="eyebrow">
        DAILY GAME
      </div>

      <h3>🔮 Fortuna</h3>

      <p>
        Один бесплатный шанс каждый день.
        Попробуй узнать свою награду.
      </p>

      <button
        id="fortuneBtn"
        class="primary-btn"
        type="button"
      >
        Испытать удачу
      </button>

      <div
        id="fortuneResult"
        class="game-notice"
      ></div>

    `;


    $("#fortuneBtn")?.addEventListener(
      "click",
      () => {

        const rewards = [
          "+25 XP",
          "+50 XP",
          "+75 XP",
          "RARE предмет",
          "LUCKY DAY ✦"
        ];


        const reward =
          rewards[
            Math.floor(
              Math.random() *
              rewards.length
            )
          ];


        $("#fortuneResult").textContent =
          `Твоя награда: ${reward}`;

      }
    );

  }


  /* ==================== UP-X ==================== */

  let upxTimer = null;
  let upxRunning = false;
  let upxValue = 1.00;


  function renderUpX() {

    gamePanelContent.innerHTML = `

      <div class="eyebrow">
        SKILL GAME
      </div>

      <h3>📈 Up-X</h3>

      <p>
        Множитель растёт. Останови его
        вовремя и установи личный рекорд.
      </p>

      <div
        id="upxValue"
        class="upx-value"
      >
        1.00×
      </div>

      <button
        id="upxButton"
        class="primary-btn upx-start"
        type="button"
      >
        START
      </button>

      <div
        id="upxResult"
        class="game-notice"
      ></div>

    `;


    $("#upxButton")?.addEventListener(
      "click",
      handleUpX
    );

  }


  function handleUpX() {

    const button =
      $("#upxButton");

    const value =
      $("#upxValue");

    const result =
      $("#upxResult");


    if (!upxRunning) {

      upxRunning = true;
      upxValue = 1.00;

      button.textContent =
        "STOP";


      result.textContent = "";


      upxTimer =
        setInterval(() => {

          upxValue +=
            0.01 +
            Math.random() * 0.08;


          value.textContent =
            `${upxValue.toFixed(2)}×`;


          if (upxValue >= 9.99) {

            stopUpX(
              "Максимум! ✦"
            );

          }

        }, 100);

      return;

    }


    stopUpX(
      `Результат: ${upxValue.toFixed(2)}×`
    );

  }


  function stopUpX(message) {

    clearInterval(upxTimer);

    upxTimer = null;

    upxRunning = false;


    const button =
      $("#upxButton");

    const result =
      $("#upxResult");


    if (button) {
      button.textContent = "START";
    }


    if (result) {
      result.textContent = message;
    }

  }


  /* ==================== TIC TAC TOE ==================== */

  let tttBoard = [];
  let tttPlayerTurn = true;


  function renderTicTacToe() {

    tttBoard = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ];


    tttPlayerTurn = true;


    gamePanelContent.innerHTML = `

      <div class="eyebrow">
        MINI GAME
      </div>

      <h3>♛ Tic Tac Queen</h3>

      <p>
        Ты — ♛. Бот — ♙.
        Собери три символа подряд.
      </p>

      <div
        id="tttBoard"
        class="ttt-board"
      ></div>

      <div
        id="tttStatus"
        class="ttt-status"
      >
        Твой ход
      </div>

      <button
        id="tttRestart"
        class="secondary-btn"
        type="button"
        style="margin-top:14px;"
      >
        Новая игра
      </button>

    `;


    drawTicTacToe();


    $("#tttRestart")?.addEventListener(
      "click",
      renderTicTacToe
    );

  }


  function drawTicTacToe() {

    const board =
      $("#tttBoard");

    if (!board) return;


    board.innerHTML = "";


    tttBoard.forEach(
      (cell, index) => {

        const button =
          document.createElement(
            "button"
          );


        button.className =
          "ttt-cell";


        button.textContent =
          cell;


        button.addEventListener(
          "click",
          () => playTicTacToe(index)
        );


        board.appendChild(button);

      }
    );

  }


  function playTicTacToe(index) {

    if (
      !tttPlayerTurn ||
      tttBoard[index]
    ) {
      return;
    }


    tttBoard[index] = "♛";

    drawTicTacToe();


    if (
      checkWinner(tttBoard, "♛")
    ) {

      $("#tttStatus").textContent =
        "Ты победил 👑";

      tttPlayerTurn = false;

      return;

    }


    if (
      tttBoard.every(Boolean)
    ) {

      $("#tttStatus").textContent =
        "Ничья ✦";

      tttPlayerTurn = false;

      return;

    }


    tttPlayerTurn = false;

    $("#tttStatus").textContent =
      "Ход бота…";


    setTimeout(
      botTicTacToe,
      350
    );

  }


  function botTicTacToe() {

    const empty =
      tttBoard
        .map(
          (value, index) =>
            value
              ? null
              : index
        )
        .filter(
          (value) =>
            value !== null
        );


    if (!empty.length) return;


    const move =
      empty[
        Math.floor(
          Math.random() *
          empty.length
        )
      ];


    tttBoard[move] = "♙";


    drawTicTacToe();


    if (
      checkWinner(tttBoard, "♙")
    ) {

      $("#tttStatus").textContent =
        "Бот победил.";

      return;

    }


    if (
      tttBoard.every(Boolean)
    ) {

      $("#tttStatus").textContent =
        "Ничья ✦";

      return;

    }


    tttPlayerTurn = true;

    $("#tttStatus").textContent =
      "Твой ход";

  }


  function checkWinner(board, player) {

    const combinations = [

      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6]

    ];


    return combinations.some(
      (combo) =>
        combo.every(
          (index) =>
            board[index] === player
        )
    );

  }


  /* ==================== FRUIT DROP ==================== */

  let fruitTimer = null;


  function renderFruitDrop() {

    gamePanelContent.innerHTML = `

      <div class="eyebrow">
        SKILL GAME
      </div>

      <h3>🍓 Fruit Drop</h3>

      <p>
        Лови падающие фрукты.
        Пока это демо-механика —
        полноценную физику добавим следующим этапом.
      </p>

      <div
        id="fruitBoard"
        class="fruit-board"
      ></div>

      <button
        id="fruitStart"
        class="primary-btn"
        type="button"
        style="margin-top:12px;"
      >
        START
      </button>

      <div
        id="fruitResult"
        class="game-notice"
      ></div>

    `;


    $("#fruitStart")?.addEventListener(
      "click",
      startFruitDrop
    );

  }


  function startFruitDrop() {

    const board =
      $("#fruitBoard");


    if (!board) return;


    board.innerHTML = "";


    const fruits = [
      "🍓",
      "🍒",
      "🍋",
      "🍑",
      "🍇",
      "🍉"
    ];


    let score = 0;


    $("#fruitResult").textContent =
      "Собирай фрукты!";


    if (fruitTimer) {
      clearInterval(fruitTimer);
    }


    fruitTimer =
      setInterval(() => {

        const fruit =
          document.createElement(
            "div"
          );


        fruit.className =
          "fruit";


        fruit.textContent =
          fruits[
            Math.floor(
              Math.random() *
              fruits.length
            )
          ];


        fruit.style.left =
          `${Math.random() * 82}%`;


        fruit.style.top =
          "-55px";


        board.appendChild(fruit);


        let position = -55;


        const fall =
          setInterval(() => {

            position += 3;

            fruit.style.top =
              `${position}px`;


            if (
              position >
              board.clientHeight
            ) {

              clearInterval(fall);

              fruit.remove();

            }

          }, 30);


        fruit.addEventListener(
          "click",
          () => {

            score += 10;

            $("#fruitResult").textContent =
              `Score: ${score}`;

            clearInterval(fall);

            fruit.remove();

          }
        );


      }, 650);


    setTimeout(() => {

      clearInterval(fruitTimer);

      fruitTimer = null;

      $("#fruitResult").textContent =
        `Раунд закончен • Score: ${score}`;

    }, 15000);

  }


  /* ==================== CLEANUP ==================== */

  window.addEventListener(
    "beforeunload",
    () => {

      if (upxTimer) {
        clearInterval(upxTimer);
      }

      if (fruitTimer) {
        clearInterval(fruitTimer);
      }

    }
  );


  /* ==================== INITIAL STATE ==================== */

  auth.classList.add("active");

  shell.classList.remove("active");

  showView("battle");

});
