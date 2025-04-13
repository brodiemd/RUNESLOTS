const prizes = [
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/800px-Armadyl_godsword_detail.webp?v=1744503474112" alt="Prize 1" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_bludgeon_detail.webp?v=1744503476834" alt="Prize 2" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_whip_detail.webp?v=1744503478978" alt="Prize 3" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Old_school_bond_detail.webp?v=1744503471902" alt="Prize 4" />',
  '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Serpentine_helm_detail.webp?v=1744503484644" alt="Prize 5" />'
];

const reelImages = [
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Air_rune_detail.webp?v=1744539387027",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Blood_rune_detail.webp?v=1744539388752",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Chaos_rune_detail.webp?v=1744539391890",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Cosmic_rune_detail.webp?v=1744539395178",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Earth_rune_detail.webp?v=1744539398773",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Fire_rune_detail.webp?v=1744539403762",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Nature_rune_detail.webp?v=1744539407147",
  "https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Water_rune_detail.webp?v=1744539412908"
];


let tries = 3;
let isWinner = false;
const guaranteedWinTry = Math.floor(Math.random() * 3) + 1; // 1 to 3

document.getElementById("spinBtn").addEventListener("click", function () {
  if (isWinner) return alert("You've already won!");
  if (tries <= 0) return alert("No tries left!");

  const spinSound = document.getElementById("spinSound");
  spinSound.play();

  const resultText = document.getElementById("resultText");
  const triesLeftText = document.getElementById("triesLeftText");

  const reels = [
    document.querySelector("#reel1 img"),
    document.querySelector("#reel2 img"),
    document.querySelector("#reel3 img")
  ];

  resultText.style.display = "none";
  triesLeftText.style.display = "none";

  reels.forEach(reel => {
    reel.classList.remove("glow-win", "glow-lose");
  });

  const spinDuration = 3000;
  const intervalDuration = 100;

  let finalImages = [];

  // Decide if this spin is the guaranteed win
  const currentTry = 4 - tries;
  const isThisTheWinningSpin = currentTry === guaranteedWinTry;

  const winningImage = reelImages[Math.floor(Math.random() * reelImages.length)];

  // Determine final images
  if (isThisTheWinningSpin) {
    finalImages = [winningImage, winningImage, winningImage];
  } else {
    // Make sure they don't match
    while (true) {
      finalImages = [
        reelImages[Math.floor(Math.random() * reelImages.length)],
        reelImages[Math.floor(Math.random() * reelImages.length)],
        reelImages[Math.floor(Math.random() * reelImages.length)]
      ];
      if (!(finalImages[0] === finalImages[1] && finalImages[1] === finalImages[2])) break;
    }
  }

  // Animate reels
  reels.forEach((reel, i) => {
    let interval = setInterval(() => {
      const randomImg = reelImages[Math.floor(Math.random() * reelImages.length)];
      reel.src = randomImg;
    }, intervalDuration);

    setTimeout(() => {
      clearInterval(interval);
      reel.src = finalImages[i];
    }, spinDuration + i * 200);
  });

  setTimeout(() => {
    const allMatch = finalImages[0] === finalImages[1] && finalImages[1] === finalImages[2];

    if (allMatch) {
      isWinner = true;
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      document.getElementById("prizeImageContainer").innerHTML = prize;
      document.getElementById("youWonText").innerHTML = "You won!";
      resultText.style.display = "block";
      reels.forEach(reel => reel.classList.add("glow-win"));
    } else {
      tries--;
      triesLeftText.innerHTML = `Bad luck! You have ${tries} tries left.`;
      triesLeftText.style.display = "block";
      reels.forEach(reel => reel.classList.add("glow-lose"));

      if (tries === 0) {
        document.getElementById("youWonText").innerHTML = "Out of tries!";
        resultText.style.display = "block";
      }
    }
  }, spinDuration + 1000);
});
