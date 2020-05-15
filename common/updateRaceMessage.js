module.exports = (race, channel) => {
    let output = 'Race Initiated!';

    if (race.seed) {
        output += '\n Seed: ' + race.seed;
    }

    if (race.kadgar) {
        output += '\n <' + race.kadgar + '>';
    }

    const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
    output += '\n       `' + centerPad(((race.tournament ? 'TOURNAMENT ' : '') + race.status), 33) + '`';
    output += '\n       `' + centerPad(('Category: ' + race.category), 33) + '`';

    race.players.sort(function(a, b) {
        if (a.time == null) {
            if (b.time) {
                return 1;
            }
        }
        if (b.time == null) {
            if (a.time) {
                return -1;
            }
        }
        if (b.forfeited == true) {
            if (!a.forfeited) {
                return 1;
            }
        }
        if (a.forfeited == true) {
            if (!b.forfeited) {
                return -1;
            }
        }
        if (a.time > b.time) {
            return 1;
        }
        if (a.time == b.time) {
            return 0;
        }
        if (a.time < b.time) {
            return -1;
        }
        return 0;
    });

    for (let i = 0; i < race.players.length; i++) {
        if (i == 0 && race.players[i].time && race.finished) {
            output += '\n :first_place:';
        } else if (i == 1 && race.players[i].time && race.finished) {
            output += '\n :second_place:';
        } else if (i == 2 && race.players[i].time && race.finished) {
            output += '\n :third_place:';
        } else {
            output += '\n       ';
        }

        output += ('` ' + race.players[i].username.replace(/\W/gi, "")).padEnd(20, " ");

        if (race.players[i].time || race.players[i].forfeited) {
            let time = race.players[i].time;
            let seconds = Math.floor((time / 1000) % 60);
            let minutes = Math.floor((time / (1000 * 60)) % 60);
            let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            let rightCol = (race.players[i].forfeited) ? 'forfeited' : hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ':' + seconds.toString().padStart(2, "0") + ' ';
            if (race.finished && race.players[i].adjustment) {
                rightCol += ' ' + ((race.players[i].adjustment > 0) ? '+' + race.players[i].adjustment : race.players[i].adjustment);
            }
            output += (rightCol).padEnd(14, " ");
        } else {
            let rightCol ='';
            if (!race.started) {
                rightCol = (race.players[i].ready) ? 'ready ' : ' ';
            }
            output += (rightCol).padEnd(14, " ");
        }
        output += '`';
    }

    const raceMessage = channel.fetchMessage(race.messageId).then(x =>
        x.edit(output).then().catch(console.error)).catch(console.error);
    return;
};