const config = require('../config.json');

module.exports = (channel, message) => {
    const sleep = m => new Promise(r => setTimeout(r, m));
    let match = message.content.match(/^[.!](\baliases\b)([ ]{0,1})("[a-zA-Z0-9% ]{0,40}"){0,1}/i);
    let category = '';
    let categories = config.categories;
    let output = 'Aliases for:';

    if (match[3]) {
        category = match[3].replace(/"/ig, '');

        output += ('\n `Category: ' + category + ' ').padEnd(64, " ") + '`';
        let found = categories.find(element => element.name == category);

        if (!found) {
            console.log(category);
            output += '\n `No such category in database!'.padEnd(64, " ") + '`';
        } else {
            output += ('\n `' + '   Aliases: ' + found.aliases).padEnd(65, " ") + '`';
        }
    } else {
        output += ('\n `All categories:').padEnd(65, " ") + '`';
        categories.forEach(element => {
        output += ('\n `' + 'Category: ' + element.name).padEnd(65, " ") + '`';
        output += ('\n `' + '   aliases: ' + element.aliases).padEnd(65, " ") + '`';
    });
    }

    channel.send(output).then().catch(console.error);

    if (message) {
        (async() => {
        await sleep(1000);
        message.delete().then().catch(console.error);
        })();
    }
    return;
};