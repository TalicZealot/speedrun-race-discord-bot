const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('../data/data.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stream')
        .setDescription(`Sets a stream link for the user's profile. Used for multitwitch link generation.`)
        .addStringOption(option =>
            option.setName('stream')
                .setDescription('Twitch username')
                .setRequired(true)),
    async execute(interaction, client, race) {
        if (!race.finished && !race.started && race.includes(interaction.user.id)) {
            race.generateMultistream();
            race.updateSeed();
        }

        data.setPlayerTwitch(interaction.user.username, interaction.options.getString('stream'));

        await interaction.reply({ content: 'Stream set!', ephemeral: true });
    },
};