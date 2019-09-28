const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);

    if (race.started && player && !player.finished && !player.forfeited) {
        player.finished = true;
        let time = new Date().getTime() - race.startedAt;
        if (time < 0) {
            time = 0;
        }
        player.time = time;
        race.remainingPlayers -= 1;
        let seconds = Math.floor((time / 1000) % 60);
        let minutes = Math.floor((time / (1000 * 60)) % 60);
        let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        let outputTime = hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ':' + seconds.toString().padStart(2, "0");
        if (race.remainingPlayers < 1) {
            race.finished = true;
            race.status = 'RACE FINISHED';
        }
        updateRaceMessage(race, channel);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};