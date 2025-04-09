let hamburgerMenu = document.getElementById("hamburger");
let hamburgerDropdown = document.getElementById("dropdown");
const submitButton = document.getElementById("submitButton");

hamburgerMenu.addEventListener("click", () => {
    if (hamburgerDropdown.classList.contains("hidden")) {
        hamburgerDropdown.classList.remove("hidden");
    }

    else {
        hamburgerDropdown.classList.add("hidden");
    }
});

submitButton.addEventListener('click', (e) =>{
    let userText = document.getElementById("guess");
    const guess = userText.innerText
    console.log(userText)
    userText.innerText = "";
})

// async function makeGuess(guess) {
//     const https://
//     await fetch()
// }