const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/quizzes', require('./routes/quizzes'));

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));