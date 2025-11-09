let matchedPairs = 0;
let cardOne = null;
let cardTwo = null;
let disableDeck = false;
let player1score = 0;
let player2score = 0;
let currentPlayer = 1;
let winnerPlayer = null;
let winnerscore = null;


function getPlayerNames(){
  const player1Inut = document.getElementById("player1").value;
  const player2Input = document.getElementById("player2").value;
  document.getElementById("player1").textContent= player1name;
  document.getElementById("player2").textContent= player2name;
}

document.getElementById("startBtn").addEventListener("click", getPlayerNames)


function Update_Info(){
  document.getElementById("score1").textContent= player1score;
  document.getElementById("score2").textContent= player2score;
  document.getElementById("currentPlayer").textContent= currentPlayer;
}
const audio1 = new Audio("victory-chime-366449.mp3")
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
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
function checkMatch() {
  let emoji1 = cardOne.querySelector(".back-view").textContent;
  let emoji2 = cardTwo.querySelector(".back-view").textContent;

  if (emoji1 === emoji2) {
    matchedPairs++;
    if (matchedPairs === 8) {
      setTimeout(async () => {
        await audio1.play();
        alert("🎉 You Win! 🎉");
        shuffleCards();
        resetGame();
      }, 500);
    }
    if (currentPlayer === 1) {
      player1score++;
    } else{
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
    }
  else {
      (currentPlayer === 2) 
        currentPlayer = 1;
      }
  }
  Update_Info();
  declareWinner();
  if (matchedPairs === 8){
    showWinCard();
  }
}

function resetCards() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
}
function shuffleCards() {
  const emojis = ["🍎", "🌽", "🍏", "🍉", "🍓", "🍍", "🥝", "🍒"];
  const duplicateEmojis = [...emojis, ...emojis];
  duplicateEmojis.sort(() => Math.random() - 0.5);

  document.querySelectorAll(".card .back-view").forEach((back, i) => {
    back.textContent = duplicateEmojis[i];
  });
  Update_Info();
}  
function resetGame() {
  matchedPairs = 0;
  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
}

function declareWinner(){
  if (player1score > player2score){
    winnerPlayer = 1;
    winnerscore = player1score;
  } else if (player2score > player1score){
    winnerPlayer = 2;
    winnerscore = player2score;
  } else {
    winnerPlayer =0;
  }
}

function showWinCard(){
  const winnerDiv = document.querySelector(".Winner");
  const winnerPlayerSpan = document.querySelector(".Winner_player");
  const scoreWinnerSpan = document.querySelector(".score_winner")

  winnerPlayerSpan.textContent = winnerPlayer;
  scoreWinnerSpan.textContent = winnerscore;

  // winnerDiv.style.display = "flex";
  winnerDiv.classList.add("show");
}

window.addEventListener("DOMContentLoaded", shuffleCards);
