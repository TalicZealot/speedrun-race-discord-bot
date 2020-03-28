const config = require('../config.json');
const data = require('../data/data.js');

module.exports = (race, channel, message) => {
    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
    let match = message.content.match(/^[.!](\bstats\b)([ ]{0,1})([a-zA-Z 0-9%]{0,30})/i);
    let category = match[3];
    let categories = config.categories;
    let stats = null;
    let player = false;


    if (category) {
        for (let i = 0; i < categories.length; i++) {
            for (let j = 0; j < categories[i].aliases.length; j++) {
                if (category.toLowerCase() == categories[i].aliases[j]) {
                    category = categories[i].name;
                    break;
                }
            }
        }
        stats = data.getCategoryStats(category);
        if (!stats) {
            stats = data.getPlayerStats(category);
            player = true;
        }
    } else {
        console.log("player?");
        category = message.author.username;
        stats = data.getPlayerStats(category);
        player = true;
    }

    let output = '';
    if (stats && player) {
        output += category + ' stats';
        output += '\n Stream: <' + stats.twitch + '>';
        stats.categories.forEach(element => {
            output += '\n' + ('`Category: ' + element.name).padEnd(35, " ") + '`';
            output += '\n' + ('`  Rank: ' + element.rank).padEnd(35, " ") + '`';
            output += '\n' + ('`  Elo: ' + element.elo).padEnd(35, " ") + '`';
            output += '\n' + ('`  Matches: ' + element.matches).padEnd(35, " ") + '`';
        });
    } else if (stats) {
        output += 'Stats:';
        output += '\n`' + centerPad((category), 24) + '`';
        output += '\n`' + (' Players: ' + stats.categoryPlayers).padEnd(24, " ") + '`';
        output += '\n`' + (' Matches: ' + stats.totalRuns).padEnd(24, " ") + '`';
        output += '\n`' + centerPad(('Top 3'), 24) + '`';
        output += '\n`' + ('1.' + stats.top[0].username).padEnd(19, " ") + (stats.top[0].elo + ' ').padEnd(5, " ") + '`';
        output += '\n`' + ('2.' + stats.top[1].username).padEnd(19, " ") + (stats.top[1].elo + ' ').padEnd(5, " ") + '`';
        output += '\n`' + ('3.' + stats.top[2].username).padEnd(19, " ") + (stats.top[2].elo + ' ').padEnd(5, " ") + '`';
    }

    if (stats) {
        channel.send(output).then().catch(console.error);
    }

    message.delete().then().catch(console.error);
    return;
};