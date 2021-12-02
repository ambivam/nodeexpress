const express = require('express')
const path = require('path')
const Joi = require('joi')

const app = express()
const port = process.env.EXPRESSPORT || '2003'

app.use(express.json())

const movies = [
    {
        id:1,
        "name":"Star Wars"
    },
    {
        id:2,
        "name":"Star Trek"
    },
    {
        id:3,
        "name":"Toy Story"
    }
]

console.log("The port is "+ port);

// app.use((req,res,next) => {
//     console.log(req.url,req.method);
//     next()
// })

app.use('/',(req,res,next) => {
    console.log(req.url,req.method);
    next()
    
})

app.use('/api/movies',(req,res,next) => {
    console.log(req.url,req.method);
    next()
})

app.get('/',(req,res) =>{    
    res.send('welcome to express tutorials')
})

app.get('/api/movies/:id',(req,res) =>{    

    let movie = movies.find(c => c.id == parseInt(req.params.id))
    if(!movie){
        res.send(`movie not found for the id : ${req.params.id}`)
    }
    res.send(movie)
})

app.delete('/api/movies/:id',(req,res) => {
    let movie = movies.find(c => c.id == parseInt(req.params.id))
    if(!movie){
        res.send(`movie not found for the id : ${req.params.id}`)
        return
    }
    const index = movies.indexOf(movie)
    movies.splice(index,1)
    res.send(movie)
})


app.put('/api/movies/:id',(req,res) => {
    let movie = movies.find(c => c.id == parseInt(req.params.id))
    if(!movie){
        res.send(`movie not found for the id : ${req.params.id}`)
    }

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(req.body)
    console.log(result);

    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }

    movie.name = req.body.name
    res.send(movie)
})

app.post('/api/movies',(req,res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(req.body)
    console.log(result);

    // if(!req.body.name || req.body.name.length < 3 ){
    //     res.status(400).send('The name of the movie is not present or less than 3 characters')
    //     return
    // }

    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }

    let movie = {
        id : movies.length + 1,
        name : req.body.name
    }
    movies.push(movie)
    res.send(movie)
})


app.get('/api/movies',(req,res) =>{    
    res.send(movies)
})

app.listen(port,(err) =>{
    if(err){
        console.log("error in proccessing the request");
    }else{
        console.log("request proccessed successfully!!");
    }
})