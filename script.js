const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const speedRange = document.getElementById("speedRange");
const resetButton = document.getElementById("resetButton");

let ball = {
  x: 50,
  y: 50,
  radius: 25,
  dx: 3, // initial speed
  dy: 3,
  color: getRandomColor(),
};

let animationPaused = false;
let animationSpeed = parseInt(speedRange.value);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function updateBall() {
  if (!animationPaused) {
    ball.x += ball.dx * animationSpeed;
    ball.y += ball.dy * animationSpeed;

    // Bounce off the left and right edges
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.dx = -ball.dx;
      ball.color = getRandomColor();
    }

    // Bounce off the top and bottom edges
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy;
      ball.color = getRandomColor();
    }

    drawBall();
    requestAnimationFrame(updateBall);
  }
}

function toggleAnimation() {
  animationPaused = !animationPaused;
  if (!animationPaused) {
    updateBall();
  }
}

function resetAnimation() {
  ball.x = 50;
  ball.y = 50;
  ball.color = getRandomColor();
  animationSpeed = parseInt(speedRange.value);
  drawBall();
}

canvas.addEventListener("click", toggleAnimation);
speedRange.addEventListener("input", () => (animationSpeed = parseInt(speedRange.value)));
resetButton.addEventListener("click", resetAnimation);

drawBall(); // Initial draw
