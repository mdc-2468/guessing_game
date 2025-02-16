'use strict';

let score = 0;
let rounds = 0;
let highestScore = 0;
let ans;
let guessValue;
let guessArr = [];
let duplicateMsg = "You had guess this value already"

const guess = document.querySelector(".guess");
const msg = document.querySelector(".message");
const scoreUI = document.querySelector(".score");
const scoreLabelUI = document.querySelector(".label-score");
const highestScoreLabelUI = document.querySelector(".label-highscore");
const roundsLabelUI = document.querySelector(".label-rounds");
const highestScoreUI = document.querySelector(".highscore");
const roundsUI = document.querySelector(".rounds");
const ansUI = document.querySelector(".number");

function genAns() {
  ans = Math.floor(Math.random() * 20 + 1);
  console.log(`The answer for this round is ${ans}`);
};

function reset() {
  console.log("Resetting the game");
  score = 0;
  rounds = 0;
  guessArr = [];
  guess.value = null;
  msg.innerHTML = '<p class="message">Start guessing...</p>';
  scoreLabelUI.classList.add("hide");
  roundsLabelUI.classList.remove("hide");
  highestScoreLabelUI.classList.remove("hide");
  document.querySelector(".check").classList.remove("hide");
  roundsUI.textContent = String(rounds);
  msg.classList.remove("congratulations");
  ansUI.textContent = "?";

  genAns();

}

function checkProcess() {
  if (rounds < 20) {
    // Check if input valid
    if (!guess.value) {
      console.log("You didn't share your guess");
      msg.textContent = "You didn't share your guess";
    } else {
      guessValue = Number(guess.value);
      console.log(`User is guessing ${typeof guessValue} ${guessValue} `);
      if (guessArr.includes(guessValue)) {
        if (guessValue > ans) {
          msg.textContent = duplicateMsg + "(" + " Too high " + ")";
        } else if (guessValue < ans) {
          msg.textContent = duplicateMsg + "(" + " Too low " + ")";
        };
        rounds += 1;
        roundsUI.textContent = String(rounds);
      } else {
        checkAns();
      }
    }
  } else {
    msg.textContent = "You have failed the mission";
    roundsLabelUI.classList.add("hide");
    highestScoreLabelUI.classList.add("hide");
    document.querySelector(".check").classList.add("hide");
  }
}

function checkAns() {

  if (guessValue === ans) {
    msg.textContent = "You found the answer";
    console.log("User found the answer");
    score = 20 - rounds;
    scoreUI.textContent = String(score);
    scoreLabelUI.classList.remove("hide");
    msg.classList.add("congratulations");
    ansUI.textContent = ans;

    if (score > highestScore) {
      highestScore = score;
      highestScoreUI.textContent = String(highestScore);
    }

  } else {
    if (guessValue > ans) {
      msg.textContent = "Too high"
    } else if (guessValue < ans) {
      msg.textContent = "Too low";
    };
    rounds += 1;
    roundsUI.textContent = String(rounds);
    guessArr.push(guessValue);

  }
}

// Fresh Start
genAns();

// Check Button
document.querySelector(".check").addEventListener("click", checkProcess);

// Reset Button
document.querySelector(".again").addEventListener("click", reset);