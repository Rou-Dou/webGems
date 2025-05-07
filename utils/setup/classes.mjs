import moment from "moment";

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
        this.sessionStart = moment().toISOString()
        this.sessionEnd = ""
        this.answer = "";
        this.headshot = "";
        this.active = true;
    }

    endSession() {
        this.sessionEnd = moment().toISOString();
        this.active = false;
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