require('dotenv').config();
const config = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var race = {
    started: false,
    finished: true,
    startedAt: null,
    initiatedAt: null,
    remainingPlayers: 0,
    players: [],
    offset: parseInt(config.defaultOffset),
    category: config.defaultCategory,
    messageId: null,
    seed: null,
    kadgar: null,
    status: '',
    tournament: false
};

fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventHandler(client, race, ...args));
    });
});

client.login(process.env.BOT_TOKEN).then(x => {
    let time = new Date();
    console.log(time.toLocaleString('en-GB') + ' restarted');
}).catch(console.error);

rl.on('line', (input) => {
    if (input === 'race') {
        console.log(race);
    } else if (input === 'channels') {
        console.log(client.channels);
    } else if (input === 'roles') {
        console.log(client.guilds.first(1)[0].roles);
    }
});