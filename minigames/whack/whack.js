let score = 0;
let gameInterval;
let moleInterval;
let gameDuration = 30; // Game duration in seconds
let activeMole = null;

// Select all mole elements
const moles = document.querySelectorAll('.mole');

// Get the score element
const scoreElement = document.getElementById('score');

// Function to generate a random mole to show
function getRandomMole() {
    const randomIndex = Math.floor(Math.random() * moles.length);
    return moles[randomIndex];
}

// Function to hide all moles
function hideAllMoles() {
    moles.forEach(mole => {
        mole.style.display = 'none';
    });
}

// Function to start the game
function startGame() {
    score = 0;
    scoreElement.textContent = score;
    hideAllMoles();

    // Show start button as disabled once the game starts
    document.querySelector('.start-btn').disabled = true;

    let timeLeft = gameDuration;
    
    // Start the game timer
    gameInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(moleInterval);
            alert(`Game over! Your final score is ${score}`);
            document.querySelector('.start-btn').disabled = false; // Enable start button for next round
        } else {
            timeLeft--;
        }
    }, 1000);

    // Show random mole every 1 second
    moleInterval = setInterval(() => {
        hideAllMoles(); // Hide any mole that's visible
        const mole = getRandomMole();
        mole.style.display = 'block'; // Show random mole

        // Hide mole after 1 second
        setTimeout(() => {
            mole.style.display = 'none';
        }, 1000);
    }, 1000); // Mole appears every second
}

// Function to increase score when mole is clicked
moles.forEach(mole => {
    mole.addEventListener('click', function() {
        if (mole.style.display === 'block') {
            score++;
            scoreElement.textContent = score;
            mole.style.display = 'none'; // Hide the mole after it's clicked
        }
    });
});
