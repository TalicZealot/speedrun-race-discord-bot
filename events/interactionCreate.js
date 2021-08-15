module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, race) {
        if (interaction.isCommand()) {
            if (!client.commands.has(interaction.commandName)) return;
            try {
                await client.commands.get(interaction.commandName).execute(interaction, client, race);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }

        if (interaction.isButton()) {
            if (!client.buttons.has(interaction.customId)) return;
            try {
                await client.buttons.get(interaction.customId).execute(interaction, client, race);
            } catch (error) {
                console.error(error);
            }
        }
    }
};