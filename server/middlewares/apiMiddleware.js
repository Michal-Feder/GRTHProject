/* eslint-disable no-underscore-dangle */
const express = require('express');
const fs = require('fs');
const router = express.Router();
const BASE_DIR = __dirname.replace('middlewares', '');
const jsonPathAttendance = `${BASE_DIR}\\data\\data.json`;
const jsonPathUsers = `${BASE_DIR}\\data\\datausers.json`;
const bodyParser = require('body-parser');

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
  fs.readFile(jsonPathAttendance, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const { id } = req.params;
    const item = _getItem(list, id);
    res.end(JSON.stringify(item));
  });
});

router.post('/add', (req, res) => {
  fs.readFile(jsonPathAttendance, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const item = req.body;
    const newList = _addItem(list, item);
    const jsonData = JSON.stringify(newList);

    fs.writeFile(jsonPathAttendance, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(JSON.stringify(newList[getLastId(newList)]));
      } else {
        res.end(data);
      }
    });
  });
});

router.put('/update', (req, res) => {
  fs.readFile(jsonPathAttendance, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const item = req.body;
    const newList = _updateItem(list, item);
    const jsonData = JSON.stringify(newList);

    fs.writeFile(jsonPathAttendance, jsonData, writeFileErr => {
      if (!writeFileErr) {
        res.end(JSON.stringify(newList[getLastId(newList)]));
      } else {
        res.end(data);
      }
    });
  });
});

router.post('/login', (req, res) => {
  fs.readFile(jsonPathUsers, 'utf8', (err, data) => {
    const list = JSON.parse(data);
    const item = req.body;
    const isExists = _Login(list, item);
    res.end(JSON.stringify(isExists));
  });
});

router.get('/getCurrentTodayAttendance/:id', (req, res) => {
  fs.readFile(jsonPathAttendance, 'utf8', (err, data) => {
    const attendance = JSON.parse(data);
    const { id } = req.params;
    const currentTodayAttendance = _getCurrentTodayAttendance(attendance, id);
    res.end(JSON.stringify(currentTodayAttendance));
  });
});
// Private functions
const _getItem = (list, id) => {
  const attendances = list.filter(item => item.userId.toString() === id.toString());
  return attendances;
};

const _updateItem = (list, updatedItem) => {
  const newList = [...list];
  const currentItemIndex = newList.findIndex(
    item => item.id.toString() === updatedItem.id.toString(),
  );
  newList[currentItemIndex] = updatedItem;
  return newList;
};

const getLastId=(list)=>{
  let lastId = 0;
  if (list.length > 0) {
    const id = list[list.length - 1].id.toString();
    lastId = parseInt(id, 10);
  }
  return lastId;
}
const _addItem = (list, addedItem) => {
  let lastId = 0;
  if (list.length > 0) {
    const id = list[list.length - 1].id.toString();
    lastId = parseInt(id, 10);
  }
  const item = { id: lastId + 1, ...addedItem };
  const newList = [...list];
  newList.push(item);
  return newList;
};
const _Login = (list,checkUser)=>{
  const currentItemIndex = list.findIndex(
    user => user.name=== checkUser.user.name&&user.password=== checkUser.user.password
  );
  return list[currentItemIndex];
}

const _getCurrentTodayAttendance = (attendence, id) => {
  const currentItem = attendence.find(item => item.userId.toString() === id.toString()&&item.date===new Date().toDateString());
  return currentItem;
};

module.exports = router;
