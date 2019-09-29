const config = require('../config.json');
const seed = require('../commands/seed');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, message) => {
    if (!race.started) {
        race.started = false;
        race.finished = false;
        race.startedAt = null;
        race.remainingPlayers = 0;
        race.players = [];
        race.offset = parseInt(config.defaultOffset);
        race.status = 'PRE-RACE: WAITING FOR PLAYERS';
        race.seed = seed();
        channel.send('Race initiated! ' + race.seed).then(x => {
            race.messageId = x.id;
            x.react('➕').then().catch(console.error);
            x.react('✅').then().catch(console.error);
            updateRaceMessage(race, channel);
        }).catch(console.error);
        race.initiatedAt = new Date().getTime();
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};