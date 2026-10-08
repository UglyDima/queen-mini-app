document.addEventListener("DOMContentLoaded", () => {

  /* ================= TELEGRAM ================= */

  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();

    try {
      tg.setHeaderColor("#070709");
      tg.setBackgroundColor("#070709");
    } catch (e) {}
  }


  /* ================= HELPERS ================= */

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);


  /* ================= STATE ================= */

  const state = {
    xp: 120,

    rating: 1000,
    wins: 0,
    losses: 0,
    streak: 0,

    fortuneSpinning: false,

    upxRunning: false,
    upxMultiplier: 1,
    upxStopped: false,

    battleActive: false,
    battleDuration: 15 * 60,
    battleStarted: 0,
    battleTimer: null,
    battleMyLikes: 0,
    battleOpponentLikes: 0,

    battleNumber: 24,

    fighterLeft: {
      name: "Luna",
      likes: 124
    },

    fighterRight: {
      name: "Mila",
      likes: 119
    },

    ticBoard: Array(9).fill(""),
    ticPlayer: "X",
    ticGameOver: false,
    ticDifficulty: "hard",

    fruitScore: 0,
    fruitTime: 30,
    fruitRunning: false,
    fruitTimer: null,
    fruitGrid: [],
    fruitPath: []
  };


  /* ================= LOGIN ================= */

  const auth = $("#auth");
  const shell = $("#shell");
  const loginBtn = $("#loginBtn");
  const loginError = $("#loginError");


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

    img.onerror = () => {
      element.textContent = "♙";
    };

    element.appendChild(img);
  }


  function enterQueen() {

    const savedName = localStorage.getItem("queen_username");
    const savedAvatar = localStorage.getItem("queen_avatar");

    if (!savedName) {
      loginError.textContent = "Профиль ещё не создан.";
      return;
    }

    $("#profileName").textContent = savedName;

    setAvatar(
      $("#profileAvatar"),
      savedAvatar
    );

    setAvatar(
      $("#leaderUserAvatar"),
      savedAvatar
    );

    $("#leaderUserName").textContent = savedName;

    auth.classList.remove("active");
    shell.classList.add("active");

    showView("profile");
    updateStats();
  }


  loginBtn?.addEventListener("click", () => {

    loginError.textContent = "";

    enterQueen();

  });


  /* ================= NAVIGATION ================= */

  const views = $$(".view");
  const navButtons = $$(".bottom-nav [data-view]");


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

      showView(button.dataset.view);

    });

  });


  /* ================= PROFILE STATS ================= */

  function updateStats() {

    $("#profileXP").textContent =
      state.xp;

    $("#profileRating").textContent =
      state.rating;

    $("#battleRating").textContent =
      state.rating;

    $("#profileWins").textContent =
      state.wins;

    $("#battleWins").textContent =
      state.wins;

    $("#profileStreak").textContent =
      state.streak;

    $("#battleStreak").textContent =
      state.streak;

    const total =
      state.wins + state.losses;

    const rate =
      total === 0
        ? 0
        : Math.round(
            state.wins / total * 100
          );

    $("#battleWinRate").textContent =
      `${rate}%`;

    $("#leaderUserRating").textContent =
      `${state.rating} rating`;
  }


  function addXP(amount) {

    state.xp += amount;

    updateStats();

  }


  /* ================= FORTUNE ================= */

  const fortuneWheel = $("#fortuneWheel");
  const fortuneSpin = $("#fortuneSpin");
  const fortuneResult = $("#fortuneResult");

  const fortuneRewards = [
    {
      text: "+100 XP",
      xp: 100
    },
    {
      text: "Pink Aura",
      xp: 50
    },
    {
      text: "Ничего ✦",
      xp: 0
    },
    {
      text: "+250 XP",
      xp: 250
    },
    {
      text: "Gloss Frame",
      xp: 80
    },
    {
      text: "Эффект ♛",
      xp: 120
    },
    {
      text: "Ничего",
      xp: 0
    },
    {
      text: "+50 XP",
      xp: 50
    }
  ];


  let fortuneRotation = 0;


  fortuneSpin?.addEventListener("click", () => {

    if (state.fortuneSpinning) {
      return;
    }

    state.fortuneSpinning = true;

    fortuneSpin.disabled = true;
    fortuneSpin.style.opacity = ".55";

    fortuneResult.textContent =
      "Колесо вращается...";


    const index =
      Math.floor(
        Math.random() *
        fortuneRewards.length
      );

    const sector =
      360 / fortuneRewards.length;

    const target =
      360 -
      (index * sector + sector / 2);

    fortuneRotation +=
      360 * 6 + target;

    fortuneWheel.style.transform =
      `rotate(${fortuneRotation}deg)`;


    setTimeout(() => {

      const reward =
        fortuneRewards[index];

      fortuneResult.textContent =
        reward.text;

      if (reward.xp > 0) {
        addXP(reward.xp);
      }

      state.fortuneSpinning = false;

      fortuneSpin.disabled = false;
      fortuneSpin.style.opacity = "1";

    }, 3600);

  });


  /* ================= UP-X ================= */

  const upxStart = $("#upxStart");
  const upxStop = $("#upxStop");
  const upxMultiplier = $("#upxMultiplier");
  const upxStatus = $("#upxStatus");


  let upxInterval = null;
  let upxCrash = 0;


  function resetUpX() {

    clearInterval(upxInterval);

    state.upxRunning = false;

    upxStart.classList.remove("hidden");
    upxStop.classList.add("hidden");

    upxStart.disabled = false;

    upxStatus.textContent = "READY";
    upxStatus.style.color = "var(--green)";

  }


  upxStart?.addEventListener("click", () => {

    if (state.upxRunning) {
      return;
    }

    state.upxRunning = true;
    state.upxMultiplier = 1;

    upxCrash =
      1.8 +
      Math.random() * 7;

    upxStart.classList.add("hidden");
    upxStop.classList.remove("hidden");

    upxStatus.textContent = "RISING";
    upxStatus.style.color = "var(--pink-soft)";

    upxInterval = setInterval(() => {

      state.upxMultiplier +=
        0.04 +
        state.upxMultiplier * 0.006;

      upxMultiplier.textContent =
        `${state.upxMultiplier.toFixed(2)}×`;


      if (
        state.upxMultiplier >=
        upxCrash
      ) {

        clearInterval(upxInterval);

        state.upxRunning = false;

        upxStatus.textContent =
          "STOPPED";

        upxStatus.style.color =
          "var(--danger)";

        upxStart.classList.remove("hidden");
        upxStop.classList.add("hidden");

        addXP(
          Math.max(
            5,
            Math.floor(
              state.upxMultiplier * 10
            )
          )
        );

        setTimeout(() => {

          upxMultiplier.textContent =
            "1.00×";

          resetUpX();

        }, 1300);

      }

    }, 80);

  });


  upxStop?.addEventListener("click", () => {

    if (!state.upxRunning) {
      return;
    }

    clearInterval(upxInterval);

    state.upxRunning = false;

    const earned =
      Math.floor(
        state.upxMultiplier * 12
      );

    upxStatus.textContent =
      `+${earned} XP`;

    upxStatus.style.color =
      "var(--green)";

    addXP(earned);

    upxStart.classList.remove("hidden");
    upxStop.classList.add("hidden");

  });


  /* ================= BATTLE ================= */

  const battlePlay =
    $("#battlePlay");

  const activeBattle =
    $("#activeBattle");

  const battleTimer =
    $("#battleTimer");

  const battleProgress =
    $("#battleProgress");

  const myBattleLikes =
    $("#myBattleLikes");

  const opponentLikes =
    $("#opponentLikes");


  function formatTime(seconds) {

    const min =
      Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");

    const sec =
      Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${min}:${sec}`;
  }


  function startBattle() {

    if (state.battleActive) {
      return;
    }

    state.battleActive = true;

    state.battleDuration =
      Math.random() < .5
        ? 15 * 60
        : 30 * 60;

    state.battleStarted =
      Date.now();

    state.battleMyLikes =
      Math.floor(
        Math.random() * 15
      );

    state.battleOpponentLikes =
      Math.floor(
        Math.random() * 15
      );


    activeBattle.classList.remove(
      "hidden"
    );

    battlePlay.textContent =
      "BATTLE ACTIVE";


    updateBattleTimer();

    state.battleTimer =
      setInterval(
        updateBattleTimer,
        1000
      );

  }


  function updateBattleTimer() {

    if (!state.battleActive) {
      return;
    }

    const elapsed =
      Math.floor(
        (Date.now() -
          state.battleStarted) / 1000
      );

    const remaining =
      Math.max(
        0,
        state.battleDuration -
        elapsed
      );


    battleTimer.textContent =
      formatTime(remaining);


    const percent =
      remaining /
      state.battleDuration;

    battleProgress.style.transform =
      `scaleX(${percent})`;


    myBattleLikes.textContent =
      state.battleMyLikes;

    opponentLikes.textContent =
      state.battleOpponentLikes;


    if (remaining <= 0) {

      finishBattle();

    }

  }


  function finishBattle() {

    clearInterval(
      state.battleTimer
    );

    state.battleActive = false;


    const win =
      state.battleMyLikes >=
      state.battleOpponentLikes;


    if (win) {

      state.wins++;
      state.streak++;

      state.rating += 25;

      addXP(150);

      alert(
        "♛ Победа!\n\n" +
        `Ты набрал ${state.battleMyLikes} лайков.`
      );

    } else {

      state.losses++;
      state.streak = 0;

      state.rating =
        Math.max(
          0,
          state.rating - 15
        );

      addXP(50);

      alert(
        "Battle завершён.\n\n" +
        "В этот раз победил соперник."
      );

    }


    activeBattle.classList.add(
      "hidden"
    );

    battlePlay.textContent =
      "PLAY";


    updateStats();

  }


  battlePlay?.addEventListener(
    "click",
    startBattle
  );


  $("#leaveBattle")?.addEventListener(
    "click",
    () => {

      showView("profile");

    }
  );


  /* ================= BATTLE VOTING ================= */

  const left =
    $("#fighterLeft");

  const right =
    $("#fighterRight");


  function nextBattle() {

    state.battleNumber++;

    const names = [
      ["Luna", "Mila"],
      ["Aria", "Nika"],
      ["Sofia", "Lina"],
      ["Vera", "Maya"],
      ["Ayla", "Kira"],
      ["Emma", "Nora"]
    ];

    const pair =
      names[
        Math.floor(
          Math.random() *
          names.length
        )
      ];


    $("#battleNumber").textContent =
      `#${String(
        state.battleNumber
      ).padStart(3, "0")}`;


    state.fighterLeft.name =
      pair[0];

    state.fighterRight.name =
      pair[1];


    state.fighterLeft.likes =
      90 +
      Math.floor(
        Math.random() * 100
      );

    state.fighterRight.likes =
      90 +
      Math.floor(
        Math.random() * 100
      );


    $("#fighterLeftName").textContent =
      state.fighterLeft.name;

    $("#fighterRightName").textContent =
      state.fighterRight.name;


    $("#fighterLeftLikes").textContent =
      `${state.fighterLeft.likes} likes`;

    $("#fighterRightLikes").textContent =
      `${state.fighterRight.likes} likes`;


    $("#battleVotes").textContent =
      `${state.fighterLeft.likes} — ${state.fighterRight.likes}`;


    $("#battleTheme").textContent =
      [
        "NIGHT GLAM",
        "PINK FUTURE",
        "OLD MONEY",
        "CITY LIGHTS",
        "SOFT POWER",
        "ROYAL NIGHT"
      ][
        Math.floor(
          Math.random() * 6
        )
      ];

  }


  function vote(side) {

    const button =
      side === "left"
        ? left
        : right;

    button.classList.add(
      "selected"
    );


    setTimeout(() => {

      button.classList.remove(
        "selected"
      );

      nextBattle();

    }, 450);

  }


  left?.addEventListener(
    "click",
    () => vote("left")
  );

  right?.addEventListener(
    "click",
    () => vote("right")
  );


  /* ================= STYLE ================= */

  $$(".style-item").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          $$(".style-item")
            .forEach(
              item =>
                item.classList.remove(
                  "selected"
                )
            );

          button.classList.add(
            "selected"
          );

        }
      );

    }
  );


  /* ================= TIC TAC TOE ================= */

  const ticBoard =
    $("#ticBoard");

  const ticStatus =
    $("#ticStatus");


  function resetTic() {

    state.ticBoard =
      Array(9).fill("");

    state.ticGameOver = false;

    ticStatus.textContent =
      "Твой ход";

    $$("#ticBoard button")
      .forEach(
        button => {

          button.textContent = "";
          button.className = "";

        }
      );

  }


  function renderTic() {

    $$("#ticBoard button")
      .forEach(
        button => {

          const index =
            Number(
              button.dataset.cell
            );

          const value =
            state.ticBoard[index];

          button.textContent =
            value;

          button.className =
            value === "X"
              ? "x"
              : value === "O"
                ? "o"
                : "";

        }
      );

  }


  function checkWinner(board) {

    const combos = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];


    for (
      const combo of combos
    ) {

      const [a,b,c] =
        combo;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {

        return board[a];

      }

    }


    if (
      board.every(Boolean)
    ) {

      return "draw";

    }


    return null;

  }


  function botMove() {

    if (state.ticGameOver) {
      return;
    }


    let move;


    if (
      state.ticDifficulty ===
      "hard"
    ) {

      move =
        findBestMove(
          state.ticBoard
        );

    } else {

      const empty =
        state.ticBoard
          .map(
            (v,i) =>
              v ? null : i
          )
          .filter(
            v => v !== null
          );

      move =
        empty[
          Math.floor(
            Math.random() *
            empty.length
          )
        ];

    }


    if (move === undefined) {
      return;
    }


    state.ticBoard[move] =
      "O";

    renderTic();


    const result =
      checkWinner(
        state.ticBoard
      );


    if (result) {

      finishTic(result);

    } else {

      ticStatus.textContent =
        "Твой ход";

    }

  }


  function findBestMove(board) {

    let bestScore = -Infinity;
    let bestMove = null;


    for (
      let i = 0;
      i < 9;
      i++
    ) {

      if (!board[i]) {

        board[i] = "O";

        const score =
          minimax(
            board,
            false
          );

        board[i] = "";

        if (score > bestScore) {

          bestScore = score;
          bestMove = i;

        }

      }

    }


    return bestMove;

  }


  function minimax(board, isMax) {

    const result =
      checkWinner(board);


    if (result === "O") {
      return 10;
    }

    if (result === "X") {
      return -10;
    }

    if (result === "draw") {
      return 0;
    }


    if (isMax) {

      let best = -Infinity;

      for (
        let i = 0;
        i < 9;
        i++
      ) {

        if (!board[i]) {

          board[i] = "O";

          best = Math.max(
            best,
            minimax(
              board,
              false
            )
          );

          board[i] = "";

        }

      }

      return best;

    } else {

      let best = Infinity;

      for (
        let i = 0;
        i < 9;
        i++
      ) {

        if (!board[i]) {

          board[i] = "X";

          best = Math.min(
            best,
            minimax(
              board,
              true
            )
          );

          board[i] = "";

        }

      }

      return best;

    }

  }


  function finishTic(result) {

    state.ticGameOver = true;

    if (result === "X") {

      ticStatus.textContent =
        "♛ Ты победил!";

      addXP(75);

    } else if (result === "O") {

      ticStatus.textContent =
        "Бот победил.";

      addXP(20);

    } else {

      ticStatus.textContent =
        "Ничья.";

      addXP(35);

    }

  }


  $$("#ticBoard button")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            if (
              state.ticGameOver ||
              state.ticBoard[
                Number(
                  button.dataset.cell
                )
              ]
            ) {
              return;
            }


            const index =
              Number(
                button.dataset.cell
              );

            state.ticBoard[index] =
              "X";

            renderTic();


            const result =
              checkWinner(
                state.ticBoard
              );


            if (result) {

              finishTic(result);
              return;

            }


            ticStatus.textContent =
              "Бот думает...";

            setTimeout(
              botMove,
              450
            );

          }
        );

      }
    );


  $("#ticReset")?.addEventListener(
    "click",
    resetTic
  );


  $$(".tic-mode").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          $$(".tic-mode")
            .forEach(
              item =>
                item.classList.remove(
                  "active"
                )
            );

          button.classList.add(
            "active"
          );

          state.ticDifficulty =
            button.dataset.difficulty;

          resetTic();

        }
      );

    }
  );


  /* ================= MINI GAME OPEN ================= */

  $$("[data-game]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const game =
            button.dataset.game;


          $("#ticGame")
            .classList.toggle(
              "hidden",
              game !== "tic"
            );

          $("#fruitGame")
            .classList.toggle(
              "hidden",
              game !== "fruit"
            );

          window.scrollTo({
            top:
              document.body.scrollHeight,
            behavior: "smooth"
          });

        }
      );

    }
  );


  $("#ticClose")?.addEventListener(
    "click",
    () => {
      $("#ticGame")
        .classList.add("hidden");
    }
  );


  $("#fruitClose")?.addEventListener(
    "click",
    () => {
      $("#fruitGame")
        .classList.add("hidden");
    }
  );


  /* ================= FRUIT DROP ================= */

  const fruitBoard =
    $("#fruitBoard");

  const fruitScore =
    $("#fruitScore");

  const fruitTime =
    $("#fruitTime");

  const fruitStart =
    $("#fruitStart");


  const fruits = [
    "🍓",
    "🍒",
    "🍊",
    "🍋",
    "🍇",
    "🍉",
    "🥝"
  ];


  function createFruitGrid() {

    state.fruitGrid =
      Array.from(
        { length: 42 },
        () =>
          fruits[
            Math.floor(
              Math.random() *
              fruits.length
            )
          ]
      );

    renderFruit();

  }


  function renderFruit() {

    fruitBoard.innerHTML = "";

    state.fruitGrid.forEach(
      (fruit,index) => {

        const cell =
          document.createElement(
            "div"
          );

        cell.className =
          "fruit-cell";

        cell.dataset.index =
          index;

        cell.textContent =
          fruit;

        fruitBoard.appendChild(
          cell
        );

      }
    );

  }


  function getFruitCell(target) {

    if (
      !target ||
      !target.classList.contains(
        "fruit-cell"
      )
    ) {

      return null;

    }

    return target;

  }


  function collectFruit(cell) {

    if (
      !state.fruitRunning ||
      !cell
    ) {
      return;
    }


    const index =
      Number(
        cell.dataset.index
      );

    const value =
      state.fruitGrid[index];


    if (
      state.fruitPath.length &&
      state.fruitPath.includes(index)
    ) {
      return;
    }


    if (
      state.fruitPath.length
    ) {

      const previous =
        state.fruitPath[
          state.fruitPath.length - 1
        ];

      const previousValue =
        state.fruitGrid[previous];

      const row =
        Math.floor(index / 7);

      const col =
        index % 7;

      const prow =
        Math.floor(previous / 7);

      const pcol =
        previous % 7;


      const adjacent =
        Math.abs(row - prow) <= 1 &&
        Math.abs(col - pcol) <= 1;


      if (
        !adjacent ||
        value !== previousValue
      ) {
        return;
      }

    }


    state.fruitPath.push(index);

    cell.classList.add("pop");

  }


  function finishFruitPath() {

    if (
      state.fruitPath.length < 2
    ) {

      state.fruitPath = [];

      $$(".fruit-cell")
        .forEach(
          cell =>
            cell.classList.remove(
              "pop"
            )
        );

      return;

    }


    const amount =
      state.fruitPath.length;


    state.fruitScore +=
      amount * amount * 5;


    fruitScore.textContent =
      state.fruitScore;


    const removeSet =
      new Set(
        state.fruitPath
      );


    const newGrid =
      state.fruitGrid.filter(
        (_,index) =>
          !removeSet.has(index)
      );


    while (
      newGrid.length < 42
    ) {

      newGrid.unshift(
        fruits[
          Math.floor(
            Math.random() *
            fruits.length
          )
        ]
      );

    }


    state.fruitGrid =
      newGrid.slice(-42);

    state.fruitPath = [];

    renderFruit();

  }


  let fruitPointerDown = false;


  fruitBoard.addEventListener(
    "pointerdown",
    (event) => {

      if (!state.fruitRunning) {
        return;
      }

      fruitPointerDown = true;
      state.fruitPath = [];

      const cell =
        getFruitCell(
          event.target
        );

      collectFruit(cell);

    }
  );


  fruitBoard.addEventListener(
    "pointermove",
    (event) => {

      if (!fruitPointerDown) {
        return;
      }

      const element =
        document.elementFromPoint(
          event.clientX,
          event.clientY
        );

      collectFruit(
        getFruitCell(element)
      );

    }
  );


  window.addEventListener(
    "pointerup",
    () => {

      if (!fruitPointerDown) {
        return;
      }

      fruitPointerDown = false;

      finishFruitPath();

    }
  );


  function startFruit() {

    if (state.fruitRunning) {
      return;
    }

    state.fruitRunning = true;

    state.fruitScore = 0;
    state.fruitTime = 30;

    fruitScore.textContent = "0";
    fruitTime.textContent = "30";

    fruitStart.textContent =
      "Игра идёт...";

    createFruitGrid();


    state.fruitTimer =
      setInterval(() => {

        state.fruitTime--;

        fruitTime.textContent =
          state.fruitTime;


        if (
          state.fruitTime <= 0
        ) {

          clearInterval(
            state.fruitTimer
          );

          state.fruitRunning =
            false;

          fruitStart.textContent =
            `Результат: ${state.fruitScore}`;

          addXP(
            Math.floor(
              state.fruitScore / 20
            )
          );

        }

      }, 1000);

  }


  fruitStart?.addEventListener(
    "click",
    startFruit
  );


  /* ================= INITIAL ================= */

  resetTic();
  createFruitGrid();
  nextBattle();
  updateStats();

  auth.classList.add("active");
  shell.classList.remove("active");

});
