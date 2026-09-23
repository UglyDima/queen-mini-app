const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


/* =========================
   ELEMENTS
========================= */

const onboarding = document.getElementById("onboarding");
const home = document.getElementById("home");

const nicknameInput = document.getElementById("nickname");
const avatarInput = document.getElementById("avatarInput");

const avatarPreview = document.getElementById("avatarPreview");
const headerAvatar = document.getElementById("headerAvatar");

const startButton = document.getElementById("startButton");

const errorMessage = document.getElementById("errorMessage");
const userNickname = document.getElementById("userNickname");


/* =========================
   AVATAR
========================= */

let avatarData = null;

avatarInput.addEventListener("change", function () {

    const file = avatarInput.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        errorMessage.textContent = "Выберите изображение.";
        avatarInput.value = "";
        return;
    }

    const maxSize = 8 * 1024 * 1024;

    if (file.size > maxSize) {
        errorMessage.textContent = "Фото должно быть меньше 8 МБ.";
        avatarInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        avatarData = event.target.result;

        avatarPreview.innerHTML = "";

        const image = document.createElement("img");
        image.src = avatarData;
        image.alt = "Аватар";

        avatarPreview.appendChild(image);

        errorMessage.textContent = "";
    };

    reader.readAsDataURL(file);
});


/* =========================
   START
========================= */

startButton.addEventListener("click", function () {

    const nickname = nicknameInput.value.trim();

    if (!nickname) {
        errorMessage.textContent = "Введите ник.";
        nicknameInput.focus();
        return;
    }

    if (nickname.length < 2) {
        errorMessage.textContent = "Ник должен содержать минимум 2 символа.";
        nicknameInput.focus();
        return;
    }

    if (!avatarData) {
        errorMessage.textContent = "Добавьте аватарку.";
        return;
    }

    errorMessage.textContent = "";

    userNickname.textContent = nickname;

    headerAvatar.innerHTML = "";

    const image = document.createElement("img");
    image.src = avatarData;
    image.alt = "Аватар";

    headerAvatar.appendChild(image);

    onboarding.classList.remove("active");
    home.classList.add("active");

    window.scrollTo(0, 0);

    /*
        Здесь позже подключим сохранение профиля
        и отправку данных в backend.
    */

});


/* =========================
   ENTER = START
========================= */

nicknameInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        startButton.click();
    }

});


/* =========================
   TELEGRAM BACK BUTTON
========================= */

if (tg.BackButton) {

    tg.BackButton.hide();

}
