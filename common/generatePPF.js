const config = require('../config.json');
const cp = require('child_process');
const fs = require('fs');
const simpleGit = require('simple-git');

function sendReply(patchFilePath,patchFileName,output, channel, interaction,isRace) {
    if (fs.existsSync(patchFilePath)) {
        console.log("here");
        let files = []
        if(!isRace){
            files = [{
                attachment: patchFilePath,
                name: patchFileName
            }]
        }
        else{
            channel.then(ch => {
                ch.send({
                    content: output,
                    files: [{
                        attachment: patchFilePath,
                        name: patchFileName
                    }],
                })
            }).catch(console.error);
        }
        interaction.editReply({ 
            content: output,
            files: files
        ,});
    }
}

function sendErrorReply(interaction) {
    interaction.editReply({
        content: "TinMan Encountered an error, please try again!",
    });
}

module.exports = async (seed, seedName, channel, catagory, tournament,interaction, randoMusic, isRace) => {
    console.log(seedName);
    let patchFileName = seedName + ".ppf";
    let randoPath = config.randoPath;

    console.log("generating seed...");

    let logs = '';
    let newlogs = '';
    let args = ["-o", config.patchFolder + patchFileName, "-p", catagory, "-s", seedName, "--race"];
    if (!randoMusic && catagory !== "boss-rush"){
        args.push("--opt","~m")
    }
    if (tournament && catagory !== "boss-rush"){
        args.push("-t")
    }
    console.log(randoPath + "randomize", args);
    let randomizer = cp.fork(randoPath + "randomize", args, { cwd: randoPath, stdio: ['ignore', 'pipe', 'pipe', 'ipc'] });

    randomizer.stdout.on('data', (outdata) => {
        logs += outdata;
    });
    randomizer.stderr.on('data' ,  (outdata) => {
        console.log(outdata);
    });
    randomizer.on('exit', async () => {
        console.log('logged: ' + logs);
        let output = `Successfully generated seed ${seedName} of preset ${catagory}!\n`;
        logs = logs.replace(/(?:\r\n|\r|\n)/g, ',').replace(/\s\s+/g, ' ');
        let items = logs.split('Starting equipment:, ')[1];
        if(catagory === "boss-rush" || catagory === "bountyhunter"){
            items = items.split('Relic locations:, ')[0];
        }
        output+= 'https://ppf.sotn.io/'
        output += '\n Starting equipment: ||' + items + '||';
        if(catagory === "bountyhunter"){
            let ppfApplier = cp.exec("C:/Users/Nikku/Documents/GitHub/speedrun-race-discord-bot/scripts/genBH.sh " + config.sotnVanillaBinPath + " " + config.ppfApplierPath + " " +config.patchFolder + patchFileName + " " +config.bhGeneratorToolPath);
            ppfApplier.stderr.on('data', (outdata) => {
                newlogs += outdata;
            });
            ppfApplier.on('exit', async () => {
                console.log(newlogs);
                try {
                    sendReply(config.patchFolder + patchFileName,patchFileName,output,channel.fetch(config.raceChannelId),interaction, isRace)
                } catch{
                    await sendErrorReply(interaction);
                }
            });
        }
        else {
            try {
                sendReply(config.patchFolder + patchFileName,patchFileName,output,channel.fetch(config.raceChannelId),interaction, isRace)
            } catch{
                await sendErrorReply(interaction);
            }
        }
    });
};
