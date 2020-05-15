const updateRaceMessage = require('../common/updateRaceMessage');
const config = require('../config.json');
const seed = require('../commands/seed');

module.exports = (race, channel, message) => {
    let match = message.content.match(/^[.!](\bcategory\b) ("[a-zA-Z0-9% ]{0,40}")/i);
    let category = '';
    if (match[2]) {
        category = match[2].replace(/"/ig, '');
    }

    if (!race.started && !race.finished) {
        if (category) {
            race.category = category;
            let categories = config.categories;
            for (let i = 0; i < categories.length; i++) {
                for (let j = 0; j < categories[i].aliases.length; j++) {
                    if (category.toLowerCase() == categories[i].aliases[j]) {
                        race.category = categories[i].name;
                        break;
                    }
                }
            }
        }

        if (race.category == "Randomizer GSB") {
            race.seed = seed();
        } else if (race.category == "Bingo") {
            race.seed = seed(null, null, true, 'hex', false);
        } else if (race.category == "Randomizer GSB Adventure") {
            race.seed = seed(null, null, null, null, null, "adventure");
        } else if (race.category == "Randomizer Speedrun") {
            race.seed = seed(null, null, null, null, null, "speedrun");
        }
    
        updateRaceMessage(race, channel);
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};