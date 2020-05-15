const updateRaceMessage = require('../common/updateRaceMessage');
const config = require('../config.json');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);
    let match = message.content.match(/^[.!](\bsetseed\b) ([a-zA-Z0-9_%]{4,20})/i);
    let seed = match[2];

    if (!race.started && (player || config.referees.includes(message.author.username))) {
        race.seed = race.seed.match(/^https:[\/a-zA-Z0-9_%.]{3,20}[?]{1}/i)[0] + seed + '>';
        updateRaceMessage(race, channel);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};