const express = require('express');
// подключаем мультер
const multer = require('multer');
const upload = require('../app.js')

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cards/index');
});

router.post('/new', upload.single('card') (req, res) => {
    message : "Error! in image upload."
      if (!req.file) {
          console.log("No file received");
            message = "Error! in image upload."
          res.render('/',{message: message, status:'danger'});
      
        } else {
          console.log('file received');
          console.log(req);
          var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', ')";
  
                  var query = db.query(sql, function(err, result) {
                     console.log('inserted data');
                  });
          message = "Successfully! uploaded";
          res.render('/',{message: message, status:'success'});
  
        }
  });

router.get('/:id', (req, res) => {

});

module.exports = router;
