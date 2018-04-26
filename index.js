/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const TOKEN = process.env.TELEGRAM_TOKEN || '454976546:AAF_8hsRhRMDlkT-03IqSSr6AVULJpCoz0s';
const url = 'https://web-tabulampot.herokuapp.com';
//const port = 4000;
const port = process.env.PORT;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//mongoose.connect("mongodb://tabulampotproject:"+process.env.MONGO_ATLAS_PW+"@tabulampotproject-shard-00-00-jnwur.mongodb.net:27017,tabulampotproject-shard-00-01-jnwur.mongodb.net:27017,tabulampotproject-shard-00-02-jnwur.mongodb.net:27017/test?ssl=true&replicaSet=TabulampotProject-shard-0&authSource=admin");
// mongoose.Promise = global.Promise;

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

var indexRoute = require('./routes/index');
// var tanamanRoute = require('./routes/tanaman');
// var prosedurtanamRoute = require('./routes/prosedurTanam');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.use('/shela', indexRoute);
// app.use('/tanaman', tanamanRoute);
// app.use('/prosedurTanam', prosedurtanamRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Start Express Server
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

require('./telegram')(bot);