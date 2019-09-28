const config = require('../config.json');
const seed = require('../commands/seed');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);
    const sleep = m => new Promise(r => setTimeout(r, m));

    if (!race.started && !player) {

        if (race.finished || ((Math.floor(((new Date().getTime()) - race.initiatedAt)) / (1000 * 60)) >= parseInt(config.timeoutMinutes))) {
            race.started = false;
            race.finished = false;
            race.startedAt = null;
            race.initiatedAt = null;
            race.remainingPlayers = 0;
            race.players = [];
            race.offset = parseInt(config.defaultOffset);
            race.status = 'PRE-RACE: WAITING FOR PLAYERS';
            race.seed = seed();
            channel.send('Race initiated! ' + race.seed).then(x => race.messageId = x.id).catch(console.error);
            race.initiatedAt = new Date().getTime();
        }

        let newPlayer = {
            username: message.author.username,
            finished: false,
            forfeited: false,
            ready: false,
            time: null
        };
        race.players.push(newPlayer);
        race.remainingPlayers += 1;

        if (race.messageId) {
            updateRaceMessage(race, channel);
        } else {
            (async() => {
                await sleep(1000);
                if (race.messageId) {
                    updateRaceMessage(race, channel);
                }
            })();
        }
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};