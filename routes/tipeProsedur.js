const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tipeProsedur = require('../models/tipeProsedur');

router.get('/', (req, res, next ) => {
    tipeProsedur.find()
        .select("_id prosedur")
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
    const tipeprosedur = new tipeProsedur({
        _id: new mongoose.Types.ObjectId(),
        prosedur: req.body.prosedur,
       
    });
    tipeprosedur.save()
           .then(function(result) {
             console.log(result);
             res.status(200).json({
               message: "Berhasil menambah data tipe prosedur",
               createTipeProsedur: result
           });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
    
});

router.get('/:tipeprosedurid', (req, res, next) => {
    const id = req.params.tipeprosedurid;
    tipeProsedur.findById(id)
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

router.patch('/:tipeprosedurid', (req, res, next) => {
   const id= req.params.tipeprosedurid;
   const updateOps = {};
   for (const ops of req.body){
       updateOps[ops.propName]= ops.value;
   }
   tipeProsedur.update({ _id: id}, {$set: updateOps})
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

router.delete('/:tipeprosedurid', (req, res, next) => {
   const id = req.params.tipeprosedurid;
   tipeProsedur.remove({ _id: id})
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