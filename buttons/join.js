module.exports = {
    name: 'join',
    async execute(interaction, client, race) {
        race.joinPlayer(interaction.user);
        race.generateMultistream();
        race.updateSeed();
        interaction.deferUpdate().catch(console.error)
    }
};