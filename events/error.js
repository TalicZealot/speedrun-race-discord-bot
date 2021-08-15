module.exports = {
    name: 'error',
    once: true,
    execute(error) {
        let time = new Date();
        console.log(time.toLocaleString('en-GB') + ' error \n' + error.message);
    },
};