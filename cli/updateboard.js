const updateLeaderboard = require('../common/updateLeaderboard');

module.exports = {
    name: 'updateboard',
    execute(client, race) {
        updateLeaderboard(client, "Casual");
    },
};