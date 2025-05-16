import { getAllPlayers } from "../utils/setup/functions.mjs"

export const players = await getAllPlayers()
.then((data) => {
    return data
})