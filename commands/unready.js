module.exports = (message, race, channel) => {
    var player = race.players.find(x => x.username === message.author.username);

    if (!race.started && player) {
        player.ready = false;

        return;
    }

    return;
};