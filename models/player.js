module.exports = class Player {
    constructor(username, id) {
        this.id = id;
        this.username = username;
        this.ready = false;
        this.time = null;
        this.forfeited = false;
        this.replaySubmitted = false;
    }

    unready() {
        this.ready = false;
    }

    hours() {
        return Math.floor((this.time / (1000 * 60 * 60)) % 24);
    }

    minutes() {
        return Math.floor((this.time / (1000 * 60)) % 60);
    }

    seconds() {
        return Math.floor((this.time / 1000) % 60);
    }
}