
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
const blobs = document.querySelectorAll(".blob");

document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / (window.innerWidth - 0.5)) * 128;
    const y = (event.clientY / (window.innerHeight - 0.5)) * 128;

    blobs.forEach((blob, index) => {
        const speedScale = (index + 1) * 0.2;
        blob.style.transform = `translate(${x * speedScale}px, ${y * speedScale}px)`;
        console.log(blob.style.transform);
    });
});
