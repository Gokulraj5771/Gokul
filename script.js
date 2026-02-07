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

  let noBtnMoved = false;
  let noInteractionCount = 0;
  const ANGRY_THRESHOLD = 3;

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
      "https://willbemyval.netlify.app/us1.jpeg",
      "https://willbemyval.netlify.app/us2.jpeg",
      "https://willbemyval.netlify.app/us3.jpeg",
      "https://willbemyval.netlify.app/us4.jpeg",
      "https://willbemyval.netlify.app/us5.jpeg",
    ];

    imagePaths.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Cute cat";
      img.className =
        "w-[140px] h-[190px] object-cover animate-fadeIn m-2 rounded-lg border-2 border-white shadow-md";
      imagesContainer.appendChild(img);
    });
  });
});
