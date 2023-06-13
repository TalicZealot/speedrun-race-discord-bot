const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const updateLeaderboard = require('../common/updateLeaderboard');
const config = require('../config.json');
const elo = require('../elo/elo.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit')
        .setDescription(`Submit a race result.`)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of the race')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Guarded OG',
                        value: 'Guarded-OG',
                    },
                    {
                        name: 'Safe',
                        value: 'Safe',
                    },
                    {
                        name: 'Casual',
                        value: 'Casual',
                    },
                    {
                        name: 'Nimble',
                        value: 'Nimble',
                    },
                    {
                        name: 'Lycanthrope',
                        value: 'Lycanthrope',
                    },
                    {
                        name: 'Expedition',
                        value: 'Expedition',
                    },
                    {
                        name: 'Warlock',
                        value: 'Warlock',
                    },
                    {
                        name: 'Adventure',
                        value: 'Adventure',
                    },
                    {
                        name: 'OG',
                        value: 'OG',
                    },
                    {
                        name: 'Speedrun',
                        value: 'Speedrun',
                    },
                    {
                        name: 'Bat master',
                        value: 'Bat-master',
                    },
                ))
        .addUserOption(option =>
            option.setName('player1')
                .setDescription('player1')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('player2')
                .setDescription('player2')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('player3')
                .setDescription('player3')
                .setRequired(false))
        .addUserOption(option =>
            option.setName('player4')
                .setDescription('player4')
                .setRequired(false))
        .addUserOption(option =>
            option.setName('player5')
                .setDescription('player5')
                .setRequired(false))
        .addUserOption(option =>
            option.setName('player6')
                .setDescription('player6')
                .setRequired(false))
        .addUserOption(option =>
            option.setName('player7')
                .setDescription('player7')
                .setRequired(false))
        .addUserOption(option =>
            option.setName('player8')
                .setDescription('player8')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('player2forfeit')
                .setDescription('True if the player forfeited.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('player3forfeit')
                .setDescription('True if the player forfeited.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('player4forfeit')
                .setDescription('True if the player forfeited.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('player5forfeit')
                .setDescription('True if the player forfeited.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('player6forfeit')
                .setDescription('True if the player forfeited.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('player7forfeit')
                .setDescription('True if the player forfeited.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('player8forfeit')
                .setDescription('True if the player forfeited.')
                .setRequired(false)),
    async execute(interaction, client) {

        if (!interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can submit race results!', ephemeral: true });
            return;
        }

        let players = [];
        let category = interaction.options.getString('category');

        //const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);

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

        for (let i = 3; i < 9; i++) {
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
        console.log(adjustments);
        updateLeaderboard(client, category);

        let output = '```';
        for (let i = 0; i < players.length; i++) {
            let userRow = players[i].username.replace(/\W/gi, "").replace(/.forfeit/gi, "") + "  " + ((adjustments[i] > 0) ? '+' + adjustments[i] : adjustments[i]);
            output += '\n ' + userRow.padEnd(22, " ");
        }
        output += '```';

        const exampleEmbed = new EmbedBuilder()
            .setColor(0x1f0733)
            .setTitle('ELO adjustments for submitted race')
            .setDescription(output)
            .setFooter({ text: 'Category: ' + category });

        let channel = client.guilds.cache.first(1)[0].channels.fetch(config.raceChannelId);
        channel.then(ch => {
            ch.send({ embeds: [exampleEmbed] }).catch(console.error);
        }).catch(console.error);

        await interaction.reply({ content: 'Result submitted!', ephemeral: true });
    },
};