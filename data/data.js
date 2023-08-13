const playersDb = require('../data/players.json');
const eloConfig = require('../elo/eloConfig.json');
const config = require('../config.json');
const path = require('path');
const fs = require('fs');

const defaultELO = (eloConfig.defaultELO);
const placementMatches = (eloConfig.placementMatches);

let players = [];

function savePlayer(player) {
    let playerIndex = players.findIndex(x => x.id == player.id);
    if (playerIndex > -1) {
        players[playerIndex] = player;
    } else {
        players.push(player);
    }
    fs.writeFileSync(path.join(__dirname, '../data/players.json'), JSON.stringify(players, null, 2));
    players = playersDb;
}

function getPlayerIndexById(id) {
    if (players.length < 1) {
        players = playersDb;
    }
    if (id < 1) {
        console.log("Invalid id");
        return null;
    }
    let player = players.find(x => x.id == id);
    if (player) {
        return players.findIndex(x => x.id == id);
    } else {
        savePlayer({ id: id });
    }
    return players.findIndex(x => x.id == id);
}

module.exports = {
    checkPlayerRanked: function(id, category) {
        let playerIndex = getPlayerIndexById(id);
        if (!players[playerIndex][category]) {
            players[playerIndex][category] = {};
            players[playerIndex][category].matches = 0;
            return false;
        }
        return (players[playerIndex][category].matches >= placementMatches);
    },
    getPlayerTwitch: function(id) {
        let playerIndex = getPlayerIndexById(id);
        return players[playerIndex].twitch;
    },
    setPlayerTwitch: function(id, twitch) {
        let playerIndex = getPlayerIndexById(id);
        players[playerIndex].twitch = twitch;
        savePlayer(players[playerIndex]);
    },
    setPlayerUsername: function(id, username) {
        let playerIndex = getPlayerIndexById(id);
        players[playerIndex].username = username;
        savePlayer(players[playerIndex]);
    },
    getPlayerElo: function(id, category) {
        let playerIndex = getPlayerIndexById(id);
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
    adjustElo: function(id, category, adjustment) {
        let playerIndex = getPlayerIndexById(id);
        console.log(`Index: ${playerIndex}\nCatagory: ${category}`);
        if (players[playerIndex][category].elo) {
            players[playerIndex][category].elo += adjustment;
        } else {
            players[playerIndex][category].elo = defaultELO + adjustment;
        }
        if (players[playerIndex][category]?.matches) {
            players[playerIndex][category].matches += 1;
        } else {
            players[playerIndex][category].matches = 1;
        }
        savePlayer(players[playerIndex]);
    },
    adjustPb: function(player, category, time) {
        let playerIndex = getPlayerIndexById(player.id);
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
                if (player[category].elo && player[category].matches >= placementMatches) {
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
    },
    getCategoryStats: function(category) {
        let board = [];
        let stats = {
            categoryPlayers: 0
        };
        if (players.length < 1) {
            players = playersDb;
        }
        players.forEach(player => {
            if (player[category]) {
                if (player[category].elo && player[category].matches >= placementMatches) {
                    board.push({
                        username: player.username,
                        elo: player[category].elo
                    });
                }
                if (player[category].elo) {
                    stats.categoryPlayers += 1;
                }
            }
        });
        if (board.length == 0) {
            console.log('no stats for "' + category + '"');
            return null;
        }
        board.sort((a, b) => (a.elo > b.elo) ? -1 : 1);
        stats.top = board.slice(0, 4);
        return stats;
    },
    getPlayerStats: function(player) {
        let stats = {};
        stats.categories = [];
        if (players.length < 1) {
            players = playersDb;
        }
        let playerIndex = players.findIndex(x => x.username == player);
        if (playerIndex < 0) {
            return stats;
        }
        stats.twitch = 'https://www.twitch.tv/' + ((players[playerIndex].twitch) ? players[playerIndex].twitch : player);
        Object.keys(players[playerIndex]).forEach(key => {
            if (key != "username" && key != "twitch" && key != "id") {
                let board = this.getCategoryLeaderboard(key);
                let rank = 0;
                if (board) {
                    rank = board.findIndex(x => x.username == player) + 1;
                }
                if (rank < 1) {
                    rank = 'unranked';
                }
                stats.categories.push({
                    name: key,
                    rank: rank,
                    elo: players[playerIndex][key].elo,
                    matches: players[playerIndex][key].matches
                });
            }
        });
        return stats;
    },
    startNewSeason: function(seasonNumber) {
        if (players.length < 1) {
            players = playersDb;
        }
        fs.writeFileSync(path.join(__dirname, '../data/season-' + seasonNumber + '.json'), JSON.stringify(players, null, 2));
        let newSeason = [];
        players.forEach(player => {
            let lastSeasonPlayer = {username: player.username, id: player.id, twitch: player.twitch};
            config.categories.forEach(category => {
                if (player[category].elo && player[category].elo < eloConfig.defaultElo - 100) {
                    lastSeasonPlayer[category].elo = eloConfig.defaultEloLow;
                } else if (player[category].elo && player[category].elo > eloConfig.defaultElo + 100) {
                    lastSeasonPlayer[category].elo = eloConfig.defaultEloHigh;
                } else {
                    lastSeasonPlayer[category].elo = eloConfig.defaultElo;
                }
            });
            newSeason.push(lastSeasonPlayer)
        });

        fs.writeFileSync(path.join(__dirname, playersDb), JSON.stringify(newSeason, null, 2));
    }
};
