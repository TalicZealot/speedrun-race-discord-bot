const playersDb = require('../data/players.json');
const eloConfig = require('../elo/eloConfig.json');
const path = require('path');
const fs = require('fs');

const defaultELO = (eloConfig.defaultELO);
const placementMatches = (eloConfig.placementMatches);

let players = [];

function savePlayer(player) {
    let playerIndex = players.findIndex(x => x.username == player.username);
    if (playerIndex > -1) {
        players[playerIndex] = player;
    } else {
        players.push(player);
    }
    fs.writeFileSync(path.join(__dirname, '../data/players.json'), JSON.stringify(players, null, 2));
    players = playersDb;
}

function getPlayerIndexByName(username) {
    if (players.length < 1) {
        players = playersDb;
    }
    let player = players.find(x => x.username == username);
    if (player) {
        return players.findIndex(x => x.username == username);
    } else {
        savePlayer({ username: username });
    }
    return players.findIndex(x => x.username == username);
}

module.exports = {
    checkPlayerRanked: function(username, category) {
        let playerIndex = getPlayerIndexByName(username);
        if (!players[playerIndex][category]) {
            players[playerIndex][category] = {};
            players[playerIndex][category].matches = 0;
            return false;
        }
        return (players[playerIndex][category].matches >= placementMatches);
    },
    getPlayerTwitch: function(username) {
        let playerIndex = getPlayerIndexByName(username);
        return players[playerIndex].twitch;
    },
    setPlayerTwitch: function(username, twitch) {
        let playerIndex = getPlayerIndexByName(username);
        players[playerIndex].twitch = twitch;
        savePlayer(players[playerIndex]);
    },
    getPlayerElo: function(username, category) {
        let playerIndex = getPlayerIndexByName(username);
        if (!players[playerIndex][category]) {
            players[playerIndex][category] = {};
        }
        let elo = players[playerIndex][category].elo;
        if (elo) {
            return elo;
        } else {
            players[playerIndex][category].elo = 1000;
            savePlayer(players[playerIndex]);
            return 1000;
        }
    },
    adjustElo: function(player, category, adjustment) {
        let playerIndex = getPlayerIndexByName(player);
        if (players[playerIndex][category].elo) {
            players[playerIndex][category].elo += adjustment;
        } else {
            players[playerIndex][category].elo = defaultELO + adjustment;
        }
        if (players[playerIndex][category].matches) {
            players[playerIndex][category].matches += 1;
        } else {
            players[playerIndex][category].matches = 1;
        }
        savePlayer(players[playerIndex]);
    },
    adjustPb: function(player, category, time) {
        let playerIndex = getPlayerIndexByName(player.username);
        if (playerIndex > -1) {
            players[playerIndex][category].pb = time;
        }
        savePlayer(players[playerIndex]);
    },
    getCategoryLeaderboard: function(category) {
        let board = [];
        if (players.length < 1) {
            players = playersDb;
        }
        players.forEach(player => {
            if (player[category]) {
                if (player[category].elo) {
                    board.push({
                        username: player.username,
                        elo: player[category].elo
                    });
                }
            }
        });
        if (board.length == 0) {
            console.log('no board for "' + category + '"');
            return null;
        }
        board.sort((a, b) => (a.elo > b.elo) ? -1 : 1);
        return board;
    }
};