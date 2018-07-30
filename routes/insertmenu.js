var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var Menu = require('../api/models/menu');
var mongoose = require('mongoose');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('insertmenu');
// });

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

router.get('/', function(req, res){
  Menu.find()
    .select('_id root menu pertanyaan katakunci')
    .exec()
        .then(docs => {
        console.log(docs);
        if(docs.length >= 0){
            res.render('insertmenu',{
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

router.get('/pencarian', function(req, res){
    let cari = req.query.carimenu;
    Menu.find()
      .where('root').equals(cari)
      .select('_id root menu pertanyaan katakunci')
      .exec()
          .then(docs => {
          console.log(docs);
          if(docs.length >= 0){
              res.render('insertmenu',{
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

router.get('/pencarianmenu', function(req, res){
    let cari = req.query.carimenuid;
    Menu.find()
      .where('_id').equals(cari)
      .select('_id root menu pertanyaan katakunci')
      .exec()
          .then(docs => {
          console.log(docs);
          if(docs.length >= 0){
              res.render('insertmenu',{
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
  

router.get('/editmenu/:id', function (req, res, next) {
    Menu.findOne({_id:req.params.id}, function (err, data){
       
            console.log(data);

            res.render('editmenu', { id:req.params.id, root: data.root, menu: data.menu, pertanyaan: data.pertanyaan, katakunci: data.katakunci});
       
    });
});

router.post('/update', function (req, res, next){
    console.log(req.body.root);
    console.log(req.body.menu);

    var id = req.body.id;
    var menu = req.body.menu;
    var pertanyaan = req.body.pertanyaan;
    var katakunci = req.body.katakunci;

    var updateData = {"menu": menu, "pertanyaan":pertanyaan, "katakunci":katakunci};
    Menu.findByIdAndUpdate(id, updateData, function(err, data){
        if(err){
            console.log("error");
        }
        else{
            console.log("berhasil");
        }
        res.redirect('/insertmenu');
    });

});

router.post('/delete', function(req, res, next){  
    Menu.findByIdAndRemove(req.body.id, function(err, post){
        if(err) return next(err);
        res.redirect('/insertmenu')
    });
});

router.get('/hapus/:idnya', (req, res, next)=>{
    var idne = req.params.idnya;
    res.send(idne);
});

router.post('/', function(req, res){
    // console.log(req.body.root);
    // console.log(req.body.menu);
    
    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        root: req.body.root,
        menu: req.body.menu,
        pertanyaan: req.body.pertanyaan,
        katakunci: req.body.katakunci
    });
    menu.save()
           .then(function(result) {
             console.log(result);
        //      res.status(200).json({
        //        message: "Berhasil menambah menu",
        //        createdMenu: result
        //    });
        res.redirect('/insertmenu');
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
});

module.exports = router;
