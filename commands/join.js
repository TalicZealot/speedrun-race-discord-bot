const config = require('../config.json');
const updateRaceMessage = require('../common/updateRaceMessage');
const startrace = require('../commands/new');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);
    const sleep = m => new Promise(r => setTimeout(r, m));

    if (!race.started && !player) {

        if (race.finished || ((Math.floor(((new Date().getTime()) - race.initiatedAt)) / (1000 * 60)) >= parseInt(config.timeoutMinutes))) {
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