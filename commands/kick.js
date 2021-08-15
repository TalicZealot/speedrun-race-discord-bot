const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription(`Removes a user from the race without a result.`),
    async execute(interaction, client, race) {
        if (!interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can kick players!', ephemeral: true });
            return;
        }

        if (!race.finished && !race.includes(interaction.options.getUser('user').id)) {
            await interaction.reply({ content: 'User is not in the race!', ephemeral: true });
            return;
        }

        if (!race.finished) {
            race.removePlayer(interaction.options.getUser('user').id);
            race.update();
            await interaction.reply({ content: 'User has been kicked from the race!', ephemeral: true });
            return;
        }

        await interaction.reply({ content: 'No active race!', ephemeral: true });
    },
};