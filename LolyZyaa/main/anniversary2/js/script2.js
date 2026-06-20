// Initialize Twemoji to render all emojis uniformly
document.addEventListener("DOMContentLoaded", () => {
  if (window.twemoji) {
    twemoji.parse(document.body, {
      folder: "svg",
      ext: ".svg",
    });
  }

  // Lightbox Logic
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const caption = item.querySelector(".gallery-caption");

      if (img) {
        lightbox.style.display = "flex";
        // Trigger reflow for animation
        void lightbox.offsetWidth;
        lightbox.classList.add("show");
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = caption ? caption.innerHTML : "";
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("show");
    setTimeout(() => {
      lightbox.style.display = "none";
    }, 300);
  };

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});
