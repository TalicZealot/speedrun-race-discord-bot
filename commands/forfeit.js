const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);

    if (race.started && player && !player.finished && !player.forfeited) {
        player.forfeited = true;

        race.remainingPlayers -= 1;

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