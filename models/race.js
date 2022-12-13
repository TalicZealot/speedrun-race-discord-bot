const config = require('../config.json');
const data = require('../data/data.js');
const elo = require('../elo/elo.js');
const seed = require('../common/seed.js');
const generatePPF = require('../common/generatePPF.js');
const lockVoiceChannel = require('../common/lockVoiceChannel');
const unlockVoiceChannel = require('../common/unlockVoiceChannel');
const updateLeaderboard = require('../common/updateLeaderboard');
const Player = require('./player.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require('discord.js');

module.exports = class Race {
    constructor(client, audioPlayer) {
        this.client = client;
        this.channel = client.guilds.cache.first(1)[0].channels.fetch(config.raceChannelId);
        this.audioPlayer = audioPlayer;
        this.started = false;
        this.finished = true;
        this.startedAt = null;
        this.initiatedAt = null;
        this.players = [];
        this.offset = parseInt(config.defaultOffset);
        this.category = null;
        this.messageId = null;
        this.seed = null;
        this.seedName = '';
        this.multistream = null;
        this.status = '';
        this.tournament = false;
        this.ranked = false;
        this.message = null;
        this.replays = [];
    }

    includes(id) {
        return this.players.find(player => player.id === id) !== undefined;
    }

    removePlayer(id) {
        let player = this.players.find(player => player.id === id);
        this.players.splice(this.players.indexOf(player), 1);
    }

    addPlayer(username, id) {
        let player = new Player(username, id);
        this.players.push(player);
    }

    joinPlayer(user) {
        if (this.finished || this.started) {
            return;
        }
        if (this.includes(user.id)) {
            this.removePlayer(user.id);
            this.update();
        } else {
            this.addPlayer(user.username, user.id);
            this.update();
        }
    }

    readyPlayer(user) {
        if (!this.finished && !this.started && this.includes(user.id)) {
            if (this.players.find(player => player.username === user.username).ready) {
                this.players.find(player => player.username === user.username).ready = false;
                this.update();
            } else {
                this.players.find(player => player.username === user.username).ready = true;
                this.update();
            }
        }
    }

    finishPlayer(user) {
        if (!this.finished && this.started && this.includes(user.id)) {
            if (this.players.find(player => player.username === user.username).forfeited) {
                return;
            }
            if (this.players.find(player => player.username === user.username).time) {
                this.players.find(player => player.username === user.username).time = null;
                this.update();
            } else {
                this.players.find(player => player.username === user.username).time = new Date().getTime() - this.startedAt;
                this.update();
            }
        }
    }

    forfeitPlayer(user) {
        if (!this.finished && this.started && this.includes(user.id)) {
            this.players.find(player => player.username === user.username).forfeited = true;
            this.update();
        }
    }

    sortPlayers() {
        this.players.sort(function(a, b) {
            if (a.time == null) {
                if (b.time) {
                    return 1;
                }
            }
            if (b.time == null) {
                if (a.time) {
                    return -1;
                }
            }
            if (b.forfeited == true) {
                if (!a.forfeited) {
                    return 1;
                }
            }
            if (a.forfeited == true) {
                if (!b.forfeited) {
                    return -1;
                }
            }
            if (a.time > b.time) {
                return 1;
            }
            if (a.time == b.time) {
                return 0;
            }
            if (a.time < b.time) {
                return -1;
            }
            return 0;
        });
    }

    playersReady() {
        return this.players.every(x => x.ready);
    }

    playersFinished() {
        return this.players.every(x => x.time != null || x.forfeited === true);
    }

    generateMultistream() {
        this.multistream = 'https://multistre.am/';
        this.players.forEach(player => {
            let userTwitch = data.getPlayerTwitch(player.username);
            if (userTwitch) {
                this.multistream += userTwitch + '/';
            } else {
                this.multistream += player.username.replace(/\W/gi, "") + '/';
            }
        });
    }

    addReplay(filename) {
        this.replays.push(filename);
    }

    getReplays() {
        return this.replays;
    }

    allReplaysSubmitted() {
       return this.replays.length === this.players.length; 
    }

    setSeedName(name) {
        this.seedName = name;
    }

    initiate(category, ranked, tournament, user) {
        this.defaults();
        this.audioPlayer.connectToChannel();
        this.status = 'RACE: WAITING FOR PLAYERS';
        this.category = category;
        this.ranked = ranked;
        unlockVoiceChannel(this.client);

        if (!category.includes('Custom')) {
            let seedData = seed(category.toLowerCase());
            this.seed = seedData.link;
            this.seedName = seedData.name;
            if (config.generatePPF) {
                generatePPF(this.seed, this.seedName, this.channel);
            }
        } else {
            this.seedName = "custom";
        }

        this.finished = false;
        this.tournament = tournament;
        this.addPlayer(user.username, user.id);
        this.generateMultistream()
        this.initiatedAt = new Date().getTime();

        let buttonComponents = [
            new ButtonBuilder()
            .setCustomId('join')
            .setLabel('Join')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('ready')
            .setLabel('Ready')
            .setStyle(ButtonStyle.Success)
        ];

        if (this.seed) {
            buttonComponents.push(
                new ButtonBuilder()
                .setLabel('Seed')
                .setStyle(ButtonStyle.Link)
                .setURL(this.seed),
            );
        }

        buttonComponents.push(
            new ButtonBuilder()
            .setLabel('Multistream')
            .setStyle(ButtonStyle.Link)
            .setURL(this.multistream)
        );

        const buttons = new ActionRowBuilder()
            .addComponents(buttonComponents);

        this.channel.then(channel => {
            channel.send({ content: 'RACE STARTED', components: [buttons] }).then(msg => {
                this.message = msg;
                this.messageId = msg.id;
                this.updateMessage();
            })
        }).catch(console.error);
    }

    async start() {
        this.audioPlayer.play();
        const sleep = m => new Promise(r => setTimeout(r, m));
        this.status = 'GET READY';
        this.updateMessage()
        await sleep(1700);
        this.status = 'Starting in: 3';
        this.updateMessage()
        await sleep(1000);
        this.status = 'Starting in: 2';
        this.updateMessage();
        await sleep(1000);
        this.status = 'Starting in: 1';
        this.updateMessage();
        if (!this.playersReady()) {
            this.status = 'INTERRUPTED: WAITING FOR PLAYERS';
            this.updateMessage();
            return;
        }
        await sleep(1000);
        this.status = 'PLAY!';
        this.updateMessage();
        await sleep(1500);
        this.status = 'RACE STARTED'
        this.started = true;
        this.updateMessage();
        this.audioPlayer.disconnect();

        let buttonComponents = [
            new ButtonBuilder()
            .setCustomId('finish')
            .setLabel('Finish')
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId('forfeit')
            .setLabel('Forfeit')
            .setStyle(ButtonStyle.Danger),
        ];

        if (this.seed) {
            buttonComponents.push(
                new ButtonBuilder()
                .setLabel('Seed')
                .setStyle(ButtonStyle.Link)
                .setURL(this.seed),
            );
        }

        buttonComponents.push(
            new ButtonBuilder()
            .setLabel('Multistream')
            .setStyle(ButtonStyle.Link)
            .setURL(this.multistream)
        );

        this.startedAt = new Date().getTime() + this.offset;

        const buttons = new ActionRowBuilder()
            .addComponents(buttonComponents);

        this.retry(() => {this.message.edit({ components: [buttons] })}, 3);

        lockVoiceChannel(this.client);
    }

    end() {
        if (this.ranked) {
            let adjustments = elo.resolveMatch(this.players, this.category);
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].adjustment = adjustments[i];
                data.setPlayerId(this.players[i].username, this.players[i].id);
            }
            updateLeaderboard(this.client, this.category);
        }

        this.status = 'RACE FINISHED';
        this.started = false;
        this.finished = true;
        this.updateMessage();
        unlockVoiceChannel(this.client);

        let buttonComponents = [];

        if (this.seed) {
            buttonComponents.push(
                new ButtonBuilder()
                .setLabel('Seed')
                .setStyle(ButtonStyle.Link)
                .setURL(this.seed),
            );
        }

        buttonComponents.push(
            new ButtonBuilder()
            .setLabel('Multistream')
            .setStyle(ButtonStyle.Link)
            .setURL(this.multistream)
        );

        const buttons = new ActionRowBuilder()
            .addComponents(buttonComponents);

        this.retry(() => {this.message.edit({ components: [buttons] })}, 3);
    }

    async update() {
        this.sortPlayers();

        if (!this.started && this.playersReady() && this.players.length > 1) {
            await this.start();
        }

        if (this.started && this.playersFinished()) {
            this.end();
        }

        this.updateMessage();
    }

    updateSeed() {

        let buttonComponents = [
            new ButtonBuilder()
            .setCustomId('join')
            .setLabel('Join')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('ready')
            .setLabel('Ready')
            .setStyle(ButtonStyle.Success)
        ];

        if (this.seed) {
            buttonComponents.push(
                new ButtonBuilder()
                .setLabel('Seed')
                .setStyle(ButtonStyle.Link)
                .setURL(this.seed),
            );
        }

        buttonComponents.push(
            new ButtonBuilder()
            .setLabel('Multistream')
            .setStyle(ButtonStyle.Link)
            .setURL(this.multistream)
        );

        const buttons = new ActionRowBuilder()
            .addComponents(buttonComponents);

        this.retry(() => {this.message.edit({ components: [buttons] })}, 3);
    }

    updateMessage() {
        this.sortPlayers();
        let output = '-';

        const centerPad = (str, length, char = ' ') => str.padStart((str.length + length) / 2, char).padEnd(length, char);
        output += '\n       `' + centerPad(((this.ranked ? 'RANKED ' : '') + this.status), 33) + '`';
        output += '\n       `' + centerPad(('Category: ' + this.category), 33) + '`';

        for (let i = 0; i < this.players.length; i++) {
            if (i == 0 && this.players[i].time && this.finished) {
                output += '\n :first_place:';
            } else if (i == 1 && this.players[i].time && this.finished) {
                output += '\n :second_place:';
            } else if (i == 2 && this.players[i].time && this.finished) {
                output += '\n :third_place:';
            } else {
                output += '\n       ';
            }

            output += ('` ' + this.players[i].username.replace(/\W/gi, "")).padEnd(20, " ");

            if (this.players[i].time || this.players[i].forfeited) {
                let rightCol = (this.players[i].forfeited) ? 'forfeited' : this.players[i].hours().toString().padStart(2, "0") + ':' + this.players[i].minutes().toString().padStart(2, "0") + ':' + this.players[i].seconds().toString().padStart(2, "0") + ' ';
                if (this.finished && this.players[i].adjustment) {
                    rightCol += ' ' + ((this.players[i].adjustment > 0) ? '+' + this.players[i].adjustment : this.players[i].adjustment);
                }
                output += (rightCol).padEnd(14, " ");
            } else {
                let rightCol = '';
                if (!this.started) {
                    rightCol = (this.players[i].ready) ? 'ready ' : ' ';
                }
                output += (rightCol).padEnd(14, " ");
            }
            output += '`';
        }

        this.retry(() => {this.message.edit(output)}, 3);
    }

    restart() {
        this.started = false;
        this.finished = false;
        this.startedAt = null;
        this.initiatedAt = new Date().getTime();
        this.offset = parseInt(config.defaultOffset);
        this.status = 'RACE RESTARTED: WAITING FOR PLAYERS';
        this.players.forEach(player => {
            player.ready = false;
        });
        this.updateMessage();
        unlockVoiceChannel(this.client);
    }

    defaults() {
        this.started = false;
        this.finished = true;
        this.startedAt = null;
        this.initiatedAt = null;
        this.players = [];
        this.offset = parseInt(config.defaultOffset);
        this.category = null;
        this.messageId = null;
        this.seed = null;
        this.multistream = null;
        this.tournament = false;
        this.ranked = false;
        this.seedName = '';
        this.replays = [];
    }

    close() {
        this.started = false;
        this.finished = true;
        this.offset = parseInt(config.defaultOffset);
        this.status = 'RACE CLOSED';
        this.updateMessage();
        this.audioPlayer.disconnect();

        let buttonComponents = [];

        if (this.seed) {
            buttonComponents.push(
                new ButtonBuilder()
                .setLabel('Seed')
                .setStyle(ButtonStyle.Link)
                .setURL(this.seed),
            );
        }

        buttonComponents.push(
            new ButtonBuilder()
            .setLabel('Multistream')
            .setStyle(ButtonStyle.Link)
            .setURL(this.multistream)
        );

        const buttons = new ActionRowBuilder()
            .addComponents(buttonComponents);

        this.retry(() => {this.message.edit({ components: [buttons] })}, 3);
    }

    async retry(apiCall, retries) {
        const sleep = m => new Promise(r => setTimeout(r, m));
        for (let i = 0; i < retries; i++) {
            try {
                apiCall();
                return;
            } catch (error) {
                console.log(error);
                await sleep(Math.pow(12, i) + Math.floor(Math.random() * 10));
            }
        }
    }
}