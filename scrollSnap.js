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