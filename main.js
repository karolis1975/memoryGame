cards = document.querySelectorAll(".card");
main = document.querySelector(".main-container");
timeText = document.querySelector(".time");
bestText = document.querySelector(".best");

cards.forEach((crd) => {
  crd.addEventListener("click", clickedCard);
});

let img = null;
let card = null;
const mans = [
  {
    name: "boika",
    cards: 0,
  },
  {
    name: "bruce",
    cards: 0,
  },
  {
    name: "jackie",
    cards: 0,
  },
  {
    name: "rocky",
    cards: 0,
  },
  {
    name: "svarc",
    cards: 0,
  },
  {
    name: "vandam",
    cards: 0,
  },
];

let rand = null;
let canAdd = null;
let selectedCard = null;
let disable = false;
let time = 0;
let unlocked = 0;
let interval = null;
let best = null;

if (localStorage.getItem("best") != null) best = localStorage.getItem("best");

function clickedCard(e) {
  if (time == 0) {
    timing();
    interval = setInterval(timing, 1000);
  }

  if (disable) return;

  card = e.target;
  if (!card.classList.contains("card")) card = card.parentElement;

  img = card.firstElementChild;

  card.classList.add("show");
  img.classList.add("visible");

  if (selectedCard == null) {
    selectedCard = card.getAttribute("data-id");
  } else {
    if (selectedCard == card.getAttribute("data-id")) {
      cards.forEach((crd) => {
        if (crd.getAttribute("data-id") == selectedCard)
          crd.classList.add("done");
      });
      unlocked++;
      if (unlocked == mans.length) finished();
    } else {
      setTimeout(hideCards, 1000);
      disable = true;
      setTimeout(disableOff, 1000);
    }
    selectedCard = null;
  }
}
function finished() {
  if (time < best || best == null) {
    best = time;
    localStorage.setItem("best", best);
  }
  clearInterval(interval);
  setTimeout(generateCards, 1500);
}
function timing() {
  time += 1;
  timeText.textContent = time;
}

function disableOff() {
  disable = false;
}

function hideCards() {
  cards.forEach((crd) => {
    if (!crd.classList.contains("done")) {
      crd.classList.remove("show");
      crd.firstElementChild.classList.remove("visible");
    }
  });
}
generateCards();
function generateCards() {
  unlocked = 0;
  mans.forEach((man) => {
    man.cards = 0;
  });
  bestText.textContent = best;
  cards.forEach((crd) => {
    crd.innerHTML = "";
    if (time != 0) crd.classList.remove("show", "done");

    canAdd = true;
    while (canAdd) {
      rand = Math.floor(Math.random() * 6);
      if (mans[rand].cards < 2) {
        mans[rand].cards++;
        canAdd = false;
      }
    }
    crd.innerHTML = `<img src="images/${mans[rand].name}.png" />`;
    crd.setAttribute("data-id", mans[rand].name);
  });

  time = 0;
}
