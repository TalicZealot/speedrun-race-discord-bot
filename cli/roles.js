module.exports = {
    name: 'roles',
    description: 'Outputs a list of roles in the server and their ids.',
    execute(client) {
        client.guilds.cache.first(1)[0].roles.fetch()
            .then(roles => {
                let output = '';
                roles.forEach(role => {
                    output += "Name: " + role.name + "\n";
                    output += "Id:   " + role.id + "\n";
                    output += "\n";
                });
                console.log(output);
            })
            .catch(console.error);
    },
};