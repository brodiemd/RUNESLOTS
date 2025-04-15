document.addEventListener("DOMContentLoaded", () => {
  const prizes = [
    '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/800px-Armadyl_godsword_detail.webp?v=1744503474112" alt="Prize 1" />',
    '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_bludgeon_detail.webp?v=1744503476834" alt="Prize 2" />',
    '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Abyssal_whip_detail.webp?v=1744503478978" alt="Prize 3" />',
    '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Old_school_bond_detail.webp?v=1744503471902" alt="Prize 4" />',
    '<img src="https://cdn.glitch.global/7c73a667-d47a-4dc0-955c-b462c1d66c84/1200px-Serpentine_helm_detail.webp?v=1744503484644" alt="Prize 5" />',
    '<img src="https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/640px-Bandos_tassets_detail.webp?v=1744699647769" alt="Prize 6" />',
    '<img src="https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/640px-Gilded_platebody_detail.webp?v=1744699648001" alt="Prize 7" />',
    '<img src="https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Chugging_barrel_(disassembled)_detail.webp?v=1744699662148" alt="Prize 8" />',
    '<img src="https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Armadyl_helmet_detail.webp?v=1744699654007" alt="Prize 9" />',
    '<img src="https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/1200px-Toxic_blowpipe_(empty)_detail.webp?v=1744699667478" alt="Prize 10" />'
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

  const backgroundMusic = document.getElementById("backgroundMusic");
  const deathSound = document.getElementById("deathSound");

  const seaShanty = new Audio("https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/09%20Sea%20Shanty%202.mp3?v=1744534868168");
  seaShanty.loop = true;

  const levelUpSound = new Audio("https://cdn.glitch.global/fd2c8a45-bd31-47e3-8790-296b8498bd20/Hitpoints_level_up_(levels_2-49).ogg?v=1744710883915");

  const confettiCanvas = document.createElement("canvas");
  confettiCanvas.id = "confetti-canvas";
  confettiCanvas.style.position = "fixed";
  confettiCanvas.style.top = 0;
  confettiCanvas.style.left = 0;
  confettiCanvas.style.width = "100%";
  confettiCanvas.style.height = "100%";
  confettiCanvas.style.pointerEvents = "none";
  confettiCanvas.style.zIndex = "9999";
  document.body.appendChild(confettiCanvas);
  const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

  function triggerConfetti() {
    myConfetti({
      particleCount: 200,
      spread: 120,
      scalar: 2.2,
      origin: { y: 0.4 },
      colors: ['#FFD700', '#ADFF2F', '#00BFFF']
    });
  }

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

    reels.forEach((reel) => reel.classList.remove("glow-win", "glow-lose", "shake"));

    const spinDuration = 3000;
    const intervalDuration = 100;
    const finalImages = [];
    let forceWin = tries - 1 === guaranteedWinIndex;
    let reelsStopped = 0;

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
        reelsStopped++;

        if (reelsStopped === 3) {
          const allMatch = finalImages[0] === finalImages[1] && finalImages[1] === finalImages[2];

          if (allMatch) {
            isWinner = true;

            if (backgroundMusic) {
              backgroundMusic.pause();
              backgroundMusic.currentTime = 0;
            }

            levelUpSound.currentTime = 0;
            levelUpSound.play().catch((e) => console.warn("Level-up sound blocked:", e));

            levelUpSound.onended = () => {
              seaShanty.currentTime = 0;
              seaShanty.play().catch((e) => console.warn("Sea Shanty 2 playback failed:", e));
            };

            const prize = prizes[Math.floor(Math.random() * prizes.length)];

            // Delay the prize display
            setTimeout(() => {
              document.getElementById("prizeImageContainer").innerHTML = prize;
              document.getElementById("youWonText").innerHTML = "You won!";
              resultText.style.display = "block";
              reels.forEach((reel) => reel.classList.add("glow-win"));
              triggerConfetti();
            }, 1000); // 2 second delay

          } else {
            tries--;
            triesLeftText.innerHTML = `Bad luck! You have ${tries} tries left.`;
            triesLeftText.style.display = "block";

            reels.forEach((reel) => reel.classList.add("glow-lose", "shake"));

            if (backgroundMusic && deathSound) {
              const resumeTime = backgroundMusic.currentTime;
              backgroundMusic.pause();
              deathSound.currentTime = 0;

              deathSound.onended = () => {
                if (backgroundMusic.paused) {
                  backgroundMusic.currentTime = resumeTime;
                  backgroundMusic.play().catch((e) =>
                    console.warn("Background music resume blocked:", e)
                  );
                }
              };

              deathSound.play().catch((e) => console.warn("Death sound blocked:", e));
            }
          }
        }
      }, spinDuration + i * 200);
    });
  });

  function populatePrizeShowcase() {
    const track = document.querySelector(".prize-track");
    if (!track) return;
    track.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const prizeDiv = document.createElement("div");
      prizeDiv.innerHTML = prizes[i % prizes.length];
      track.appendChild(prizeDiv);
    }
  }

  populatePrizeShowcase();
});

window.addEventListener("DOMContentLoaded", function () {
  const bgMusic = document.getElementById("backgroundMusic");

  const playMusicOnce = () => {
    bgMusic.play().catch(() => {});
    setTimeout(() => {
      bgMusic.loop = true;
      bgMusic.play().catch(() => {});
    }, 300);
  };

  document.body.addEventListener("click", playMusicOnce);
});
