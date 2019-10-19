module.exports = (warning) => {
    let time = new Date();
    console.log(time.toLocaleString('en-GB') + ' warning: \n' + warning);
};