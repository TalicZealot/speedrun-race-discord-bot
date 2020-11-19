const config = require('../config.json');

module.exports = (channel, message) => {
    console.log('lock command');
    const sleep = m => new Promise(r => setTimeout(r, m));
    if (!message || message.member && message.member.hasPermission('KICK_MEMBERS', false, false) || config.referees.includes(message.author.username)) {
        const voiceChannel = channel.client.channels.find(x => x.name.startsWith(config.voiceChannelPrefix));
        const server = channel.client.guilds.first(1)[0];
        let canView = voiceChannel.permissionsFor(server.roles.find(x => x.name ==='@everyone')).has('SPEAK');

        if (canView && channel.guild.available) {
            voiceChannel.overwritePermissions(server.roles.find(x => x.name ==='@everyone'), {
                'SPEAK': false
             }).catch(console.error);
             console.log('Voice channel locked!');
        } else if (!canView &&channel.guild.available) {
            voiceChannel.overwritePermissions(server.roles.find(x => x.name ==='@everyone'), {
                'SPEAK': true
             }).catch(console.error);
             console.log('Voice channel unlocked!');
        }
    } else {
        console.log('Not allowed to use lock!');
    }

    if (message) {
        (async() => {
        await sleep(1000);
        message.delete().then().catch(console.error);
        })();
    }
    return;
};