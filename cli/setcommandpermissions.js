const { SlashCommandBuilder } = require('@discordjs/builders');

//Use this command to set role or user permissions to slash commands
module.exports = {
    name: 'setcommandpermissions',
    async execute(client, race) {
        /*
        let commandId = null;
        client.guilds.cache.get('625294110139482113')?.commands.fetch().then(
            commands => {
                commands.forEach(command => {
                    commandId = command.id;

                    if (command.name === 'kick') {
                        const permissions = [
                            {
                                id: '224617799434108928',
                                type: 'USER',
                                permission: true,
                            },
                        ];
                        await command.permissions.set({ permissions });
                    }
                });
            }
        );
        */
    }
};