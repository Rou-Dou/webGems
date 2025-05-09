let hamburgerMenu = document.getElementById("hamburger");
let hamburgerDropdown = document.getElementById("dropdown");
let playerName = document.getElementById("PlayerName");
let playerSession;

const userName = "user1"
// const url = "http://192.168.1.166:8080"
const url = "http://localhost:8080"
const getPlayer = "/api/getplayer"
const getToken = "/api/getSessionToken"
const getSession = "/api/getSessionInfo"
const makeGuess = "/api/makeGuess";
const submitButton = document.getElementById("submitButton");

async function getSessionToken() {
    await fetch(`${url}${getToken}`, {method: 'GET'})
    .then((response) => {
        console.log("session token response ----> ", response);
        return response.text();
    })
    .then((data) => {
        console.log("data ---->", data)
        return token = data
    })
}

function decodeReadableStream(stream) {
    return stream.body.getReader().read()
}

function decodeuint8String(string) {
    return new TextDecoder().decode(string)
}


console.log("I will now attempt to get the session token");
let token = getSessionToken()

token.then(async () => {
    console.log("fetching session info");
    playerSession = await fetch(`${url}${getSession}:${token}`, {
        method: "GET"
    })
    .then((value) => {
        decodeReadableStream(value)
        .then(({done, value}) => {
            const sessionObj = JSON.parse(decodeuint8String(value));
            console.log("session object ----> ", sessionObj)
            document.querySelector(".playerPicture").src = sessionObj.headshot;
            return playerSession = sessionObj;
        })
    })
})

submitButton.addEventListener('click', (e) =>{
    console.log(token)
    let userText = document.getElementById("guess");
    const guess = userText.value;
    console.log(userText.value);
    userText.value = "";
    const response = fetch(`${url}${makeGuess}/${token}/${guess}`)
    console.log("response from makeGuess ---->", response)
    response.then((value)=> {
        decodeReadableStream(value)
        .then(({done, value}) => {
            console.log("This is the data ---->", decodeuint8String(value));
        })
    })
});






hamburgerMenu.addEventListener("click", () => {
    if (hamburgerDropdown.classList.contains("hidden")) {
        hamburgerDropdown.classList.remove("hidden");
    }

    else {
        hamburgerDropdown.classList.add("hidden");
    }
});