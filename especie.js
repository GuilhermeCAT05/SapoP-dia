const toggleButton = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const content = document.querySelector(".content");
const imageCard = document.querySelector(".image-card");

function isMobile() {
    return window.innerWidth <= 768;
}

function closeMenu() {
    sidebar.classList.remove("active");
    toggleButton.textContent = "☰";
    toggleButton.setAttribute("aria-expanded", "false");
}

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
