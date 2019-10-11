const updateRaceMessage = require('../common/updateRaceMessage');
const config = require('../config.json');

module.exports = (race, message, category) => {
    if (category) {
        race.category = category;
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

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};