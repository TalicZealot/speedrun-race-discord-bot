module.exports = {
    name: 'finish',
    async execute(interaction, client, race) {
        race.finishPlayer(interaction.user);
        if (race.isRanked) {
            await interaction.reply({ content: 'Please submit a replay using /replay', ephemeral: true });
        } else {
            interaction.deferUpdate().catch(console.error);
        }
    }
};