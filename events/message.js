const config = require('../config.json');
const seed = require('../commands/seed');
const join = require('../commands/join');
const ready = require('../commands/ready');
const unready = require('../commands/unready');
const done = require('../commands/done');
const forfeit = require('../commands/forfeit');
const offset = require('../commands/offset');
const reset = require('../commands/reset');

module.exports = (client, race, message) => {
    const channel = client.channels.find(x => x.name === config.channel);

    if (message.channel === channel && message.content === '.seed' || message.content === '!seed') {
        return seed(channel);
    }
    if (message.channel === channel && message.content === '.join' || message.content === '!join') {
        return join(message, race, channel);
    }
    if (message.channel === channel && message.content === '.ready' || message.content === '!ready') {
        return ready(message, race, channel);
    }
    if (message.channel === channel && message.content === '.unready' || message.content === '!unready') {
        return unready(message, race, channel);
    }
    if (message.channel === channel && message.content === '.done' || message.content === '!done' || message.content === '.time' || message.content === '!time') {
        return done(message, race, channel);
    }
    if (message.channel === channel && message.content === '.forfeit' || message.content === '!forfeit') {
        return forfeit(message, race, channel);
    }
    if (message.channel === channel && message.content.startsWith('.offset') || message.content.startsWith('!offset')) {
        return offset(message, race, channel);
    }
    if (message.channel === channel && message.content.startsWith('.reset') || message.content.startsWith('!reset')) {
        return reset(message, race, channel);
    }
};