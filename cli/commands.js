module.exports = {
    name: 'commands',
    description: 'Outputs a list of slash commands in the server and their ids.',
    execute(client) {
        client.guilds.cache.first(1)[0].commands.fetch().then(
            commands => {
                let output = '';
                commands.forEach(command => {
                    output += "Name: " + command.name + "\n";
                    output += "Id:   " + command.id + "\n";
                    output += "\n";
                });
                console.log(output);
            }
        );
    },
};