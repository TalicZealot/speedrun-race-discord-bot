const finishRace = require('../common/finishRace');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);

    if (race.started && player && !player.finished && !player.forfeited) {
        player.forfeited = true;

        race.remainingPlayers -= 1;

        channel.send(message.author.username + ' has forfeited the race.').then().catch(console.error);

        if (race.remainingPlayers < 1) {
            finishRace(race, channel);
        }

        return;
    }

    return;
};