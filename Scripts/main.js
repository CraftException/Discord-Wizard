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
    guild.systemChannel.send(`Hello, I'm your assistent! Thanks for inviting me, here are a list of all my commands!`, {
        embed:{
            title: ':robot: Commands',
            color: 0x2471a3,
            description: "The prefix for all my commands is \'!\', e.g: \'!about\'.",
            fields:[
                {
                    name: ':wink: Custom Join/Leave Message',
                    value: 'To make a custom join message, enter "! Setjoinmsg _Your Message here_" ("none" to disable) in the channel where the message should be. \nTo make a custom leave message, enter "! Setleavemsg _Your Message here_" ("none" to disable) in the channel where the message should be. \n To make a custom privat message, enter "! Setprivatjoinmsg _Your Message here_" ("none" to disable). Placeholder: {USERNAME}; {PLAYERCOUNT}'
                },
                {
                    name: ':tools: Commands',
                    value: 'To create a command, type "!addcmd \'Commandname\' \'bot\'s answer\'".'
                },
                {
                    name: ':loud_sound: Reaction Roles',
                    value: 'This Feature will coming soon.'
                }
            ],

            footer: {
                text: 'Discord-Assistent by CraftException#0001.'
            }
        }
    });
});
client.on('message', (msg) => { cmdparser.parse(msg, client) });
client.on("ready", () =>{
    console.log("Das Startskript des Discord-Assistent wurde erfolgreich geladen!")
    //Setzt den Custom-Status
    client.user.setPresence({
        status: "online",
        game: {
            name: "Type !help for info!",
            type: "STREAMING"
        }
    })
});

//Logt sich mit dem Bottoken ein, der unter Bot.json gespeichert ist.
client.login(botconfig.token)
