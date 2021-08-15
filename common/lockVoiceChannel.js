const config = require('../config.json');

module.exports = (client) => {

    let everyone = client.guilds.cache.first(1)[0].roles.everyone;

    if (!everyone) {
        console.log(`@everyone role not found`);
    }

    let channel = client.guilds.cache.first(1)[0].channels.fetch(config.raceVoiceChannelId);
    channel.then(
        ch => {
            if (ch.permissionOverwrites.cache.find(permission => permission.id === everyone.id).allow.has('SPEAK')) {
                ch.permissionOverwrites.edit(everyone, { 'SPEAK': false });
                console.log('Voice channel locked!');
            } else {
                ch.permissionOverwrites.edit(everyone, { 'SPEAK': true });
                console.log('Voice channel unlocked!');
            }
        }
    );
}