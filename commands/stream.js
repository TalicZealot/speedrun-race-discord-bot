const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('../data/data.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stream')
        .setDescription(`Sets a Twitch username for the user's profile. Used for multitwitch link generation.`)
        .addStringOption(option =>
            option.setName('stream')
                .setDescription('Twitch username')
                .setRequired(true)),
    async execute(interaction, client, race) {
        let match = interaction.options.getString('stream').match(/(http|:|twitch|www)/i);
        if (match) {
            await interaction.reply({ content: 'Invalid username!', ephemeral: true });
            return;
        }

        data.setPlayerTwitch(interaction.user.id, interaction.options.getString('stream'));

        if (!race.finished && !race.started && race.includes(interaction.user.id)) {
            race.generateMultistream();
            race.updateSeed();
        }

        await interaction.reply({ content: 'Stream set!', ephemeral: true });
    },
};