* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #08070b;
  --panel: #111016;
  --panel2: #17121c;
  --pink: #ff3f9f;
  --pink2: #ff82c5;
  --purple: #9b6cff;
  --text: #fff;
  --muted: #9f96a5;
  --line: #ffffff12;
}

html,
body {
  min-height: 100%;
  background: var(--bg);
}

body {
  color: var(--text);
  font-family: Inter, system-ui, sans-serif;
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

#app {
  width: 100%;
  max-width: 560px;
  min-height: 100vh;
  margin: auto;
}

.screen {
  display: none;
  min-height: 100vh;
  position: relative;
}

.screen.active {
  display: flex;
  animation: enter .35s ease;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.screen:before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      circle at 15% 5%,
      #ff3f9f12,
      transparent 30%
    ),
    radial-gradient(
      circle at 90% 20%,
      #9b6cff10,
      transparent 28%
    );
}

#onboarding {
  flex-direction: column;
  justify-content: center;
  padding: 24px 20px;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(55px);
  pointer-events: none;
}

.orb-a {
  width: 220px;
  height: 220px;
  background: #ff3f9f20;
  top: -80px;
  left: -90px;
}

.orb-b {
  width: 190px;
  height: 190px;
  background: #9b6cff18;
  right: -70px;
  bottom: 8%;
}

.brand {
  text-align: center;
  margin-bottom: 34px;
  position: relative;
  z-index: 1;
}

.crown-mark {
  font-size: 54px;
  line-height: 1;
  color: #ff8ac8;
  text-shadow: 0 0 34px #ff3f9f55;
}

.wordmark {
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 9px;
  margin-left: 9px;
}

.wordmark span,
.brand-mini span {
  color: var(--pink);
}

.brand p {
  color: var(--muted);
  font-size: 12px;
  margin-top: 8px;
}

.glass-card {
  background:
    linear-gradient(
      145deg,
      #ffffff0b,
      #ffffff04
    );
  border: 1px solid var(--line);
  box-shadow:
    0 18px 50px #0008,
    inset 0 1px #fff08;
  border-radius: 24px;
}

.setup-card {
  padding: 22px;
}

.eyebrow {
  display: block;
  color: #c7b8c9;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

.setup-card h1 {
  font-size: 27px;
  margin-top: 9px;
}

.muted {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}

.setup-card > .muted {
  margin-top: 8px;
}

.field-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  margin: 20px 0 8px;
}

#nickname {
  width: 100%;
  padding: 15px 16px;
  border: 1px solid var(--line);
  border-radius: 15px;
  background: #ffffff08;
  color: #fff;
  outline: 0;
}

#nickname:focus {
  border-color: #ff3f9f66;
  box-shadow: 0 0 0 4px #ff3f9f0d;
}

.avatar-picker {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: #ffffff06;
}

.avatar-picker > div:nth-child(2) {
  flex: 1;
}

.avatar-picker strong,
.avatar-picker span {
  display: block;
}

.avatar-picker span {
  font-size: 10px;
  color: var(--muted);
  margin-top: 4px;
}

.avatar-picker > b {
  font-size: 25px;
  color: #8c8290;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background:
    linear-gradient(
      135deg,
      #ff3f9f,
      #9369ff
    );
  flex-shrink: 0;
}

.avatar img,
.top-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 58px;
  height: 58px;
  font-size: 25px;
}

.error {
  height: 18px;
  margin-top: 6px;
  color: #ff709f;
  font-size: 10px;
}

.primary-btn {
  width: 100%;
  padding: 15px 18px;
  margin-top: 4px;
  border-radius: 15px;
  background:
    linear-gradient(
      110deg,
      var(--pink),
      #9b6cff
    );
  font-weight: 800;
  box-shadow: 0 10px 28px #ff3f9f25;
}

.primary-btn span {
  float: right;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 10px;
  background: #08070be8;
  backdrop-filter: blur(20px);
}

.brand-mini {
  background: transparent;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 3px;
}

.top-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background:
    linear-gradient(
      135deg,
      #ff3f9f,
      #9369ff
    );
  font-size: 17px;
}

.content {
  padding: 24px 20px 110px;
}

.view {
  display: none;
}

.view.active {
  display: block;
  animation: enter .28s ease;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
}

.hero h2,
.view > h2 {
  font-size: 30px;
  line-height: 1.1;
  margin-top: 8px;
}

.hero-avatar {
  width: 62px;
  height: 62px;
}

.status-card {
  padding: 18px;
  margin-top: 8px;
}

.status-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.crown-orb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background:
    linear-gradient(
      145deg,
      #ff3f9f30,
      #9b6cff25
    );
  color: #ff9bce;
  font-size: 25px;
  box-shadow: inset 0 1px #fff1;
}

.status-head strong {
  display: block;
  font-size: 31px;
  margin-top: 2px;
}

.level-badge {
  margin-left: auto;
  padding: 7px 9px;
  border-radius: 10px;
  background: #fff08;
  color: #d8cbd9;
  font-size: 9px;
  font-weight: 800;
}

.xp-row {
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
  color: #756d79;
  font-size: 9px;
}

.progress {
  height: 5px;
  border-radius: 99px;
  background: #ffffff0b;
  margin-top: 7px;
  overflow: hidden;
}

.progress i {
  display: block;
  width: 5%;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      var(--pink),
      #a76cff
    );
  border-radius: 99px;
}

.status-card > .muted {
  margin-top: 12px;
  font-size: 10px;
}

.currency-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}

.currency {
  padding: 15px;
}

.currency span {
  font-size: 19px;
}

.currency small {
  display: block;
  color: #827887;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-top: 8px;
}

.currency b {
  display: block;
  font-size: 20px;
  margin-top: 4px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 28px;
}

.section-title h3 {
  font-size: 22px;
  margin-top: 6px;
}

.live-dot {
  font-size: 9px;
  color: #ff72b4;
  font-weight: 800;
}

.feed-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  margin-top: 12px;
}

.feed-art {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 17px;
  background:
    linear-gradient(
      145deg,
      #ff3f9f,
      #7e5de8
    );
  font-size: 25px;
  font-weight: 900;
}

.feed-card strong {
  font-size: 13px;
}

.feed-card p {
  margin-top: 5px;
}

.view > p {
  margin-top: 8px;
}

.game-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 22px;
  margin-top: 18px;
}

.coin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin: 4px 0 18px;
  background:
    radial-gradient(
      circle at 30% 25%,
      #ff9bd0,
      #ff3f9f 55%,
      #8f4ce8
    );
  border: 7px solid #ffffff12;
  box-shadow:
    0 18px 40px #ff3f9f25,
    inset 0 2px #fff5;
  font-size: 30px;
  font-weight: 900;
  transition: transform .55s;
}

.game-card > strong {
  font-size: 17px;
}

.game-card > span {
  margin-top: 5px;
  font-size: 10px;
}

.bet-row,
.stake-row {
  display: flex;
  gap: 8px;
  width: 100%;
  margin-top: 18px;
}

.choice,
.stake-row button {
  flex: 1;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #ffffff06;
  font-size: 10px;
  font-weight: 800;
}

.choice.selected,
.stake-row button.selected {
  border-color: #ff3f9f77;
  background: #ff3f9f15;
  color: #ff9bce;
}

.game-card .primary-btn {
  margin-top: 12px;
}

.game-result {
  height: 18px;
  margin-top: 10px;
  color: #ff8ac8;
  font-size: 11px;
}

.feature {
  padding: 25px;
  margin-top: 14px;
}

.feature-icon {
  font-size: 35px;
  color: #ff7fbd;
}

.feature h3 {
  margin-top: 14px;
}

.feature .muted {
  margin-top: 7px;
}

.secondary-btn {
  padding: 11px 15px;
  margin-top: 16px;
  border-radius: 12px;
  background: #fff0f7;
  color: #ff8ac8;
  font-size: 10px;
  font-weight: 800;
}

.mode-card {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 13px;
  padding: 16px;
  margin-top: 10px;
  text-align: left;
}

.mode-card > div {
  flex: 1;
}

.mode-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 43px;
  height: 43px;
  border-radius: 14px;
  background: #ff3f9f12;
  color: #ff8bc6;
  font-size: 21px;
}

.mode-card b,
.mode-card small {
  display: block;
}

.mode-card small {
  color: var(--muted);
  font-size: 10px;
  margin-top: 4px;
}

.mode-card > span:last-child {
  font-size: 23px;
  color: #756d79;
}

.notice {
  min-height: 22px;
  margin-top: 12px;
  color: #ff86bd;
  font-size: 10px;
  text-align: center;
}

.style-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 18px;
}

.style-item {
  padding: 17px;
  text-align: left;
}

.style-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 14px;
  background: #ffffff08;
  font-size: 23px;
  color: #aaa0ad;
}

.style-icon.pink {
  color: #ff8ac7;
  background: #ff3f9f12;
}

.style-item b,
.style-item small {
  display: block;
}

.style-item b {
  margin-top: 13px;
  font-size: 12px;
}

.style-item small {
  margin-top: 5px;
  color: #8e8491;
  font-size: 8px;
  font-weight: 800;
}

.style-item.selected {
  border-color: #ff3f9f55;
}

.profile-card {
  text-align: center;
  padding: 28px 20px;
  margin-top: 18px;
}

.profile-avatar {
  width: 105px;
  height: 105px;
  margin: auto;
  font-size: 32px;
}

.profile-card h3 {
  font-size: 22px;
  margin-top: 15px;
}

.profile-tag {
  display: inline-block;
  margin-top: 6px;
  color: #ff83bd;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 25px;
}

.stats div {
  padding: 14px 5px;
  border-radius: 15px;
  background: #ffffff06;
}

.stats b {
  font-size: 19px;
}

.stats small {
  display: block;
  margin-top: 5px;
  color: #827887;
  font-size: 8px;
}

.bottom-nav {
  position: fixed;
  z-index: 30;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: end;
  gap: 5px;
  max-width: 560px;
  margin: auto;
  padding:
    9px
    10px
    calc(9px + env(safe-area-inset-bottom));
  border-top: 1px solid #ffffff0d;
  background: #09070bf2;
  backdrop-filter: blur(22px);
}

.bottom-nav button {
  flex: 1;
  min-height: 48px;
  border-radius: 14px;
  background: transparent;
  color: #716976;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.bottom-nav button span {
  font-size: 20px;
  line-height: 20px;
}

.bottom-nav small {
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .6px;
}

.bottom-nav button.active {
  color: #ff8ac7;
}

.bottom-nav .games-btn {
  min-height: 64px;
  margin-top: -23px;
  border: 1px solid #ff3f9f45;
  background:
    linear-gradient(
      145deg,
      #251421,
      #17101e
    );
  color: #fff;
  box-shadow: 0 0 28px #ff3f9f20;
}

.bottom-nav .games-btn span {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      #ff3f9f,
      #8f62ec
    );
  font-size: 13px;
  font-weight: 900;
}

.bottom-nav .games-btn small {
  color: #ff91c8;
}

@media (max-width: 360px) {
  .content {
    padding-left: 15px;
    padding-right: 15px;
  }

  .wordmark {
    font-size: 36px;
  }

  .setup-card {
    padding: 18px;
  }
}
