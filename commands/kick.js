const updateRaceMessage = require('../common/updateRaceMessage');
const data = require('../data/data.js');
const startRace = require('../common/startRace');
const config = require('../config.json');
const lock = require('../commands/lock');

module.exports = (race, channel, message) => {
    if (message.member && message.member.hasPermission('KICK_MEMBERS', false, false) || config.referees.includes(message.author.username)) {
        let match = message.content.match(/^[.!](\bkick\b)([ ]{0,1})([a-zA-Z0-9%]{0,20})/i);
        let player =  race.players.find(x => x.username === match[3]);

        if (!race.finished && player) {
            race.players.splice(race.players.indexOf(player), 1);
            race.remainingPlayers -= 1;
    
            let userTwitch = data.getPlayerTwitch(player.username);
            if (!userTwitch) {
                userTwitch = player.username;
            }
    
            race.kadgar = race.kadgar.replace(new RegExp(userTwitch + '/', 'i'), "");
    
            let allReady = race.players.every(x => x.ready == true);
            if (!race.started && allReady && race.players.length > 1) {
                startRace(race, channel);
            } else {
                if (race.remainingPlayers < 1) {
                    lock(channel);
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
            }
        } else {
            let time = new Date();
            console.log(time.toLocaleString('en-GB') + ' leave: ' + player.username + ' is not in the race!');
        }
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};