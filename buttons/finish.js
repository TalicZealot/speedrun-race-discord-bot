module.exports = {
    name: 'finish',
    async execute(interaction, client, race) {
        race.finishPlayer(interaction.user);
        interaction.deferUpdate().catch(console.error)
    }
};