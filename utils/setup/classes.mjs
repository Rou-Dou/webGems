import moment from "moment";

export class Player {
    constructor(name, headshot, team, position, war, games, homeruns, rbi, stolenBases, battingAvg) {
        this.name = name;
        this.headshot = headshot;
        this.Team = team;
        this.Pos = position;
        this.WAR = war;
        this.Games = games;
        this.Homeruns = homeruns;
        this.RBI = rbi;
        this.SB = stolenBases;
        this.BA= battingAvg;
    }
}

export class Session {
    constructor(sessionID, player) {
        this.answer = player.name
        this.sessionInfo = {
            sessionID: sessionID,
            playerInfo: player,
            sessionStart: moment().toISOString(),
            sessionEnd: "",
        }
        this.sessionStatus = {
            curPlayer: 0,
            playerGuesses: 0,
            correctGuesses: [null, null, null],
            active: true
        }
        this.clearName();
    }

    endSession() {
        this.sessionEnd = moment().toISOString();
        this.active = false;
    }

    clearName() {
        delete this.sessionInfo.playerInfo.name
    }
    
}

export class Log {
    constructor (timestamp, event, code) {
        this.timestamp = timestamp;
        this.event = event;
        this.code = code;
    };

    getLog() {
        return `${this.timestamp}\nCode: ${this.code}\n\nEvent: ${this.event}`
    };
};