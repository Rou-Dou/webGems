import { getAllPlayers } from "../utils/setup/functions.mjs"

export const players = await getAllPlayers()
.then((data) => {
    return data
})

export const playerNames = await getAllPlayers()
.then((data) => {
    let playerNameList = []

    for (let p of data) {
        playerNameList.push(p.Player.replace("\ufeff", "").trim());
    }

    console.log("retrieved list of player names")

    return playerNameList
})