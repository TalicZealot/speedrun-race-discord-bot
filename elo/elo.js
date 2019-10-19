/*
The guide I used to implement ELO: https://blog.mackie.io/the-elo-algorithm
K determines how strongly matches impact player ELO scores.
KPlacement is a higher K value that is used during the initial few matches.
N shows the difference in score that describes a 2x skill difference. Results in broader scores.
 */
const data = require('../data/data.js');
const eloConfig = require('../elo/eloConfig.json');
const K = parseInt(eloConfig.K);
const KPlacement = parseInt(eloConfig.KPlacement);
const N = parseInt(eloConfig.N);

function roundToFive(x) {
    if ((Math.abs(x) % 5) < 3 && x > 0) {
        return (Math.floor(x / 5)) * 5;
    } else if ((Math.abs(x) % 5) > 2 && x > 0) {
        return (Math.ceil(x / 5)) * 5;
    } else if ((Math.abs(x) % 5) < 3 && x < 0) {
        return (Math.ceil(x / 5)) * 5;
    } else {
        return (Math.floor(x / 5)) * 5;
    }
}

//result: 1-win, 0-loss, 0.5-draw
function calculatePoints(eloA, eloB, Kvalue, result) {
    let eloDifference = eloA - eloB;
    let exponent = -(eloDifference / N);
    let expectedScrore = 1 / (1 + Math.pow(10, exponent));
    let adjustment = Kvalue * (result - expectedScrore);
    return roundToFive(adjustment);
}

module.exports = {
    resolveMatch: function(matchPlayers, category, local) {
        let adjustments = [];
        for (let i = 0; i < matchPlayers.length; i++) {
            let adjustment = 0;
            let playerElo = data.getPlayerElo(matchPlayers[i].username, category);
            let playerK = data.checkPlayerRanked(matchPlayers[i].username, category) ? K : KPlacement;

            for (let j = 0; j < i; j++) {
                if (matchPlayers[i].forfeited && matchPlayers[j].forfeited) {
                    let opponentElo = data.getPlayerElo(matchPlayers[j].username, category);
                    adjustment += calculatePoints(playerElo, opponentElo, playerK, 0.5);
                } else {
                    let opponentElo = data.getPlayerElo(matchPlayers[j].username, category);
                    adjustment += calculatePoints(playerElo, opponentElo, playerK, 0);
                }
            }
            for (let j = i + 1; j < matchPlayers.length; j++) {
                if (matchPlayers[i].forfeited && matchPlayers[j].forfeited) {
                    let opponentElo = data.getPlayerElo(matchPlayers[j].username, category);
                    adjustment += calculatePoints(playerElo, opponentElo, playerK, 0.5);
                } else {
                    let opponentElo = data.getPlayerElo(matchPlayers[j].username, category);
                    adjustment += calculatePoints(playerElo, opponentElo, playerK, 1);
                }
            }
            adjustments.push(adjustment);
        }

        for (let i = 0; i < matchPlayers.length; i++) {
            data.adjustElo(matchPlayers[i].username, category, adjustments[i]);
            if (local) {
                console.log(matchPlayers[i].username + ' ' + adjustments[i]);
            }
        }
        return adjustments;
    }
};