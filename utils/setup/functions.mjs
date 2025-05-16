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

    const [results, fields] = await connection.query(`SELECT * FROM Players`);

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
    const newSession = new Session(crypto.randomUUID());
    const randPlayer = getRandomPlayer(players);

    newSession.answer = randPlayer.name;
    newSession.headshot = randPlayer.headshot;
    newSession.team = randPlayer.team;
    newSession.position = randPlayer.position;
    
    if (newSession.sessionID != "") {
        return newSession;
    }
    else {
        console.error("Weird error!");
        return new Session("");
    }
    
};

export function searchSession(sessions, token) {
    console.log("searchSession");
    for (let session of sessions) {
        console.log("Session ----> ", session);
        console.log("token ----> ", token);
        if (token === session.sessionID && session.active) {
            console.log("token matched and active!");
            return session;
        }
    };
    console.error("oh no");
    return new Session("");
}

// Retrieves a random player from a list of players. Used as the answer for a given session
export function getRandomPlayer(players) {

    const randIndex = Math.round(Math.random(players.length) * players.length)

    const playerName = players[randIndex].PlayerName.replace("\ufeff", "").trim();
    const playerHeadshot = players[randIndex].Headshot.replace("&comma;", ",").trim();
    const playerPosition = players[randIndex].STD_POS.trim();
    const playerTeam = players[randIndex].Team.trim();
    const playerInfo = {
        name: playerName,
        headshot: playerHeadshot,
        team: playerTeam,
        position: playerPosition
    };

    console.log("the player ---->", playerInfo);

    return playerInfo;
}