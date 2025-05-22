import { decodeReadableStream, decodeuint8String, loadPlayer} from "./helpers.mjs";

const userName = "user1";
// export const url = "http://192.168.1.166:8080";
export const url = "http://localhost:8080";
export const makeGuess = "/api/makeGuess";
const getToken = "/api/getSessionToken";
const getSession = "/api/getSessionInfo";
const getPlayerList = "/api/getPlayerList";

export let playerNames = fetch(`${url}${getPlayerList}`)
    .then((value) => {
        console.log("fetching player names")
        // console.log("this is the player names client side ---->", value)
        return decodeReadableStream(value)
    .then((value) => {
        // console.log("this is the playerNames post decode ---->", value)
        console.log("finished fetching player names")
        return decodeuint8String(value)
    });
})


async function getSessionToken() {
    await fetch(`${url}${getToken}`, {method: 'GET'})
    .then((response) => {
        // console.log("session token response ----> ", response);
        return response.text();
    })
    .then((data) => {
        console.log("finished fetching token");
        return token = data;
    });
}

console.log("Getting the session token");
export let token = getSessionToken();

export const SessionInfo = token.then(async () => {
    console.log("fetching session info");
    return await fetch(`${url}${getSession}/${token}`, {
        method: "GET"
    })
    .then((value) => {

        if (!value) {
            console.error("bad");
            return null;
        }
        return decodeReadableStream(value)  
    })
    .then((value) => {
        const parsedUint = decodeuint8String(value);
        const jsonParsed = JSON.parse(parsedUint)
        console.log("finished fetching session Info")
        return jsonParsed
    })
});

// Load the player info
SessionInfo
.then((value) => {
    loadPlayer(value, 0);
})