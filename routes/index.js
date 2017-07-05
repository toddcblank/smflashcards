var express = require('express');
var router = express.Router();
let rooms = require('../rooms.json')


/* GET home page. */
router.get('/', function(req, res, next) {

	console.log(rooms.length)
	index = Math.floor(Math.random() * (rooms.length));
  res.render('index', { title: 'Super Metroid Room Flash Cards', roomName: rooms[index][0], roomImage: rooms[index][1] });
});

module.exports = router;
