const express = require('express');
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3000;

//static files
app.use(express.static('public'));

//routes middleware
app.use('/', require('./routes/index'))

//template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());



app.listen(PORT,function () { 
  console.log('listening on port ' + PORT);
 });