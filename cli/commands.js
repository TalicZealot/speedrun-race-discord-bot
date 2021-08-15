module.exports = {
    name: 'commands',
    execute(client, race) {
        client.guilds.cache.get('625294110139482113')?.commands.fetch().then(
            commands => {
                commands.forEach(command => {
                    console.log(`id:${command.id}`);
                    console.log(`name:${command.name}`);
                    console.log(`--------------------------`);
                });
            }
        );
    },
};