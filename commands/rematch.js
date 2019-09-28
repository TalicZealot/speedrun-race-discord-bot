const config = require('../config.json');
const seed = require('../commands/seed');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);

    if (player) {
        race.seed = seed();
        race.started = false;
        race.startedAt = null;
        race.initiatedAt = null;
        race.remainingPlayers = race.players.length;
        race.players.forEach((player) => {
            player.finished = false;
            player.forfeited = false;
            player.ready = false;
            player.time = null;
        });
        race.offset = parseInt(config.defaultOffset);
        race.initiatedAt = new Date().getTime();
        if (((new Date().getTime() - race.startedAt) / 1000) > parseInt(config.rematchTimeoutSeconds)) {
            race.players = [];
            channel.send('Too late for rematch, new race initiated instead.').then(x => {
                race.messageId = x.id;
                updateRaceMessage(race, channel);
            }).catch(console.error);
        } else {
            channel.send('Rematch initiated.').then(x => {
                race.messageId = x.id;
                updateRaceMessage(race, channel);
            }).catch(console.error);
        }
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};