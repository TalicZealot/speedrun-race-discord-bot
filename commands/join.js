module.exports = (message, race, channel) => {
    var player = race.players.find(x => x.username === message.author.username);

    if (!race.started && !player) {
        var newPlayer = {
            username: message.author.username,
            finished: false,
            forfeited: false,
            ready: false,
            time: null
        };
        race.players.push(newPlayer);
        race.remainingPlayers += 1;

        channel.send(message.author.username + ' has joined the race.').then().catch(console.error);

        return;
    }

    return;
};