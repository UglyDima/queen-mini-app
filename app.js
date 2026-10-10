
document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready(); tg.expand();
    try { tg.setHeaderColor("#08080c"); tg.setBackgroundColor("#08080c"); } catch {}
  }

  const data = {
    coins: Number(localStorage.getItem("queen_coins") ?? 1500),
    gems: Number(localStorage.getItem("queen_gems") ?? 30),
    xp: Number(localStorage.getItem("queen_xp") ?? 120),
    rating: 1000, wins: 0, streak: 0
  };
  const save = () => {
    for (const key of ["coins","gems","xp"]) localStorage.setItem("queen_" + key, data[key]);
    updateWallet();
  };
  const fmt = n => Math.floor(n).toLocaleString("ru-RU");
  function updateWallet() {
    $("#coins").textContent = $("#fortuneCoins").textContent = fmt(data.coins);
    $("#gems").textContent = $("#fortuneGems").textContent = fmt(data.gems);
    $("#xp").textContent = fmt(data.xp);
    $("#rating").textContent = data.rating;
    $("#wins").textContent = data.wins;
    $("#streak").textContent = data.streak;
    $("#leaderRating").textContent = data.rating + " rating";
  }
  function reward(coins=0,gems=0,xp=0) {
    data.coins = Math.max(0,data.coins+coins);
    data.gems = Math.max(0,data.gems+gems);
    data.xp = Math.max(0,data.xp+xp);
    save();
  }

  // Login -> Profile
  $("#loginBtn").addEventListener("click", () => {
    const name = localStorage.getItem("queen_username");
    if (!name) { $("#loginError").textContent = "Профиль ещё не создан."; return; }
    $("#profileName").textContent = name;
    $("#leaderName").textContent = name;
    const avatar = localStorage.getItem("queen_avatar");
    if (avatar) {
      const img = new Image();
      img.src = avatar; img.alt = "Аватар"; $("#profileAvatar").replaceChildren(img);
      img.onerror = () => { $("#profileAvatar").textContent = "♙"; };
    }
    $("#auth").classList.remove("active");
    $("#shell").classList.add("active");
    showView("profile");
  });
  function showView(id) {
    $$(".view").forEach(v => v.classList.toggle("active",v.id===id));
    $$(".bottom-nav button").forEach(b => b.classList.toggle("active",b.dataset.view===id));
    window.scrollTo({top:0,behavior:"instant"});
  }
  $$(".bottom-nav button").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));

  // Fortune: transparent virtual rewards, fixed displayed price
  const prizes = [
    {label:"+100 XP",xp:100},
    {label:"+150 Coins",coins:150},
    {label:"+3 Gems",gems:3},
    {label:"Косметика: Pink Glow",xp:40},
    {label:"+250 XP",xp:250},
    {label:"+300 Coins",coins:300},
    {label:"Пустой сектор",xp:0},
    {label:"+1 Gem",gems:1}
  ];
  let wheelAngle=0, spinning=false;
  $("#fortuneSpin").addEventListener("click",()=>{
    if(spinning)return;
    if(data.coins<100||data.gems<1){$("#fortuneResult").textContent="Нужно 100 Coins и 1 Gem.";return;}
    data.coins-=100; data.gems-=1; save();
    spinning=true; $("#fortuneSpin").disabled=true;
    const index=Math.floor(Math.random()*prizes.length);
    wheelAngle+=360*6+(360-index*45-22.5);
    $("#wheel").style.transform=`rotate(${wheelAngle}deg)`;
    $("#fortuneResult").textContent="Колесо вращается…";
    setTimeout(()=>{
      const p=prizes[index];
      reward(p.coins||0,p.gems||0,p.xp||0);
      $("#fortuneResult").textContent=p.label;
      spinning=false; $("#fortuneSpin").disabled=false;
    },4100);
  });

  // Up-X: graph and multiplier share the same state.
  let upx=null, running=false, multiplier=1, crashAt=2;
  const line=$("#chartLine"), fill=$("#chartFill");
  function drawGraph(value,crashed=false) {
    const points=[];
    const max=Math.max(2,crashAt);
    for(let i=0;i<=30;i++){
      const t=i/30;
      const x=t*360;
      const growth=1+Math.max(0,value-1)*t;
      const y=145-Math.min(130,(growth-1)/(max-1)*130);
      points.push(`${x},${Math.max(12,Math.min(145,y))}`);
    }
    if(crashed) points[points.length-1]="360,145";
    const d=points.join(" ");
    line.setAttribute("points",d);
    fill.setAttribute("d",`M0 150 L${d.replaceAll(" "," L")} L360 150Z`);
  }
  function stopUpX(){
    clearInterval(upx); upx=null; running=false;
    $("#upxStart").disabled=false; $("#upxStop").disabled=true;
  }
  $("#upxStart").addEventListener("click",()=>{
    if(running)return;
    const coins=Math.floor(Number($("#upxCoinBet").value)||0);
    const gems=Math.floor(Number($("#upxGemBet").value)||0);
    if(coins<0||gems<0||coins>5000||gems>30||coins+gems===0){$("#upxResult").textContent="Укажи корректную ставку.";return;}
    if(coins>data.coins||gems>data.gems){$("#upxResult").textContent="Недостаточно валюты.";return;}
    data.coins-=coins; data.gems-=gems; save();
    multiplier=1; crashAt=1.25+Math.random()*3.75;
    running=true; $("#upxStart").disabled=true; $("#upxStop").disabled=false;
    $("#upxResult").textContent="График растёт — останови его вовремя.";
    upx=setInterval(()=>{
      multiplier+=0.018+multiplier*0.009;
      $("#multiplier").textContent=multiplier.toFixed(2)+"×";
      drawGraph(multiplier);
      if(multiplier>=crashAt){
        stopUpX(); drawGraph(crashAt,true);
        $("#upxResult").textContent=`Падение на ${crashAt.toFixed(2)}×. Ставка потеряна.`;
        $("#multiplier").textContent="×";
      }
    },90);
  });
  $("#upxStop").addEventListener("click",()=>{
    if(!running)return;
    const coins=Math.floor(Number($("#upxCoinBet").value)||0);
    const gems=Math.floor(Number($("#upxGemBet").value)||0);
    stopUpX();
    const gainCoins=Math.floor(coins*multiplier);
    const gainGems=Math.floor(gems*multiplier);
    reward(gainCoins,gainGems,Math.floor(multiplier*10));
    $("#upxResult").textContent=`Забрал на ${multiplier.toFixed(2)}×: +${gainCoins} Coins, +${gainGems} Gems.`;
  });

  // Style categories
  const cosmetics = {
    effects:[["✨","Pink Aura","RARE"],["🌸","Rose Mist","EPIC"],["💫","Star Trail","RARE"],["🌌","Nebula","LEGENDARY"]],
    frames:[["◇","Gloss Frame","EPIC"],["💎","Diamond Edge","LEGENDARY"],["🌷","Rose Frame","RARE"]],
    titles:[["♛","Queen","TITLE"],["✦","Icon","TITLE"],["⚡","Trendsetter","TITLE"]],
    medals:[["🏅","First Vote","BADGE"],["🥇","Battle Winner","BADGE"],["💖","Community Love","BADGE"]],
    other:[["🦋","Butterfly","COSMETIC"],["🎀","Ribbon","COSMETIC"]]
  };
  function renderCosmetics(category) {
    $("#cosmeticGrid").innerHTML="";
    cosmetics[category].forEach(([icon,name,rarity])=>{
      const card=document.createElement("div"); card.className="cosmetic-card";
      card.innerHTML=`<div class="cosmetic-icon">${icon}</div><b>${name}</b><small>${rarity}</small><button type="button">Выбрать</button>`;
      card.querySelector("button").addEventListener("click",()=>{
        $("#cosmeticGrid").querySelectorAll("button").forEach(b=>b.textContent="Выбрать");
        card.querySelector("button").textContent="Выбрано ✓";
      });
      $("#cosmeticGrid").appendChild(card);
    });
  }
  $$(".category[data-category]").forEach(b=>b.addEventListener("click",()=>{
    $$(".category[data-category]").forEach(x=>x.classList.remove("active"));
    b.classList.add("active"); renderCosmetics(b.dataset.category);
  }));
  renderCosmetics("effects");

  // Style Battle voting feed. These sample opponents are placeholders.
  let battleNo=24, leftLikes=124, rightLikes=119;
  const pairs=[["Luna","Mila"],["Aria","Nika"],["Sofia","Lina"],["Vera","Maya"],["Ayla","Kira"]];
  function nextBattle(){
    battleNo++;
    const pair=pairs[Math.floor(Math.random()*pairs.length)];
    $("#battleNumber").textContent="#"+String(battleNo).padStart(3,"0");
    $("#leftName").textContent=pair[0]; $("#rightName").textContent=pair[1];
    leftLikes=70+Math.floor(Math.random()*100); rightLikes=70+Math.floor(Math.random()*100);
    $("#leftLikes").textContent=leftLikes+" likes"; $("#rightLikes").textContent=rightLikes+" likes";
    $("#battleVotes").textContent=`${leftLikes} — ${rightLikes}`;
    $("#battleTheme").textContent=["NIGHT GLAM","PINK FUTURE","OLD MONEY","CITY LIGHTS"][Math.floor(Math.random()*4)];
    $$(".fighter").forEach(b=>b.classList.remove("selected"));
  }
  function vote(side){
    const button=side==="left"?$("#fighterLeft"):$("#fighterRight");
    if(button.dataset.voted==="1")return;
    button.dataset.voted="1"; button.classList.add("selected");
    $("#voteMessage").textContent="Голос принят — загружаем следующее сражение…";
    setTimeout(()=>{$$(".fighter").forEach(b=>delete b.dataset.voted);nextBattle();$("#voteMessage").textContent="Выбери образ, который тебе нравится.";},500);
  }
  $("#fighterLeft").addEventListener("click",()=>vote("left"));
  $("#fighterRight").addEventListener("click",()=>vote("right"));

  // Timed Battle: demo only. It is not yet a real opponent match.
  let battleInterval=null, battleEnd=0;
  $("#battlePlay").addEventListener("click",()=>{
    if(battleInterval)return;
    const duration=(Math.random()<.5?15:30)*60;
    battleEnd=Date.now()+duration*1000;
    $("#activeBattle").classList.remove("hidden");
    $("#battlePlay").textContent="BATTLE ACTIVE";
    $("#myLikes").textContent=0; $("#theirLikes").textContent=0;
    battleInterval=setInterval(()=>{
      const remaining=Math.max(0,Math.ceil((battleEnd-Date.now())/1000));
      $("#battleTimer").textContent=String(Math.floor(remaining/60)).padStart(2,"0")+":"+String(remaining%60).padStart(2,"0");
      $("#battleProgress").style.transform=`scaleX(${remaining/duration})`;
      if(remaining===0){
        clearInterval(battleInterval);battleInterval=null;
        const win=Math.random()<.5;
        if(win){data.wins++;data.streak++;data.rating+=25;reward(100,0,150);}
        else{data.streak=0;data.rating=Math.max(0,data.rating-15);reward(10,0,30);}
        updateWallet();
        $("#activeBattle").classList.add("hidden");
        $("#battlePlay").textContent="▶ PLAY";
        $("#voteMessage").textContent=win?"Победа! +25 рейтинга":"Battle завершён. Попробуй ещё раз.";
      }
    },1000);
  });
  $("#leaveBattle").addEventListener("click",()=>showView("profile"));

  // Tic-Tac-Toe: serialized turns, no double taps. Online mode is a placeholder.
  let board=Array(9).fill(""), turn="X", locked=false, over=false, opponent="bot";
  const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function result(b){for(const c of wins)if(b[c[0]]&&b[c[0]]===b[c[1]]&&b[c[1]]===b[c[2]])return b[c[0]];return b.every(Boolean)?"draw":null;}
  function renderBoard(){
    $("#ticBoard").innerHTML="";
    board.forEach((v,i)=>{
      const btn=document.createElement("button");btn.textContent=v;btn.className=v.toLowerCase();
      btn.disabled=!!v||locked||over;
      btn.addEventListener("click",()=>move(i));
      $("#ticBoard").appendChild(btn);
    });
  }
  function endTic(r){
    over=true;locked=false;
    if(r==="X"){ $("#ticStatus").textContent="Победа! +50 Coins";reward(50,0,25); }
    else if(r==="O"){ $("#ticStatus").textContent="Поражение: −10 Coins";reward(-10,0,10); }
    else $("#ticStatus").textContent="Ничья. +10 Coins";
    if(r==="draw")reward(10,0,10);
    renderBoard();
  }
  function move(i){
    if(over||locked||board[i])return;
    board[i]=turn;
    const r=result(board);
    if(r){renderBoard();endTic(r);return;}
    turn=turn==="X"?"O":"X";
    renderBoard();
    if(opponent==="bot"&&turn==="O"){
      locked=true;renderBoard();$("#ticStatus").textContent="Бот думает…";
      setTimeout(()=>{
        const move=bestMove();
        if(move!==null)board[move]="O";
        const r2=result(board);
        if(r2){renderBoard();endTic(r2);return;}
        turn="X";locked=false;$("#ticStatus").textContent="Твой ход: X";renderBoard();
      },500);
    }else $("#ticStatus").textContent=`Ход игрока ${turn}`;
  }
  function bestMove(){
    let best=-Infinity,choice=null;
    for(let i=0;i<9;i++)if(!board[i]){
      board[i]="O";const score=minimax(false);board[i]="";
      if(score>best){best=score;choice=i;}
    }
    return choice;
  }
  function minimax(max){
    const r=result(board);if(r==="O")return 10;if(r==="X")return -10;if(r==="draw")return 0;
    let best=max?-Infinity:Infinity;
    for(let i=0;i<9;i++)if(!board[i]){
      board[i]=max?"O":"X";
      const score=minimax(!max);board[i]="";
      best=max?Math.max(best,score):Math.min(best,score);
    }
    return best;
  }
  function resetTic(){board=Array(9).fill("");turn="X";locked=false;over=false;$("#ticStatus").textContent=opponent==="online"?"Онлайн-матчи появятся после подключения сервера.":"Твой ход: X";renderBoard();}
  $("#ticReset").addEventListener("click",resetTic);
  $$(".category[data-opponent]").forEach(b=>b.addEventListener("click",()=>{
    $$(".category[data-opponent]").forEach(x=>x.classList.remove("active"));b.classList.add("active");
    opponent=b.dataset.opponent;
    $("#opponentInfo").textContent=opponent==="online"?"Онлайн-матчи появятся после подключения сервера.":opponent==="local"?"Два игрока на одном устройстве.":"Сложный бот. Ходы обрабатываются по очереди.";
    resetTic();
  }));

  // Games panel open/close
  $$("[data-game]").forEach(b=>b.addEventListener("click",()=>{
    $("#ticGame").classList.toggle("hidden",b.dataset.game!=="tic");
    $("#fruitGame").classList.toggle("hidden",b.dataset.game!=="fruit");
  }));
  $("#ticClose").addEventListener("click",()=>$("#ticGame").classList.add("hidden"));
  $("#fruitClose").addEventListener("click",()=>$("#fruitGame").classList.add("hidden"));

  // Fruit Drop: smaller board, connected groups, falling refill animation.
  const fruits=["🍓","🍒","🍊","🍋","🍇","🍉","🥝"];
  let fruitGrid=[],fruitRunning=false,fruitScore=0,fruitTime=30,fruitTimer=null,path=[],pointer=false;
  function newFruit(){return fruits[Math.floor(Math.random()*fruits.length)];}
  function renderFruit(){
    $("#fruitBoard").innerHTML="";
    fruitGrid.forEach((f,i)=>{
      const c=document.createElement("div");c.className="fruit-cell";c.textContent=f;c.dataset.i=i;
      $("#fruitBoard").appendChild(c);
    });
  }
  function makeFruitGrid(){fruitGrid=Array.from({length:36},newFruit);renderFruit();}
  function collect(cell){
    if(!fruitRunning||!cell)return;
    const i=Number(cell.dataset.i);
    if(path.includes(i))return;
    if(path.length){
      const prev=path[path.length-1],r=Math.floor(i/6),c=i%6,pr=Math.floor(prev/6),pc=prev%6;
      if(Math.abs(r-pr)>1||Math.abs(c-pc)>1||fruitGrid[i]!==fruitGrid[prev])return;
    }
    path.push(i);cell.classList.add("picked");
  }
  function finishPath(){
    if(path.length>=3){
      fruitScore+=path.length*path.length*5;$("#fruitScore").textContent=fruitScore;
      const removed=new Set(path);
      const next=[];
      for(let col=0;col<6;col++){
        const keep=[];
        for(let row=5;row>=0;row--){const i=row*6+col;if(!removed.has(i))keep.push(fruitGrid[i]);}
        while(keep.length<6)keep.push(newFruit());
        for(let row=5;row>=0;row--)next[row*6+col]=keep[5-row];
      }
      fruitGrid=next;renderFruit();
      $$(".fruit-cell").forEach(c=>c.classList.add("fall"));
    }else $$(".fruit-cell").forEach(c=>c.classList.remove("picked"));
    path=[];
  }
  $("#fruitBoard").addEventListener("pointerdown",e=>{if(!fruitRunning)return;pointer=true;path=[];collect(e.target.closest(".fruit-cell"));});
  $("#fruitBoard").addEventListener("pointermove",e=>{if(pointer)collect(document.elementFromPoint(e.clientX,e.clientY)?.closest(".fruit-cell"));});
  window.addEventListener("pointerup",()=>{if(pointer){pointer=false;finishPath();}});
  $("#fruitStart").addEventListener("click",()=>{
    if(fruitRunning)return;
    fruitRunning=true;fruitScore=0;fruitTime=30;path=[];
    $("#fruitScore").textContent="0";$("#fruitTime").textContent="30";$("#fruitResult").textContent="";
    makeFruitGrid();$("#fruitStart").disabled=true;
    fruitTimer=setInterval(()=>{
      fruitTime--;$("#fruitTime").textContent=fruitTime;
      if(fruitTime<=0){
        clearInterval(fruitTimer);fruitRunning=false;$("#fruitStart").disabled=false;
        const earned=Math.floor(fruitScore/10);
        reward(earned,0,Math.floor(fruitScore/5));
        $("#fruitResult").textContent=`Готово! +${earned} Coins`;
      }
    },1000);
  });

  updateWallet();resetTic();nextBattle();
});
