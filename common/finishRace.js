module.exports = (race, channel) => {

    var output = 'Race completed!';
    race.players.sort((a, b) => (a.time > b.time) ? 1 : -1);
    race.players.forEach(x => {
        output += '\n' + x.username + ' : ';
        var time = x.time;
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / (1000 * 60)) % 60);
        var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        output += (x.forfeited) ? 'forfeited' : ((hours < 10) ? '0' + hours : hours) + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    });

    channel.send(output).then().catch(console.error);

    race.players = [];
    race.started = false;

    return;
};