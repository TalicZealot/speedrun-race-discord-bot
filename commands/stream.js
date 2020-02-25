const data = require('../data/data.js');

module.exports = (message, username) => {
    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
    let match = message.content.match(/^[.!]((\bstream\b)|(\btwitch\b)) ([a-zA-Z0-9_]{4,20})/i);
    let stream = match[2];

    data.setPlayerTwitch(username, stream);

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};