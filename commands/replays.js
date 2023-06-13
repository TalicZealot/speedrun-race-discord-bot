const { SlashCommandBuilder } = require('@discordjs/builders');
const zipReplays = require('../common/zipReplays');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('replays')
        .setDescription(`Generate a zip of all the submitted replays for this race.`),
    async execute(interaction, client, race) {
        if (!race.finished || race.seedName == "") {
            await interaction.reply({ content: `Race has to be finished!`, ephemeral: true });
            return;
        }
        if (race.replays.lenght < 2) {
            await interaction.reply({ content: `At least 2 replays need to be submitted.`, ephemeral: true });
            return;
        }
        await interaction.reply({ content: 'Zip generated!', ephemeral: true });
        zipReplays(interaction.channel, race);
    },
};