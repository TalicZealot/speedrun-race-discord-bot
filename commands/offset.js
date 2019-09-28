const config = require('../config.json');

module.exports = (message, race, channel) => {
    offset = message.content.split('offset')[1].trim();
    if (offset > 0 && offset < parseInt(config.maxOffsetSeconds)) {
        race.offset = offset * 1000;
    }
    message.delete().then().catch(console.error);
    return;
};