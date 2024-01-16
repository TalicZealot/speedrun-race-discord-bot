const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const generatePPF = require('../common/generatePPF.js');
const seed = require('../common/seed.js');
const data = require('../data/data.js');

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
                        name: 'guarded-og',
                        value: 'guarded-og',
                    },
                    {
                        name: 'safe',
                        value: 'safe',
                    },
                    {
                        name: 'casual',
                        value: 'casual',
                    },
                    {
                        name: 'nimble',
                        value: 'nimble',
                    },
                    {
                        name: 'lycanthrope',
                        value: 'lycanthrope',
                    },
                    {
                        name: 'expedition',
                        value: 'expedition',
                    },
                    {
                        name: 'warlock',
                        value: 'warlock',
                    },
                    {
                        name: 'adventure',
                        value: 'adventure',
                    },
                    {
                        name: 'og',
                        value: 'og',
                    },
                    {
                        name: 'speedrun',
                        value: 'speedrun',
                    },
                    {
                        name: 'bat-master',
                        value: 'bat-master',
                    },
                    {
                        name: 'boss-rush',
                        value: 'boss-rush',
                    },
                    {
                        name: 'bounty-hunter',
                        value: 'bountyhunter',
                    },
                    {
                        name: 'summoner',
                        value: 'summoner',
                    },
                    {
                        name: 'scavenger',
                        value: 'scavenger',
                    },
                    {
                        name: 'aperture',
                        value: 'aperture',
                    },
                    {
                        name: 'breach',
                        value: 'breach',
                    },
                    {
                        name: 'forge',
                        value: 'forge',
                    },
                    {
                        name: 'big-toss',
                        value: 'big-toss',
                    },
                    {
                        name: 'Custom',
                        value: 'Custom',
                    },
                ))
        .addBooleanOption(option =>
            option.setName('tournament')
                .setDescription('Tournament races have more restrictions for non-referees.')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('public')
                .setDescription('Determines whether resulting seed will be private or public.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('vanilla-music')
                .setDescription('Determines whether resulting seed will have randomized OST.')
                .setRequired(false)),
    async execute(interaction, client, race) {
        let catagory = interaction.options.getString('category');
        let ppfSeed = seed(catagory);
        let raceChannel = client.guilds.cache.first(1)[0].channels;
        console.log('Seed Generated For: ' + data.getPlayerUsername(interaction.user.id))
        generatePPF(ppfSeed, ppfSeed.name,raceChannel,catagory.toLowerCase(),interaction.options.getBoolean('tournament'), interaction,!interaction.options.getBoolean('vanilla-music'),false);
        await interaction.deferReply({ ephemeral: !interaction.options.getBoolean('public') });
    },
};