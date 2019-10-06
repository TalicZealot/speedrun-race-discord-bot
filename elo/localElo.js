/*
Run this locally with node to calculate and apply ELO adjustments for matches that did not occure while the bot was running. 
*/
const elo = require('./elo');
const data = require('../data/data');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
submit as follows (can copy entire input and submit at once):
categoryname
player
player
.forfeit player
end
 */
function submitMatch() {
    let players = [];
    let category = null;

    readline.on('line', (input) => {
        if (!category) {
            category = input;
        } else if (input == "end") {
            elo.resolveMatch(players, category);
        } else if (input.match(/^[.](\bforfeit\b) ([a-zA-Z0-9% ]{3,20})/i)) {
            let split = input.match(/^[.](\bforfeit\b) ([a-zA-Z0-9% ]{3,20})/i);
            players.push({ username: split[2], forfeited: true });
        } else {
            players.push({ username: input });
        }
    });
}

submitMatch();