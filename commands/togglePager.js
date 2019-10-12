const config = require('../config.json');

module.exports = (message) => {
    console.log(message.member.roles);

    let userHasRole = message.member.roles.find(x => x.id === config.pagerRoleId);

    if (userHasRole) {
        message.member.removeRole(config.pagerRoleId).then(console.log).catch(console.error);
    } else {
        message.member.addRole(config.pagerRoleId).then(console.log).catch(console.error);
    }

    if (message) {
        message.delete().then().catch(console.error);
    }
    return;
};