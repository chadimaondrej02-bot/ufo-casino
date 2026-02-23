const START = 10000;
const GOAL = 1000000;
const BAN_TIME = 10 * 60 * 1000;

function getCredits() {
  return parseInt(localStorage.getItem("credits")) || START;
}

function setCredits(v) {
  localStorage.setItem("credits", v);
}

function getBan() {
  return parseInt(localStorage.getItem("banUntil")) || 0;
}

function setBan() {
  localStorage.setItem("banUntil", Date.now() + BAN_TIME);
}

function checkBan() {
  return Date.now() < getBan();
}

function gamble(amount) {
  let credits = getCredits();
  if (credits < amount) return;

  if (Math.random() < 0.5) {
    credits += amount;
  } else {
    credits -= amount;
  }

  if (credits <= 0) {
    credits = 0;
    setBan();
  }

  setCredits(credits);
  render();
}

function render() {
  const credits = getCredits();
  document.getElementById("credits").innerText = credits;

  if (checkBan()) {
    document.getElementById("game").style.display = "none";
    document.getElementById("ban").style.display = "block";
  } else {
    document.getElementById("game").style.display = "block";
    document.getElementById("ban").style.display = "none";
  }

  if (credits >= GOAL) {
    document.getElementById("win").style.display = "block";
  }
}

window.onload = render;