
  const prizes = [
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/800px-Armadyl_godsword_detail.webp?v=1744503474112" alt="Prize 1" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_bludgeon_detail.webp?v=1744503476834" alt="Prize 2" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_whip_detail.webp?v=1744503478978" alt="Prize 3" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Old_school_bond_detail.webp?v=1744503481902" alt="Prize 4" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Serpentine_helm_detail.webp?v=1744503484644" alt="Prize 5" />'
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
    document.getElementById("resultText").innerHTML = `🎉 You won: ${prize} 🎉`;

    // Prevent reuse
    used = true;
  }, spinTime);
});