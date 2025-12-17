const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const knex = require('knex')
const bcrypt = require('bcryptjs')
const register = require('./controllers/register');
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')
require("dotenv").config();
const PORT = process.env.db_PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// const salt = bcrypt.genSaltSync(10);
//     const hash= bcrypt.hashSync()
    console.log("port", PORT)
    console.log("database url", DATABASE_URL)


    const db = knex({
    client: 'pg',
    connection:{
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
  
    }
    })


// const db = knex({
//     client: 'pg',
//     connection:{
//         host : '5432',
//         user: 'postgres',
//         password : '267088',
//         database :'smart-brain'
//     }
// })


db.select('*').from('users')
.then(info => {
//  console.log()
});
const app = express();

const database = {
    user: [{
    id : '123',
    name: 'John',
    email:'John@gmail.com',
    password: 'cookies',
    entries: 0,
    joined: new Date() 
},
{
    id : '124',
    name: 'Sally',
    email:'sally@gmail.com',
    password: 'bananas',
    entries: 0,
    joined: new Date() 
}
]}

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send(database.user)
})

app.post('/signin', (req, res) =>{signin.handleSignin(req, res, db, bcrypt)}
    // console.log("guess",  bcrypt.compareSync('cooke', '$2b$10$wxyHXqy.MJ6EwR9h9vUQWe0FdrkB8fyu/TnT8Tz7Y/9PLApUwScyq'))
    // if (req.body.email === database.user[0].email &&
    //      req.body.password === database.user[0].password){
    //     res.json(database.user[0])
    // }
    // else{
    //     res.status(400).json('error logging in');
    // }
)

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})
   
    // database.user.push({
    //     id: '125',
    //     name: name,
    //     email: email,
    //     pasword: password,
    //     entries: 0,
    //     joined: new Date()
    // })
    // res.json('success')
    // res.json(database.user[database.user.length-1])

app.get('/profile/:id', (req, res) =>{
    profile.profileHandler(req, res, db)

    // if(!found){
        // console.log(found)
        // res.json('no such user').status(404)
    // }
    // console.log(!found)
})
app.put('/image', (req, res) => {image.imageHandler(req,res,db)})
app.listen(PORT, () =>{
    console.log('app is running at', PORT)
})

//
/* 
/ --> res = this is working
/signin --> POST   sucess/fail
/register --> POST =user
/profile/ :userid -->GET = user
/image --> PUT -->useri
*/ 