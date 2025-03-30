document.getElementById("hamburger").addEventListener("click", () => {
    if (document.getElementById("dropdown").classList.contains("hidden")) {
        document.getElementById("dropdown").classList.remove("hidden");
    }

    else {
        document.getElementById("dropdown").classList.add("hidden");
    }
});

document.getElementById("submitButton").addEventListener('click', (e) =>{
    const guess = document.getElementById("guess").value

    document.getElementById("guess").value = ""

})

// async function makeGuess(guess) {
//     const https://
//     await fetch()
// }