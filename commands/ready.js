const startRace = require('../common/startRace');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);

    if (!race.started && player) {
        player.ready = true;

        let allReady = race.players.every(x => x.ready == true);
        if (allReady && race.players.length > 1) {
            startRace(race, channel);
        } else {
            let playersReady = race.players.filter(x => x.ready == true).length;
            channel.send(playersReady + '/' + race.players.length + ' players ready').then().catch(console.error);
        }
        return;
    }

    return;
};