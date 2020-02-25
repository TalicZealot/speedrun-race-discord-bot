const config = require('../config.json');
const seed = require('../commands/seed');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, message) => {
    if ((race.tournament && message.member.hasPermission('KICK_MEMBERS', false, false)) || race.tournament == false) {
        if (!race.finished) {
            if (race.category == "Randomizer GSB") {
                race.seed = seed();
            }
            race.started = false;
            race.startedAt = null;
            race.initiatedAt = new Date().getTime();
            race.remainingPlayers = race.players.length;
            race.players.forEach(x => {
                x.finished = false;
                x.forfeited = false;
                x.ready = false;
                x.time = null;
            });
            race.status = 'RESTARTED PRE-RACE: WAITING FOR PLAYERS';
            channel.fetchMessage(race.messageId).then(x => {
                (async() => {
                    await x.clearReactions().then().catch(console.error);
                    await x.react('➕').then().catch(console.error);
                    await x.react('✅').then().catch(console.error);
                })();
            }).catch(console.error);
            updateRaceMessage(race, channel);
        }
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};