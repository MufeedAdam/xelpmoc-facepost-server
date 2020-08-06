const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors')
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.listen(process.env.PORT || 3001, function(){ console.log('Node server listening on port 3001');});