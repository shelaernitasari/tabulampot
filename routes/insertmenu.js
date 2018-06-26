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

router.get('/editmenu/:id', function (req, res, next) {
    Menu.findOne({_id:req.params.id}, function (err, data){
       
            console.log(data);

            res.render('editmenu', { root: data.root, menu: data.menu, pertanyaan: data.pertanyaan});
       
    });
});

router.put('/editmenu/:id', function (req, res, next){
    v_root = req.sanitize( 'root' ).escape().trim();
    v_menu = req.sanitize( 'menu' ).escape().trim();
    v_pertanyaan = req.sanitize( 'pertanyaan' ).escape().trim();
    
    Menu.findById(req.params.id, function(err, menu){
        menu.root = req.param('root');
        menu.menu = req.param('menu');
        menu.pertanyaan = req.param('pertanyaan');
       
        menu.save(function(err, menu){
            if (err) 
            {
                req.flash('msg_error', 'Punten, sepertinya ada masalah dengan sistem kami...');
            }
            else
            {
               // req.flash('msg_info', 'Edit menu berhasil!');
            }

            res.redirect('/insertmenu'+req.params.id);

        });
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
