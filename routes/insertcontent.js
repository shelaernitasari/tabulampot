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
            Menu.find()
                .select('_id root menu pertanyaan')
                .exec()
                    .then(docs1 => {
                    console.log(docs1);
                    if(docs1.length >= 0){
                        res.render('insertcontent',{
                            count : docs.length,
                            content: docs,
                            menu: docs1
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
    let cari = req.query.caricontent;
    Isi.find()
      .where('_id').equals(cari)
      .select('_id judul content tanggal idmenu')
      .populate('idmenu','menu')
      .exec()
          .then(docs => {
          console.log(docs);
          if(docs.length >= 0){
              Menu.find()
                  .select('_id root menu pertanyaan')
                  .exec()
                      .then(docs1 => {
                      console.log(docs1);
                      if(docs1.length >= 0){
                          res.render('insertcontent',{
                              count : docs.length,
                              content: docs,
                              menu: docs1
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

router.get('/editcontent/:id', function (req, res, next) {
    Isi.findOne({_id:req.params.id}, function (err, data){
       
            console.log(data);

            res.render('editcontent', { id:req.params.id, judul: data.judul, content: data.content, idmenu: data.idmenu});
       
    });
});

router.post('/update', function (req, res, next){
    var id = req.body.id;
    var judul = req.body.judul;
    var content = req.body.content;
    var idmenu = req.body.idmenu;

    var updateData = {"judul":judul, "content": content, "idmenu":idmenu};
    Isi.findByIdAndUpdate(id, updateData, function(err, data){
        if(err){
            console.log("error");
        }
        else{
            console.log("berhasil");
        }
        res.redirect('/insertcontent');
    });

});

router.post('/delete', function(req, res, next){  
    Isi.findByIdAndRemove(req.body.id, function(err, post){
        if(err) return next(err);
        res.redirect('/insertcontent')
    });
});

module.exports = router;