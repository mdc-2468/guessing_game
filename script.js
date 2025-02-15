'use strict';
let myNum;
let guess;
let userGuessArray = [];
let score = 20;
let highestScore = 0;
let rounds = 0;

function genMyNum() {
  myNum = Math.floor(Math.random() * 20 + 1);
  console.log(`The answer is: ${myNum}`);
};

function restart() {
  console.log(`User is trying to restart the game...`);

  // Trigger re-generating the answer
  genMyNum();

  // Reset the guess number to 0 and user guess list
  guess = 0;
  userGuessArray = [];

  // Clear the input
  document.querySelector(".guess").value = null;

  // Clear the message
  document.querySelector(".message").innerHTML = '<p class="message">Start guessing...</p>';

  // Reset the score and rounds
  score = 20;
  rounds = 0;
  document.querySelector(".score").textContent = 20;
  document.querySelector(".rounds").textContent = 0;

  // Reset back the check button
  document.querySelector(".check").style.display = 'block';

  // Hide back the Score
  document.querySelector(".label-score").classList.remove("show");

  // Log
  console.log(`Everything has been reset`);

}

function checkNum() {
  guess = parseInt(document.querySelector(".guess").value, 10);
  console.log(`User passed a number of ${guess}`);

  // Check if user has guessed this number already 
  if (userGuessArray.includes(guess)) {
    document.querySelector(".message").textContent = "You have already guessed this number";

  } else {
    userGuessArray.push(guess);

    // Check ans and update score
    if (guess === myNum) {
      document.querySelector(".message").innerHTML = '<h3 style="color:red">You knew me!!</h3>'
      document.querySelector(".label-score").classList.add("show");
      document.querySelector(".check").style.display = 'none';
      document.querySelector(".number").textContent = myNum;
      updateHighestScore();

    } else if (guess > myNum) {
      score -= 1;
      rounds += 1;
      document.querySelector(".rounds").textContent = String(rounds);
      document.querySelector(".message").textContent = "Too high";
      document.querySelector(".score").textContent = String(score);


    } else if (guess < myNum) {
      score -= 1;
      rounds += 1;
      document.querySelector(".rounds").textContent = String(rounds);
      document.querySelector(".message").textContent = "Too low";
      document.querySelector(".score").textContent = String(score);

    }
  }
}

function updateHighestScore() {
  if (score > highestScore) {
    highestScore = score;
  };
  document.querySelector(".highscore").textContent = String(highestScore);

}

// Fresh Start on the Page
console.log("User is entering the game");
genMyNum();

// Again Button
document.querySelector(".again").addEventListener("click", restart);

// Check button
document.querySelector(".check").addEventListener("click", checkNum);
