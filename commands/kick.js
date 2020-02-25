const updateRaceMessage = require('../common/updateRaceMessage');
const data = require('../data/data.js');

module.exports = (race, channel, message) => {
    if (message.member.hasPermission('KICK_MEMBERS', false, false)) {
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
            if (allReady && race.players.length > 1) {
                startRace(race, channel);
            } else {
                let playersReady = race.players.filter(x => x.ready == true).length;
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