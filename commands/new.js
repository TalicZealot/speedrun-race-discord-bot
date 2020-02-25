const config = require('../config.json');
const seed = require('../commands/seed');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, message) => {
    if (race.finished == true ||(race.tournament && message.member.hasPermission('KICK_MEMBERS', false, false)) || race.tournament == false) {
        if ((Math.floor(((new Date().getTime()) - race.initiatedAt)) / (1000 * 60)) > parseInt(config.minimumNewIntervalMinutes)) {
            let match = message.content.match(/^[.!]((\bstartrace\b)|(\bnew\b)|(\bjoin\b)|(\benter\b))([ ]{0,1})([a-zA-Z0-9%]{0,20}[ ]{0,1}[a-zA-Z0-9%]{0,20})((\b psx\b)|(\b xb\b)){0,1}(\b tournament\b){0,1}/i);
            let category = match[7];
            let offset = match[8];
            let tournamentMode = match[9];
            let categories = config.categories;
            if (message && message.content.match(/^[.!]((\bstartrace\b)|(\bnew\b))/i)) {
                message.delete().then().catch(console.error);
            }
            if (offset && offset == " psx") {
                race.offset = 10000;
            } else if (offset && offset == " xb") {
                race.offset = 3000;
            } else {
                race.offset = parseInt(config.defaultOffset);
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
            race.kadgar = 'https://kadgar.net/live/';
            race.status = 'PRE-RACE: WAITING FOR PLAYERS';
            if (race.category == "Randomizer GSB") {
                race.seed = seed();
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