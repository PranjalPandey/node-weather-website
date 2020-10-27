const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=df8cf6c98701298ed5105b8191fa497e&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } 
        else {
            callback(undefined,' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast