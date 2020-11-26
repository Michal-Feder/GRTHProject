/* eslint-disable no-underscore-dangle */
const express = require('express');
const fs = require('fs');
const router = express.Router();
const BASE_DIR = __dirname.replace('middlewares', '');
const jsonPathAttendance = `${BASE_DIR}\\data\\data.json`;
const jsonPathUsers = `${BASE_DIR}\\data\\datausers.json`;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const { string } = require('prop-types');
mongoose.connect('mongodb://localhost:27017/attendances', { useNewUrlParser: true });
const Schema = mongoose.Schema;
const userSchema = new Schema({ userid: String, name: String, passord: String });
const dataSchema = new Schema({ userId: String, date: String, start: String, end: String });
const userModel = mongoose.model("datausers", userSchema);
const dataModel = mongoose.model("datas", dataSchema);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connect to DB');
});
router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

router.use(bodyParser.json());
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/getAttendances/:id', (req, res) => {
  const { id } = req.params;
  var query = { userId: id }
  dataModel.find(query, function (err, result) {
    res.send(result);
  });
});

router.post('/add', (req, res) => {
  const { userId, date, start } = req.body;
  dataModel.create({ userId: userId, date: new Date(date).toDateString(), start: new Date(Date(start)).toLocaleTimeString() }, function (err, result) {
    if (err) console.log(err);
    const m = { userId: userId, date: new Date().toDateString() }
      dataModel.findOne(m, function (err, result) {
      if (err) console.log(err);
      res.send(result);
    })
  });
});

router.put('/update', (req, res) => {
  const attendance = req.body;
  dataModel.findByIdAndUpdate(attendance._id,attendance, function (err, result) {
    if (err) console.log(err);
    else dataModel.findById(attendance, function (err, result) {
    if (err) console.log(err);
    else res.send(result);
    });
  });
});

router.post('/login', (req, res) => {
  var query = { name: req.body.user.name, password: req.body.user.password }
  userModel.findOne(query, function (err, result) {
    res.send(result);
  });
});

router.get('/getCurrentTodayAttendance/:id', (req, res) => {
  const { id } = req.params;
  var query = { userId: id,date:new Date().toDateString() }
  dataModel.findOne(query, function (err, result) {
    res.send(result);
  });
});

module.exports = router;
