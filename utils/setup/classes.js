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
