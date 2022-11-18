module.exports = {
    name: 'race',
    execute(client, race) {
        console.log("race started: " + race.started);
        console.log("race finished: " + race.finished);
        console.log("race startedAt: " + race.startedAt);
        console.log("race initiatedAt: " + race.initiatedAt);
        console.log("race players: " + race.players);
        console.log("race category: " + race.category);
        console.log("race messageId: " + race.messageId);
        console.log("race seed: " + race.seed);
        console.log("race seedName: " + race.seedName);
        console.log("race multistream: " + race.multistream);
        console.log("race status: " + race.status);
        console.log("race tournament: " + race.tournament);
        console.log("race ranked: " + race.ranked);
        console.log("race message: " + race.message);
        console.log("race replays: " + race.replays);
    },
};