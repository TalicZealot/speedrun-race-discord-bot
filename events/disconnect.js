module.exports = (event) => {
    let time = new Date();
    console.log(time.toLocaleString('en-GB') + ' disconnected \n' + event.reason);
};