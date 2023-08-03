const updateLeaderboard = require('../common/updateLeaderboard');

module.exports = {
    name: 'updateboard',
    description: 'Force update the current leaderboard for the specified category.',
    execute(client, race, input) {
        updateLeaderboard(client, input.slice(this.name.length + 1));
    },
};