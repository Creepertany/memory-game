 let matchedPairs = 0;
let cardOne = null;
let cardTwo = null;
let disableDeck = false;
let player1score = 0;
let player2score = 0;
let currentPlayer = 1;
let winnerPlayer = null;
let winnerscore = null;
let level = "easy";
let totalpairs = 8;

function getplayersInput() {
  const player1Inut = document.getElementById("player1").value;
  const player2Input = document.getElementById("player2").value;
  const player1Name = player1Inut || "player 1";
  const player2Name = player2Input || "player 2";
  document.getElementById(
    "p1"
  ).innerHTML = `<img src="gon.jpeg" class="image_icon"> ${player1Name}: <div id="score1">0 </div>`;
  document.getElementById(
    "p2"
  ).innerHTML = `<img src="killua.jpeg"class="image_icon" > ${player2Name}: <div id="score2">0</div>`;
  document.querySelector(".input_names").style.display = "none";

  const levelSelect = document.getElementById("Levels");
  level = levelSelect.value;

  const cardsContainer = document.querySelector(".cards");

  cardsContainer.classList.remove("grid-normal", "grid-hard");

  if (level === "Easy") {
    totalpairs = 8;
    cardsContainer.classList.add("grid-normal");
  } else if (level === "Medium") {
    totalpairs = 16;
    cardsContainer.classList.add("grid-normal");
  } else if (level === "Hard") {
    totalpairs = 32;
    cardsContainer.classList.add("grid-hard");
  }
  generateCards(totalpairs);
  shuffleCards();
}

document.getElementById("startBtn").addEventListener("click", getplayersInput);

function Update_Info() {
  document.getElementById("score1").textContent = player1score;
  document.getElementById("score2").textContent = player2score;
  document.getElementById("currentPlayer").textContent = currentPlayer;
}
const audio1 = new Audio("victory-chime-366449.mp3");
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function flipCard() {
  if (disableDeck || this === cardOne) return;

  this.classList.add("flip");

  if (!cardOne) {
    cardOne = this;
    return;
  }

  cardTwo = this;
  disableDeck = true;

  checkMatch();
}

function generateCards(totalpairs = 8) {
  const cardHTML = [...Array(totalpairs)]
    .map(
      () =>
        `<li class="card">
      <div class="view back-view"></div>
        <div class="view front-view">?</div>
    </li>`
    )
    .join("");
  document.querySelector(".cards").innerHTML = cardHTML;
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => card.addEventListener("click", flipCard));
}
function checkMatch() {
  let emoji1 = cardOne.querySelector(".back-view").textContent;
  let emoji2 = cardTwo.querySelector(".back-view").textContent;

  if (emoji1 === emoji2) {
    matchedPairs++;
    if (matchedPairs === totalpairs) {
      setTimeout(async () => {
        await audio1.play();
        alert("🎉 You Win! 🎉");
      }, 500);
    }
    if (currentPlayer === 1) {
      player1score++;
    } else {
      player2score++;
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    resetCards();
  } else {
    setTimeout(() => {
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
      resetCards();
    }, 1000);
    if (currentPlayer === 1) {
      currentPlayer = 2;
    } else {
      currentPlayer === 2;
      currentPlayer = 1;
    }
  }
  Update_Info();
  declareWinner();
  if (matchedPairs === totalpairs / 2) {
    showWinCard();
    shuffleCards();
    resetGame();
  }
}

function resetCards() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
}
function shuffleCards() {
  const emojisEasy = ["🍎", "🍉", "🍓", "🍒"];
  const emojisMedium = ["🍎", "🌽", "🍏", "🍉", "🍓", "🍍", "🥝", "🍒"];
  const emojisHard = [
    "🍎",
    "🌽",
    "🍏",
    "🍉",
    "🍓",
    "🍍",
    "🥝",
    "🍒",
    "🍇",
    "🍊",
    "🍈",
    "🍌",
    "🍋",
    "🍑",
    "🥥",
    "🍄",
  ];
  let emojis = [];
  if (totalpairs === 8) emojis = emojisEasy;
  else if (totalpairs === 16) emojis = emojisMedium;
  else if (totalpairs === 32) {
    emojis = emojisHard;
  }

  const duplicated = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

  document.querySelectorAll(".card .back-view").forEach((back, i) => {
    back.textContent = duplicated[i];
  });

  Update_Info();
}

function resetGame() {
  matchedPairs = 0;
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
}

function declareWinner() {
  if (player1score > player2score) {
    winnerPlayer = 1;
    winnerscore = player1score;
  } else if (player2score > player1score) {
    winnerPlayer = 2;
    winnerscore = player2score;
  } else {
    winnerPlayer = 0;
  }
}

function showWinCard() {
  const winnerDiv = document.querySelector(".Winner");
  const winnerPlayerSpan = document.querySelector(".Winner_player");
  const scoreWinnerSpan = document.querySelector(".score_winner");

  winnerPlayerSpan.textContent = winnerPlayer;
  scoreWinnerSpan.textContent = winnerscore;

  // winnerDiv.style.display = "flex";
  winnerDiv.classList.add("show");
}
function resetTheGame() {

  
}
document.getElementById("resetBtn").addEventListener("click", resetTheGame)
