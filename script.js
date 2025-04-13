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

  // Function to animate the reel and show new emojis
  const spinReel = (reel) => {
    const emojis = ["🍒", "🍋", "🍇", "🍉", "🍊"];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    reel.innerHTML = emojis[randomIndex];
  };

  // Spin the reels for 3 seconds, with staggered start
  setTimeout(() => spinReel(document.getElementById("reel1")), 0); // Left reel starts first
  setTimeout(() => spinReel(document.getElementById("reel2")), 250); // Middle reel starts second
  setTimeout(() => spinReel(document.getElementById("reel3")), 500); // Right reel starts last

  // Increase spin duration for more natural effect
  setTimeout(() => {
    spinReel(document.getElementById("reel1"));
    setTimeout(() => spinReel(document.getElementById("reel2")), 250);
    setTimeout(() => spinReel(document.getElementById("reel3")), 500);
  }, 1500);

  // After the spin, show the prize with a 1-second delay
  setTimeout(() => {
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById("prizeImage").innerHTML = prize;
    document.getElementById("resultText").style.display = "block";
    used = false;
  }, 3000); // Prize shows after the spin ends
});
