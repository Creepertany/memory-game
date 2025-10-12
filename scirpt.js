let matchedPairs = 0;
let cardOne = null;
let cardTwo = null;
let disableDeck = false;
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
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    resetCards();
  } else {
    setTimeout(() => {
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
      resetCards();
    }, 1000);
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
}
function resetGame() {
  matchedPairs = 0;
  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
}

window.addEventListener("DOMContentLoaded", shuffleCards);