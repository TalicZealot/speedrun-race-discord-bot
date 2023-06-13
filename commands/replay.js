const { SlashCommandBuilder } = require('@discordjs/builders');
const downloadReplay = require('../common/downloadReplay');
const zipReplays = require('../common/zipReplays');
const config = require('../config.json');
const fs = require('fs');
const maxFileSize = 35000;
const replayFileExtension = ".sotnr";

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
        if (!race.includes(interaction.user.id)) {
            await interaction.reply({ content: `Can't submit replays if you are not in the race!`, ephemeral: true });
            return;
        }

        if (!race.playerHasFinished(interaction.user)) {
            await interaction.reply({ content: `Can't submit replays if you haven't finished the race!`, ephemeral: true });
            return;
        }

        let replay = interaction.options.getAttachment('replay');

        if (replay.size > maxFileSize) {
            await interaction.reply({ content: `File size was too large!`, ephemeral: true });
            return;
        }

        if (!replay.name.endsWith(replayFileExtension)) {
            await interaction.reply({ content: `Invalid file type!`, ephemeral: true });
            return;
        }

        if (race.seedName === "custom") {
            let name = replay.name.replace(replayFileExtension,"");
            let preset = "";
            let seedName = "";

            let matchPreset = name.match(/(ADVENTURE|BAT-MASTER|CASUAL|EMPTY-HAND|EXPEDITION|GEM-FARMER|GLITCH|GUARDED-OG|LYCANTHROPE|NIMBLE|OG|SAFE|SCAVENGER|SPEEDRUN|THIRD-CASTLE|WARLOCK|CUSTOM)/);
            
            if (matchPreset) {
                preset = matchPreset[1];
            }
        
            name = name.replace(preset, '');
            
            let match = name.match(/([a-zA-Z0-9()]{5,50})([-]){1}([a-zA-Z0-9 -]{0,30})$/i);
            if (match && match.length == 4) {
                seedName = match[1];
            }

            race.setSeedName(seedName);
        }

        if (fs.existsSync(config.replaysFolder + "/" + race.seedName + "/" + replay.name)) {
            await interaction.reply({ content: `Invalid. File already submitted!`, ephemeral: true });
            return;
        }
        await interaction.reply({ content: 'Replay submitted!', ephemeral: true });
        await downloadReplay(replay.url, replay.name, race, interaction.user);

        if (race.allReplaysSubmitted()) {
            zipReplays(interaction.channel, race);
        }
        
        race.update();
    },
};