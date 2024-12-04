const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = determineWinner(playerChoice, computerChoice);
    updateScore(winner);
    displayResult(playerChoice, computerChoice, winner);
  });
});

function determineWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  }
  return "computer";
}

function updateScore(winner) {
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  }
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function displayResult(player, computer, winner) {
  let message = `You chose ${player} 🆚 Computer chose ${computer}.`;

  if (winner === "draw") {
    message += " It's a draw! 🤝";
    resultText.style.color = "#ffa500"; // Orange for Draw
  } else if (winner === "player") {
    message += " You win! 🎉";
    resultText.style.color = "#4caf50"; // Green for Win
  } else {
    message += " You lose! 😢";
    resultText.style.color = "#f44336"; // Red for Loss
  }
  resultText.textContent = message;
}
let timer;
function startTimer() {
  let timeLeft = 5; // 5 seconds countdown
  resultText.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    resultText.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      resultText.textContent = "Time's up! You lose 😢";
      computerScore++;
      computerScoreEl.textContent = computerScore;
    }
  }, 1000);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    clearInterval(timer); // Stop timer when a choice is made
    const playerChoice = button.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = determineWinner(playerChoice, computerChoice);
    updateScore(winner);
    displayResult(playerChoice, computerChoice, winner);
    startTimer(); // Restart timer for next round
  });
});

startTimer(); // Start timer initially
let shieldActive = false;

document.getElementById("shield").addEventListener("click", () => {
  shieldActive = true;
  resultText.textContent = "Shield activated! You can't lose this round.";
});

function determineWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }
  if (shieldActive) {
    shieldActive = false; // Deactivate shield after use
    return "player";
  }
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  }
  return "computer";
}
let highScore = localStorage.getItem("highScore") || 0;

function updateScore(winner) {
  if (winner === "player") {
    playerScore++;
    if (playerScore > highScore) {
      highScore = playerScore;
      localStorage.setItem("highScore", highScore);
    }
  } else if (winner === "computer") {
    computerScore++;
  }
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  document.getElementById("high-score").textContent = `High Score: ${highScore}`;
}
let playerHistory = { rock: 0, paper: 0, scissors: 0 };

function smartComputerChoice() {
  const mostChosen = Object.keys(playerHistory).reduce((a, b) => 
    playerHistory[a] > playerHistory[b] ? a : b
  );
  // Counter the player's most chosen move
  if (mostChosen === "rock") return "paper";
  if (mostChosen === "paper") return "scissors";
  return "rock"; // Default
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    playerHistory[playerChoice]++;
    const computerChoice = smartComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);
    updateScore(winner);
    displayResult(playerChoice, computerChoice, winner);
  });
});
let winningStreak = 0;

function updateScore(winner) {
  if (winner === "player") {
    playerScore++;
    winningStreak++;
  } else {
    computerScore++;
    winningStreak = 0; // Reset streak on loss
  }
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  document.getElementById("winning-streak").textContent = `Winning Streak: ${winningStreak}`;
}




