const increases = function (data) {
    const n = data.length - 1
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i; j++) {
            if (data[j].price > data[j + 1].price) {
                let tg = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tg
            }
        }
    }
    return data
}
const reduce = function (data) {
    const n = data.length - 1
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i; j++) {
            if (data[j].price < data[j + 1].price) {
                let tg = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tg
            }
        }
    }
    return data
}
const news = function (data) {
    const n = data.length - 1
    return data.reverse()
}
const selling = function (data) {
    const n = data.length - 1
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i; j++) {
            if (data[j].sold > data[j + 1].sold) {
                let tg = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tg
            }
        }
    }
    return data
}
module.exports = { increases, reduce, news, selling }