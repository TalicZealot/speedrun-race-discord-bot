module.exports = {
    name: 'race',
    execute(client, race) {
        let output = "Race properties\n";
        output += "";

        for (let [key, value] of Object.entries(race)) {
            output += key + ": " +  value + "\n";
        }

        console.log(output);
    },
};