import moment from "moment";

export class Player {
    constructor(name, headshot, team, position, war, games, homeruns, rbi, stolenBases, battingAvg) {
        console.log(`reating player ${name}`)
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
    constructor(sessionID, players) {
        console.log(`creating new session with \n sessionID: ${sessionID}\n\n and object: ${players}`)
        this.answers = this.getAnswers(players);
        this.sessionInfo = {
            sessionID: sessionID,
            playersInfo: players,
            sessionStart: moment().toISOString(),
            sessionEnd: "",
            curPlayer: 0,
            strikes: [],
            outs: [],
            active: true
        }
        this.clearNames();
    }

    evalPlay(result) {

        this.sessionInfo.strikes.push(!result);

        if (result || this.sessionInfo.strikes.length == 3) {
            this.sessionInfo.outs.push(!result);
            this.sessionInfo.strikes = [];
            
            if (this.sessionInfo.curPlayer < 2) {
                this.sessionInfo.curPlayer += 1;
            }
        }

        if (this.sessionInfo.outs.length == 3) {
            console.log("Session Ended.")
            this.endSession()
        }
    }

    getAnswers(players) {
        console.log('getAnswers players object ---->', players);
        let playerNames = []
        players.forEach(p => {
            playerNames.push(p.name)
        });

        return playerNames
    }

    endSession() {
        this.sessionInfo.sessionEnd = moment().toISOString();
        this.sessionInfo.active = false;
    }

    clearNames() {
        this.sessionInfo.playersInfo.forEach(player => {
            delete player.name
        })
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