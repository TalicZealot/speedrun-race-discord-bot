const data = require('../data/data.js');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, message, username) => {
    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
    let match = message.content.match(/^[.!]((\bstream\b)|(\btwitch\b)) ([a-zA-Z0-9_]{4,20})/i);
    let stream = match[4];

    let player = race.players.find(x => x.username === username);
    if (player) {
        let userTwitch = data.getPlayerTwitch(username);
        if (!userTwitch) {
            userTwitch = username;
        }

        race.kadgar = race.kadgar.replace(new RegExp(userTwitch + '/', 'i'), "");

        data.setPlayerTwitch(username, stream);

        race.kadgar += stream + '/';

        updateRaceMessage(race, channel);
    } else {
        data.setPlayerTwitch(username, stream);
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};