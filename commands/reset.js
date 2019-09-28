const config = require('../config.json');
const seed = require('../commands/seed');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (message, race, channel) => {
    if (!race.finished) {
        race.started = false;
        race.startedAt = null;
        race.initiatedAt = null;
        race.remainingPlayers = 0;
        race.players = [];
        race.offset = parseInt(config.defaultOffset);
        race.category = config.defaultCategory;
        race.messageId = null;
        race.seed = seed();
        race.status = 'PRE-RACE: WAITING FOR PLAYERS';

        updateRaceMessage(race, channel);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};