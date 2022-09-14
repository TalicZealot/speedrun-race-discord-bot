require('dotenv').config();
const Race = require('./models/race');
const AudioPlayer = require('./models/audioPlayer');
const config = require('./config.json');
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates]});
client.commands = new Collection();
client.buttons = new Collection();
const readline = require('readline');

var race = null;
var audioPlayer = null;

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, race));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client, race));
    }
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
    const button = require(`./buttons/${file}`);
    client.buttons.set(button.name, button);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const cliFiles = fs.readdirSync('./cli').filter(file => file.endsWith('.js'));
rl.on('line', (input) => {
    for (const file of cliFiles) {
        const command = require(`./cli/${file}`);
        if (input === command.name) {
            command.execute(client, race);
            break;
        }
    }
});

client.login(process.env.BOT_TOKEN).then(() => {
    audioPlayer = new AudioPlayer(client);
    race = new Race(client, audioPlayer);
}).catch(console.error);