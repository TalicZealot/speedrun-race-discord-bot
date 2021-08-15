const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription(`Closes the current race.`),
    async execute(interaction, client, race) {

        if (race.finished) {
            await interaction.reply({ content: 'No active race!', ephemeral: true });
            return;
        }
        if (!race.includes(interaction.user.id)) {
            await interaction.reply({ content: 'Cannot close if you are not participating!', ephemeral: true });
            return;
        }

        if (race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can close tournament races!', ephemeral: true });
            return;
        }

        race.close();
        await interaction.reply({ content: 'Race closed!', ephemeral: true });
    },
};