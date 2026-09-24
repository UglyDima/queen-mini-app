
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

// Screens
const screens = document.querySelectorAll('.screen');
const navigationButtons = document.querySelectorAll('[data-screen]');

function showScreen(screenId) {
    screens.forEach((screen) => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);

    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    document.querySelectorAll('.nav-item').forEach((item) => {
        item.classList.toggle(
            'active',
            item.dataset.screen === screenId
        );
    });

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

navigationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const screenId = button.dataset.screen;

        if (screenId) {
            showScreen(screenId);
        }
    });
});

// User data
let userNickname = '';
let userAvatar = '';

// Elements
const nicknameInput = document.getElementById('nickname');
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const startButton = document.getElementById('startButton');
const errorMessage = document.getElementById('errorMessage');

const homeNickname = document.getElementById('homeNickname');
const profileNickname = document.getElementById('profileNickname');

const profileButton = document.getElementById('profileButton');
const profileAvatar = document.getElementById('profileAvatar');

// Avatar upload
avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith('image/')) {
        errorMessage.textContent = 'Выбери изображение.';
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        userAvatar = reader.result;

        avatarPreview.innerHTML = '';

        const image = document.createElement('img');
        image.src = userAvatar;
        image.alt = 'Аватар пользователя';

        avatarPreview.appendChild(image);
    };

    reader.readAsDataURL(file);
});

// Start Queen
startButton.addEventListener('click', () => {
    userNickname = nicknameInput.value.trim();

    if (userNickname.length < 2) {
        errorMessage.textContent = 'Введи ник минимум из 2 символов.';
        nicknameInput.focus();
        return;
    }

    if (userNickname.length > 20) {
        errorMessage.textContent = 'Ник не должен быть длиннее 20 символов.';
        return;
    }

    errorMessage.textContent = '';

    homeNickname.textContent = userNickname;
    profileNickname.textContent = userNickname;

    if (userAvatar) {
        profileAvatar.innerHTML = '';

        const image = document.createElement('img');
        image.src = userAvatar;
        image.alt = 'Аватар пользователя';

        profileAvatar.appendChild(image);

        profileButton.textContent = '';

        const smallImage = document.createElement('img');
        smallImage.src = userAvatar;
        smallImage.alt = 'Аватар пользователя';

        profileButton.appendChild(smallImage);
    }

    showScreen('home');
});

// Open profile
profileButton.addEventListener('click', () => {
    showScreen('profile');
});

// Fortune, Upgrader and Duel
const modeButtons = document.querySelectorAll('[data-mode]');

modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const mode = button.dataset.mode;

        if (mode === 'fortune') {
            alert('✨ Fortune скоро будет доступен!');
        }

        if (mode === 'upgrader') {
            alert('⬆️ Upgrader скоро будет доступен!');
        }

        if (mode === 'duel') {
            alert('⚔️ Duel скоро будет доступен!');
        }
    });
});

// Status card
const statusCard = document.getElementById('statusCard');

statusCard.addEventListener('click', () => {
    alert(
        '👑 Crowns — твой статус в Queen. ' +
        'Их нельзя напрямую купить.'
    );
});
