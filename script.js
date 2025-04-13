const prizes = [
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/800px-Armadyl_godsword_detail.webp?v=1744503474112" alt="Prize 1" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_bludgeon_detail.webp?v=1744503476834" alt="Prize 2" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_whip_detail.webp?v=1744503478978" alt="Prize 3" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Old_school_bond_detail.webp?v=1744503471902" alt="Prize 4" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Serpentine_helm_detail.webp?v=1744503484644" alt="Prize 5" />'
];

const reelImages = [
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1279-bowstring.PNG?v=1744525703585",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1291-OSRS.PNG?v=1744525707038",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1298-Quest.PNG?v=1744525710480",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1308-skillmagic.PNG?v=1744525713862",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1311-skillslayer.PNG?v=1744525716797"
];

let tries = 3;  // Maximum tries
let used = false;  // Check if spin is already used
let isWinner = false;  // Check if the user has won

document.getElementById("spinBtn").addEventListener("click", function () {
  if (used) return alert("You already spun!");  // Prevent further spins if already used
  if (tries === 0) return alert("No tries left!");  // Block further spins if no tries left
  if (isWinner) return alert("You've already won!");  // Block spin after winning

  // Play the spin sound
  const spinSound = document.getElementById("spinSound");
  spinSound.play();

  // Get elements for the result text and the reels
  const resultText = document.getElementById("resultText");
  const triesLeftText = document.getElementById("triesLeftText");
  const reels = [
    document.querySelector("#reel1 img"),
    document.querySelector("#reel2 img"),
    document.querySelector("#reel3 img")
  ];

  // Hide result text before spinning
  resultText.style.display = "none";

  // Spinning duration and speed
  let spinDuration = 3000;  // Total spin time in milliseconds
  let intervalDuration = 100;  // Speed of the emoji change

  // Spin function for the reels
  const spin = (reel) => {
    const idx = Math.floor(Math.random() * reelImages.length);  // Get a random index from reelImages
    reel.src = reelImages[idx];  // Set the reel's image
  };

  // Ensure all reels stop on the same image
  const finalImage = reelImages[Math.floor(Math.random() * reelImages.length)];

  // Start the reels spinning
  reels.forEach((reel, i) => {
    let interval = setInterval(() => spin(reel), intervalDuration);

    // Stop spinning after spin duration + delays for each reel
    setTimeout(() => {
      clearInterval(interval);
      reel.src = finalImage;  // Set the final image for each reel
    }, spinDuration + i * 200);  // Staggered effect for reels
  });

  // After the spin, display the prize or bad luck message
  setTimeout(() => {
    const prize = Math.random() < 0.5 ? prizes[Math.floor(Math.random() * prizes.length)] : null;

    // If won, display the prize
    if (prize) {
      isWinner = true;
      document.getElementById("prizeImageContainer").innerHTML = prize;
      document.getElementById("youWonText").innerHTML = "You won!";
      resultText.style.display = "block";  // Show the result text
    } else {
      tries--;
      triesLeftText.innerHTML = `Bad luck! You have ${tries} tries left.`;
      triesLeftText.style.display = "block";  // Show tries left message
    }
  }, spinDuration + 1000);  // Delay prize display after spin
});
