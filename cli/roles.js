module.exports = {
    name: 'roles',
    execute(client, race) {
        client.guilds.cache.first(1)[0].roles.fetch()
            .then(roles => console.log(roles))
            .catch(console.error);
    },
};