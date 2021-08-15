const config = require('../config.json');
const cp = require('child_process');
const { Attachment } = require('discord.js');
const fs = require('fs');
const simpleGit = require('simple-git');

module.exports = (seed, channel) => {
    let match = seed.match(/([?])([a-zA-Z0-9]{7,40}$)/i);
    if (!match) {
        return;
    }
    console.log(match[2]);
    let patchFileName = match[2] + ".ppf";
    let randoPath = config.randoPath;

    const git = simpleGit({
        baseDir: randoPath
    });
    git.pull().then(() => {
        console.log("generating seed...");
        let randomizer = cp.fork(randoPath + "randomize", ["-o", config.patchFolder + patchFileName, seed], { cwd: randoPath });

        randomizer.on('exit', (m) => {
            if (fs.existsSync(config.patchFolder + patchFileName)) {
                channel.then(ch => {
                    ch.send({
                        content: 'https://ppf.sotn.io/',
                        files: [{
                            attachment: config.patchFolder + patchFileName,
                            name: patchFileName
                        }]
                    })
                }).catch(console.error);
            }
        });
    }).catch(e => {
        console.log('There has been a problem with your git operation: ' + e.message);
    });
};