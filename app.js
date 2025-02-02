let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Function to start the game
function startGame() {
  if (!started) {
    console.log("Game is started");
    started = true;
    levelUp();
  }
}

// Start game on keypress (for desktops)
document.addEventListener("keypress", startGame);

// Start game on touch/click (for mobile)
document.addEventListener("click", startGame, { once: true });

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // Random button selection
  let ranIdx = Math.floor(Math.random() * 4); // Fix index range
  let randColor = btns[ranIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Tap anywhere to restart.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Attach click event listeners to buttons
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", btnPress);
});

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

  // Restart game on next touch
  document.addEventListener("click", startGame, { once: true });
}
