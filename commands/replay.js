const { SlashCommandBuilder } = require('@discordjs/builders');
const downloadReplay = require('../common/downloadReplay');
const zipReplays = require('../common/zipReplays');
const config = require('../config.json');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('replay')
        .setDescription(`Submit a replay.`)
        .addAttachmentOption(option => 
            option.setName('replay')
            .setDescription('Your replay for this race.')
            .setRequired(true)
        ),
    async execute(interaction, client, race) {
        if (!race.finished || race.seedName == "") {
            await interaction.reply({ content: `Race has to be finished!`, ephemeral: true });
            return;
        }

        if (!race.includes(interaction.user.id)) {
            await interaction.reply({ content: `Can't set the seed if you are not in the race!`, ephemeral: true });
            return;
        }

        let replay = interaction.options.getAttachment('replay');

        if (replay.size > 35000) {
            await interaction.reply({ content: `File size was too large!`, ephemeral: true });
            return;
        }

        if (!replay.name.endsWith(".sotnr")) {
            await interaction.reply({ content: `Invalid file type!`, ephemeral: true });
            return;
        }

        if (fs.existsSync(config.replaysFolder + "/" + race.seedName + "/" + replay.name)) {
            await interaction.reply({ content: `Invalid. File already submitted!`, ephemeral: true });
            return;
        }

        await downloadReplay(replay.url, replay.name, race);

        if (race.replays.lenght == race.players.lenght) {
            zipReplays(interaction.channel, race.replays, race.seedName);
        }

        await interaction.reply({ content: 'Replay submitted!', ephemeral: true });
    },
};