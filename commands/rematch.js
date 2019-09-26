const config = require('../config.json');
const seed = require('../commands/seed');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);

    if (player) {
        race.started = false;
        race.startedAt = null;
        race.initiatedAt = null;
        race.remainingPlayers = 0;
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
            channel.send('Too late for rematch, new race initiated instead.').then().catch(console.error);
        } else {
            channel.send('Rematch initiated.').then().catch(console.error);
        }
        seed(channel);
    }
    return;
};