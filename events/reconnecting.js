module.exports = () => {
    const sleep = m => new Promise(r => setTimeout(r, m));
    let time = new Date();
    (async() => {
        await sleep(2000);
        console.log(time.toLocaleString('en-GB') + ' reconnecting');
    })();
};