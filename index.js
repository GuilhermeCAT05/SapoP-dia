const toggleButton = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const content = document.querySelector(".content");
const slideshowImage = document.getElementById("slideshow-image");

const images = [
    { src: "./images/Perereca.jpg", alt: "Perereca" },
    { src: "./images/Ra.jpg", alt: "Rã" },
    { src: "./images/Sapo.jpg", alt: "Sapo" }
];

let currentIndex = 0;

function isMobile() {
    return window.innerWidth <= 768;
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

document.querySelectorAll(".sidebar-nav a").forEach(link => {

    link.addEventListener("click", () => {

        if (isMobile()) {

            sidebar.classList.remove("active");

            toggleButton.textContent = "☰";
            toggleButton.setAttribute("aria-expanded", "false");

        }

    });

});

if (slideshowImage) {

    setInterval(() => {

        currentIndex = (currentIndex + 1) % images.length;

        slideshowImage.src = images[currentIndex].src;
        slideshowImage.alt = images[currentIndex].alt;

    }, 10000);

}