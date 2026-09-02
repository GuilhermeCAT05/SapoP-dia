const toggleButton = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const content = document.querySelector(".content");
const imageCard = document.querySelector(".image-card");
const expandableImages = Array.from(document.querySelectorAll(".image-box img, .map-img"));

function isMobile() {
    return window.innerWidth <= 768;
}

function closeMenu() {
    sidebar.classList.remove("active");
    toggleButton.textContent = "☰";
    toggleButton.setAttribute("aria-expanded", "false");
}

function createImageModal() {
    const overlay = document.createElement("div");
    overlay.className = "image-modal-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
        <div class="image-modal-dialog" role="dialog" aria-modal="true">
            <button class="image-modal-close" type="button" aria-label="Fechar imagem">×</button>
            <img class="image-modal-content" src="" alt="" />
        </div>
    `;

    document.body.appendChild(overlay);

    const dialog = overlay.querySelector(".image-modal-dialog");
    const image = overlay.querySelector(".image-modal-content");
    const closeButton = overlay.querySelector(".image-modal-close");

    const open = (src, alt) => {
        image.src = src;
        image.alt = alt;
        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    };

    const close = () => {
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    };

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            close();
        }
    });

    closeButton.addEventListener("click", close);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            close();
        }
    });

    dialog.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    return { open, close };
}

const imageModal = createImageModal();

expandableImages.forEach((img) => {
    img.addEventListener("click", () => {
        imageModal.open(img.src, img.alt);
    });
});

toggleButton.addEventListener("click", () => {
    if (isMobile()) {
        sidebar.classList.toggle("active");
        const aberto = sidebar.classList.contains("active");
        toggleButton.textContent = aberto ? "✕" : "☰";
        toggleButton.setAttribute("aria-expanded", aberto);
    } else {
        sidebar.classList.toggle("expanded");
        sidebar.classList.toggle("semi-collapsed");
        content.classList.toggle("expanded");

        const aberto = sidebar.classList.contains("expanded");
        toggleButton.textContent = aberto ? "✕" : "☰";
        toggleButton.setAttribute("aria-expanded", aberto);
    }
});

window.addEventListener("resize", () => {
    sidebar.classList.remove("active");
    sidebar.classList.remove("expanded");
    sidebar.classList.add("semi-collapsed");
    content.classList.remove("expanded");

    toggleButton.textContent = "☰";
    toggleButton.setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
        if (isMobile()) {
            closeMenu();
        }
    });
});

if (imageCard) {
    imageCard.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    imageCard.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            window.location.href = "index.html";
        }
    });
}
