//import env file
require('dotenv').config()




// import express

const express=require('express')

//cors import
const cors=require('cors')
const router = require('./routes/router')

//import db
require('./db/connection')

//server
const server=express()

//connection to front end
server.use(cors())
server.use(express.json())
server.use(router)

const port=4000  || process.env.port

//export uploads folder to client
server.use('/uploads',express.static('./uploads'))

server.listen(port,()=>{
    console.log("Server Runs");
})
