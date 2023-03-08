const data = require('../data/data.js');

module.exports = {
    name: 'newseason',
    execute(client, race, input) {
        data.startNewSeason(input.slice(this.name.length + 1));
    },
};