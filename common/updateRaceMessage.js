module.exports = (race, channel) => {
    let output = 'Race Initiated! Seed: ' + race.seed;

    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
    output += '\n       `' + centerPad((race.status), 30) + '`';
    output += '\n       `' + centerPad(('Category: ' + race.category), 30) + '`';
    if (!race.started) {
        race.players.sort((a, b) => (a.ready === b.ready) ? 1 : -1);
    }
    race.players.sort((a, b) => (a.time > b.time) ? 1 : -1);
    race.players.sort((a, b) => (a.forfeited === b.forfeited) ? 1 : -1);

    for (let i = 0; i < race.players.length; i++) {
        if (i == 0 && race.players[i].time) {
            output += '\n :first_place:';
        } else if (i == 1 && race.players[i].time) {
            output += '\n :second_place:';
        } else if (i == 2 && race.players[i].time) {
            output += '\n :third_place:';
        } else {
            output += '\n       ';
        }

        output += ('` ' + race.players[i].username).padEnd(20, " ");

        if (race.players[i].time || race.players[i].forfeited) {
            let time = race.players[i].time;
            let seconds = Math.floor((time / 1000) % 60);
            let minutes = Math.floor((time / (1000 * 60)) % 60);
            let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            let rightCol = (race.players[i].forfeited) ? 'forfeited' : hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ':' + seconds.toString().padStart(2, "0");
            output += (rightCol).padEnd(11, " ");
        } else {
            let rightCol = (race.players[i].ready) ? 'ready ' : ' ';
            output += (rightCol).padEnd(11, " ");
        }
        output += '`';
    }

    const raceMessage = channel.fetchMessage(race.messageId).then(x =>
        x.edit(output).then().catch(console.error)).catch(console.error);
    return;
};