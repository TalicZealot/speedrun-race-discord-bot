const config = require('../config.json');
const https = require('https');
const fs = require('fs');

module.exports = async (url, name, race, user) => {
    let path = config.replaysFolder + "/" + race.seedName + "/" + name;
    const file = fs.createWriteStream(path);
    const dir = race.seedName;

    if (!fs.existsSync(config.replaysFolder + "/"  + dir)) {
        fs.mkdirSync(config.replaysFolder + "/"  + dir);
    }

    return new Promise((resolve, reject) => {
        https.get(url, function (response) {
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                race.addReplay(name, user);
                resolve('replay downloaded');
            });
            file.on("error", (e) => {
                file.close();
                reject('error: ' + e.message);
            });
        });
    });
};