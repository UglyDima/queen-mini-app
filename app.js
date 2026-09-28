document.addEventListener("DOMContentLoaded", () => {

  const enterBtn = document.getElementById("enterBtn");
  const lockScreen = document.getElementById("lockScreen");
  const setupScreen = document.getElementById("setupScreen");

  if (!enterBtn) {
    console.log("ОШИБКА: enterBtn не найден");
    return;
  }

  enterBtn.addEventListener("click", () => {

    console.log("КНОПКА РАБОТАЕТ");

    lockScreen.classList.remove("active");
    setupScreen.classList.add("active");

  });

});
