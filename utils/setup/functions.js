import mysql from "mysql2/promise"
import crypto from "crypto"

export class Player {
    constructor(session, name, guess = "") {
        this.sessionID = session;
        this.name = "";
        this.guess = "";
        this.online = true;
    }
}

export class Session {
    constructor(sessionID) {
        this.sessionID = sessionID;
        this.sessionStart = Date.now();
        this.sessionEnd = Date.now();
        this.answer = "";
        this.headshot = ""
        this.active = true;
    }

    endSession() {
        this.sessionEnd = Date.now();
        this.active = false;
    }

    toJSON() {
        return {
            sessionID: this.sessionID,
            sessionStart: this.sessionStart,
            sessionEnd: this.sessionEnd,
            answer: this.answer,
            headshot: this.headshot,
            active: this.active
        };
    }
}

export async function getPlayer() {
    console.log("getPlayer")
    let connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Wgtfyghtf90)",
        database: "testdb"
   })

    connection.connect();

    // get random value for player

    const [results, fields] = await connection.query(`SELECT * FROM Players`);

    const randIndex = Math.round(Math.random(results.length) * results.length)

    const playerName = results[randIndex].PlayerName.replace("\ufeff", "").trim();
    const playerHeadshot = results[randIndex].Headshot.replace("&comma;", ",").trim();
    const playerInfo = {
        name: playerName,
        headshot: playerHeadshot
    };

    connection.end();

    if (playerName != "") {
        return playerInfo
    }
    else {
        console.error('no player, AHAAAHAHHH');
        return null;
    }
}

// export function checkGuess(guess) {

// }

export function generateNewSession() {
    const newSession = new Session(crypto.randomUUID());
    return getPlayer()
    .then((value) => {
        console.log("Promise value of PlayerName from GetPlayer: ", value)
        newSession.answer = value.name
        newSession.headshot = value.headshot

        if (newSession.sessionID != "") {
            return newSession
        }
        else {
            console.error("Weird error!");
            return new Session("")
        }
    })
};

export function searchSession(sessions, token) {
    console.log("searchSession")
    for (let session of sessions) {
        console.log("Session ----> ", session);
        console.log("token ----> ", token)
        if (token === session.sessionID && session.active) {
            console.log("token matched and active!");
            return session
        }
    }
    console.error("oh no")
    return new Session("")
}

