const data = require('../data/data.js');

module.exports = {
    name: 'newseason',
    description: 'Starts a new season, archives the previous one and adjusts starting ELO for players.',
    execute(client, race, input) {
        data.startNewSeason(input.slice(this.name.length + 1));
    },
};