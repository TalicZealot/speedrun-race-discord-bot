const config = require('../config.json');
const elo = require('../elo/elo.js');

module.exports = (channel, message) => {
    if (message.member.hasPermission('KICK_MEMBERS', false, false) || config.referees.includes(message.author.username)) {
        let match = message.content.match(/^[.!](\bsubmit\b)(( "[a-zA-Z0-9% .]{3,20}"){3,18})( end)/i);
        let categoryAndPlayers = [...match[2].matchAll(/"([a-zA-Z0-9% .]{1,20})"/ig)];
        let players = [];
        let category = categoryAndPlayers[0][1];
        const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);

        for (let i = 1; i < categoryAndPlayers.length; i++) {
            let checkForfeit = categoryAndPlayers[i][1].match(/^[.](\bforfeit\b) ([a-zA-Z0-9% ]{3,20})/i);
            if (checkForfeit) {
                players.push({
                    username: checkForfeit[2],
                    forfeited: true
                });
            } else {
            players.push({username: categoryAndPlayers[i][1]});
            }
        }
        let adjustments = elo.resolveMatch(players, category);

        let output = 'Results submitted:';
        output += '\n`' + centerPad(('Adjustments:'), 24) + '`';
        output += '\n`' + centerPad(('Category: ' + category), 24) + '`';
        for (let i = 0; i < players.length; i++) {
            output += '\n';
            output += ('` ' + players[i].username.replace(/\W/gi, "").replace(/.forfeit/gi, "")).padEnd(20, " ");
            output += (' ' + ((adjustments[i] > 0) ? '+' + adjustments[i] : adjustments[i])).padEnd(5, " ");
            output += '`';
        }
        channel.send(output).then().catch(console.error);
    } else {
        channel.send('Moderator level permissions are required to use this command!').then().catch(console.error);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};