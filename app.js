// Require the NPM pakages that we need
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// Import files that we need
const connectDB = require('./config/connectdb.js');
const admin = require('./routes/admin/adminRoutes.js');
const auth = require('./routes/auth/authRoutes.js');
const web = require('./routes/frontend/web.js');
// Initalise a new express application
const app = express();
// Configure the env file
dotenv.config();
// Set a default environment port or custom port - 8561
const port = process.env.PORT||8561;    // port used to run server
// Set a default Database URL
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);
// This allows us to pass data from the form
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
// Set Cookie Parser, sessions
app.use(cookieParser('my_secret'));
app.use(session({
    name: 'SESSION_ID',     // cookie name stored in the web browser
    secret: 'my_secret',    // helps to protect session
    cookie: { maxAge: 15 * 86400000 },
    resave: true,
    saveUninitialized: true
}));
// Setting our view engine as EJS
app.use(express.static('public'));
app.set('view engine' , 'ejs');
// Admin Routes Path
app.use('/admin' , admin);
// Authentication route path
app.use('/auth' , auth);
// Frontend route path
app.use('/' , web);
// Start out application
app.listen(port , () => {
    console.log(`Server listening at http://localhost:${port}`)
});
