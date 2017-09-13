const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const RegRoutes = require("./registration");
const Models = require('./models');

const models = Models(process.env.MONGO_DB_URL || "mongodb://localhost/addRegNumber")
const regRoutes = RegRoutes(models);


const app = express();

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))


app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));
app.use(flash());
app.get('/', function(req,res){
  res.redirect('/addRegNumber')
})
//home_screen
app.get('/addRegNumber', regRoutes.home_screen);
app.post('/addRegNumber', regRoutes.index)      ;
//filter
app.get('/filter', regRoutes.filterAll);
app.post('/filter', regRoutes.filterAll);
//all Reg Numbers
app.get('/showAll', regRoutes.showAll);
app.post('/showAll', regRoutes.showAll);
//reset page
app.get('/reset', regRoutes.reset);
app.post('/reset', regRoutes.reset);


const port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Web app started on port : ' + port);

});
