const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tanaman = require('../models/tanaman');

router.get('/', (req, res, next ) => {
    Tanaman.find()
        .select("_id tanaman")
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

router.post('/', (req, res, next ) => {
    /*const product = {
        name: req.body.name,
        price: req.body.price
    };*/
    const tanaman = new Tanaman({
        _id: new mongoose.Types.ObjectId(),
        tanaman: req.body.name,
       
    });
    tanaman
    .select("_id tanaman")
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Handlig POST request to /product",
            createdPrduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
    
});

router.get('/:tanamanid', (req, res, next) => {
    const id = req.params.tanamanid;
    Tanaman.findById(id)
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

router.patch('/:tanamanid', (req, res, next) => {
   const id= req.params.tanamanid;
   const updateOps = {};
   for (const ops of req.body){
       updateOps[ops.propName]= ops.value;
   }
   Tanaman.update({ _id: id}, {$set: updateOps})
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

router.delete('/:tanamanid', (req, res, next) => {
   const id = req.params.tanamanid;
   Tanaman.remove({ _id: id})
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