const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jenisHama = require('../models/jenisHama');

router.get('/', (req, res, next ) => {
    jenisHama.find()
        .select("_id jenisHama")
        .exec()
        .then(docs => {
            console.log(docs);
            if(docs.length >= 0){
                res.status(200).json(docs);
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

router.post('/', function(req, res, next ) {
    /*const product = {
        name: req.body.name,
        price: req.body.price
    };*/
    const jenishama = new jenisHama({
        _id: new mongoose.Types.ObjectId(),
        jenisHama: req.body.jenisHama,
       
    });
    jenishama.save()
           .then(function(result) {
             console.log(result);
             res.status(200).json({
               message: "Berhasil menambah data tanaman",
               createdTanaman: result
           });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
    
});

router.get('/:jenishamaid', (req, res, next) => {
    const id = req.params.jenishamaid;
    jenisHama.findById(id)
    .exec()
    .then(doc => {
        console.log("from database",doc);
        if(doc) {
            res.status(200).json(doc);
        } else{
            res.status(404).json({message: 'no valid'});
        }

        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.patch('/:jenishamaid', (req, res, next) => {
   const id= req.params.jenishamaid;
   const updateOps = {};
   for (const ops of req.body){
       updateOps[ops.propName]= ops.value;
   }
   jenisHama.update({ _id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:jenishamaid', (req, res, next) => {
   const id = req.params.jenishamaid;
   jenisHama.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports= router;