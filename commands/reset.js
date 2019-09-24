const config = require('../config.json');

module.exports = (message, race, channel) => {

    race.started = false;
    race.startedAt = null;
    race.initiatedAt = null;
    race.remainingPlayers = 0;
    race.players = [];
    race.offset = config.defaultOffset;

    channel.send('New race initiated.').then().catch(console.error);
    return;
};