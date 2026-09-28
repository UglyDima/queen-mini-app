:root {
  --bg: #08080c;
  --bg-2: #0e0d13;
  --card: rgba(255,255,255,0.055);
  --card-strong: rgba(255,255,255,0.085);
  --border: rgba(255,255,255,0.09);

  --pink: #ff3d91;
  --pink-2: #ff78b4;
  --pink-soft: rgba(255,61,145,0.16);

  --text: #f8f7fa;
  --muted: #898690;

  --radius: 24px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  min-height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "SF Pro Display",
    "Segoe UI",
    sans-serif;
}

body {
  overflow-x: hidden;
}

button,
input {
  font: inherit;
}

button {
  border: 0;
  color: inherit;
  cursor: pointer;
}

button:active {
  transform: scale(.98);
}


/* =========================
   COMMON
========================= */

.screen {
  display: none;
  min-height: 100vh;
}

.screen.active {
  display: block;
}

.view {
  display: none;
  padding: 88px 18px 120px;
  min-height: 100vh;
}

.view.active {
  display: block;
}

.muted,
.page-heading p,
.hero-info p {
  color: var(--muted);
}

.eyebrow {
  display: block;
  color: var(--pink-2);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.primary-btn {
  width: 100%;
  min-height: 54px;
  border-radius: 17px;
  background: linear-gradient(
    135deg,
    #ff3d91,
    #ff6aaa
  );
  color: white;
  font-weight: 800;
  box-shadow:
    0 10px 35px rgba(255,61,145,.18);
}

.small-btn {
  width: auto;
  padding: 0 25px;
}

.text-btn {
  background: none;
  color: var(--pink-2);
  font-weight: 700;
}

.back-btn {
  width: 44px;
  height: 44px;
  border-radius: 15px;
  background: var(--card);
  border: 1px solid var(--border);
  color: white;
  font-size: 30px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}


/* =========================
   LOCK
========================= */

#lockScreen {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 50% 35%,
      rgba(255,61,145,.18),
      transparent 34%
    ),
    var(--bg);
}

.lock-glow {
  position: absolute;
  width: 320px;
  height: 320px;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(255,61,145,.08);
  filter: blur(80px);
}

.lock-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(330px, calc(100% - 40px));
  transform: translate(-50%, -50%);
  text-align: center;
}

.queen-mark {
  width: 90px;
  height: 90px;
  margin: 0 auto 25px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.12),
      rgba(255,255,255,.025)
    );

  border: 1px solid rgba(255,255,255,.1);

  color: var(--pink-2);
  font-size: 54px;

  box-shadow:
    0 25px 80px rgba(255,61,145,.15);
}

.lock-content h1 {
  font-size: 45px;
  letter-spacing: -2px;
}

.lock-content p {
  color: var(--muted);
  margin: 5px 0 35px;
}


/* =========================
   SETUP
========================= */

#setupScreen {
  padding: 30px 20px;
  background:
    radial-gradient(
      circle at 50% 0,
      rgba(255,61,145,.14),
      transparent 35%
    ),
    var(--bg);
}

.setup-card {
  width: min(420px, 100%);
  margin: 0 auto;
}

.setup-logo {
  color: var(--pink-2);
  font-size: 38px;
  margin-bottom: 18px;
}

.setup-card h2 {
  font-size: 30px;
  letter-spacing: -.8px;
}

.setup-card > p {
  margin: 8px 0 30px;
}

.avatar-upload {
  display: block;
  text-align: center;
  margin-bottom: 30px;
  cursor: pointer;
}

.avatar-upload input {
  display: none;
}

.avatar-preview {
  width: 105px;
  height: 105px;
  margin: 0 auto 10px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      rgba(255,61,145,.22),
      rgba(255,255,255,.04)
    );

  border: 1px solid rgba(255,61,145,.35);

  color: var(--pink-2);
  font-size: 35px;
  overflow: hidden;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-upload small {
  color: var(--muted);
}

.field {
  display: block;
  margin-bottom: 18px;
}

.field span {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 13px;
}

.field input {
  width: 100%;
  height: 54px;
  padding: 0 17px;
  border-radius: 16px;

  background: var(--card);
  border: 1px solid var(--border);

  outline: none;
  color: white;
}

.field input:focus {
  border-color: rgba(255,61,145,.55);
}


/* =========================
   TOPBAR
========================= */

.topbar {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;

  height: 72px;
  padding: 0 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(8,8,12,.76);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,.05);
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 19px;
  font-weight: 850;
}

.brand-symbol {
  color: var(--pink-2);
  font-size: 22px;
}

.balances {
  display: flex;
  gap: 7px;
}

.balance {
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 7px 10px;

  border-radius: 12px;
  background: var(--card);
  border: 1px solid var(--border);

  font-size: 12px;
}

.coin-icon {
  color: #ffd56a;
}

.gem-icon {
  color: #bd8cff;
}


/* =========================
   HOME
========================= */

.hero-card {
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 205px;
  padding: 24px;

  border-radius: 28px;

  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(255,61,145,.22),
      transparent 30%
    ),
    linear-gradient(
      145deg,
      rgba(255,255,255,.075),
      rgba(255,255,255,.025)
    );

  border: 1px solid var(--border);
}

.hero-info {
  max-width: 62%;
}

.hero-info h1 {
  font-size: 32px;
  line-height: 1.02;
  letter-spacing: -1.4px;
}

.hero-info h1 span {
  color: var(--pink-2);
}

.hero-info p {
  font-size: 12px;
  line-height: 1.5;
  margin-top: 12px;
}

.hero-avatar-wrap {
  position: relative;
}

.hero-avatar {
  width: 92px;
  height: 92px;

  border-radius: 30px;

  background:
    linear-gradient(
      145deg,
      rgba(255,61,145,.3),
      rgba(255,255,255,.05)
    );

  border: 1px solid rgba(255,255,255,.12);

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  color: var(--pink-2);
  font-size: 40px;
}

.hero-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.level-badge {
  position: absolute;
  bottom: -8px;
  right: -8px;

  padding: 6px 8px;
  border-radius: 9px;

  background: #15131b;
  border: 1px solid var(--border);

  font-size: 9px;
  font-weight: 800;
}

.section {
  margin-top: 30px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 14px;
}

.section-heading h2 {
  font-size: 20px;
  letter-spacing: -.5px;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.feature-card {
  min-height: 130px;
  padding: 17px;

  text-align: left;

  border-radius: 21px;

  background: var(--card);
  border: 1px solid var(--border);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.feature-card.pink-card {
  background:
    linear-gradient(
      145deg,
      rgba(255,61,145,.2),
      rgba(255,61,145,.05)
    );
}

.feature-icon {
  width: 34px;
  height: 34px;
  border-radius: 11px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255,255,255,.07);
  color: var(--pink-2);

  margin-bottom: 17px;
}

.feature-card strong {
  font-size: 14px;
}

.feature-card small {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.35;
  margin-top: 5px;
}

.games-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
}

.game-card {
  min-width: 0;
  padding: 15px 10px;
  text-align: left;

  border-radius: 19px;

  background: var(--card);
  border: 1px solid var(--border);
}

.game-symbol {
  width: 40px;
  height: 40px;
  border-radius: 13px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--pink-soft);
  color: var(--pink-2);

  margin-bottom: 15px;
}

.game-card strong {
  display: block;
  font-size: 12px;
}

.game-card small {
  display: block;
  color: var(--muted);
  font-size: 9px;
  margin-top: 4px;
}


/* =========================
   PAGE HEADINGS
========================= */

.page-heading {
  margin-bottom: 25px;
}

.page-heading h1 {
  font-size: 34px;
  letter-spacing: -1.5px;
}

.page-heading p {
  font-size: 13px;
  margin-top: 7px;
}


/* =========================
   GAMES
========================= */

.game-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.large-game-card {
  width: 100%;
  min-height: 78px;

  padding: 13px;

  display: grid;
  grid-template-columns: 50px 1fr auto;
  align-items: center;
  gap: 13px;

  text-align: left;

  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
}

.large-game-icon {
  width: 50px;
  height: 50px;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--pink-soft);
  color: var(--pink-2);
  font-size: 22px;
}

.large-game-card strong,
.large-game-card span {
  display: block;
}

.large-game-card strong {
  font-size: 14px;
}

.large-game-card span {
  margin-top: 4px;
  color: var(--muted);
  font-size: 11px;
}

.large-game-card > b {
  color: var(--muted);
  font-size: 22px;
}


/* =========================
   FLIP
========================= */

.flip-card {
  padding: 25px 18px;

  border-radius: 27px;

  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.07),
      rgba(255,255,255,.025)
    );

  border: 1px solid var(--border);
  text-align: center;
}

.big-coin {
  width: 130px;
  height: 130px;

  margin: 8px auto 20px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle at 35% 30%,
      #ff9bc6,
      #ff3d91 42%,
      #8f174f 100%
    );

  border: 5px solid rgba(255,255,255,.14);

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow:
    0 20px 55px rgba(255,61,145,.22);

  color: white;
  font-size: 55px;
}

.result-text {
  min-height: 24px;
  margin-bottom: 20px;
  color: var(--muted);
  font-size: 13px;
}

.choice-row,
.bet-row {
  display: flex;
  gap: 8px;
}

.choice-btn,
.bet-btn {
  flex: 1;
  height: 48px;

  border-radius: 14px;

  background: rgba(255,255,255,.055);
  border: 1px solid var(--border);

  color: var(--muted);
  font-weight: 700;
}

.choice-btn.active,
.bet-btn.active {
  color: white;
  background: var(--pink-soft);
  border-color: rgba(255,61,145,.4);
}

.bet-title {
  color: var(--muted);
  font-size: 11px;
  margin: 22px 0 8px;
}

.flip-card .primary-btn {
  margin-top: 18px;
}


/* =========================
   EMPTY / FEED
========================= */

.empty-card,
.feed-card {
  padding: 30px 20px;
  text-align: center;

  border-radius: 25px;

  background: var(--card);
  border: 1px solid var(--border);
}

.empty-icon,
.feed-placeholder {
  width: 70px;
  height: 70px;

  margin: 0 auto 18px;

  border-radius: 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--pink-soft);
  color: var(--pink-2);

  font-size: 28px;
}

.empty-card h3,
.feed-card h3 {
  font-size: 18px;
}

.empty-card p,
.feed-card p {
  max-width: 280px;
  margin: 9px auto 22px;

  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.feed-placeholder {
  width: 100%;
  height: 180px;
  border-radius: 19px;
}

.feed-placeholder span {
  font-size: 50px;
}


/* =========================
   STYLE
========================= */

.style-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.style-item {
  width: 100%;
  min-height: 75px;

  display: grid;
  grid-template-columns: 45px 1fr auto;
  align-items: center;
  gap: 13px;

  padding: 12px 15px;

  text-align: left;

  border-radius: 19px;

  background: var(--card);
  border: 1px solid var(--border);
}

.style-item > span {
  width: 45px;
  height: 45px;

  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--pink-soft);
  color: var(--pink-2);
}

.style-item strong,
.style-item small {
  display: block;
}

.style-item strong {
  font-size: 13px;
}

.style-item small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 10px;
}

.style-item > b {
  color: var(--muted);
  font-size: 21px;
}


/* =========================
   PROFILE
========================= */

.profile-header {
  text-align: center;
  margin-bottom: 28px;
}

.profile-avatar {
  width: 105px;
  height: 105px;

  margin: 0 auto 15px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      rgba(255,61,145,.3),
      rgba(255,255,255,.05)
    );

  border: 1px solid rgba(255,61,145,.3);

  color: var(--pink-2);
  font-size: 42px;

  overflow: hidden;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-header h1 {
  font-size: 27px;
}

.profile-header p {
  margin-top: 5px;
  color: var(--muted);
  font-size: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat-card {
  min-height: 105px;

  padding: 15px 8px;

  text-align: center;

  border-radius: 19px;

  background: var(--card);
  border: 1px solid var(--border);
}

.stat-card span,
.stat-card strong,
.stat-card small {
  display: block;
}

.stat-card span {
  color: var(--pink-2);
  margin-bottom: 10px;
}

.stat-card strong {
  font-size: 17px;
}

.stat-card small {
  color: var(--muted);
  font-size: 9px;
  margin-top: 3px;
}


/* =========================
   BOTTOM NAV
========================= */

.bottom-nav {
  position: fixed;
  z-index: 30;

  left: 12px;
  right: 12px;
  bottom: 12px;

  height: 67px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;

  padding: 5px;

  border-radius: 23px;

  background: rgba(18,16,23,.88);
  backdrop-filter: blur(25px);

  border: 1px solid rgba(255,255,255,.09);

  box-shadow:
    0 15px 50px rgba(0,0,0,.35);
}

.nav-item {
  height: 55px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 3px;

  background: transparent;
  color: #68656e;
}

.nav-item span {
  font-size: 19px;
}

.nav-item small {
  font-size: 8px;
}

.nav-item.active {
  color: var(--pink-2);
}

.nav-center {
  width: 53px;
  height: 53px;

  justify-self: center;

  border-radius: 18px;

  background:
    linear-gradient(
      145deg,
      #ff3d91,
      #c52269
    );

  color: white;
  font-size: 27px;

  box-shadow:
    0 10px 30px rgba(255,61,145,.28);
}


/* =========================
   MOBILE
========================= */

@media (max-width: 360px) {

  .view {
    padding-left: 14px;
    padding-right: 14px;
  }

  .hero-card {
    padding: 18px;
  }

  .hero-info h1 {
    font-size: 28px;
  }

  .hero-avatar {
    width: 78px;
    height: 78px;
  }

  .feature-card {
    min-height: 120px;
    padding: 14px;
  }

  .games-row {
    gap: 6px;
  }

  .game-card {
    padding: 12px 8px;
  }

}
