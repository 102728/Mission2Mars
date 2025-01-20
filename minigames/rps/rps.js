// Initialize scores
let playerScore = 0;
let cpuScore = 0;

// Choices for the CPU
const choices = ['rock', 'paper', 'scissors'];

// Function to play the game
function playGame(playerChoice) {
    // Generate CPU's choice
    const cpuChoice = getCpuChoice();

    // Determine the winner
    const result = determineWinner(playerChoice, cpuChoice);

    // Update the score
    updateScore(result);

    // Display the result
    displayResult(result, playerChoice, cpuChoice);
}

// Function to generate a random choice for the CPU
function getCpuChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, cpuChoice) {
    if (playerChoice === cpuChoice) {
        return 'draw';
    }

    if (
        (playerChoice === 'rock' && cpuChoice === 'scissors') ||
        (playerChoice === 'paper' && cpuChoice === 'rock') ||
        (playerChoice === 'scissors' && cpuChoice === 'paper')
    ) {
        return 'player';
    }

    return 'cpu';
}

// Function to update the score
function updateScore(result) {
    if (result === 'player') {
        playerScore++;
    } else if (result === 'cpu') {
        cpuScore++;
    }
}

// Function to display the result
function displayResult(result, playerChoice, cpuChoice) {
    const resultText = document.getElementById('result');
    const playerScoreElem = document.getElementById('playerScore');
    const cpuScoreElem = document.getElementById('cpuScore');

    if (result === 'draw') {
        resultText.innerHTML = `It's a draw! You both chose ${playerChoice}.`;
    } else if (result === 'player') {
        resultText.innerHTML = `You win! ${capitalize(playerChoice)} beats ${cpuChoice}.`;
    } else if (result === 'cpu') {
        resultText.innerHTML = `You lose! ${capitalize(cpuChoice)} beats ${playerChoice}.`;
    }

    // Update the score on the page
    playerScoreElem.textContent = playerScore;
    cpuScoreElem.textContent = cpuScore;
}

// Capitalize the first letter of the string for proper display
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
