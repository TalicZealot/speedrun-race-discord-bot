const config = require('../config.json');

module.exports = (race, channel) => {
    const sleep = m => new Promise(r => setTimeout(r, m));
    (async() => {
        channel.send('All players are ready. Starting in:').then().catch(console.error);
        await sleep(1000);
        const broadcast = channel.client.createVoiceBroadcast();
        const voiceChannel = channel.client.channels.find(x => x.name.startsWith(config.voiceChannelPrefix)); //&& x.members.find(y => y.username == race.players[0].username)
        if (voiceChannel) {
            voiceChannel.join().then(connection => {
                broadcast.playFile('../countdown.mp3');
                const dispatcher = connection.playBroadcast(broadcast);
            }).catch(console.error);
        }
        await sleep(2000);
        channel.send('4').then().catch(console.error);
        await sleep(1000);
        channel.send('3').then().catch(console.error);
        let allReady = race.players.every(x => x.ready == true);
        if (!allReady) {
            let playersReady = race.players.filter(x => x.ready == true).length;
            channel.send('Start Halted: ' + playersReady + '/' + race.players.length + ' players ready').then().catch(console.error);
            return;
        }
        await sleep(1000);
        channel.send('2').then().catch(console.error);
        await sleep(1000);
        channel.send('1').then().catch(console.error);
        await sleep(1000);
        allReady = race.players.every(x => x.ready == true);
        if (!allReady) {
            let playersReady = race.players.filter(x => x.ready == true).length;
            channel.send('Start Halted: ' + playersReady + '/' + race.players.length + ' players ready').then().catch(console.error);
            return;
        }
        channel.send('GO!').then().catch(console.error);
        race.started = true;
        race.startedAt = new Date().getTime() + race.offset;
        await sleep(1000);
        if (voiceChannel) {
            voiceChannel.leave();
        }
    })();

    return;
};