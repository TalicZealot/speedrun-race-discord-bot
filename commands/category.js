const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, message, category) => {
    if (category && !message) {
        race.category = category;
        updateRaceMessage(race, channel);
        return;
    }

    let messageCategory = message.content.split('category')[1].trim();
    race.category = messageCategory;
    updateRaceMessage(race, channel);

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};