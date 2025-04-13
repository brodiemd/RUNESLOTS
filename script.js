const emojis = ["🍒", "🍋", "🍇", "🍉", "🔔", "⭐"];
const prizes = [
  { emoji: "🍒", image: "https://example.com/prize1.png" },
  { emoji: "🍋", image: "https://example.com/prize2.png" },
  { emoji: "🍇", image: "https://example.com/prize3.png" },
  { emoji: "🍉", image: "https://example.com/prize4.png" },
  { emoji: "🔔", image: "https://example.com/prize5.png" },
  { emoji: "⭐", image: "https://example.com/prize6.png" }
];

const spinBtn = document.getElementById("spinBtn");
const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const resultText = document.getElementById("resultText");
const youWonText = document.getElementById("youWonText");
const prizeImage = document.getElementById("prizeImage");
const spinSound = document.getElementById("spinSound");

function spinReel(reel, delay) {
  return new Promise((resolve) => {
    let count = 0;
    const interval = setInterval(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      reel.textContent = randomEmoji;
      count++;
      if (count >= 20) {
        clearInterval(interval);
        resolve(reel.textContent);
      }
    }, delay);
  });
}

spinBtn.addEventListener("click", async () => {
  resultText.style.display = "none";
  spinSound.currentTime = 0;
  spinSound.play();

  const results = [];

  // Spin reels sequentially with delay between them
  results.push(await spinReel(reel1, 75));
  results.push(await spinReel(reel2, 75));
  results.push(await spinReel(reel3, 75));

  // Show prize after 2 second delay
  setTimeout(() => {
    const match = prizes.find(p => p.emoji === results[0]);
    if (results.every(r => r === results[0]) && match) {
      prizeImage.src = match.image;
    } else {
      prizeImage.src = "https://cdn.glitch.global/placeholder.png"; // fallback image
    }

    resultText.style.display = "flex";
  }, 2000);
});
