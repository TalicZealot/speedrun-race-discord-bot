const config = require('../config.json');

module.exports = (race, channel, message) => {
    let offset = message.content.split('offset')[1].trim();
    let offsets = config.offsets;

    if (offset > 0 && offset < parseInt(config.maxOffsetSeconds)) {
        race.offset = offset * 1000;
    } else {
        race.offset = parseInt(config.defaultOffset);
        if (offset) {
            for (let i = 0; i < config.offsets.length; i++) {
                if (offset == offsets[i].alias) {
                    race.offset = offsets[i].value * 1000;
                }
            }
        }
    }

    message.delete().then().catch(console.error);
    return;
};