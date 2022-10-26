const config = require('../config.json');
const cp = require('child_process');
const fs = require('fs');
const simpleGit = require('simple-git');

module.exports = (seed, seedName, channel) => {
    console.log(seedName);
    let patchFileName = seedName + ".ppf";
    let randoPath = config.randoPath;

    const git = simpleGit({
        baseDir: randoPath
    });
    git.pull().then(() => {
        console.log("generating seed...");

        let logs = '';

        let randomizer = cp.fork(randoPath + "randomize", ["-o", config.patchFolder + patchFileName, seed], { cwd: randoPath, stdio: ['ignore', 'pipe', 'pipe', 'ipc'] });

        randomizer.stdout.on('data', (outdata) => {
            logs += outdata;
        });

        randomizer.on('exit', (m) => {
            console.log('logged: ' + logs);
            let output = 'https://ppf.sotn.io/';
            logs = logs.replace(/(?:\r\n|\r|\n)/g, ',').replace(/\s\s+/g, ' ');
            let items = logs.split('Starting equipment:, ')[1];
            output += '\n Starting equipment: ||' + items + '||';
            if (fs.existsSync(config.patchFolder + patchFileName)) {
                channel.then(ch => {
                    ch.send({
                        content: output,
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