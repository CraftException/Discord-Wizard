let fs = require('fs')

module.exports.toprank =  function (msg, client) {
    var server = msg.server
    var  rawdata = fs.readFileSync("Server/" + msg.guild.id + ".json")
    var  serverconfig = JSON.parse(rawdata);

    var levels = serverconfig.level

    for(let k in levels){
        if (k === "exampleuser") {
            delete levels["exampleuser"]
        }
        if (levels[k] === 0) {
            delete levels[k]
        }
    }

    console.log(levels)
    var number = 1

    var one = "nobody"
    var two = "nobody"
    var three = "nobody"
    var four = "nobody"
    var five = "nobody"
    var six = "nobody"
    var seven = "nobody"
    var eight = "nobody"
    var nine = "nobody"
    var ten = "nobody"


    for (let k in levels) {
        if (msg.guild.members.size >= 1 && number === 1) {
            one = k
            number++
        }
        if (msg.guild.members.size >= 2 && number === 2) {
            two = k
            number++
        }
        if (msg.guild.members.size >= 3 && number === 3) {
            three = k
            number++
        }
        if (msg.guild.members.size >= 4 && number === 4) {
            four = k
            number++
        }
        if (msg.guild.members.size >= 5 && number === 5) {
            five = k
            number++
        }
        if (msg.guild.members.size >= 6 && number === 6) {
            six = k
            number++
        }
        if (msg.guild.members.size >= 7 && number === 7) {
            seven = k
            number++
        }
        if (msg.guild.members.size >= 8 && number === 8) {
            eight = k
            number++
        }
        if (msg.guild.members.size >= 9 && number === 9) {
            nine = k
            number++
        }
        if (msg.guild.members.size >= 10 && number === 10) {
            ten = k
            number++
        }
    }

    const cmd = require('../../Scripts/Level/updateLevel.js')

    var oneFinalString = msg.guild.members.get(one) + "(Level: " + cmd.getlevelnumber(serverconfig.messages[one], serverconfig.level[one]) + " Messages: "+serverconfig.messages[one]+")"

    msg.channel.send(``, {
        embed:{
            title: ':trophy: Leaderboard:',
            color: 0x2471a3,
            description: "",
            fields:[
                {
                    name: ':first_place: First:',
                    value: oneFinalString
                }
            ],

            footer: {
                text: 'Discord-Wizard by CraftException#0001.'
            }
        }
    })

    msg.delete(5000)
};