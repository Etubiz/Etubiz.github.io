// Page scroll snap deactivate active state on leaving snap block and activate on entering snap block
const scrollContainer = document.querySelector(".ss-container");

/*function toggleActive(event, shouldActivate) {
    const snapTarget = event.snapTargetBlock;

    Array.from(scrollContainer.children).forEach(child => {
        child.classList.toggle("active", shouldActivate);
    });
}

scrollContainer.addEventListener("scrollsnapchanging", (e) => {
    toggleActive(e, false);
});

scrollContainer.addEventListener("scrollsnapchange", (e) => {
    toggleActive(e, true);
});*/

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


// Carousel scroll buttons
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
});


const isPortrait = window.matchMedia("(orientation: portrait)");

/*function isElementInViewportMiddle(element) {
    const rect = element.getBoundingClientRect();

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const elementMiddleY = rect.top + rect.height / 2;
    const elementMiddleX = rect.left + rect.width / 2;

    const viewportMiddleY = viewportHeight / 2;
    const viewportMiddleX = viewportWidth / 2;

    // Allow some tolerance
    const tolerance = 50;

    return (
        Math.abs(elementMiddleY - viewportMiddleY) < tolerance &&
        Math.abs(elementMiddleX - viewportMiddleX) < tolerance
    );
}*/

/*carousel.addEventListener("scrollsnapchange", function() {
    if (!isPortrait.matches) return;

    cards.forEach((c) => {
        if (c.getBoundingClientRect().x < 64) {
            activateCard(c);
        }
    });
});*/

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


function activateCard(currentCard) {
    if (currentCard.classList.contains("active")) return;
    
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

updateButtons();
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