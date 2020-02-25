module.exports = (error) => {
    let time = new Date();
    console.log(time.toLocaleString('en-GB') + ' error \n' + error.message);
};