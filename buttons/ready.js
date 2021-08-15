module.exports = {
    name: 'ready',
    async execute(interaction, client, race) {
        race.readyPlayer(interaction.user);
        interaction.deferUpdate().catch(console.error)
    }
};