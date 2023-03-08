const config = require('../config.json');
const data = require('../data/data.js');
const { EmbedBuilder } = require('discord.js');

module.exports = (client, category) => {

    if (!config.leaderboardmessages.find(msg => msg.name === category)) {
        return;
    }
    const boardMessageId = config.leaderboardmessages.find(msg => msg.name === category).id;

    if (!boardMessageId) {
        return;
    }

    let board = data.getCategoryLeaderboard(category);

    let output = '';

    if (board) {
        let outputSize = (board.length > parseInt(config.defaultLeaderboardSize)) ? parseInt(config.defaultLeaderboardSize) : board.length;

        output += '```';
        for (let i = 0; i < outputSize; i++) {
            output += '\n   ' + ((i + 1).toString().padStart(2, " ") + '. ' + board[i].username.replace(/\W/gi, "")).padEnd(24, " ");
            output += (board[i].elo + ' ').padEnd(10, " ");
        }
        output += '```';
    } else {
        output = '```no ranked players yet```';
    }

    const exampleEmbed = new EmbedBuilder()
    .setColor(0x1f0733)
    .setTitle(category + ' Leaderboard')
    .setDescription(output);

    client.guilds.cache.first(1)[0].channels.fetch(config.raceChannelId).then(channel => {
        channel.messages.fetch(boardMessageId).then(msg => msg.edit({ content:"", embeds: [exampleEmbed] }));
    }).catch(console.error);

    console.log("Leaderboard updated!");
};