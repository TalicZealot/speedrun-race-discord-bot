const config = require('../config.json');
const https = require('https');
const fs = require('fs');

module.exports = async (url, name, race) => {
    let path = config.replaysFolder + "/" + race.seedName + "/" + name;
    const file = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        https.get(url, function (response) {
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                race.addReplay(name);
                resolve('replay downloaded');
            });
            file.on("error", (e) => {
                file.close();
                reject('error: ' + e.message);
            });
        });
    });
};