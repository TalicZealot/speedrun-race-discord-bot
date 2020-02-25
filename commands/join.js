const config = require('../config.json');
const updateRaceMessage = require('../common/updateRaceMessage');
const startrace = require('../commands/new');
const data = require('../data/data.js');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);
    let newPlayer = {
        username: username
    };

    if (race.finished || (!race.started && !player)) {

        if (race.finished || ((Math.floor(((new Date().getTime()) - race.initiatedAt)) / (1000 * 60)) >= parseInt(config.timeoutMinutes))) {
            if (race.messageId) {
                channel.fetchMessage(race.messageId).then(x =>
                    x.clearReactions().then().catch(console.error)).catch(console.error);
            }
            
            startrace(race, channel, message)
            .then(() => {
                race.players.push(newPlayer);
                race.remainingPlayers += 1;
        
                let userTwitch = data.getPlayerTwitch(username);
                if (userTwitch) {
                    race.kadgar += userTwitch + '/';
                } else {
                    race.kadgar += username.replace(/\W/gi, "") + '/';
                }
                updateRaceMessage(race, channel);}
            ).catch(console.error);
        } else {
            race.players.push(newPlayer);
            race.remainingPlayers += 1;
    
            let userTwitch = data.getPlayerTwitch(username);
            if (userTwitch) {
                race.kadgar += userTwitch + '/';
            } else {
                race.kadgar += username.replace(/\W/gi, "") + '/';
            }

            updateRaceMessage(race, channel);
        }
    }
    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};