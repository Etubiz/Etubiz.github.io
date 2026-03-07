
// PAGE SCROLL SNAP
const scrollContainer = document.querySelector(".ss-container");

function toggleActive(event, shouldActivate) {
    const snapTarget = event.snapTargetBlock;

    Array.from(snapTarget.children).forEach(child => {
        child.classList.toggle("active", shouldActivate);
    });
}

scrollContainer.addEventListener("scrollsnapchanging", (e) => {
    toggleActive(e, false);
});

scrollContainer.addEventListener("scrollsnapchange", (e) => {
    toggleActive(e, true);
});


// CAROUSEL SCROLL SNAP
const carousel = document.getElementById("carousel");

const cardWidth = 360 + 2 * 32; // card width + margin

document.getElementById("carousel-btn-right").onclick = () => {
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
};

document.getElementById("carousel-btn-left").onclick = () => {
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
};