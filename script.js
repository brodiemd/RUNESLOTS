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

  // Spin animation (left to right)
  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");

  // Function to simulate continuous reel spinning
  const spinReel = (reel, duration) => {
    const emojisContainer = reel.querySelectorAll('.emoji');
    let loopCount = 0;

    const interval = setInterval(() => {
      // Move emojis downwards, so the new ones appear at the top
      const first = emojisContainer[0];
      for (let i = 0; i < emojisContainer.length - 1; i++) {
        emojisContainer[i].textContent = emojisContainer[i + 1].textContent;
      }
      first.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      loopCount++;

      // Stop the animation after a certain number of loops to simulate reel stopping
      if (loopCount > duration) {
        clearInterval(interval);
      }
    }, 100); // Update every 100ms to simulate fast spinning
  };

  const spinTime = 5000; // Increased spin time for a more realistic feel

  // Start spinning each reel with some delays
  spinReel(reel1, spinTime / 100); // Spin for the full time
  setTimeout(() => spinReel(reel2, spinTime / 100), 500); // Delay for middle reel
  setTimeout(() => spinReel(reel3, spinTime / 100), 1000); // Delay for right reel

  // After the spin stops, we want to randomize the final result
  setTimeout(() => {
    // Randomize the final results after spin finishes
    reel1.querySelector('.emoji').textContent = emojis[Math.floor(Math.random() * emojis.length)];
    reel2.querySelector('.emoji').textContent = emojis[Math.floor(Math.random() * emojis.length)];
    reel3.querySelector('.emoji').textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Choose random prize
    const prize = prizes[Math.floor(Math.random() * prizes.length)];

    // Display result in the resultText container
    document.getElementById("prizeImage").src = prize; // Set the prize image
    document.getElementById("youWonText").innerHTML = "You won!"; // Update text
    document.getElementById("adminText").innerHTML = "Please send a screenshot to the Admin."; // Update admin text

    // Delay before prize appears
    setTimeout(() => {
      resultText.style.display = "flex"; // Make the prize message appear
    }, 1000); // 1 second delay

    // Prevent reuse
    used = true;
  }, spinTime);
});
