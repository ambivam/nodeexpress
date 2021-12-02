const express = require('express')

const app = express()
const port = process.env.EXPRESSPORT || '2001'

console.log("The port is "+ port);

app.get('/',(req,res) => {
    res.send("Hello Express after changes nodemon")
})

app.get('/person',(req,res) => {
    res.send("This is person route")
})

app.get('/person/:name/:age',(req,res) => {
    res.send("This is person route with name "+ req.params.name + " the age is " + req.params.age)
})

app.get('/personq/:name/:age',(req,res) => {
    res.send(req.query)
})

app.listen(port,(err) =>{
    if(err){
        console.log("error in proccessing the request");
    }else{
        console.log("request proccessed successfully!!");
    }
})