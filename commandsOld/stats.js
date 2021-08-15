const config = require('../config.json');
const data = require('../data/data.js');

module.exports = (race, channel, message) => {
    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
    let match = message.content.match(/^[.!](\bstats\b)([ ]{0,1})([a-zA-Z 0-9%\[\]]{0,30})/i);
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
        console.log(category);
        stats = data.getCategoryStats(category);
        if (!stats) {
            console.log('Category not found with the name '+ category);
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
        for (let i = 0; i < stats.top.length; i++) {
            output += '\n`' + ((i + 1) + '.' + stats.top[i].username).padEnd(19, " ") + (stats.top[i].elo + ' ').padEnd(5, " ") + '`';
            if (i == 3) {
                break;
            }
        }
    }

    if (stats) {
        channel.send(output).then().catch(console.error);
    }

    message.delete().then().catch(console.error);
    return;
};