import mysql, { Connection } from "mysql2"
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
            active: this.active
        };
    }
}

export function getPlayer() {
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Wgtfyghtf90)",
        database: "testdb"
    });

    connection.connect();

    let player;

    connection.query('SELECT * FROM Players', function(error, results, fields) {
        if (error) throw error;
        player = results[0].FirstName + " " + results[0].LastName
    });

    connection.end();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (player != "") {
                resolve(player)
            }
            else {
                reject("error")
            }
        }, 1500)
    });
}

// export function checkGuess(guess) {

// }

export function generateNewSession() {
    const newSession = new Session(crypto.randomUUID());

    return new Promise((resolve, reject) => {
        if (newSession.sessionID != "") {
            resolve(newSession)
        }
        else {
            reject("Weird error!")
        }
    })
}

export function searchSession(sessions, token) {
    for (let session of sessions) {
        console.log("sessions: ", sessions)
        console.log("session: ", session)
        console.log("argument token: ", token)
        if (token == session.sessionID && 
            session.active) {
                console.log("session token matched and active!")
            
            return new Promise((resolve, reject) => {
                resolve(session)
            })
        }
    }
    return new Promise((resolve, reject) => {
        console.log("No Match");
        reject("No Match");
    })
}

