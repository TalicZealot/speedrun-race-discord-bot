const config = require('../config.json');
const seed = require('../commands/seed');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, message) => {
    if (race.finished == true ||(race.tournament && message.member && message.member.hasPermission('KICK_MEMBERS', false, false)) || config.referees.includes(message.author.username) || race.tournament == false) {
        if ((Math.floor(((new Date().getTime()) - race.initiatedAt)) / (1000 * 60)) > parseInt(config.minimumNewIntervalMinutes)) {
            let match = message.content.match(/^[.!]((\bstartrace\b)|(\bnew\b)|(\bjoin\b)|(\benter\b))([ ]{0,1})("[a-zA-Z0-9% ]{0,40}"){0,1}([ ]{0,1})([a-z]{0,10})(\b tournament\b){0,1}/i);
            let category = '';
            if (match[7]) {
                category = match[7].replace(/"/ig, '');
            }
            let offset = match[9];
            let tournamentMode = match[10];
            let categories = config.categories;
            let offsets = config.offsets;
            if (message && message.content.match(/^[.!]((\bstartrace\b)|(\bnew\b))/i)) {
                message.delete().then().catch(console.error);
            }

            race.offset = parseInt(config.defaultOffset);
            if (offset) {
                for (let i = 0; i < config.offsets.length; i++) {
                    if (offset == offsets[i].alias) {
                        race.offset = offsets[i].value * 1000;
                    }
                }
            }

            if (category == 'tournament') {
                tournamentMode = true;
                category = false;
            }
            if (category) {
                race.category = category;
                for (let i = 0; i < categories.length; i++) {
                    for (let j = 0; j < categories[i].aliases.length; j++) {
                        if (category.toLowerCase() == categories[i].aliases[j]) {
                            race.category = categories[i].name;
                            break;
                        }
                    }
                }
            } else {
                race.category = config.defaultCategory;
            }
    
            if (tournamentMode) {
                race.tournament = true;
            }
            race.started = false;
            race.finished = false;
            race.startedAt = null;
            race.remainingPlayers = 0;
            race.players = [];
            race.kadgar = 'https://multistre.am/';
            race.status = 'PRE-RACE: WAITING FOR PLAYERS';
            if (race.category == "Randomizer GSB") {
                race.seed = seed();
            } else if (race.category == "Bingo") {
                race.seed = seed(null, null, true, "hex", false);
            } else if (race.category == "Randomizer GSB Adventure") {
                race.seed = seed(null, null, null, null, null, "adventure");
            } else if (race.category == "Randomizer Speedrun") {
                race.seed = seed(null, null, null, null, null, "speedrun");
            }
    
            return new Promise((resolve, reject) => {
                race.initiatedAt = new Date().getTime();
                channel.send('Race initiated! ' + race.seed).then(x => {
                    race.messageId = x.id;
                    (async() => {
                        await x.react('➕').then().catch(console.error);
                        await x.react('✅').then().catch(console.error);
                    })();
                    updateRaceMessage(race, channel);
                    resolve();
                }).catch((error) => {
                    console.log(error);
                    reject('Failed!');
                });
            });
    
        }
    }
    if (message && message.content.match(/^[.!]((\bstartrace\b)|(\bnew\b))/i)) {
        message.delete().then().catch(console.error);
    }
    return;
};