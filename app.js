document.addEventListener("DOMContentLoaded", () => {
    console.log("QUEEN APP.JS ЗАГРУЖЕН");

    const enterBtn = document.getElementById("enterBtn");
    const lockScreen = document.getElementById("lockScreen");
    const setupScreen = document.getElementById("setupScreen");

    console.log("enterBtn:", enterBtn);
    console.log("lockScreen:", lockScreen);
    console.log("setupScreen:", setupScreen);

    if (!enterBtn || !lockScreen || !setupScreen) {
        alert("Ошибка Queen: элементы входа не найдены");
        return;
    }

    enterBtn.addEventListener("click", () => {
        console.log("ВХОД НАЖАТ");

        lockScreen.classList.remove("active");
        setupScreen.classList.add("active");
    });
});
