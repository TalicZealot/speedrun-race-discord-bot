module.exports = (message, race, channel) => {

    race.started = false;
    race.startedAt = null;
    race.initiatedAt = null;
    race.remainingPlayers = 0;
    race.players = [];
    race.offset = 0;

    channel.send('New race initiated.').then().catch(console.error);
    return;
};