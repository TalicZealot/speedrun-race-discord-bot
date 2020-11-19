const updateRaceMessage = require('../common/updateRaceMessage');
const config = require('../config.json');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);
    let match = message.content.match(/^[.!](\bsetseed\b) ("https:\/\/[a-zA-Z0-9_%\/?,.]{4,70}")/i);
    let seed = match[2].replace(/"/ig, '');

    if (!race.started && (player || config.referees.includes(message.author.username))) {

        race.seed = '<' + seed + '>';
        updateRaceMessage(race, channel);
        console.log('updated');
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};