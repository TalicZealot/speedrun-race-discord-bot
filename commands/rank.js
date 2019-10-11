const config = require('../config.json');
const data = require('../data/data.js');

const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (channel, message, username) => {
    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
    let match = message.content.match(/^[.!](\brank\b) ([ a-zA-Z0-9%]{0,20})/i);
    let category = match[2];
    let categories = config.categories;
    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].aliases.length; j++) {
            if (category == categories[i].aliases[j]) {
                category = categories[i].name;
                break;
            }
        }
    }

    let board = data.getCategoryLeaderboard(category);

    if (board) {
        let playerRank = board.map(function(e) { return e.username; }).indexOf(username);
        let output = '`Rank in ' + category + ': ';
        if (playerRank > -1) {
            output += (playerRank + 1) + '`';
        } else {
            output += 'unranked `';
        }

        channel.send(centerPad(output, 24)).then().catch(console.error);
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};