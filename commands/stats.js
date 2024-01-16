const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('../data/data.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription(`Outputs summarized race stats for the selected category or user.`)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category')
                .setRequired(false)
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
            option.setName('user')
                .setDescription('user')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('public')
                .setDescription('Select true if you want the reply to be visible to everybody.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('top')
                .setDescription('Select how many users to display. If you want all, type "all".')
                .setRequired(false)),
    async execute(interaction) {
        const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
        let category = interaction.options.getString('category');
        let player = interaction.options.getUser('user');
        let isPlayer = false;
        let oTop = interaction.options.getString('top');
        let hidePost = false

        let stats = null;

        if (category) {
            stats = data.getCategoryStats(category);
        } else if (player) {
            stats = data.getPlayerStats(player.id);
            isPlayer = true;
        } else {
            stats = data.getPlayerStats(interaction.user.id);
            isPlayer = true;
        }

        let output = '';
        if (stats && isPlayer) {
            output += category + ' stats';
            output += '\n Stream: <' + player.twitch + '>';
            stats.categories.forEach(category => {
                output += '\n' + ('`Category: ' + category.name).padEnd(35, " ") + '`';
                output += '\n' + ('`  Rank: ' + category.rank).padEnd(35, " ") + '`';
                output += '\n' + ('`  Elo: ' + category.elo).padEnd(35, " ") + '`';
                output += '\n' + ('`  Matches: ' + category.matches).padEnd(35, " ") + '`';
            });
        } else if (stats) {
            output += 'Stats:';
            output += '\n`' + centerPad((category), 24) + '`';
            output += '\n`' + (' Players: ' + stats.categoryPlayers).padEnd(24, " ") + '`';
            output += '\n`' + centerPad(('Top ' + oTop), 24) + '`';
            for (let i = 0; i < stats.top.length; i++) {
                output += '\n`' + ((i + 1) + '.' + stats.top[i].username).padEnd(19, " ") + (stats.top[i].elo + ' ').padEnd(5, " ") + '`';
                if (i == oTop) {
                    break;
                }
            }
        } else {
            output += 'No stats available yet.';
        }

        if (oTop < 6) {
                hidePost = !interaction.options.getBoolean('public')
            } else if (oTop = 'all') {
                hidePost = true
            } else {
                hidePost = true 
            }

        output = output.substring(0,1999) + '`'

        await interaction.reply({ content: output, ephemeral: hidePost });
    },
};