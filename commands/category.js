const updateRaceMessage = require('../common/updateRaceMessage');
const config = require('../config.json');

module.exports = (race, channel, message) => {
    let match = message.content.match(/^[.!](\bcategory\b) ([ a-zA-Z0-9%]{3,20})/i);
    let category = match[2];

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
    
        updateRaceMessage(race, channel);
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};