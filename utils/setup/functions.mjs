import mysql from "mysql2/promise";
import crypto from "crypto";
import { Player, Session, Log } from "./classes.mjs";
import { players } from "../../resources/resources.mjs";
import moment from "moment";

export function log(arg, code) {
    const timestamp = moment().format("MM/DD/YYYY, HH:mm:ss:SSS");

    const newLog = new Log(timestamp, arg, code);

    console.log(newLog.getLog());
}

export async function getAllPlayers() {
    let connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Wgtfyghtf90)",
        database: "testdb"
   })
    connection.connect();

    const [results, fields] = await connection.query(`SELECT * FROM playerinfo;`);

    connection.end();

    if (results.length != 0) {
        return results;
    }
    else {
        console.error('no player, AHAAAHAHHH');
        return null;
    }
}

export async function generateNewSession() {
    const randPlayers = getRandomPlayer(players);
    const newSession = new Session(crypto.randomUUID(), randPlayers);
        
    if (newSession.sessionInfo.sessionID != "") {
        return newSession
    }
    else {
        console.error("Weird error!");
        return new Session("");
    }

    
};

export function searchSession(sessions, token) {
    console.log("searchSession");
    let i = 0;
    for (let session of sessions) {
        console.log("Session ----> ", session);
        console.log("token ----> ", token);
        if (token === session.sessionInfo.sessionID && session.sessionStatus.active) {
            console.log("token matched and active!");
            return {
                sessionObj: session,
                index: i
            };
        }
        i += 1
    };
    console.error("oh no");
    return new Session(null, null);
}

// Retrieves a random player from a list of players. Used as the answer for a given session
export function getRandomPlayer(players) {

    let playerList = []

    while (playerList.length < 3) {

        const randIndex = Math.round(Math.random(players.length) * players.length);

        const selectedPlayer = players[randIndex];

        const playerName = selectedPlayer.Player.replace("\ufeff", "").trim();
        const playerHeadshot = selectedPlayer.Headshot.replace("&comma;", ",").trim();
        const playerPosition = selectedPlayer.Pos;
        const playerTeam = selectedPlayer.Team.trim();
        const playerWar = selectedPlayer.WAR;
        const playerGames = selectedPlayer.G;
        const playerHomeruns = selectedPlayer.HR;
        const playerRbi = selectedPlayer.RBI;
        const playerStolenBases = selectedPlayer.SB;
        const playerBattingAvg = selectedPlayer.BA * 1000;

        const playerInfo = new Player(
            playerName, 
            playerHeadshot, 
            playerTeam, 
            playerPosition, 
            playerWar, 
            playerGames, 
            playerHomeruns, 
            playerRbi, 
            playerStolenBases, 
            playerBattingAvg
        );

        console.log("the player ---->", playerInfo);
        playerList.push(playerInfo)
    }

    return playerList
}