const { SlashCommandBuilder } = require('@discordjs/builders');
const unlockVoiceChannel = require('../common/unlockVoiceChannel');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription(`Turns off auto mute for the race voice channel.`),
    async execute(interaction, client, race) {
        unlockVoiceChannel(client);
        await interaction.reply({ content: 'Race voice channel unlocked!', ephemeral: true });
    },
};