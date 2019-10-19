const data = require('../data/data.js');
const updateRaceMessage = require('../common/updateRaceMessage');

module.exports = (race, channel, username, message) => {
    let player = race.players.find(x => x.username === username);

    if (!race.finished && player) {
        race.players.splice(race.players.indexOf(player), 1);
        race.remainingPlayers -= 1;

        let userTwitch = data.getPlayerTwitch(username);
        if (!userTwitch) {
            userTwitch = username;
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
        console.log(time.toLocaleString('en-GB') + ' leave: ' + username + ' is not in the race!');
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};