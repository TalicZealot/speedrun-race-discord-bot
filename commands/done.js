const finishRace = require('../common/finishRace');

module.exports = (message, race, channel) => {
    var player = race.players.find(x => x.username === message.author.username);

    if (race.started && player && !player.finished && !player.forfeited) {
        player.finished = true;
        var time = new Date().getTime() - race.startedAt;
        player.time = time;
        race.remainingPlayers -= 1;
        channel.send(message.author.username + ' has finished the race.').then().catch(console.error);
        if (race.remainingPlayers < 1) {
            finishRace(race, channel);
        }

        return;
    }

    return;
};