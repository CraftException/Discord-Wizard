//Libraries importieren
let Discord = require('discord.js')
let fs = require('fs')

let cmdparser = require('../Scripts/Commands/CommandParser.js')

//Botconfig laden
let rawdata = fs.readFileSync('Bot.json');
let botconfig = JSON.parse(rawdata);

//Bot vorbereiten
const client = new Discord.Client()
//Registrierung der Events
client.on('guildCreate', guild => {
    console.log("Bot joined to " + guild.id)


    try {
        guild.systemChannel.send(`Hello, I'm your Wizard! Thanks for inviting me, here are a list of all my commands!`, {
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
        });
    } catch (e) {}
    if (!(guild.systemChannel == null)) {
        let raw = {
            "servername": guild.name,
            "joinmsg": "none",
            "joinmsgchannel": guild.systemChannel.id,
            "leavemsgchannel": guild.systemChannel.id,
            "leavemsg": "none",
            "privatemsg": "none",
            "commands": {
                "basiccommand": "abc"
            },
            "level": {
                "exampleuser": "0"
            },
            "leveling": true,
            "levelupmessage": "Yay {USERNAME}! You've reached level {LEVEL}!",
            "messages": {
                "exampleuser": "0"
            },
            "reactions": {
                "examplechannel": {
                    "Emoji": "A",
                    "role": "Example Role"
                }
            }
        }
        let jsontext = JSON.stringify(raw);
        fs.writeFileSync("Server/" + guild.id + ".json", jsontext);
    } else {
        let raw = {
            "servername": guild.name,
            "joinmsg": "none",
            "joinmsgchannel": "null",
            "leavemsgchannel": "null",
            "leavemsg": "none",
            "privatemsg": "none",
            "commands": {
                "ping": "Pong!"
            },
            "level": {

            },
            "leveling": true,
            "levelupmessage": "Yay {USERNAME}! You've reached level {LEVEL}!",
            "messages": {

            },
            "reactions": {
                "examplemessageid": {
                    "Emoji": "A",
                    "role": "Example Role"
                }
            }
        }
        let jsontext = JSON.stringify(raw);
        fs.writeFileSync("Server/" + guild.id + ".json", jsontext);
    }
    let serverrawdata = fs.readFileSync("Server/" + guild.id + ".json");
    let serverbotconfig = JSON.parse(serverrawdata);
    guild.members.forEach(member => {
        serverbotconfig.level[member.id] = 0;
        serverbotconfig.messages[member.id] = 0;
    })
    fs.writeFileSync("Server/" + guild.id + ".json", JSON.stringify(serverbotconfig));


});
client.on('message', (msg) => {
    let serverrawdata = fs.readFileSync("Server/" + msg.guild.id + ".json");
    let serverbotconfig = JSON.parse(serverrawdata);

    if(!(msg.author.bot) && !(cmdparser.parse(msg, client))) {
        const cmd = require('../Scripts/Level/updateLevel.js')
        var oldLevel = cmd.getlevelnumber(serverbotconfig.messages[msg.author.id], serverbotconfig.level[msg.author.id])

        serverbotconfig.level[msg.author.id] = serverbotconfig.level[msg.author.id] + msg.content.length;
        serverbotconfig.messages[msg.author.id] = serverbotconfig.messages[msg.author.id] + 1;
        fs.writeFileSync("Server/" + msg.guild.id + ".json", JSON.stringify(serverbotconfig));

        if (oldLevel !== cmd.getlevelnumber(serverbotconfig.messages[msg.author.id], serverbotconfig.level[msg.author.id])) {
            var rawString = serverbotconfig.levelupmessage
            var finalString = rawString.replace("{USERNAME}", msg.author)
            finalString = finalString.replace("{LEVEL}", cmd.getlevelnumber(serverbotconfig.messages[msg.author.id], serverbotconfig.level[msg.author.id]))
            msg.channel.send(finalString).then(msg => msg.delete(5000))
        }
    }

});
client.on("ready", () =>{
    console.log("Das Startskript des Discord-Assistent wurde erfolgreich geladen!")
    //Setzt den Custom-Status
    client.user.setPresence({
        status: "online",
        game: {
            name: "Type !bothelp for help!",
            type: "STREAMING"
        }
    })
});
client.on('guildMemberAdd', member => {
    console.log("User " + member.id + " joined " + member.guild.id)
    let serverrawdata = fs.readFileSync("Server/" + member.guild.id + ".json");
    let serverbotconfig = JSON.parse(serverrawdata);

    if (serverbotconfig.level[member.id] === undefined) {
        serverbotconfig.level[member.id] = 0;
        fs.writeFileSync("Server/" + member.guild.id + ".json", JSON.stringify(serverbotconfig));
    }

    if (!(serverbotconfig.joinmsg === "none")) {
        var rawString = serverbotconfig.joinmsg
        var finalString = rawString.replace("{USERNAME}", member)
        finalString = finalString.replace("{PLAYERCOUNT}", member.guild.memberCount)
        client.channels.get(serverbotconfig.joinmsgchannel).send(finalString)
    }
    if (!(serverbotconfig.privatemsg === "none")) {
        var rawString = serverbotconfig.privatemsg
        var finalString = rawString.replace("{USERNAME}", member)
        finalString = finalString.replace("{PLAYERCOUNT}", member.guild.memberCount)
        member.send(finalString)
    }
});
client.on('guildMemberRemove', member => {
    console.log("User " + member.id + " leaved " + member.guild.id)
    let serverrawdata = fs.readFileSync("Server/" + member.guild.id + ".json");
    let serverbotconfig = JSON.parse(serverrawdata);
    if (!(serverbotconfig.leavemsg === "none")) {
        var rawString = serverbotconfig.leavemsg
        var finalString = rawString.replace("{USERNAME}", member)
        finalString = finalString.replace("{PLAYERCOUNT}", member.guild.memberCount)
        client.channels.get(serverbotconfig.leavemsgchannel).send(finalString)
    }
});

//Logt sich mit dem Bottoken ein, der unter Bot.json gespeichert ist.
client.login(botconfig.token)