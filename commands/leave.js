module.exports = (message, race, channel) => {
    var player = race.players.find(x => x.username === message.author.username);

    if (!race.started && player) {
        race.players.splice(race.players.indexOf(player), 1);
        race.remainingPlayers -= 1;

        channel.send(message.author.username + ' has left the race.').then().catch(console.error);
        return;
    }

    return;
};