const startRace = require('../common/startRace');

module.exports = (message, race, channel) => {
    var player = race.players.find(x => x.username === message.author.username);

    if (!race.started && player) {
        player.ready = true;

        var allReady = race.players.every(x => x.ready == true);
        if (allReady && race.players.length > 1) {
            startRace(race, channel);
        }

        return;
    }

    return;
};