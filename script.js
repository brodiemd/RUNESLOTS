const prizes = [
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/800px-Armadyl_godsword_detail.webp?v=1744503474112" alt="Prize 1" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_bludgeon_detail.webp?v=1744503476834" alt="Prize 2" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_whip_detail.webp?v=1744503478978" alt="Prize 3" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Old_school_bond_detail.webp?v=1744503471902" alt="Prize 4" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Serpentine_helm_detail.webp?v=1744503484644" alt="Prize 5" />'
];

const emojis = ["🍒", "🍋", "🍇", "🍉", "🍊"];

let used = false;

document.getElementById("spinBtn").addEventListener("click", function () {
  if (used) return alert("You already spun!");

  // Hide the result text before the spin
  const resultText = document.getElementById("resultText");
  resultText.style.display = "none";

  // Spin animation
  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");

  const spinTime = 3000; // Increased spin time for a more realistic feel
  let interval = setInterval(() => {
    reel1.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    reel2.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    reel3.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  }, 100);

  // Simulate a dynamic spin (accelerating and slowing down)
  setTimeout(() => {
    clearInterval(interval);
    let finalSpin = setInterval(() => {
      reel1.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      reel2.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      reel3.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    }, 50); // Faster speed

    setTimeout(() => {
      clearInterval(finalSpin);

      // Choose random prize
      const prize = prizes[Math.floor(Math.random() * prizes.length)];

      // Display result in the resultText container
      resultText.innerHTML = `You won!: ${prize}`;

      // Show the resultText container
      resultText.style.display = "flex"; // Make the prize message appear

      // Prevent reuse
      used = true;
    }, 1500); // Speed up the final spin duration

  }, spinTime);
});
