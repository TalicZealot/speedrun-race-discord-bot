module.exports = {
    name: 'forfeit',
    async execute(interaction, client, race) {
        race.forfeitPlayer(interaction.user);
        interaction.deferUpdate().catch(console.error)
    }
};