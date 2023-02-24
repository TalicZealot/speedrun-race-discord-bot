const createLeaderboard = require('../common/createLeaderboard');

module.exports = {
    name: 'createboard',
    execute(client) {
        createLeaderboard(client, "Lycanthrope");
    },
};