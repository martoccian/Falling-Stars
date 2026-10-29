
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rainbow colors
const colors = [
    "#ff4d6d",
    "#ff9e00",
    "#ffee32",
    "#70e000",
    "#00bbf9",
    "#9b5de5",
    "#f15bb5"
];

// Create stars
const stars = [];

for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 5,
        speed: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.03
    });
}

// Draw a five-pointed star
function drawStar(x, y, size, rotation, color) {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();

    for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? size : size / 2;
        const angle = (Math.PI / 5) * i - Math.PI / 2;

        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.closePath();

    // Star color and glow
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.fill();

    ctx.restore();
}

// Animation loop
function animate() {

    // Clear canvas
    ctx.fillStyle = "#09051a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {

        drawStar(
            star.x,
            star.y,
            star.size,
            star.rotation,
            star.color
        );

        // Move stars downward
        star.y += star.speed;
        star.x -= star.speed * 0.3;

        // Rotate stars
        star.rotation += star.rotationSpeed;

        // Reset stars when they leave the screen
        if (star.y > canvas.height + star.size) {
            star.y = -star.size;
            star.x = Math.random() * canvas.width;
        }

        if (star.x < -star.size) {
            star.x = canvas.width + star.size;
        }
    });

    requestAnimationFrame(animate);
}

animate();

// Resize canvas when window changes
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});