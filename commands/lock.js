const { SlashCommandBuilder } = require('@discordjs/builders');
const lockVoiceChannel = require('../common/lockVoiceChannel');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription(`Toggles the race voice channel auto mute state.`),
    async execute(interaction, client, race) {
        lockVoiceChannel(client);
        await interaction.reply({ content: 'Voice permissions toggled!', ephemeral: true });
    },
};