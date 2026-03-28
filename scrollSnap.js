// Page scroll snap deactivate active state on leaving snap block and activate on entering snap block
const scrollContainer = document.querySelector(".ss-container");

// Keyboard navigation for scroll snap
document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowUp" || e.key === "w") {
        scrollContainer.scrollBy({ 
            top: -scrollContainer.clientHeight, 
            behavior: "smooth" 
        });
    }

    if (e.key === "ArrowDown" || e.key === "s") {
        scrollContainer.scrollBy({ 
            top: scrollContainer.clientHeight, 
            behavior: "smooth" 
        });
    }

    if (e.key === "ArrowRight" || e.key === "d") {
        scrollToCard(getActiveCardIndex() + 1);
    }

    if (e.key === "ArrowLeft" || e.key === "a") {
        scrollToCard(getActiveCardIndex() - 1);
    }

});

const carousel = document.getElementById("carousel");

const cardWidth = 360 + 2 * 32; // card width + margin

/*document.getElementById("carousel-btn-right").onclick = () => {
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
};

document.getElementById("carousel-btn-left").onclick = () => {
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
};*/

const cards = document.querySelectorAll(".carousel-card");
cards.forEach((c) => {
    c.addEventListener("mousemove", function() {
        activateCard(this);
    });
    c.addEventListener("click", function() {
        activateCard(this);
        scrollToCard(getActiveCardIndex());
    });
});


const isPortrait = window.matchMedia("(orientation: portrait)");

const observer = new IntersectionObserver((entries) => {
    if (!isPortrait.matches) return;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateCard(entry.target);
        }
    });
}, {
    root: carousel,
    threshold: 0.6,
});

cards.forEach(card => observer.observe(card));


const carouselInstruction = document.getElementById("carousel-instruction");
function activateCard(currentCard) {
    if (currentCard.classList.contains("active")) return;
    // Remove scroll suggestion arrow
    if (isPortrait.matches && !currentCard.classList.contains("always-active"))
        carouselInstruction.style.display = 'none';
    
    cards.forEach((c) => {
        c.classList.remove("active");
    });
    currentCard.classList.add("active");

    updateButtons();
    updateBackground(currentCard);
}

function getActiveCardIndex() {
    return [...cards].findIndex(card => card.classList.contains("active"));
}

function scrollToCard(index) {
    if (index < 0 || index >= cards.length) return;

    cards.forEach(c => c.classList.remove("active"));
    cards[index].classList.add("active");


    carousel.scrollTo({
        //left: cards[index].offsetLeft - (carousel.clientWidth / 2) + (cards[index].clientWidth / 2),
        left: cards[index].offsetLeft - (carousel.clientWidth / 2) + cards[index].clientWidth,
        behavior: "smooth"
    });

    updateButtons();
    updateBackground(cards[index]);
}

const btnLeft = document.getElementById("carousel-btn-left");
const btnRight = document.getElementById("carousel-btn-right");

btnLeft.onclick = () => {
    scrollToCard(getActiveCardIndex() - 1);
};

btnRight.onclick = () => {
    scrollToCard(getActiveCardIndex() + 1);
};

function updateButtons() {
    const i = getActiveCardIndex();

    btnLeft.disabled = i <= 0;
    btnRight.disabled = i >= cards.length - 1;
}

const bgLayers = document.querySelectorAll(".projects-bg");
let bgIndex = 0;

function updateBackground(card) {
    const newImage = card.dataset.image;

    // Remove active class from current background layer
    bgLayers[bgIndex].classList.remove("active");

    // Cycle to next background layer and update its image
    bgIndex = (bgIndex + 1) % 2;
    const nextLayer = bgLayers[bgIndex];

    // If the new image is empty, clear the background image of the next layer
    if (!newImage) nextLayer.style.backgroundImage = `url()`;
    else nextLayer.style.backgroundImage = 
        `linear-gradient(
            to bottom,
            var(--bg-color),
            var(--bg-color) 4%,
            transparent 20%,
            transparent 80%,
            var(--bg-color) 96%,
            var(--bg-color)
        ),url(${newImage})`;

    // Activate next background layer
    nextLayer.classList.add("active");
}