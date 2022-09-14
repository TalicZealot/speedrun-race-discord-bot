const config = require('../config.json');
const { PermissionFlagsBits } = require('discord.js');

module.exports = (client) => {

    let everyone = client.guilds.cache.first(1)[0].roles.everyone;

    if (!everyone) {
        console.log(`@everyone role not found`);
    }

    let channel = client.guilds.cache.first(1)[0].channels.fetch(config.raceVoiceChannelId);
    channel.then(
        ch => {
            if (!ch.permissionOverwrites.cache.find(permission => permission.id === everyone.id).allow.has(PermissionFlagsBits.Speak)) {
                ch.permissionOverwrites.edit(everyone, { Speak: true });
                console.log('Voice channel unlocked!');
            }
        }
    );
}