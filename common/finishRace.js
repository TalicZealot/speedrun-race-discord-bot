module.exports = (race, channel) => {

    var output = 'Race completed!';
    race.players.sort((a, b) => (a.time > b.time) ? 1 : -1);

    for (let i = 0; i < race.players.length; i++) {
        switch (i) {
            case 0:
                output += '\n :first_place:';
                break;
            case 1:
                output += '\n :second_place:';
                break;
            case 2:
                output += '\n :third_place:';
                break;
            default:
                output += '\n       ';
        }

        output += race.players[i].username + ' : ';
        var time = race.players[i].time;
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / (1000 * 60)) % 60);
        var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        output += (race.players[i].forfeited) ? 'forfeited' : ((hours < 10) ? '0' + hours : hours) + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }

    channel.send(output).then().catch(console.error);

    race.players = [];
    race.started = false;

    return;
};