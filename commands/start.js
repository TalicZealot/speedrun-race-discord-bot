const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const zipReplays = require('../common/zipReplays');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription(`Starts a new race with the selected options.`)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of the race')
                .setRequired(true)
                .addChoices(config.categories))
        .addBooleanOption(option =>
            option.setName('unranked')
                .setDescription('Unranked races don\'t get tracked on the leaderboards.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('tournament')
                .setDescription('Tournament races have more restrictions for non-referees.')
                .setRequired(false)),
    async execute(interaction, client, race) {
        if ((race.started || !race.finished) && race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can close tournament races!', ephemeral: true });
            return;
        }
        if (!race.allReplaysSubmitted() && race.replays.lenght > 1) {
            zipReplays(interaction.channel, race);
        }
        race.initiate(interaction.options.getString('category'), interaction.options.getBoolean('unranked'), interaction.options.getBoolean('tournament'), interaction.user);
        await interaction.reply({ content: 'Race initiated!', ephemeral: true });
    },
};