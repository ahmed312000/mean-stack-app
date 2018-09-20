const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const path = require('path')
const port = process.env.PORT || 8080;
// const port = 3000

const appRoutes = require('./routes/app')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')





// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// cors
app.use(cors());

//set views engine hbs
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

// set static files
app.use(express.static(path.join(__dirname, 'public')));


// connecting to database
mongoose.connect("mongodb://ahmed:ahmed2100@ds161092.mlab.com:61092/blog");

// 'mongodb://ahmed:ahmed2100@ds161092.mlab.com:61092/blog'
// 'localhost:27017/vlog' for local dev

app.use('/user' , userRoutes)
app.use('/post' , postRoutes)
app.use('/' , appRoutes)

// 404 error 
app.use(function (req, res, next) {
    return res.render('index');
});


app.listen(port).timeout = 100000 ;
// console.log('listening on localhost:3000\r\n')


