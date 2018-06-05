var express = require('express');
var router = express.Router();
var Menu = require('../api/models/menu');
var mongoose = require('mongoose');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('insertmenu');
// });

router.get('/', function(req, res){
  Menu.find()
    .select('_id root menu pertanyaan')
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

router.get('/edit/:idnya', (req, res, next)=>{
    var idne = req.params.idnya;
    Menu.findById(idne, (data)=>{
        res.send(data);
    })
    // res.send(idne);
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
        pertanyaan: req.body.pertanyaan
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
