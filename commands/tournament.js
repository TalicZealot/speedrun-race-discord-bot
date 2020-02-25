const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, message) => {
    if (!race.started && !race.finished) {
        if (!race.tournament) {
            race.tournament = true;
        } else {
            race.tournament = false;
        }
        updateRaceMessage(race, channel);
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};