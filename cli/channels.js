module.exports = {
    name: 'channels',
    description: 'Outputs a list of channels in the server and their ids.',
    execute(client) {
        console.log(client.guilds.cache.first(1)[0].channels.fetch()
            .then(channels => {
                let output = '';
                channels.forEach(command => {
                    output += "Name: " + command.name + "\n";
                    output += "Id:   " + command.id + "\n";
                    output += "\n";
                });
                console.log(output);
            })
            .catch(console.error));
    },
};