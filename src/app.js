const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Define paths for Express config
const WebDirPath = path.join(__dirname, '../public')
const ViewDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', ViewDirPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(WebDirPath))

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'We are trying to be very helpful with the help of Shri Peeyush',
        title: 'Help',
        name: 'Peeyush Uniyal',
        age: '30'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Peeyush Uniyal'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Peeyush Uniyal'
    })
 })

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide the Address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } 
        
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req, res) => {
    res.render('help404', {
        helptext: 'The help article not found',
        title: '404 help',
        name: 'Peeyush Uniyal',
        age: '30'
    })
})

app.get('*', (req, res) => {
    res.render('help404', {
        helptext: 'This page is not available',
        title: '404 Not found!',
        name: 'Peeyush Uniyal',
        age: '30'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})