import { decodeReadableStream, decodeuint8String } from "./helpers.mjs";

let playerName = document.getElementById("PlayerName");
let playerSession;
const userName = "user1";
// export const url = "http://192.168.1.166:8080";
export const url = "http://localhost:8080";
const getPlayer = "/api/getplayer";
const getToken = "/api/getSessionToken";
const getSession = "/api/getSessionInfo";
export const makeGuess = "/api/makeGuess";


async function getSessionToken() {
    await fetch(`${url}${getToken}`, {method: 'GET'})
    .then((response) => {
        console.log("session token response ----> ", response);
        return response.text();
    })
    .then((data) => {
        console.log("data ---->", data);
        return token = data;
    });
}

console.log("Getting the session token");
export let token = getSessionToken();

token.then(async () => {
    console.log("fetching session info");
    playerSession = await fetch(`${url}${getSession}:${token}`, {
        method: "GET"
    })
    .then((value) => {

        if (!value) {
            console.error("bad");
            return null;
        }

        decodeReadableStream(value)
        .then(({done, value}) => {
            const sessionObj = JSON.parse(decodeuint8String(value));
            console.log("session object ----> ", sessionObj);
            document.querySelector(".playerPicture").src = sessionObj.headshot;
            
            document.getElementById("Team").innerText = `Team: ${sessionObj.team}`;
            document.getElementById("Pos").innerText = `Pos: ${sessionObj.position}`;

            return playerSession = sessionObj;
        });
    });
})