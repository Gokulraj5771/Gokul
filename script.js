document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const question = document.getElementById("question");
  const buttonsContainer = document.getElementById("buttons-container");
  const successContent = document.getElementById("success-content");
  const angryContent = document.getElementById("angry-content");
  const imagesContainer = document.getElementById("images-container");

  // Initial positioning of No button to be relative/inline, then absolute for moving
  noBtn.classList.remove("absolute");

  // Floating Hearts Background Animation
  const heartContainer = document.getElementById("heart-bg");
  const heartSymbols = ["❤️", "💖", "💕", "🥰", "🌸", "✨"];

  function createHeart() {
    if (!heartContainer) return;
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    // Random Position
    heart.style.left = Math.random() * 100 + "vw";

    // Random Size
    const size = Math.random() * 20 + 10; // 10px to 30px
    heart.style.fontSize = size + "px";

    // Random Animation Duration
    const duration = Math.random() * 10 + 10; // 10s to 20s
    heart.style.animationDuration = duration + "s";

    // Random Opacity
    heart.style.opacity = Math.random() * 0.5 + 0.1;

    heartContainer.appendChild(heart);

    // Remove after animation ends to prevent memory leak
    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  // Create hearts periodically
  if (heartContainer) {
    setInterval(createHeart, 800);

    // Create initial batch
    for (let i = 0; i < 15; i++) {
      setTimeout(createHeart, i * 300);
    }
  }

  let noBtnMoved = false;
  let noInteractionCount = 0;
  let totalAngryCount = 0; // Track total times angry state is shown
  const ANGRY_THRESHOLD = 3;


  const angryImages = [
    "vid1.mp4",
    "alphams-alphams-gif.gif", // First time         // Third time
  ];

  const navToNormalState = () => {
    angryContent.classList.add("hidden");
    angryContent.classList.remove("flex");
    noInteractionCount = 0; // Reset count so it can be triggered again
  };

  angryContent.addEventListener("click", navToNormalState);

  const moveNoButton = () => {
    noInteractionCount++;

    if (noInteractionCount > ANGRY_THRESHOLD) {
      // Trigger Angry State
      angryContent.classList.remove("hidden");
      angryContent.classList.add("flex");

      // Update image/video based on total angry count
      totalAngryCount++;
      const currentSrc =
        angryImages[(totalAngryCount - 1) % angryImages.length];

      let mediaElement = angryContent.querySelector("img, video");
      const isVideo = currentSrc.toLowerCase().endsWith(".mp4");
      const commonClasses =
        "w-[90%] max-w-[400px] rounded-lg border-4 border-red-600 object-cover shadow-[0_0_20px_rgba(220,38,38,0.7)]";

      if (isVideo) {
        if (!mediaElement || mediaElement.tagName !== "VIDEO") {
          const video = document.createElement("video");
          video.src = currentSrc;
          video.className = commonClasses;
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.playsInline = true; // For mobile
          if (mediaElement) {
            mediaElement.replaceWith(video);
          } else {
            angryContent.appendChild(video);
          }
        } else {
          mediaElement.src = currentSrc;
          mediaElement.play().catch(() => {});
        }
      } else {
        if (!mediaElement || mediaElement.tagName !== "IMG") {
          const img = document.createElement("img");
          img.src = currentSrc;
          img.alt = "Angry Reaction";
          img.className = commonClasses;
          if (mediaElement) {
            mediaElement.replaceWith(img);
          } else {
            angryContent.appendChild(img);
          }
        } else {
          mediaElement.src = currentSrc;
        }
      }

      // Auto close after 3 seconds
      setTimeout(navToNormalState, 3000);
      return; // Stop moving, just show angry state
    }

    if (!noBtnMoved) {
      noBtn.style.position = "absolute";
      noBtnMoved = true;
    }

    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  };

  noBtn.addEventListener("mouseover", moveNoButton);
  noBtn.addEventListener("click", moveNoButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent click on mobile
    moveNoButton();
  });

  yesBtn.addEventListener("click", () => {
    // Hide initial content
    question.style.display = "none";
    buttonsContainer.style.display = "none"; // Hide both buttons

    // Show success content
    successContent.classList.remove("hidden");
    successContent.classList.add("flex");

    // Using Cataas API since image generation is currently unavailable
    // Adding timestamps to force unique images
    const imagePaths = [
      "vid2.mp4",
      "img1.jpeg",
      "vid3.mp4",
    ];

    imagePaths.forEach((src) => {
      const isVideo = src.toLowerCase().endsWith(".mp4");
      const element = isVideo
        ? document.createElement("video")
        : document.createElement("img");

      element.src = src;
      element.className =
        "w-[140px] h-[190px] object-cover animate-fadeIn m-2 rounded-lg border-2 border-white shadow-md";

      if (isVideo) {
        element.autoplay = true;
        element.loop = true;
        element.muted = true;
        element.playsInline = true;
      } else {
        element.alt = "Cute cat";
      }

      imagesContainer.appendChild(element);
    });
  });
});
