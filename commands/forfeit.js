const updateRaceMessage = require('../common/updateRaceMessage');
const elo = require('../elo/elo.js');
const sleep = m => new Promise(r => setTimeout(r, m));

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);

    if (race.started && player && !player.finished && !player.forfeited) {
        player.forfeited = true;

        race.remainingPlayers -= 1;

        if (race.remainingPlayers < 1) {
            race.finished = true;
            race.status = 'RACE FINISHED';
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
            let adjustments = elo.resolveMatch(race.players, race.category);
            for (let i = 0; i < race.players.length; i++) {
                race.players[i].adjustment = adjustments[i];
            }
            channel.fetchMessage(race.messageId).then(x =>
                (async() => {
                    await x.clearReactions().then().catch(console.error);
                    await x.react('↩').then().catch(console.error);
                })()
            ).catch(console.error);
        }

        updateRaceMessage(race, channel);
    } else {
        let time = new Date();
        console.log(time.toLocaleString('en-GB') + ' forfeit: ' + username + ' is not in the race!');
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};