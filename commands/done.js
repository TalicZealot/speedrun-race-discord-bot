const updateRaceMessage = require('../common/updateRaceMessage');
const elo = require('../elo/elo.js');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);

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
            let adjustments = elo.resolveMatch(race.players, race.category);
            for (let i = 0; i < race.players.length; i++) {
                race.players[i].adjustment = adjustments[i];
            }
            const raceMessage = channel.fetchMessage(race.messageId).then(x =>
                (async() => {
                    await x.clearReactions().then().catch(console.error);
                    await x.react('↩').then().catch(console.error);
                })()
            ).catch(console.error);
        }
        updateRaceMessage(race, channel);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};