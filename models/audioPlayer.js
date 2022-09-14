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
        this.connected = false;
        this.connection = null;
        this.audioFiles = fs.readdirSync('./audio').filter(file => file.endsWith('.mp3'));

        for (let i = 0; i < this.audioFiles.length; i++) {
            this.audioFiles[i] = require("path").join(__dirname, '../audio/' + this.audioFiles[i]);
        }
    }

    async play() {
        let index = Math.floor(Math.random() * 3) + 1;
        const resource = createAudioResource(this.audioFiles[index], { inputType: StreamType.Arbitrary });
        this.player.play(resource);
        try {
            await entersState(this.player, AudioPlayerStatus.Playing, 5_000);
        } catch (error) {
            console.error(error);
        }
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

            this.connection.on(VoiceConnectionStatus.Disconnected, async(oldState, newState) => {
                try {
                    await Promise.race([
                        entersState(connection, VoiceConnectionStatus.Signalling, 5000),
                        entersState(connection, VoiceConnectionStatus.Connecting, 5000),
                    ]);
                } catch (error) {
                    connection.destroy();
                    console.log(error);
                }
            });

            this.connected = true;
            return this.connection;
        } catch (error) {
            this.connection.destroy();
            console.log(error);
        }
    }

    disconnect() {
        try {
            if (this.connection.state.status !== VoiceConnectionStatus.Destroyed) {
                this.connection.destroy();
            }
        } catch (error) {
            console.log(error);
        }
    }

};