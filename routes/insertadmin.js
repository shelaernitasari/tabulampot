var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var Admin = require('../api/models/admin');
var mongoose = require('mongoose');

const BASE_URL = 'https://shela.jagopesan.com/'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() +'_'+ file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('not supported type of file'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});

/* GET home page. */
router.get('/', function(req, res){
    Menu.find()
      .select('_id username password foto')
      .exec()
          .then(docs => {
          console.log(docs);
          if(docs.length >= 0){
              res.render('insertadmin',{
                  count : docs.length,
                  menu: docs
              });
          } else{
              res.status(404).json({
                  message: 'no entries found'
              });
          }
        })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
  });

router.post('/', upload.single('foto'), function(req, res, next){
    Admin.find({ username: req.body.username })
    .exec()
    .then(admin => {
        if(admin.length >= 1){
            return res.status(200).json({
                message: 'username sudah ada',
                status: '204'
            });
        }else{
            bcrypt.hash(req.body.password, 8, (err, hash) => {
                if(err){
                    res.status(500).json({
                        error: err
                    });
                }else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash,
                        //foto: req.file.path
                        foto: BASE_URL + 'uploads/' + req.file.filename
                    });

                    admin.save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: "Berhasil menambah admin",
                                createdMenu: result
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });

                        });
                }
            });
        }
    });

});

module.exports = router;