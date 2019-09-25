module.exports = (race, channel) => {

    let output = 'Race completed!';
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

        output += ('**' + race.players[i].username + '**' + ' : ').padEnd(16, " ");
        let time = race.players[i].time;
        let seconds = Math.floor((time / 1000) % 60);
        let minutes = Math.floor((time / (1000 * 60)) % 60);
        let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        output += (race.players[i].forfeited) ? 'forfeited' : hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ':' + seconds.toString().padStart(2, "0");
    }

    channel.send(output).then().catch(console.error);

    race.players = [];
    race.started = false;

    return;
};