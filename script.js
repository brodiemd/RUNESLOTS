const prizes = [
  "10% Off Your Next Service",
  "Free Garden Maintenance Add-On",
  "Bonus Hour of Labor",
  "Free Site Assessment",
  "Gift Card Bonus"
];

const emojis = ["🍒", "🍋", "🍇", "🍉", "🍊"];

let used = false;

document.getElementById("spinBtn").addEventListener("click", function () {
  if (used) return alert("You already spun!");

  // Spin animation
  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");

  const spinTime = 1000;
  let interval = setInterval(() => {
    reel1.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    reel2.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    reel3.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    // Choose random prize
    const prize = prizes[Math.floor(Math.random() * prizes.length)];

    // Display result
    document.getElementById("resultText").textContent = `🎉 You won: ${prize} 🎉`;

    // Prevent reuse
    used = true;
  }, spinTime);
});
