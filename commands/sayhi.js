const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sayhi')
        .setDescription(`Tells TinMan to introduce himself.`),
    async execute(interaction, client) {
        let output = ''

        output += 'Hi, I\'m TinMan!';
        output += '\n ';
        output += '\nYou can utilize me to complete many functions including generating seeds and starting races!';
        output += '\n ';
        output += '\n`/pager` toggles whether you\'re part of the the RacePager role. If you want to know when races are starting, use this command.';
        output += '\n`/generate` will get you a seed from the presets available exclusively through me! https://discord.com/channels/407759960588419073/566486385377280001/1144400736524976279 will tell you how.';
        output += '\n`/start` is used to start races. https://discord.com/channels/407759960588419073/566486385377280001/1144400712781008926 will tell you more about this.';
        output += '\n`/replay` starts the process of uploading a replay after you finish a race. Replays are required in tournament races unless you forfeit.';
        output += '\n`/stream` can set your stream in case your Discord username doesn\'t match your twitch username. This is used for multistreams for races.';
        output += '\n`/sayhi` generates this post! It helps new members get to know me!';
        output += '\n ';
        output += '\nIf you ever have any trouble with me, ping eldri7ch or the_swarm and they\'ll try to get me back online as soon as possible!';
        output += '\n ';
        output += '\nHope this helps, call me if you need me!';

        await interaction.reply({ content: output, ephemeral: false });
    },
};