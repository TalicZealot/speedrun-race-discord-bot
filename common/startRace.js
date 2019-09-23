module.exports = (race, channel) => {
    const sleep = m => new Promise(r => setTimeout(r, m));
    (async() => {
        channel.send('All players are ready. Starting in:').then().catch(console.error);
        await sleep(3000);
        channel.send('4').then().catch(console.error);
        await sleep(1000);
        channel.send('3').then().catch(console.error);
        await sleep(1000);
        channel.send('2').then().catch(console.error);
        await sleep(1000);
        channel.send('1').then().catch(console.error);
        await sleep(1000);
        channel.send('GO!').then().catch(console.error);
        race.started = true;
        race.startedAt = new Date().getTime() + race.offset;
    })();
    return;
};