var express = require('express');
var router = express.Router();
var path = require('path');
var Datastore = require('nedb')
  , db = new Datastore({ filename: path.join(__dirname, 'db/datafile.db'), autoload: true });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/storingfile', function (req, res) {
  db.insert(req.body, function (err, newDataFile) {
    //console.log(newDataFile);
  });
  db.find({ title: 'test' }, function (err, docs) {
    //console.log(docs);
  });
  res.send("saved successfully.");
  // do something w/ req.body or req.files 
});

module.exports = router;
