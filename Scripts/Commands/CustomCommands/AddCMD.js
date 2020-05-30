let fs = require('fs')

module.exports.addcmd =  function (msg, client, content, cmd) {
    var server = msg.server
    var  rawdata = fs.readFileSync("Server/" + msg.guild.id + ".json")
    var  serverconfig = JSON.parse(rawdata);

    var finalString = ""
    content.forEach(element => finalString += element + " ");

    if (!exists(cmd, msg)) {

        serverconfig.commands[cmd] = finalString
        fs.writeFileSync("Server/" + msg.guild.id + ".json", JSON.stringify(serverconfig));

        msg.channel.send(``, {
            embed: {
                title: ':thumbsup: The command has been add successfully!',
                color: 0x2471a3,
                description: "",
                fields: [
                    {
                        name: ':wink: Message Content',
                        value: finalString
                    },
                    {
                        name: ':smile: Command Name',
                        value: cmd
                    }
                ],

                footer: {
                    text: 'Discord-Wizard by CraftException#0001.'
                }
            }
        }).then(msg => {
            msg.delete(5000)
        });

    } else {
        msg.channel.send("There's already a command with this name!").then(msg => { msg.delete(5000) })
    }

    msg.delete(5000)
};

function exists(cmd, msg) {
    var  rawdata = fs.readFileSync("Server/" + msg.guild.id + ".json")
    var  serverconfig = JSON.parse(rawdata);
    if (serverconfig.commands[cmd] === undefined) {
        return false;
    } else {
        return true;
    }
}