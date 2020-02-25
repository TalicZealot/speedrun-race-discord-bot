const config = require('../config.json');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, message, channel) => {
    if ((race.tournament && message.member.hasPermission('KICK_MEMBERS', false, false)) || race.tournament == false) {
        if (race.messageId && !race.finished && (Math.floor(((new Date().getTime()) - race.initiatedAt)) / (1000 * 60)) > parseInt(config.minimumNewIntervalMinutes)) {
            race.finished = true;
            race.status = 'RACE CLOSED';
            channel.fetchMessage(race.messageId).then(x =>
                x.clearReactions().then().catch(console.error)).catch(console.error);
            updateRaceMessage(race, channel);
        } else if (race.messageId && !race.finished) {
            channel.send('Can\'t close race this soon!').then().catch(console.error);
        }
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};