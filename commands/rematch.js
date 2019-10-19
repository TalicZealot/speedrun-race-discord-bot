const config = require('../config.json');
const seed = require('../commands/seed');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);

    if (player && race.finished) {
        if (race.category == "Randomizer GSB") {
            race.seed = seed();
        }
        race.started = false;
        race.finished = false;
        race.remainingPlayers = race.players.length;
        race.players.forEach((player) => {
            player.finished = false;
            player.forfeited = false;
            player.ready = false;
            player.time = null;
        });
        race.initiatedAt = new Date().getTime();
        if (((new Date().getTime() - race.startedAt) / 1000) > parseInt(config.rematchTimeoutSeconds)) {
            console.log((new Date().getTime() - race.startedAt) / 1000);
            race.startedAt = null;
            race.players = [];
            channel.send('Too late for rematch, new race initiated instead.').then(x => {
                race.status = 'PRE-RACE: WAITING FOR PLAYERS';
                race.messageId = x.id;
                (async() => {
                    await x.react('➕').then().catch(console.error);
                    await x.react('✅').then().catch(console.error);
                })();
                updateRaceMessage(race, channel);
            }).catch(console.error);
        } else {
            channel.send('Rematch initiated.').then(x => {
                race.status = 'REMATCH PRE-RACE: WAITING FOR PLAYERS';
                race.startedAt = null;
                race.messageId = x.id;
                (async() => {
                    await x.react('➕').then().catch(console.error);
                    await x.react('✅').then().catch(console.error);
                })();
                updateRaceMessage(race, channel);
            }).catch(console.error);
        }
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};