const config = require('../config.json');
const data = require('../data/data.js');

module.exports = (client, category) => {
    let channel = client.guilds.cache.first(1)[0].channels.fetch(config.raceChannelId);
    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
    let board = data.getCategoryLeaderboard(category);
    let output = 'Leaderboard';
    output += '\n   `' + centerPad(('Category: ' + category), 34) + '`';

    if (board) {
        let outputSize = (board.length > parseInt(config.defaultLeaderboardSize)) ? parseInt(config.defaultLeaderboardSize) : board.length;

        for (let i = 0; i < outputSize; i++) {
            output += '\n   `' + ((i + 1).toString().padStart(2, " ") + '. ' + board[i].username.replace(/\W/gi, "")).padEnd(24, " ");
            output += (board[i].elo + ' ').padEnd(10, " ") + '`';
        }
    }

    channel.then(channel => {
        channel.send(output).then(msg => {
            config.leaderboardmessages.find(msg => msg.name === category).id = msg.id;
            console.log('Leaderboard message created! id: ' +  msg.id);
        })
    }).catch(console.error);
};