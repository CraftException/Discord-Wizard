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
            if (args.length >= 1) {
                if (msg.member.hasPermission('ADMINISTRATOR')) {
                    const cmd = require('../../Scripts/Commands/SetJoinMsg.js')
                    cmd.joinmsg(msg, client, args)
                    return true;
                } else {
                    msg.delete(50)
                    author.send("You do not have Permissions to do that command!")
                    return true;
                }
            } else {
                msg.delete(50)
                author.send("Syntax Error! Please enter: !setjoinmsg _Your Message here_!")
                return true;
            }
        }
        else if (command === "setleavemsg") {
            if (args.length >= 1) {
                if (msg.member.hasPermission('ADMINISTRATOR')) {
                    const cmd = require('../../Scripts/Commands/setLeaveMsg.js')
                    cmd.leavemsg(msg, client, args)
                    return true;
                } else {
                    msg.delete(50)
                    author.send("You do not have Permissions to do that command!")
                    return true;
                }
            } else {
                msg.delete(50)
                author.send("Syntax Error! Please enter: !setjoinmsg _Your Message here_!")
                return true;
            }
        }
        else if (command === "addcmd") {
            if (args.length >= 1) {
                if (msg.member.hasPermission('ADMINISTRATOR')) {
                    const cmd = require('../../Scripts/Commands/CustomCommands/AddCMD.js')
                    var command = args[0]
                    args.shift()
                    var content = args
                    cmd.addcmd(msg, client, content, command)
                    return true;
                } else {
                    msg.delete(50)
                    author.send("You do not have Permissions to do that command!")
                    return true;
                }
            } else {
                msg.delete(50)
                author.send("Syntax Error! Please enter: !setjoinmsg _Your Message here_!")
                return true;
            }
        }
        else if (command === "setprivatjoinmsg") {
            if (args.length >= 1) {
                if (msg.member.hasPermission('ADMINISTRATOR')) {
                    const cmd = require('../../Scripts/Commands/SetPNJoinMSG.js')
                    cmd.pnmsg(msg, client, args)
                    return true;
                } else {
                    msg.delete(50)
                    author.send("You do not have Permissions to do that command!")
                    return true;
                }
            } else {
                msg.delete(50)
                author.send("Syntax Error! Please enter: !setjoinmsg _Your Message here_!")
                return true;
            }
        }
        else if (command === "about") {
            msg.delete(5000)
            channel.send("This Server use the **Discord-Wizard** by CraftException#0001!")
            return true;
        }
        else if (command === "source" || command === "src") {
            msg.delete(5000)
            channel.send("The **Discord-Wizard** is an open-sourcce Project by CraftException#0001. \nYou can see the source code here: https://github.com/CraftException/Discord-Wizard")
            return true;
        }
        else if (command === "rank" || command === "level") {
            const cmd = require('../../Scripts/Level/getLevel.js')
            cmd.getlevel(msg, client)
            return true;
        }
        else if (command === "leaderboard" || command === "levels") {
            const cmd = require('../../Scripts/Level/TopRank.js')
            cmd.toprank(msg, client)
            return true;
        }
        else if (command === "help") {
            msg.delete(5000)
            var rawdata = fs.readFileSync("Server/" + msg.guild.id + ".json")
            var serverconfig = JSON.parse(rawdata);

            var keys = [];
            for (var k in serverconfig.commands) keys.push(k);
            var finalString = ""
            keys.forEach(element => finalString += "-" + element + " \n ");
            channel.send(``, {
                embed: {
                    title: 'Command list:',
                    color: 0x2471a3,
                    description: finalString,
                    footer: {
                        text: 'Discord-Wizard by CraftException#0001.'
                    }
                }
            }).then(msg => {
                msg.delete(5000)
            });
            return true;
        } else if (command === "bothelp") {
            msg.delete(5000)
            channel.send(`Hello, I'm your Wizard, here are a list of all my commands!`, {
                embed: {
                    title: ':robot: Commands',
                    color: 0x2471a3,
                    description: "The prefix for all my commands is \'!\', e.g: \'!about\'.",
                    fields: [
                        {
                            name: ':wink: Custom Join/Leave Message',
                            value: 'To make a custom join message, enter "!Setjoinmsg _Your Message here_" ("none" to disable) in the channel where the message should be. \nTo make a custom leave message, enter "!Setleavemsg _Your Message here_" ("none" to disable) in the channel where the message should be. \n To make a custom privat message, enter "!setprivatjoinmsg _Your Message here_" ("none" to disable). Placeholder: {USERNAME}; {PLAYERCOUNT}'
                        },
                        {
                            name: ':tools: Commands',
                            value: 'To create a command, type "!addcmd \'Commandname\' \'bot\'s answer\'".'
                        },
                        {
                            name: ':loud_sound: Reaction Roles',
                            value: 'This Feature will **coming soon**.'
                        }
                    ],

                    footer: {
                        text: 'Discord-Wizard by CraftException#0001.'
                    }
                }
            }).then(msg => {
                msg.delete(5000)
            });
            return true;
        } else {
            if (exists(command, msg)) {
                var  rawdata = fs.readFileSync("Server/" + msg.guild.id + ".json")
                var  serverconfig = JSON.parse(rawdata);
                var commanddesc = serverconfig.commands[command]
                channel.send(commanddesc)
                return true;
            }
        }

    }

    return false;
};

function exists(cmd, msg) {
    var  rawdata = fs.readFileSync("Server/" + msg.guild.id + ".json")
    var  serverconfig = JSON.parse(rawdata)
    if (serverconfig.commands[cmd] === undefined) {
        return false
    } else {
        return true
    }
}