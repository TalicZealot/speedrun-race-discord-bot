module.exports = () => {
    let time = new Date();
    console.log(time.toLocaleString('en-GB') + ' reconnecting');
};