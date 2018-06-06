const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const db = require('./config/key').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is running in port ${port}`));
