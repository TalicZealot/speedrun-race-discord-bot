const createLeaderboard = require('../common/createLeaderboard');

module.exports = {
    name: 'createboard',
    execute(client, race, input) {
        createLeaderboard(client, input.slice(this.name.length + 1));
    },
};