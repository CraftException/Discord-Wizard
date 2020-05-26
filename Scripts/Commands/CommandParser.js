let fs = require('fs')

let rawdata = fs.readFileSync('Bot.json');
let botconfig = JSON.parse(rawdata);

module.exports.parse = function (msg, client) {
    var content = msg.content
    var author = msg.author
    var channel = msg.channel

    if (author.id != client.user.id && content.startsWith(botconfig.defaultprefix)) {
        var command = content.split(' ')[0].substr(botconfig.defaultprefix.length)
        var args = content.split(' ').slice(1)
        var id = channel.id
        if (command === "setjoinmsg") {

        }
    }
};