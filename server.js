const express = require ('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const validator = require('./controllers/validator');
const rankings = require('./controllers/rankings');

const db = knex ({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('It is working!')});
app.post('/signin', signin.handleSignIn(db, bcrypt, validator.isValid));
app.post('/register', register.handleRegister(db, bcrypt, validator.isValid));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall());
app.get('/rankings', rankings.getRankings(db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port${process.env.PORT}`);
});
