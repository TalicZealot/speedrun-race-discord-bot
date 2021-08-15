const config = require('../config.json');
const data = require('../data/data.js');

module.exports = (client, category) => {

    if (!config.leaderboardmessages.find(msg => msg.name === category)) {
        return;
    }
    const boardMessageId = config.leaderboardmessages.find(msg => msg.name === category).id;

    if (!boardMessageId) {
        return;
    }

    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);

    let board = data.getCategoryLeaderboard(category);

    if (board) {
        let output = 'Leaderboard';
        output += '\n   `' + centerPad(('Category: ' + category), 34) + '`';

        let outputSize = (board.length > parseInt(config.defaultLeaderboardSize)) ? parseInt(config.defaultLeaderboardSize) : board.length;

        for (let i = 0; i < outputSize; i++) {
            output += '\n   `' + ((i + 1).toString().padStart(2, " ") + '. ' + board[i].username.replace(/\W/gi, "")).padEnd(24, " ");
            output += (board[i].elo + ' ').padEnd(10, " ") + '`';
        }

        client.guilds.cache.first(1)[0].channels.fetch(config.raceChannelId).then(channel => {
            channel.messages.fetch(boardMessageId).then(msg => msg.edit(output));
        }).catch(console.error);
    }
};