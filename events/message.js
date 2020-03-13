const config = require('../config.json');
const startrace = require('../commands/new');
const togglePager = require('../commands/togglePager');
const seed = require('../commands/seed');
const leaderboard = require('../commands/leaderboard');
const rank = require('../commands/rank');
const stream = require('../commands/stream');
const join = require('../commands/join');
const close = require('../commands/close');
const leave = require('../commands/leave');
const ready = require('../commands/ready');
const unready = require('../commands/unready');
const done = require('../commands/done');
const forfeit = require('../commands/forfeit');
const offset = require('../commands/offset');
const reset = require('../commands/reset');
const rematch = require('../commands/rematch');
const stats = require('../commands/stats');
const submit = require('../commands/submit');
const tournament = require('../commands/tournament');
const kick = require('../commands/kick');
const category = require('../commands/category');

module.exports = (client, race, message) => {
    const channel = client.channels.find(x => x.name === config.channel);

    if (message.content.match(/^^[.!]((\btoggle\b)|(\btogglePager\b)|(\bpager\b))/i)) {
        return togglePager(message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bseed\b)( ){0,1}(\bagonize\b){0,1}(\boptimize\b){0,1}(\bglitch\b){0,1}(\bhard\b){0,1}( ){0,1}(\bbingo\b){0,1}( ){0,1}((\bhex\b)|(\bmission\b)){0,1}( ){0,1}(\brando\b){0,1}/i)) {
        return seed(message, channel);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bleaderboard\b) ([ a-zA-Z0-9%]{3,20})/i)) {
        return leaderboard(channel, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\brank\b) ([ a-zA-Z0-9%]{3,20})/i)) {
        return rank(channel, message, message.author.username);
    }
    if (message.channel === channel && message.content.match(/^[.!]((\bstream\b)|(\btwitch\b)) ([a-zA-Z0-9_]{4,20})/i)) {
        return stream(race, channel, message, message.author.username);
    }
    if (message.channel === channel && message.content.match(/^[.!]((\bstartrace\b)|(\bnew\b)|(\benter\b))([ ]{0,1})("[a-zA-Z0-9% ]{0,40}"){0,1}([ ]{0,1})([a-z]{0,10})(\b tournament\b){0,1}/i)) {
        return startrace(race, channel, message);
    }
    if (message.channel === channel && message.content.match(/^[.!]((\bclose\b)|(\bend\b)|(\bexit\b))/i)) {
        return close(race, message, channel);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bcategory\b) ("[a-zA-Z0-9% ]{0,40}")/i)) {
        return category(race, channel, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\btournament\b)/i)) {
        return tournament(race, message);
    }
    if (message.channel === channel && message.content.match(/^[.!]((\bjoin\b)|(\benter\b))/i)) {
        return join(race, channel, message.author.username, message);
    }
    if (message.channel === channel && message.content.match(/^[.!]((\bleave\b)|(\bunjoin\b))/i)) {
        return leave(race, channel, message.author.username, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bready\b)/i)) {
        return ready(race, channel, message.author.username, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bunready\b)/i)) {
        return unready(race, channel, message.author.username, message);
    }
    if (message.channel === channel && message.content.match(/^[.!]((\bdone\b)|(\btime\b))/i)) {
        return done(race, channel, message.author.username, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bforfeit\b)/i)) {
        return forfeit(race, channel, message.author.username, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\brematch\b)/i)) {
        return rematch(race, channel, message.author.username, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\boffset\b) (([0-9]+)|(\bpsx\b)|(\bxb\b))/i)) {
        return offset(race, channel, message);
    }
    if (message.channel === channel && message.content.match(/^[.!]((\breset\b)|(\brestart\b))/i)) {
        return reset(race, channel, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bstats\b)([ ]{0,1})([a-zA-Z0-9%]{0,20})/i)) {
        return stats(race, channel, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bsubmit\b)(( "[a-zA-Z0-9% .]{3,20}"){3,11})( end)/i)) {
        return submit(channel, message);
    }
    if (message.channel === channel && message.content.match(/^[.!](\bkick\b)([ ]{0,1})([a-zA-Z0-9%]{0,20})/i)) {
        return kick(race, channel, message);
    }
};