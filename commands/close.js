const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, message, channel) => {

    if (race.messageId) {
        race.finished = true;
        race.status = 'RACE CLOSED';
        channel.fetchMessage(race.messageId).then(x =>
            x.clearReactions().then().catch(console.error)).catch(console.error);
        updateRaceMessage(race, channel);
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};