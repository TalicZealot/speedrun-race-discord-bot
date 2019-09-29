const config = require('../config.json');
const leave = require('../commands/leave');
const unready = require('../commands/unready');

module.exports = (client, race, reaction, user) => {
    const channel = client.channels.find(x => x.name === config.channel);

    let reactingUser = race.players.find(x => x.username == user.username);

    if (user.bot) {
        return;
    }

    if (reaction.message.id === race.messageId && reactingUser && reaction.message.channel === channel && reaction.emoji.name === '➕') {
        return leave(race, channel, user.username);
    }
    if (reaction.message.id === race.messageId && reactingUser && reaction.message.channel === channel && reaction.emoji.name === '✅') {
        return unready(race, channel, user.username);
    }
};