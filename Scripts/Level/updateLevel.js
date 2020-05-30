let fs = require('fs')

module.exports.getlevelnumber = function (messages, score) {
    if (messages >= 13000 && score >= 195000) {
        return 30
    }
    if (messages >= 11500 && score >= 170000) {
        return 29
    }
    if (messages >= 9800 && score >= 150000) {
        return 28
    }
    if (messages >= 8500 && score >= 120000) {
        return 27
    }
    if (messages >= 7000 && score >= 100000) {
        return 26
    }
    if (messages >= 6000 && score >= 87500) {
        return 25
    }
    if (messages >= 5500 && score >= 80000) {
        return 24
    }
    if (messages >= 4800 && score >= 69000) {
        return 23
    }
    if (messages >= 4250 && score >= 60000) {
        return 22
    }
    if (messages >= 3800 && score >= 5100) {
        return 21
    }
    if (messages >= 3500 && score >= 45000) {
        return 20
    }
    if (messages >= 3150 && score >= 40000) {
        return 19
    }
    if (messages >= 2800 && score >= 35000) {
        return 18
    }
    if (messages >= 2500 && score >= 27000) {
        return 17
    }
    if (messages >= 2000 && score >= 2200) {
        return 16
    }
    if (messages >= 1750 && score >= 16500) {
        return 15
    }
    if (messages >= 1400 && score >= 14000) {
        return 14
    }
    if (messages >= 1150 && score >= 12500) {
        return 13
    }
    if (messages >= 900 && score >= 9000) {
        return 12
    }
    if (messages >= 750 && score >= 7000) {
        return 11
    }
    if (messages >= 450 && score >= 5700) {
        return 10
    }
    if (messages >= 300 && score >= 4500) {
        return 9
    }
    if (messages >= 200 && score >= 2800) {
        return 8
    }
    if (messages >= 150 && score >= 2200) {
        return 7
    }
    if (messages >= 90 && score >= 1400) {
        return 6
    }
    if (messages >= 75 && score >= 1250) {
        return 5
    }
    if (messages >= 48 && score >= 800) {
        return 4
    }
    if (messages >= 30 && score >= 600) {
        return 3
    }
    if (messages >= 12 && score >= 250) {
        return 2
    }
    if (messages >= 5 && score >= 100) {
        return 1
    } else {
        return 0
    }
}
