let focusIndex = 0;
const initImage = () => {
  const galleries = document.querySelectorAll(".gallery");
  galleries.forEach((gallery) => {
    const imgs = [...gallery.querySelectorAll("img")];
    // let focusIndex = 0;

    const updateFocus = (newIndex) => {
      focusIndex = newIndex;
      const spacing = 40;
      const baseOffset = (imgs.length - 1) * spacing / 2; // Center the stack
      const centerY = spacing * focusIndex - baseOffset;

      imgs.forEach((img, i) => {
        const diff = i - focusIndex;
        const offset = diff * spacing;

        img.style.transform = `translateY(${centerY + offset}px) scale(${
          1 - Math.abs(diff) * 0.05
        })`;
        img.style.zIndex = imgs.length - Math.abs(diff);
        img.style.opacity = 1;
      });
    };

    updateFocus(0);

    let lastY = null;
    gallery.addEventListener("mouseenter", () => {
      lastY = null;
    });

    gallery.addEventListener("mousemove", (e) => {
      if (lastY === null) {
        lastY = e.clientY;
        return;
      }

      const diff = e.clientY - lastY;
      const threshold = 20; // pixlar musen måste flyttas för att byta fokus

      if (diff > threshold) {
        focusIndex = Math.min(focusIndex + 1, imgs.length - 1);
        updateFocus(focusIndex);
        lastY = e.clientY;
      } else if (diff < -threshold) {
        focusIndex = Math.max(focusIndex - 1, 0);
        updateFocus(focusIndex);
        lastY = e.clientY;
      }
    });

    gallery.addEventListener("mouseleave", () => (lastY = null));
  });
  clickableImgs();
  uploadModal();
  createGalleryModal();
  clickableImgs();
};

const clickableImgs = () => {
  let currentImgs = [];
  let curIndex = 0;
  const modal = document.querySelector("#imageModal");
  const modalImg = document.querySelector("#modalImg");
  const spanClose = document.querySelector(".modal .close");
  const spanNext = document.querySelector("#span-next");
  const spanPrev = document.querySelector("#span-prev");

  const spanImageNo = document.querySelector("#image-no");

  let imageNo;

  document.querySelectorAll(".gallery").forEach((gallery) => {
    const imgs = [...gallery.querySelectorAll("img")];

    imgs.forEach((img, idx) => {
      img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;

        currentImgs = imgs;
        curIndex = idx;
        spanImageNo.textContent = `${curIndex + 1} / ${currentImgs.length}`;
      });
    });
  });

  // Stäng modal när man klickar på X
  spanClose.addEventListener("click", () => {
    modal.style.display = "none";
    spanImageNo.style.textContent = "";
  });

  // Stäng modal när man klickar utanför bilden
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      spanImageNo.style.textContent = "";
    }
  });
  spanNext.addEventListener("click", () => {
    if (currentImgs.length === 0) return;

    curIndex++;
    if (curIndex >= currentImgs.length) {
      curIndex = 0;
    }
    spanImageNo.textContent = `${curIndex + 1} / ${currentImgs.length}`;
    modalImg.src = currentImgs[curIndex].src;
  });

  spanPrev.addEventListener("click", () => {
    curIndex = (curIndex - 1 + currentImgs.length) % currentImgs.length;

    spanImageNo.textContent = `${curIndex + 1} / ${currentImgs.length}`;
    modalImg.src = currentImgs[curIndex].src;
  });

  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "block") return;

    if (e.key === "ArrowRight") {
      curIndex++;
    }
    if (curIndex >= currentImgs.length) {
      curIndex = 0;
    }

    if (e.key === "ArrowLeft") {
      curIndex = (curIndex - 1 + currentImgs.length) % currentImgs.length;
    }
    spanImageNo.textContent = `${curIndex + 1} / ${currentImgs.length}`;
    modalImg.src = currentImgs[curIndex].src;
  });
};

const uploadModal = () => {
  const modal = document.getElementById("uploadModal");
  const openBtn = document.getElementById("openUploadModal");
  const closeBtn = document.getElementById("closeUploadModal");
  const cancelBtn = document.getElementById("cancelUpload");

  const form = modal.querySelector("form");

  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(
      parseFloat(e.currentTarget[0].files[0].size / 1000000).toFixed(2),
      "MB"
    );
  });
};

const createGalleryModal = () => {
  const modal = document.getElementById("createGalleryModal");
  const openBtn = document.getElementById("createGalleryBtn");
  const closeBtn = document.getElementById("closeCreateGalleryModal");
  const cancelBtn = document.getElementById("cancelCreateGallery");

  const form = document.getElementById("createGalleryForm");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      if (modal) modal.style.display = "block";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const galleryName = document.getElementById("galleryName")?.value;
      const galleryDescription = document.getElementById("galleryDescription")?.value;

      // For now, just show an alert with the gallery info
      alert(`Gallery "${galleryName}" created!\nDescription: ${galleryDescription || 'None'}`);

      // Reset form and close modal
      form.reset();
      if (modal) modal.style.display = "none";
    });
  }
};

document.addEventListener("DOMContentLoaded", initImage);
