const config = require('../config.json');
const fs = require('fs');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    entersState,
    NoSubscriberBehavior,
    StreamType,
    AudioPlayerStatus,
    VoiceConnectionStatus,
} = require('@discordjs/voice');

module.exports = class AudioPlayer {
    constructor(client) {
        this.voiceChannel = client.guilds.cache.first(1)[0].channels.fetch(config.raceVoiceChannelId);
        this.player = createAudioPlayer();
        this.connection = null;
        this.audioFiles = fs.readdirSync('./audio').filter(file => file.endsWith('.mp3'));

        for (let i = 0; i < this.audioFiles.length; i++) {
            this.audioFiles[i] = require("path").join(__dirname, '../audio/' + this.audioFiles[i]);
        }
    }

    play() {
        let index = Math.floor(Math.random() * 3) + 1;
        console.log(`index: ${index}, file: ${this.audioFiles[index]}`);
        const resource = createAudioResource(this.audioFiles[index], { inputType: StreamType.Arbitrary });
        this.player.play(resource);
        return entersState(this.player, AudioPlayerStatus.Playing, 5e3);
    }

    async connectToChannel() {
        let channel = await this.voiceChannel;

        this.connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guildId,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        try {
            await entersState(this.connection, VoiceConnectionStatus.Ready, 30e3);
            this.connection.subscribe(this.player);
            return this.connection;
        } catch (error) {
            this.connection.destroy();
            throw error;
        }
    }

    disconnect() {
        this.connection.destroy();
    }

};