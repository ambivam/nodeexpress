const express = require('express')
const path = require('path')

const app = express()
const port = process.env.EXPRESSPORT || '2002'

console.log("The port is "+ port);

app.get('/',(req,res) =>{
    
    res.send('welcome to express tutorials')
})

app.get('index',(req,res) =>{
    console.log(path.join(__dirname,'index.html'));
    res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(port,(err) =>{
    if(err){
        console.log("error in proccessing the request");
    }else{
        console.log("request proccessed successfully!!");
    }
})