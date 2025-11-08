document.addEventListener("DOMContentLoaded", () => {
  const repoGrid = document.getElementById("repoGrid");
  const modal = document.getElementById("modal");
  const guideFrame = document.getElementById("guideFrame");
  const closeModal = document.getElementById("closeModal");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const modalContent = document.querySelector(".modal-content");

  // Load guide list
  fetch("guides/guides.json")
    .then(res => res.json())
    .then(guides => {
      repoGrid.innerHTML = "";
      guides.forEach(guide => {
        const card = document.createElement("div");
        card.className = "repo-card";
        card.dataset.guide = guide.file;
        card.innerHTML = `<h2>${guide.title}</h2><p>${guide.description}</p>`;
        repoGrid.appendChild(card);

        card.addEventListener("click", () => {
          guideFrame.src = `guides/${guide.file}`;
          modal.classList.remove("hidden");
        });
      });
    })
    .catch(() => {
      repoGrid.innerHTML = "<p>Failed to load guides.</p>";
    });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    guideFrame.src = "";
    modalContent.classList.remove("fullscreen");
    fullscreenBtn.textContent = "🖵";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      guideFrame.src = "";
      modalContent.classList.remove("fullscreen");
      fullscreenBtn.textContent = "🖵";
    }
  });

  // Page-based fullscreen (not browser fullscreen)
  fullscreenBtn.addEventListener("click", () => {
    modalContent.classList.toggle("fullscreen");
    fullscreenBtn.textContent = modalContent.classList.contains("fullscreen") ? "⤢" : "🖵";
  });
});
