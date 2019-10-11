const config = require('../config.json');
const updateRaceMessage = require('../common/updateRaceMessage');
const startrace = require('../commands/new');
const data = require('../data/data.js');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);
    const sleep = m => new Promise(r => setTimeout(r, m));

    if (!race.started && !player) {

        if (race.finished || ((Math.floor(((new Date().getTime()) - race.initiatedAt)) / (1000 * 60)) >= parseInt(config.timeoutMinutes))) {
            if (race.messageId) {
                channel.fetchMessage(race.messageId).then(x =>
                    x.clearReactions().then().catch(console.error)).catch(console.error);
            }
            startrace(race, channel, message);
        }

        let newPlayer = {
            username: username,
            finished: false,
            forfeited: false,
            ready: false,
            time: null
        };
        race.players.push(newPlayer);
        race.remainingPlayers += 1;

        if (!race.kadgar) {
            race.kadgar = 'https://kadgar.net/live/';
        }
        let userTwitch = data.getPlayerTwitch(username);
        if (userTwitch) {
            race.kadgar += userTwitch + '/';
        } else {
            race.kadgar += username + '/';
        }

        if (race.messageId) {
            updateRaceMessage(race, channel);
        } else {
            (async() => {
                await sleep(2000);
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