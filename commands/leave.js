const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);

    if (!race.started && player) {
        race.players.splice(race.players.indexOf(player), 1);
        race.remainingPlayers -= 1;

        channel.send(message.author.username + ' has left the race.').then().catch(console.error);

        let allReady = race.players.every(x => x.ready == true);
        if (allReady && race.players.length > 1) {
            startRace(race, channel);
        } else {
            let playersReady = race.players.filter(x => x.ready == true).length;
            updateRaceMessage(race, channel);
        }
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};