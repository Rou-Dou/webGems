let hamburgerMenu = document.getElementById("hamburger");
let hamburgerDropdown = document.getElementById("dropdown");
let playerName = document.getElementById("PlayerName");
const userName = "user1"
const url = "http://192.168.1.166:8080"
const getPlayer = "/getplayer"
const getToken = "/getSessionToken"
const getSession = "/getSessionInfo"
const submitButton = document.getElementById("submitButton");
const getSessionToken = async () => {
    await fetch(`${url}${getToken}`, {method: 'GET'})
    .then((response) => {
        return response.text();
    }).then((data) => {
        return token = data;
    })
}

let token = getSessionToken();

function decodeuint8String(string) {
    return new TextDecoder().decode(string)
}

hamburgerMenu.addEventListener("click", () => {
    if (hamburgerDropdown.classList.contains("hidden")) {
        hamburgerDropdown.classList.remove("hidden");
    }

    else {
        hamburgerDropdown.classList.add("hidden");
    }
});

window.onload = (async (e) => {
    // get player info to fill on web page
    console.log("fetching player info");
    const response = await fetch(`${url}${getPlayer}`)
    console.log("this is the response: ", response);
    response.body.getReader().read().then(({done, value}) => {
        console.log(decodeuint8String(value))
        const pn = decodeuint8String(value)
        playerName.innerText = pn
    });

    // get session info to 
    console.log("fetching session info");
    console.log(token)
    const sessionInfo = await fetch(`${url}${getSession}:${token}`, {
        method: "GET"
    }).then((value) => {
        value.body.getReader().read().then(({done, value}) => {
            console.log(value)
            return decodeuint8String(value)
        })
    })
});

submitButton.addEventListener('click', (e) =>{
    let userText = document.getElementById("guess");
    const guess = userText.value
    console.log(userText.value)
    userText.value = "";
});