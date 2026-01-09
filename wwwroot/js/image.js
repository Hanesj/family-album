let focusIndex = 0;
const initImage = () => {
  const galleries = document.querySelectorAll(".gallery");
  galleries.forEach((gallery) => {
    const imgs = [...gallery.querySelectorAll("img")];
    // let focusIndex = 0;

    const updateFocus = (newIndex) => {
      focusIndex = newIndex;
      const spacing = 40;
      const centerY = spacing * focusIndex; // fokus-bildens offset = dess position * spacing

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
};

const layoutGallery = (gallery) => {
  const imgs = [...gallery.querySelectorAll("img")];

  imgs.forEach((img, index) => {
    const offset = index * 80;
    const scale = 2 - index * 0.03;

    img.style.transform = `translateY(${offset}px) scale(${scale})`;
    img.style.zIndex = imgs.length - index;
    img.style.opacity = index > 12 ? 0 : 1;
  });
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

document.addEventListener("DOMContentLoaded", initImage);
