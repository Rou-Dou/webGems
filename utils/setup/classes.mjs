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
    constructor(sessionID, players) {
        this.answers = this.getAnswers(players);
        this.sessionInfo = {
            sessionID: sessionID,
            playersInfo: players,
            sessionStart: moment().toISOString(),
            sessionEnd: "",
        }
        this.sessionStatus = {
            curPlayer: 0,
            strikes: [],
            outs: [],
            active: true
        }
        this.clearNames();
    }

    evalPlay(result) {

        this.sessionStatus.strikes.push(!result);

        if (result || this.sessionStatus.strikes.length == 3) {
            this.sessionStatus.outs.push(!result);
            this.sessionStatus.strikes = [];
            
            if (this.sessionStatus.curPlayer < 2) {
                this.sessionStatus.curPlayer += 1;
            }
        }

        if (this.sessionStatus.outs.length == 3) {
            console.log("Session Ended.")
            this.endSession()
        }
    }

    getAnswers(players) {
        console.log('getAnswers players object ---->', players);
        let playerNames = []
        players.forEach(player => {
            playerNames.push(player.name)
        });

        return playerNames
    }

    endSession() {
        this.sessionEnd = moment().toISOString();
        this.active = false;
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