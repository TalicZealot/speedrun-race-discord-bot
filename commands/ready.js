const startRace = require('../common/startRace');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);

    if (!race.started && player) {
        player.ready = true;

        let allReady = race.players.every(x => x.ready == true);
        if (allReady && race.players.length > 1) {
            startRace(race, channel);
        } else {
            updateRaceMessage(race, channel);
        }
    } else {
        console.log('Player has not joined!');
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};