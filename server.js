const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex');
const port = process.env.PORT || 5000

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');
const id = require('./controllers/id');

const db = knex ({
  client: 'pg', //...because we have chosen PostgreSQL as our database library
  connection: {
    host : '127.0.0.1',
    user : 'Stevo',
    password : '',
    database : 'smart-brain'
  }
});

const cors = require('cors')

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  // db
  //   .select('name', 'email').from('users')
  //   .then(users => res.json(users))
  res.send("it's working")
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)}) //this is called 'dependancy injection'

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})

app.get('/profile/:id', (req, res) => {id.handleId(req, res, db)})

app.post('/imageURL', (req, res) => {image.handleAPICall(req, res)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})


// this API will do the following:
// --> res = this is working
// signin --> POST = returns 'success'/'fail' (POST request, because we want to submit data to out server/database)
// register -->  POST = return 'user' object
// profile/:userID --> GET = user
// image --> PUT (PUT to update count of searches on user profile)
