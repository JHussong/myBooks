//Production enviroment check
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


//Imports
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

//Views-layouts
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//Setup and connect to mongoose
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose!'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);

