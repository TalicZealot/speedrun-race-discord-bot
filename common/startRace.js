const config = require('../config.json');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel) => {
    const sleep = m => new Promise(r => setTimeout(r, m));
    (async() => {
        race.status = 'GET READY';
        updateRaceMessage(race, channel);
        await sleep(1000);
        //Remove this section to disable audio playback
        const broadcast = channel.client.createVoiceBroadcast();
        const voiceChannel = channel.client.channels.find(x => x.name.startsWith(config.voiceChannelPrefix)); //&& x.members.find(y => y.username == race.players[0].username)
        if (voiceChannel) {
            voiceChannel.join().then(connection => {
                broadcast.playFile('../countdown.mp3');
                const dispatcher = connection.playBroadcast(broadcast);
            }).catch(console.error);
        }
        //--------------------------------------------
        await sleep(2000);
        race.status = 'Starting in: 4';
        updateRaceMessage(race, channel);
        await sleep(1000);
        race.status = 'Starting in: 3';
        updateRaceMessage(race, channel);
        let allReady = race.players.every(x => x.ready == true);
        if (!allReady) {
            race.status = 'INTERRUPTED: WAITING FOR PLAYERS';
            updateRaceMessage(race, channel);
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
            return;
        }
        race.status = 'PLAY!';
        updateRaceMessage(race, channel);
        race.started = true;
        race.startedAt = new Date().getTime() + race.offset;
        await sleep(1000);
        race.status = 'RACE STARTED';
        updateRaceMessage(race, channel);
        if (voiceChannel) {
            voiceChannel.leave();
        }
    })();

    return;
};