const config = require('../config.json');
const fs = require('fs');
const JSZip = require('jszip');

module.exports = async (channel, race) => {
    let zipFileName = race.seedName + ".zip";

    var zip = new JSZip();

    for (const replay of race.replays) {
        let path = config.replaysFolder + "/" + race.seedName + "/" + replay;
        let data = fs.readFileSync(path);
        zip.file(replay, data);
    }

    zip
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(config.replaysFolder + zipFileName))
    .on('finish', function () {
            channel.then(ch => {
                ch.send({
                    content: "https://taliczealot.github.io/#/apps/replays",
                    files: [{
                        attachment: config.replaysFolder + zipFileName,
                        name: zipFileName
                    }]
                })
            }).catch(console.error);
        });
};