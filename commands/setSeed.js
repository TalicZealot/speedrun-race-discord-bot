const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseed')
        .setDescription('Submit a custom seed for the current randomzier race.'),
    async execute(interaction, client, race) {

        if (!race.finished && !race.includes(interaction.user.id)) {
            await interaction.reply({ content: `Can't set the seed if you are not in the race!`, ephemeral: true });
            return;
        }

        if (!race.finished && race.started) {
            await interaction.reply({ content: `Can't set the seed after the race has started!`, ephemeral: true });
            return;
        }

        if (!race.finished) {
            race.seed = interaction.options.getString('seed');
            race.updateSeed();
            await interaction.reply({ content: 'Seed has been updated!', ephemeral: true });
            return;
        }

        await interaction.reply({ content: 'No active race!', ephemeral: true });
    }
};