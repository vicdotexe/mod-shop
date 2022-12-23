require('dotenv')
const db = require('./config/connection');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const PORT = process.env.PORT || 3001;
const server = express();
const routes = require('./routes');


const path = require('path');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(morgan('dev'));
server.use('/',express.static(path.join(__dirname,'public')));
server.use(routes);

db.once('open', ()=>{
    server.listen(PORT, ()=>{console.log(`Listening on port PORT ${PORT}`)});
})
