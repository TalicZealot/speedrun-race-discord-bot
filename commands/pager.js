const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pager')
        .setDescription(`Gives or removes the RacePager role.`),
    async execute(interaction, client, race) {
        let userHasRole = interaction.member.roles.cache.find(x => x.id === config.pagerRoleId);
        if (userHasRole) {
            interaction.member.roles.remove(config.pagerRoleId).then(console.log).catch(console.error);
        } else {
            interaction.member.roles.add(config.pagerRoleId).then(console.log).catch(console.error);
        }

        await interaction.reply({ content: `Race pager ${userHasRole ? 'off' : 'on'}!`, ephemeral: true });
    },
};