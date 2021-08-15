module.exports = {
    name: 'channels',
    execute(client, race) {
        console.log(client.guilds.cache.first(1)[0].channels.fetch()
            .then(channels => console.log(channels))
            .catch(console.error));
    },
};