const config = require('../config.json');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel) => {
    const sleep = m => new Promise(r => setTimeout(r, m));
    (async() => {
        race.status = 'GET READY';
        updateRaceMessage(race, channel);
        await sleep(1000);
        //Remove this section to disable audio playback
        const voiceChannel = channel.client.channels.find(x => x.name.startsWith(config.voiceChannelPrefix));
        if (voiceChannel) {
            voiceChannel.join().then(connection => {
            const dispatcher = connection.playFile(require("path").join(__dirname, '../countdown.mp3'));
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
            }).catch(console.error);
        }
        //--------------------------------------------
        await sleep(2500);
        race.status = 'Starting in: 3';
        updateRaceMessage(race, channel);
        let allReady = race.players.every(x => x.ready == true);
        if (!allReady) {
            race.status = 'INTERRUPTED: WAITING FOR PLAYERS';
            updateRaceMessage(race, channel);
            if (voiceChannel) {
                voiceChannel.leave();
            }
            return;
        }
        await sleep(1000);
        race.status = 'Starting in: 2';
        updateRaceMessage(race, channel);
        await sleep(1000);
        race.status = 'Starting in: 1';
        updateRaceMessage(race, channel);
        await sleep(1000);
        allReady = race.players.every(x => x.ready == true);
        if (!allReady) {
            race.status = 'INTERRUPTED: WAITING FOR PLAYERS';
            updateRaceMessage(race, channel);
            if (voiceChannel) {
                voiceChannel.leave();
            }
            return;
        }
        race.status = 'PLAY!';
        updateRaceMessage(race, channel);
        race.started = true;
        race.startedAt = new Date().getTime() + race.offset;
        await sleep(1000);
        race.status = 'RACE STARTED';
        updateRaceMessage(race, channel);
        channel.fetchMessage(race.messageId).then(x =>
            (async() => {
                await x.clearReactions().then().catch(console.error);
                await x.react('🏁').then().catch(console.error);
                await x.react('❌').then().catch(console.error);
            })()
        ).catch(console.error);
        if (voiceChannel) {
            voiceChannel.leave();
        }
    })();

    return;
};