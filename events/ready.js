module.exports = {
    name: 'ready',
    once: true,
    execute() {
        let time = new Date();
        console.log(`Bot started at: ${time.toLocaleString('en-GB')}`);
    },
};