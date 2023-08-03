const createLeaderboard = require('../common/createLeaderboard');

module.exports = {
    name: 'createboard',
    description: 'Creates a leaderboard message for a category. Example: "createboard Safe"',
    execute(client, race, input) {
        createLeaderboard(client, input.slice(this.name.length + 1));
    },
};