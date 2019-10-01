const config = require('../config.json');
const join = require('../commands/join');
const ready = require('../commands/ready');
const done = require('../commands/done');
const forfeit = require('../commands/forfeit');
const rematch = require('../commands/rematch');

module.exports = (client, race, reaction, user) => {
    const channel = client.channels.find(x => x.name === config.channel);

    let reactingUser = race.players.find(x => x.username == user.username);

    if (user.bot) {
        return;
    }

    if (reaction.message.id === race.messageId && reaction.message.channel === channel && reaction.emoji.name === '➕') {
        return join(race, channel, user.username);
    }
    if (reaction.message.id === race.messageId && reactingUser && reaction.message.channel === channel && reaction.emoji.name === '✅') {
        return ready(race, channel, user.username);
    }
    if (reaction.message.id === race.messageId && reactingUser && reaction.message.channel === channel && reaction.emoji.name === '🏁') {
        return done(race, channel, user.username);
    }
    if (reaction.message.id === race.messageId && reactingUser && reaction.message.channel === channel && reaction.emoji.name === '❌') {
        return forfeit(race, channel, user.username);
    }
    if (reaction.message.id === race.messageId && reactingUser && reaction.message.channel === channel && reaction.emoji.name === '↩') {
        return rematch(race, channel, user.username);
    }
};