const finishRace = require('../common/finishRace');

module.exports = (message, race, channel) => {
    var player = race.players.find(x => x.username === message.author.username);

    if (race.started && player && !player.finished && !player.forfeited) {
        player.finished = true;
        var time = new Date().getTime() - race.startedAt;
        player.time = time;
        race.remainingPlayers -= 1;
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / (1000 * 60)) % 60);
        var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        var outputTime = ((hours < 10) ? '0' + hours : hours) + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
        channel.send(message.author.username + ' has finished the race in: ' + outputTime).then().catch(console.error);
        if (race.remainingPlayers < 1) {
            finishRace(race, channel);
        }

        return;
    }

    return;
};