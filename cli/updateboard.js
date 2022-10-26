const updateLeaderboard = require('../common/updateLeaderboard');

module.exports = {
    name: 'updateboard',
    execute(client) {
        updateLeaderboard(client, "Casual");
    },
};