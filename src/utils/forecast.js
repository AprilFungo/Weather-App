
const request = require ("request")
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=08cce5db720103940164ddf2d8b10f4d&query='+latitude + ','+ longitude+'&units=m'

    request({url, json:true},(error,{body}) => { if (error) {
callback('Sorry! Unable to connect to weather service!',undefined) 
}else if (body.error) {
 callback('unable to find location',undefined)
}else{
callback(undefined,body.current.weather_descriptions [0] + ',      ' +  body.current.temperature + ' \xB0C')
}
})
}
module.exports = forecast