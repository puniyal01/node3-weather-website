const request = require('request')

const forecast = (Longitude, Latitude, callback) => {
    const Weatherurl = 'https://api.darksky.net/forecast/07e684b9cf8cfd40c57623dc6c86a637/' + Latitude + ',' + Longitude + '?units=us'
    
    request({ url: Weatherurl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the Weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location ', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature 
            + ' degree out. There is a ' + response.body.currently.precipProbability + ' % chance of rain')
        }
    })
}

module.exports = forecast