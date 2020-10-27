
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app=express()

//Before paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
//Setup static directory to servenodemaon
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Pranjal Pandey'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Pranjal',
        title:'About me'
    })
    })
    app.get('/help',(req,res)=>{
        res.render('help',{
            name:'Pranjal',
            title:'Help',
            helpText: 'This is some helpful text'
        })
        })
    



app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
        error: 'You must provide n adress'
    })
}   
geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
    if (error){
        return res.send({error})
    }
    forecast(latitude,longitude,(error, forecastData)=>{
        if (error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })

    })
})
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Sultapur',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help',
        errorText:'Help article not found.'
    })
})
app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorText:'Page not found.'
    })
})



app.listen(3000,()=>{
    console.log('Server is Up on the port 3000.')
})