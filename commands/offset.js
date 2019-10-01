const config = require('../config.json');

module.exports = (race, channel, message) => {
    let offset = message.content.split('offset')[1].trim();
    if (offset > 0 && offset < parseInt(config.maxOffsetSeconds)) {
        race.offset = offset * 1000;
    } else if (offset == "psx") {
        race.offset = 10000;
    } else if (offset == "xb") {
        race.offset = 3000;
    }
    message.delete().then().catch(console.error);
    return;
};