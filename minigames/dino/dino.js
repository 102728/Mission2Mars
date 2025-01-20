function reload(){
    location.reload();
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 200;

// Game variables
let dino = {
    x: 50,
    y: canvas.height - 70,
    width: 40,
    height: 40,
    speed: 5,
    jumpHeight: -12,
    gravity: 0.8,
    velocityY: 0,
    isJumping: false
};

let obstacles = [];
let gameOver = false;
let score = 0;

// Set obstacle speed and spawn interval
const obstacleSpeed = 5;  // Fixed speed for all obstacles
const obstacleSpawnInterval = 1500; // Time in milliseconds between obstacle spawns (1.5 seconds)

// Variable to track the time of the last obstacle spawn
let lastObstacleTime = 0;

// Event Listener for jumping
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && !dino.isJumping) {
        dino.isJumping = true;
        dino.velocityY = dino.jumpHeight;
    }
});

// Function to create a new obstacle
function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: canvas.height - 50,
        width: 20 + Math.random() * 30,  // Random width for obstacles
        height: 20
    };
    obstacles.push(obstacle);
}

// Update the game state
function update(timestamp) {
    if (gameOver) return;

    // Update Dino position
    dino.velocityY += dino.gravity;
    dino.y += dino.velocityY;

    if (dino.y > canvas.height - 70) {
        dino.y = canvas.height - 70;
        dino.isJumping = false;
        dino.velocityY = 0;
    }

    // Move obstacles at the same speed
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= obstacleSpeed;  // All obstacles move at the same speed
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);  // Remove off-screen obstacles
            score++;
        }

        // Collision detection
        if (
            dino.x + dino.width > obstacles[i].x &&
            dino.x < obstacles[i].x + obstacles[i].width &&
            dino.y + dino.height > obstacles[i].y
        ) {
            gameOver = true;
            document.getElementById('gameOver').style.display = 'block';
        }
    }

    // Create new obstacles at regular intervals
    if (timestamp - lastObstacleTime >= obstacleSpawnInterval) {
        createObstacle();
        lastObstacleTime = timestamp;
    }

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height); // Dino

    ctx.fillStyle = 'green';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height); // Obstacles
    });

    // Score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 20, 30);

    requestAnimationFrame(update);
}

// Start the game
update(0);
