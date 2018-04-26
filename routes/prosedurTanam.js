const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const prosedurTanam = require('../models/prosedurTanam');

router.get('/', (req, res, next ) => {
    prosedurTanam.find()
        .select("_id urutanProsedur")
        .populate('tanaman')
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
    const prosedur = new prosedurTanam({
        _id: new mongoose.Types.ObjectId(),
        prosedur: req.body.name,
       
    });
    prosedur
    .select("_id prosedurTanam")
    .populate('tanaman')
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

router.get('/:prosedurid', (req, res, next) => {
    const id = req.params.prosedurid;
    prosedurTanam.findById(id)
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

router.patch('/:prosedurid', (req, res, next) => {
   const id= req.params.prosedurid;
   const updateOps = {};
   for (const ops of req.body){
       updateOps[ops.propName]= ops.value;
   }
   prosedurTanam.update({ _id: id}, {$set: updateOps})
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

router.delete('/:prosedurid', (req, res, next) => {
   const id = req.params.prosedurid;
   prosedurTanam.remove({ _id: id})
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