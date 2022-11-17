let memoryCards = Array.from(document.querySelectorAll(".memory-card"));
let memoryCardsContainer = document.querySelector(".memory-cards");
let duration = 1000;
let numberOfWrongTries = document.querySelector(".tries span");
let successSound = document.querySelector("audio");
successSound.volume = 0.1;

orderRange = [];

for (let i = 0; i < 20; i++) {
  orderRange.push(i);
}

document.querySelector(".control-buttons span").onclick = function() {
  document.querySelector(".control-buttons").style.display = "none";
  let userName = window.prompt("Enter your name : ");
  document.querySelector(".name span").innerHTML = userName || "unknown";
  memoryCards.forEach(function(card) {
    card.style.order =
      orderRange[Math.floor(Math.random() * orderRange.length)];
    setTimeout(function() {
      card.classList.add("is-flipped");
    }, duration * 0.5);
    setTimeout(function() {
      card.classList.remove("is-flipped");
    }, duration * 3);
  });
};

memoryCards.forEach(function(card) {
  card.addEventListener("click", function() {
    card.classList.add("is-flipped");
    let allFlippedCards = memoryCards.filter((e) =>
      e.classList.contains("is-flipped")
    );
    if (allFlippedCards.length === 2) {
      memoryCardsContainer.style.pointerEvents = "none";
      setTimeout(function() {
        memoryCardsContainer.style.pointerEvents = "auto";
      }, duration);
      if (
        allFlippedCards[0].dataset.technology ==
        allFlippedCards[1].dataset.technology
      ) {
        allFlippedCards[0].classList.remove("is-flipped");
        allFlippedCards[1].classList.remove("is-flipped");
        allFlippedCards[0].classList.add("has-match");
        allFlippedCards[1].classList.add("has-match");
        successSound.play();
      } else {
        numberOfWrongTries.innerHTML =
          parseInt(numberOfWrongTries.innerHTML) + 1;
        setTimeout(function() {
          allFlippedCards[0].classList.remove("is-flipped");
          allFlippedCards[1].classList.remove("is-flipped");
        }, duration);
      }
    }
  });
});