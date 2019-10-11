const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);

    if (!race.started && player) {
        player.ready = false;
        updateRaceMessage(race, channel);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};