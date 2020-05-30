let fs = require('fs')

module.exports.getlevel = function (msg, client) {
    var server = msg.server
    var  rawdata = fs.readFileSync("Server/" + msg.guild.id + ".json")
    var  serverconfig = JSON.parse(rawdata);

    const cmd = require('../../Scripts/Level/updateLevel.js')
    var level = cmd.getlevelnumber(serverconfig.messages[msg.author.id], serverconfig.level[msg.author.id])

    msg.channel.send(``, {
        embed:{
            title: ':exclamation::exclamation::exclamation:  Your Rank:',
            color: 0x2471a3,
            description: "",
            fields:[
                {
                    name: ':wink: Level',
                    value: level
                },
                {
                    name: ':tools: Messages:',
                    value: serverconfig.messages[msg.author.id]
                }
            ],

            footer: {
                text: 'Discord-Wizard by CraftException#0001.'
            }
        }
    })

};