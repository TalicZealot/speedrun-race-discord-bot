const config = require('../config.json');

module.exports = (race, channel, message) => {
    let offset = message.content.split('offset')[1].trim();
    if (offset > 0 && offset < parseInt(config.maxOffsetSeconds)) {
        race.offset = offset * 1000;
    } else {
        for (let i = 0; i < config.offsets; i++) {
            if (offset == config.offsets[i].alias) {
                race.offset = parseInt(config.offsets[i].value) * 1000;
            }
        }
    }
    message.delete().then().catch(console.error);
    return;
};