const prizes = [
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/800px-Armadyl_godsword_detail.webp?v=1744503474112" alt="Prize 1" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_bludgeon_detail.webp?v=1744503476834" alt="Prize 2" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_whip_detail.webp?v=1744503478978" alt="Prize 3" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Old_school_bond_detail.webp?v=1744503471902" alt="Prize 4" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Serpentine_helm_detail.webp?v=1744503484644" alt="Prize 5" />'
];

let used = false;

document.getElementById("spinBtn").addEventListener("click", function () {
  if (used) return alert("You already spun!");

  // Hide the result text before the spin
  const resultText = document.getElementById("resultText");
  resultText.style.display = "none";

  // Reset the used flag
  used = true;

  // Play the spin sound
  const spinSound = document.getElementById("spinSound");
  spinSound.play();

  // Function to animate the reel and show new emojis
  const spinReel = (reel) => {
    const emojis = ["🍒", "🍋", "🍇", "🍉", "🍊"];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    reel.innerHTML = emojis[randomIndex];
  };

  // Spin the reels for 3 seconds, with staggered start
  let spinDuration = 3000; // Total spin time in milliseconds
  let intervalDuration = 100; // Speed of the emoji change
  let iterations = spinDuration / intervalDuration;

  // Start the reels with delays between each reel starting
  setTimeout(() => {
    let spinReel1Interval = setInterval(() => spinReel(document.getElementById("reel1")), intervalDuration);
    
    setTimeout(() => {
      let spinReel2Interval = setInterval(() => spinReel(document.getElementById("reel2")), intervalDuration);
      
      setTimeout(() => {
        let spinReel3Interval = setInterval(() => spinReel(document.getElementById("reel3")), intervalDuration);

        // Stop all reels after the spin duration
        setTimeout(() => {
          clearInterval(spinReel1Interval);
          clearInterval(spinReel2Interval);
          clearInterval(spinReel3Interval);

          // After spin stops, wait for 2 seconds before showing prize
          setTimeout(() => {
            // After spin stops, show prize
            const prize = prizes[Math.floor(Math.random() * prizes.length)];
            document.getElementById("prizeImage").innerHTML = prize;
            document.getElementById("resultText").style.display = "block";
            used = false;
          }, 2000); // 2 second delay before showing prize

        }, spinDuration);

      }, 200); // Delay for the third reel (increased to 200ms)

    }, 150); // Delay for the second reel (increased to 150ms)

  }, 100); // Delay for the first reel (increased to 100ms)
});
