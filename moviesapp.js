const express = require('express')
const path = require('path')
const Joi = require('joi')

const app = express()
const port = process.env.EXPRESSPORT || '2010'
const movies = require('./movies')

app.use(express.json())
app.use('/abc',movies)


console.log("The port is "+ port);


app.listen(port,(err) =>{
    if(err){
        console.log("error in proccessing the request");
    }else{
        console.log("request proccessed successfully!!");
    }
})