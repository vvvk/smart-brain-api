const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'varunkuch',
    password : '',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});


const app = express ();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
	res.send(database.users);
})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.post('/signin', (req, res) => { signIn.handleSignIn (req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet (req, res, db) })
app.put('/image', (req, res) => {image.handleImagePut (req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
	console.log('app is running on port 3000')
})

/*

/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user



*/