const config = require('../config.json');
const seed = require('../commands/seed');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, message) => {
    let match = message.content.match(/^[.!]((\bstartrace\b)|(\bnew\b)|(\bjoin\b)|(\benter\b))([ ]{0,1})([a-zA-Z0-9%]{0,20})((\b psx\b)|(\b xb\b)){0,1}/i);
    let category = match[7];
    let offset = match[8];
    let categories = config.categories;
    if (!race.started) {
        if (offset && offset == " psx") {
            race.offset = 10000;
        } else if (offset && offset == " xb") {
            race.offset = 3000;
        } else {
            race.offset = parseInt(config.defaultOffset);
        }
        if (category) {
            race.category = category;
            for (let i = 0; i < categories.length; i++) {
                for (let j = 0; j < categories[i].aliases.length; j++) {
                    if (category == categories[i].aliases[j]) {
                        race.category = categories[i].name;
                        break;
                    }
                }
            }
        } else {
            race.category = config.defaultCategory;
        }
        race.started = false;
        race.finished = false;
        race.startedAt = null;
        race.remainingPlayers = 0;
        race.players = [];
        race.status = 'PRE-RACE: WAITING FOR PLAYERS';
        if (race.category == "Randomizer GSB") {
            race.seed = seed();
        }
        channel.send('Race initiated! ' + race.seed).then(x => {
            race.messageId = x.id;
            x.react('➕').then().catch(console.error);
            x.react('✅').then().catch(console.error);
            updateRaceMessage(race, channel);
        }).catch(console.error);
        race.initiatedAt = new Date().getTime();
    }
    if (message && message.content.match(/^[.!]((\bstartrace\b)|(\bnew\b))/i)) {
        message.delete().then().catch(console.error);
    }
    return;
};