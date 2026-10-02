document.addEventListener("DOMContentLoaded", () => {
    alert("APP.JS ЗАПУСТИЛСЯ");

    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            alert("НАЖАТА КНОПКА: " + button.innerText);
        });
    });
});
