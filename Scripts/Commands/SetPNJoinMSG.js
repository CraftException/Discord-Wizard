let fs = require('fs')

module.exports.pnmsg = function (msg, client, content) {
    var server = msg.server
    var  rawdata = fs.readFileSync("Server/" + msg.guild.id + ".json")
    var  serverconfig = JSON.parse(rawdata);

    var finalString = ""
    content.forEach(element => finalString += element + " ");
    serverconfig.privatemsg = finalString
    fs.writeFileSync("Server/" + msg.guild.id + ".json", JSON.stringify(serverconfig));

    msg.channel.send(``, {
        embed:{
            title: ':thumbsup: The Private welcome message has been set successfully!',
            color: 0x2471a3,
            description: "",
            fields:[
                {
                    name: ':wink: Message Content',
                    value: finalString
                },
                {
                    name: ':tools: Channel',
                    value: msg.channel.id
                }
            ],

            footer: {
                text: 'Discord-Wizard by CraftException#0001.'
            }
        }
    }).then(msg => {
        msg.delete(5000)
    });

    msg.delete(5000)
};