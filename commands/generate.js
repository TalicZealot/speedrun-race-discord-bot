const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const generatePPF = require('../common/generatePPF.js');
const seed = require('../common/seed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription(`Generate a seed with the selected options.`)
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
                    {
                        name: 'Boss Rush',
                        value: 'Boss-Rush',
                    },
                    {
                        name: 'Hunter',
                        value: 'Hunter',
                    },
                    {
                        name: 'Bounty Hunter',
                        value: 'BountyHunter',
                    },
                    {
                        name: 'Custom',
                        value: 'Custom',
                    },
                ))
        .addBooleanOption(option =>
            option.setName('tournament')
                .setDescription('Tournament races have more restrictions for non-referees.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('public')
                .setDescription('Determines whether resulting seed will be private or public.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('randomize-music')
                .setDescription('Determines whether resulting seed will have randomized OST.')
                .setRequired(false)),
    async execute(interaction, client, race) {
        let catagory = interaction.options.getString('category');
        let ppfSeed = seed(catagory);
        let raceChannel = client.guilds.cache.first(1)[0].channels;
        generatePPF(ppfSeed, ppfSeed.name,raceChannel,catagory.toLowerCase(),interaction.options.getBoolean('tournament'), interaction,interaction.options.getBoolean('randomize-music'),false);
        await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') });
    },
};