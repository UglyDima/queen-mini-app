document.addEventListener("DOMContentLoaded", () => {
    console.log("Queen app.js loaded");

    // =========================
    // ELEMENTS
    // =========================

    const lockScreen = document.getElementById("lockScreen");
    const setupScreen = document.getElementById("setupScreen");
    const appScreen = document.getElementById("appScreen");

    const enterBtn = document.getElementById("enterBtn");
    const finishSetup = document.getElementById("finishSetup");

    const avatarInput = document.getElementById("avatarInput");
    const avatarPreview = document.getElementById("avatarPreview");

    const nicknameInput = document.getElementById("nicknameInput");

    const heroName = document.getElementById("heroName");
    const profileName = document.getElementById("profileName");

    const heroAvatar = document.getElementById("heroAvatar");
    const profileAvatar = document.getElementById("profileAvatar");

    const coinsValue = document.getElementById("coinsValue");
    const gemsValue = document.getElementById("gemsValue");

    const profileCoins = document.getElementById("profileCoins");
    const profileGems = document.getElementById("profileGems");
    const profileCrowns = document.getElementById("profileCrowns");

    const levelValue = document.getElementById("levelValue");
    const profileLevel = document.getElementById("profileLevel");

    // =========================
    // STATE
    // =========================

    let avatarData = null;

    let coins = Number(localStorage.getItem("queen_coins"));

    if (!Number.isFinite(coins)) {
        coins = 1500;
    }

    let gems = Number(localStorage.getItem("queen_gems"));

    if (!Number.isFinite(gems)) {
        gems = 30;
    }

    let crowns = Number(localStorage.getItem("queen_crowns"));

    if (!Number.isFinite(crowns)) {
        crowns = 0;
    }

    let level = Number(localStorage.getItem("queen_level"));

    if (!Number.isFinite(level)) {
        level = 1;
    }

    // =========================
    // SCREEN HELPERS
    // =========================

    function showScreen(screen) {
        document.querySelectorAll(".screen").forEach((item) => {
            item.classList.remove("active");
        });

        screen.classList.add("active");
    }

    function showView(viewName) {
        document.querySelectorAll(".view").forEach((view) => {
            view.classList.remove("active");
        });

        const target = document.getElementById(`${viewName}View`);

        if (!target) {
            console.warn(`View not found: ${viewName}`);
            return;
        }

        target.classList.add("active");

        document.querySelectorAll(".nav-item").forEach((item) => {
            item.classList.remove("active");
        });

        const navButton = document.querySelector(
            `.nav-item[data-view="${viewName}"]`
        );

        if (navButton) {
            navButton.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // =========================
    // ENTER
    // =========================

    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            console.log("Enter clicked");

            showScreen(setupScreen);
        });
    }

    // =========================
    // AVATAR UPLOAD
    // =========================

    if (avatarInput) {
        avatarInput.addEventListener("change", (event) => {
            const file = event.target.files?.[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Выбери изображение.");
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                avatarData = reader.result;

                avatarPreview.innerHTML = "";

                const img = document.createElement("img");
                img.src = avatarData;
                img.alt = "Аватар";

                avatarPreview.appendChild(img);

                console.log("Avatar loaded");
            };

            reader.readAsDataURL(file);
        });
    }

    // =========================
    // LOAD SAVED PROFILE
    // =========================

    const savedNickname = localStorage.getItem("queen_username");
    const savedAvatar = localStorage.getItem("queen_avatar");

    if (savedNickname) {
        nicknameInput.value = savedNickname;
    }

    if (savedAvatar) {
        avatarData = savedAvatar;

        if (avatarPreview) {
            avatarPreview.innerHTML = "";

            const img = document.createElement("img");
            img.src = savedAvatar;
            img.alt = "Аватар";

            avatarPreview.appendChild(img);
        }
    }

    // =========================
    // FINISH SETUP
    // =========================

    if (finishSetup) {
        finishSetup.addEventListener("click", () => {
            console.log("Finish setup clicked");

            const nickname = nicknameInput.value.trim();

            if (!nickname) {
                alert("Введи ник.");
                nicknameInput.focus();
                return;
            }

            if (nickname.length < 2) {
                alert("Ник должен содержать минимум 2 символа.");
                nicknameInput.focus();
                return;
            }

            localStorage.setItem("queen_username", nickname);

            if (avatarData) {
                localStorage.setItem("queen_avatar", avatarData);
            }

            localStorage.setItem("queen_coins", String(coins));
            localStorage.setItem("queen_gems", String(gems));
            localStorage.setItem("queen_crowns", String(crowns));
            localStorage.setItem("queen_level", String(level));

            updateProfile();

            showScreen(appScreen);
            showView("home");

            console.log("Profile created");
        });
    }

    // =========================
    // PROFILE UPDATE
    // =========================

    function updateProfile() {
        const nickname =
            localStorage.getItem("queen_username") || "Queen";

        const savedAvatar =
            localStorage.getItem("queen_avatar");

        if (heroName) {
            heroName.textContent = nickname;
        }

        if (profileName) {
            profileName.textContent = nickname;
        }

        if (coinsValue) {
            coinsValue.textContent = coins;
        }

        if (gemsValue) {
            gemsValue.textContent = gems;
        }

        if (profileCoins) {
            profileCoins.textContent = coins;
        }

        if (profileGems) {
            profileGems.textContent = gems;
        }

        if (profileCrowns) {
            profileCrowns.textContent = crowns;
        }

        if (levelValue) {
            levelValue.textContent = level;
        }

        if (profileLevel) {
            profileLevel.textContent = level;
        }

        if (savedAvatar) {
            setAvatar(heroAvatar, savedAvatar);
            setAvatar(profileAvatar, savedAvatar);
        }
    }

    function setAvatar(element, image) {
        if (!element) {
            return;
        }

        element.innerHTML = "";

        const img = document.createElement("img");

        img.src = image;
        img.alt = "Аватар";

        element.appendChild(img);
    }

    // =========================
    // NAVIGATION
    // =========================

    document.querySelectorAll("[data-view]").forEach((button) => {
        button.addEventListener("click", () => {
            const view = button.dataset.view;

            if (!view) {
                return;
            }

            showView(view);
        });
    });

    // =========================
    // BACK BUTTONS
    // =========================

    document.querySelectorAll(".view-back").forEach((button) => {
        button.addEventListener("click", () => {
            showView("home");
        });
    });

    document.querySelectorAll("[data-back]").forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.back;

            const screen = document.getElementById(target);

            if (screen) {
                showScreen(screen);
            }
        });
    });

    // =========================
    // FEATURE / GAME BUTTONS
    // =========================

    document.querySelectorAll("[data-game]").forEach((button) => {
        button.addEventListener("click", () => {
            const game = button.dataset.game;

            if (game === "flip") {
                showView("flip");
            }

            if (game === "fortune") {
                alert("Fortune пока находится внутри игровой системы.");
            }

            if (game === "upgrader") {
                alert("Upgrader пока находится в разработке.");
            }
        });
    });

    // =========================
    // FLIP CHOICE
    // =========================

    let selectedChoice = null;
    let selectedBet = 10;

    document.querySelectorAll(".choice-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".choice-btn").forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            selectedChoice = button.dataset.choice;
        });
    });

    document.querySelectorAll(".bet-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".bet-btn").forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            selectedBet = Number(button.dataset.bet);
        });
    });

    // =========================
    // FLIP GAME
    // =========================

    const flipBtn = document.getElementById("flipBtn");
    const flipResult = document.getElementById("flipResult");
    const coinDisplay = document.getElementById("coinDisplay");

    if (flipBtn) {
        flipBtn.addEventListener("click", () => {
            if (!selectedChoice) {
                if (flipResult) {
                    flipResult.textContent = "Сначала выбери сторону.";
                }

                return;
            }

            if (coins < selectedBet) {
                if (flipResult) {
                    flipResult.textContent = "Недостаточно Coins.";
                }

                return;
            }

            coins -= selectedBet;

            const result =
                Math.random() < 0.5
                    ? "heads"
                    : "tails";

            const won = result === selectedChoice;

            if (won) {
                // Небольшой профит
                const reward = Math.floor(selectedBet * 1.4);

                coins += reward;

                flipResult.textContent =
                    result === "heads"
                        ? "Орел! Ты выиграла."
                        : "Решка! Ты выиграла.";

                if (coinDisplay) {
                    coinDisplay.innerHTML = "<span>👑</span>";
                }
            } else {
                flipResult.textContent =
                    result === "heads"
                        ? "Орел! Не повезло."
                        : "Решка! Не повезло.";
            }

            localStorage.setItem(
                "queen_coins",
                String(coins)
            );

            updateProfile();
        });
    }

    // =========================
    // INITIAL STATE
    // =========================

    updateProfile();

    console.log("Queen initialized");
});
