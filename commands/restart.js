const { SlashCommandBuilder } = require('@discordjs/builders');
const unlockVoiceChannel = require('../common/unlockVoiceChannel');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription(`Restarts the current race.`),
    async execute(interaction, client, race) {
        if (race.finished) {
            await interaction.reply({ content: 'No active race!', ephemeral: true });
            return;
        }

        if (race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can restart tournament races!', ephemeral: true });
            return;
        }

        if (!race.includes(interaction.user.id) && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Cannot restart if you are not participating!', ephemeral: true });
            return;
        }
        race.restart();
        unlockVoiceChannel(client);
        await interaction.reply({ content: 'Race restarted!', ephemeral: true });
    },
};