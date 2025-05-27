import { loadPlayer } from "./helpers.mjs";

// export const url = "http://192.168.1.166:8080";
export const url = "http://localhost:8080";
export const makeGuess = "/api/makeGuess";
const getToken = "/api/getSessionToken";
export const getSession = "/api/getSessionInfo";
const getPlayerList = "/api/getPlayerList";

window.onload = () => {
    document.querySelectorAll("input").forEach(input => {
        input.value = ""
    })
}

export let playerNames = fetch(`${url}${getPlayerList}`)
    .then((value) => {
        console.log("fetching player names")
        return value.json()
    .then((data) => {
        return data;
    })
})


async function getSessionToken() {
    return await fetch(`${url}${getToken}`, {method: 'GET'})
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        return token = data;
    });
}

console.log("Getting the session token");
export let token = getSessionToken();

token.then(() => {
    loadPlayer();
})
