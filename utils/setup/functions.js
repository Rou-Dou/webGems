import jsonData from "../../players.json" with { type: "json"}

export function getPlayer() {
    let numPlayers = Object.keys(jsonData.Name).length
    const randNum = Math.round(Math.random() * numPlayers)
    return jsonData.Name[randNum]
};