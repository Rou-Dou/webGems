import { decodeReadableStream, decodeuint8String } from "./helpers.mjs";

const userName = "user1";
export const url = "http://192.168.1.166:8080";
// export const url = "http://localhost:8080";
export const makeGuess = "/api/makeGuess";
const getToken = "/api/getSessionToken";
const getSession = "/api/getSessionInfo";
const getPlayerList = "/api/getPlayerList";

export let playerNames = fetch(`${url}${getPlayerList}`)
.then((value) => {
    // console.log("this is the player names client side ---->", value)
    return decodeReadableStream(value)
    .then((value) => {
        // console.log("this is the playerNames post decode ---->", value)

        return decodeuint8String(value)
    })
})


async function getSessionToken() {
    await fetch(`${url}${getToken}`, {method: 'GET'})
    .then((response) => {
        // console.log("session token response ----> ", response);
        return response.text();
    })
    .then((data) => {
        // console.log("data ---->", data);
        return token = data;
    });
}

console.log("Getting the session token");
export let token = getSessionToken();

token.then(async () => {
    console.log("fetching session info");
    await fetch(`${url}${getSession}/${token}`, {
        method: "GET"
    })
    .then((value) => {

        if (!value) {
            console.error("bad");
            return null;
        }
        decodeReadableStream(value)
        .then((value) => {
            
            const parsedData = JSON.parse(decodeuint8String(value))
            const playerInfoList = document.querySelectorAll(".playerInfoListItem")

            document.querySelector(".playerPicture").src = parsedData.playerInfo.headshot

            for (let listItem of playerInfoList) {
                listItem.innerText = parsedData.playerInfo[listItem.id]
            }

        })
    })
});