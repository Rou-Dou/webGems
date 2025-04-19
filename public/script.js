let hamburgerMenu = document.getElementById("hamburger");
let hamburgerDropdown = document.getElementById("dropdown");
let playerName = document.getElementById("PlayerName");
const url = "http://192.168.1.166:8080"
const getPlayer = "/getplayer"
const submitButton = document.getElementById("submitButton");

hamburgerMenu.addEventListener("click", () => {
    if (hamburgerDropdown.classList.contains("hidden")) {
        hamburgerDropdown.classList.remove("hidden");
    }

    else {
        hamburgerDropdown.classList.add("hidden");
    }
});

window.onload = (e) => {
    console.log("event: ", e);
    playerName.innerText = fetch(`${url}${getPlayer}`);
}

submitButton.addEventListener('click', (e) =>{
    let userText = document.getElementById("guess");
    const guess = userText.innerText
    console.log(userText)
    userText.innerText = "";
});

