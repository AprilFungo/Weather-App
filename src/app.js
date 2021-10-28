const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

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
name: 'April Fungo, Cris Ann Dacillo, Princes Rea Glipo'
})
})

//for about.hbs
app.get("/about",(req,res)=>{
    res.render('about',{
name: 'April Fungo, Cris Ann Dacillo, Princes Rea Glipo'
    })
})

//forhelp.hbs
app.get("/help",(req,res)=>{
    res.render('help',{
        helptext:"Frequently asked questions.",
        name: 'April Fungo, Cris Ann Dacillo, Princes Rea Glipo'

    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
return res.send({
    error:"Please provide an address!"
        })
    }

     geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
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
       address:req.query.address
   })
})
})
})
 
//product
 app.get('/products', (req, res) => {
 if (!req.query.search) {
    return res.send({
         error: "You must provide a search term"
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
        name:"April Fungo, Cris Ann Dacillo, Princes Rea Glipo",
        errorMessage:"Help Article Not Found!"
    })
})

//404 page
app.get('*', (req, res) => {
    res.render('404',{
        name:"April Fungo, Cris Ann Dacillo, Princes Rea Glipo",
        errorMessage:"Page Not Found!"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
    })
 
