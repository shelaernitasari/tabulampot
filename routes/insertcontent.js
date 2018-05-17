var express = require('express');
var router = express.Router();
var Isi = require('../api/models/isi');
var Menu = require('../api/models/menu');
var mongoose = require('mongoose');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('insertcontent');
// });

router.get('/', function(req, res){
  Isi.find()
  .select("_id judul content tanggal idmenu")
  .populate('idmenu','menu')
    .exec()
        .then(docs => {
        console.log(docs);
        if(docs.length >= 0){
            res.render('insertcontent',{
                count : docs.length,
                content: docs
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

router.post('/', async (req, res, next)=>{
  // console.log(req.body.root);
  // console.log(req.body.menu);
  let findmenu = await Menu.findById(req.body.idmenu);
    
    if(findmenu === null){
        message : "id tidak ditemukan" ;
    } 
    else{
        const isi = new Isi({
              _id: new mongoose.Types.ObjectId(),
              judul: req.body.judul,
              content: req.body.content,
              tanggal: Date.now(),
              idmenu: req.body.idmenu
        });
        isi.save()
        .then(result => {
            console.log(result);
            // res.status(200).json({
            //     message: "berhasil disimpan",
            //     createdIsi: result
            // });
            res.redirect('/insertcontent');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
});


module.exports = router;