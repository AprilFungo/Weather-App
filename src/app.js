const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//for index.hbs
app.get('',(req,res)=>{
res.render('index',{ 
// name: 'April Fungo, Cris Ann Dacillo, Princes Rea Glipo'
})
})

app.get('/', (req, res) => {
    res.render('index',{ 
    })
})

app.get('/index', (req, res) => {
    res.render('index',{ 
    })
})

//for about.hbs
app.get("/about",(req,res)=>{
    res.render('about',{
// name: 'April Fungo, Cris Ann Dacillo, Princes Rea Glipo'
    })
})

//for help.hbs
app.get("/help",(req,res)=>{
    res.render('help',{
        helptext:"Frequently asked questions:",
        name: 'April Fungo, Cris Ann Dacillo & Princes Rea Glipo'

    })
})

//for weather data
app.get('/weather',(req,res) =>{
    if(!req.query.address){
return res.send({
    error:"Please provide an address!"
        })
    }

     geocode(req.query.address, (error, { latitude, longitude, location} = {}) =>{
if (error) {
   return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
      return res.send({error})
   }

   res.send({
       forecast: forecastData,
       location,
       address:req.query.address,
   })
})
})
})
 
//product
 app.get('/products', (req, res) => {
 if (!req.query.search) {
    return res.send({
         error: "You must provide a search term!"
    })
 }

     console.log(req.query)
    res.send({
        products: []
     })
 })

//related 404 errors
app.get('/help/*', (req, res) => {
    res.render('404',{
        name:"April Fungo, Cris Ann Dacillo $ Princes Rea Glipo",
        errorMessage2:"Help article not found!"
    })
})

//404 page
app.get('*', (req, res) => {
    res.render('404',{
        name:"April Fungo, Cris Ann Dacillo & Princes Rea Glipo",
        errorMessage1:"404",
        errorMessage2:"Page not found!"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
    })
 
