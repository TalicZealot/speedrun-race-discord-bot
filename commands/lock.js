const { SlashCommandBuilder } = require('@discordjs/builders');
const lockVoiceChannel = require('../common/lockVoiceChannel');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription(`Turns on auto mute for the race voice channel for joining users.`),
    async execute(interaction, client, race) {
        lockVoiceChannel(client);
        await interaction.reply({ content: 'Race voice channel locked!', ephemeral: true });
    },
};