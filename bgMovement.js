
// Name fade in
const nameFade = document.querySelector("#name");
const nameFadeText = nameFade.innerText.split("");
let additionalTextLength = 0;
nameFade.textContent = "";

for (let i = 0; i < nameFadeText.length; i++) {
    if (nameFadeText[i] == " ") {
        nameFade.innerHTML += "<span class='name-letter'>&nbsp</span>";

        if (additionalTextLength == 0) {
            for (let j = 0; j < 3; j++) {
                nameFade.innerHTML += "<span class='name-letter'></span>";
                additionalTextLength++;
            }
        }
    } else {
        nameFade.innerHTML += "<span class='name-letter'>" + nameFadeText[i] + "</span>";
    }
}

let letter = 0;
let timer = setInterval(() => {
    if (letter < nameFadeText.length + additionalTextLength) {
        nameFade.children[letter].classList.add("name-letter-fade-in");
        letter++;
    } else {
        clearInterval(timer);
    }
}, 100);


// Colored blob movement
/*const blobs = document.querySelectorAll(".blob");

let xTarget = 0;
let yTarget = 0;
const blobPositions = [];

blobs.forEach((blob, index) => {
    blobPositions[index] = { x: 0, y: 0 };
});

document.addEventListener("mousemove", (event) => {
    xTarget = (event.clientX / window.innerWidth) * 256;
    yTarget = (event.clientY / window.innerHeight) * 256;
});

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function animate() {
    blobs.forEach((blob, index) => {
        const speedScale = index * 0.2;

        blobPositions[index].x = lerp(
            blobPositions[index].x,
            xTarget * speedScale,
            0.05
        );

        blobPositions[index].y = lerp(
            blobPositions[index].y,
            yTarget * speedScale,
            0.05
        );

        blob.style.transform = `translate(${blobPositions[index].x}px, ${blobPositions[index].y}px)`;
    });

    requestAnimationFrame(animate);
}

animate();*/