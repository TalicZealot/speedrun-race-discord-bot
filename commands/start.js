const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription(`Starts a new race with the selected options.`),
    async execute(interaction, client, race) {
        if (race.tournament && interaction.member.roles.cache) {
            interaction.member.roles.cache.has(role => role.id == id)
        }

        if ((race.started || !race.finished) && race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can close tournament races!', ephemeral: true });
            return;
        }

        race.initiate(interaction.options.getString('category'), interaction.options.getBoolean('ranked'), interaction.options.getBoolean('tournament'), interaction.user);
        await interaction.reply({ content: 'Race initiated!', ephemeral: true });
    },
};