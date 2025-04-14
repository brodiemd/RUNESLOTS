document.addEventListener("DOMContentLoaded", () => {
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
  let guaranteedWinIndex = Math.floor(Math.random() * tries);

  document.getElementById("spinButton").addEventListener("click", function () {
    if (isWinner) return alert("You've already won!");
    if (tries <= 0) return alert("No tries left!");

    const spinSound = document.getElementById("spinSound");
    if (spinSound) {
      spinSound.currentTime = 0;
      spinSound.play().catch((e) => console.warn("Sound blocked:", e));
    }

    const resultText = document.getElementById("resultText");
    const triesLeftText = document.getElementById("triesLeftText");

    const reels = [
      document.querySelector("#reel1 img"),
      document.querySelector("#reel2 img"),
      document.querySelector("#reel3 img")
    ];

    resultText.style.display = "none";
    triesLeftText.style.display = "none";

    reels.forEach((reel) => {
      reel.classList.remove("glow-win", "glow-lose", "shake");
    });

    const spinDuration = 3000;
    const intervalDuration = 100;
    const finalImages = [];

    let forceWin = tries - 1 === guaranteedWinIndex;

    reels.forEach((reel, i) => {
      let interval = setInterval(() => {
        const idx = Math.floor(Math.random() * reelImages.length);
        reel.src = reelImages[idx];
      }, intervalDuration);

      setTimeout(() => {
        clearInterval(interval);
        let finalImage = forceWin
          ? reelImages[0]
          : reelImages[Math.floor(Math.random() * reelImages.length)];
        reel.src = finalImage;
        finalImages[i] = finalImage;
      }, spinDuration + i * 200);
    });

    setTimeout(() => {
      const allMatch =
        finalImages[0] === finalImages[1] && finalImages[1] === finalImages[2];

      if (allMatch) {
        isWinner = true;
        const prize = prizes[Math.floor(Math.random() * prizes.length)];
        document.getElementById("prizeImageContainer").innerHTML = prize;
        document.getElementById("youWonText").innerHTML = "You won!";
        resultText.style.display = "block";
        reels.forEach((reel) => {
          reel.classList.add("glow-win");
        });
      } else {
        tries--;
        triesLeftText.innerHTML = `Bad luck! You have ${tries} tries left.`;
        triesLeftText.style.display = "block";
        reels.forEach((reel) => {
          reel.classList.add("glow-lose", "shake");
        });
      }
    }, spinDuration + 1000);
  });

  // Populate and duplicate prizes 5x for seamless scroll
  function populatePrizeShowcase() {
    const track = document.querySelector(".prize-track");
    if (!track) return;

    // Clear the track
    track.innerHTML = "";

    // Add all prizes 5 times for longer loop
    for (let i = 0; i < 5; i++) {
      prizes.forEach(prize => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("prize-image");
        wrapper.innerHTML = prize;
        track.appendChild(wrapper);
      });
    }
  }

  populatePrizeShowcase();
});

// Music play trigger
window.addEventListener("DOMContentLoaded", function () {
  const bgMusic = document.getElementById("backgroundMusic");
  const playMusicOnce = () => {
    if (bgMusic.paused) {
      bgMusic.play();
    }
    document.removeEventListener("click", playMusicOnce);
  };
  document.addEventListener("click", playMusicOnce);
});
