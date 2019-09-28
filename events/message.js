const config = require('../config.json');
const seed = require('../commands/seed');
const join = require('../commands/join');
const leave = require('../commands/leave');
const ready = require('../commands/ready');
const unready = require('../commands/unready');
const done = require('../commands/done');
const forfeit = require('../commands/forfeit');
const offset = require('../commands/offset');
const reset = require('../commands/reset');
const rematch = require('../commands/rematch');

module.exports = (client, race, message) => {
    const channel = client.channels.find(x => x.name === config.channel);

    if (message.channel === channel && message.content === '.seed' || message.content === '!seed') {
        return seed(message, channel);
    }
    if (message.channel === channel && message.content === '.join' || message.content === '!join') {
        return join(message, race, channel);
    }
    if (message.channel === channel && message.content === '.leave' || message.content === '!leave') {
        return leave(message, race, channel);
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
    if (message.channel === channel && message.content === '.rematch' || message.content === '!rematch') {
        return rematch(message, race, channel);
    }
    if (message.channel === channel && message.content.startsWith('.offset') || message.content.startsWith('!offset')) {
        return offset(message, race, channel);
    }
    if (message.channel === channel && message.content === '.reset' || message.content === '!reset') {
        return reset(message, race, channel);
    }
    //change reset to keep players and add a different reset(new race)
};