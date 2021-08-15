const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const elo = require('../elo/elo.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit')
        .setDescription(`Submit a race result.`),
    async execute(interaction, client, race) {

        if (!interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can submit race results!', ephemeral: true });
            return;
        }

        let players = [];
        let category = interaction.options.getString('category');

        const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);

        players.push({
            username: interaction.options.getUser('player1').username,
            id: interaction.options.getUser('player1').id,
            forfeited: false
        });

        players.push({
            username: interaction.options.getUser('player2').username,
            id: interaction.options.getUser('player2').id,
            forfeited: interaction.options.getBoolean('player2forfeit'),
        });

        for (let i = 3; i < 11; i++) {
            if (interaction.options.getUser('player' + i)) {
                players.push({
                    username: interaction.options.getUser('player' + i).username,
                    id: interaction.options.getUser('player' + i).id,
                    forfeited: interaction.options.getBoolean('player' + i + 'forfeit'),
                });
            } else {
                break;
            }
        }

        let adjustments = elo.resolveMatch(players, category);

        let output = 'Results submitted:';
        output += '\n`' + centerPad(('Adjustments:'), 24) + '`';
        output += '\n`' + centerPad(('Category: ' + category), 24) + '`';
        for (let i = 0; i < players.length; i++) {
            output += '\n';
            output += ('` ' + players[i].username.replace(/\W/gi, "").replace(/.forfeit/gi, "")).padEnd(20, " ");
            output += (' ' + ((adjustments[i] > 0) ? '+' + adjustments[i] : adjustments[i])).padEnd(5, " ");
            output += '`';
        }

        let channel = client.guilds.cache.first(1)[0].channels.fetch(config.raceChannelId);
        channel.then(ch => {
            ch.send(output).catch(console.error);
        }).catch(console.error);

        await interaction.reply({ content: 'Result submitted!', ephemeral: true });
    },
};