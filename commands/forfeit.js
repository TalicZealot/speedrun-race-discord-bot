const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);

    if (race.started && player && !player.finished && !player.forfeited) {
        player.forfeited = true;

        race.remainingPlayers -= 1;

        if (race.remainingPlayers < 1) {
            race.finished = true;
            race.status = 'RACE FINISHED';
            const raceMessage = channel.fetchMessage(race.messageId).then(x =>
                x.clearReactions().then(y => {
                    x.react('♻️').then().catch(console.error);
                }).catch(console.error)).catch(console.error);
        }

        updateRaceMessage(race, channel);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};