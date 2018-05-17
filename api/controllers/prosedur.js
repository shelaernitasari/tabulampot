const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Buah = require('../models/buah');
const Prosedur = require('../model/prosedur');
const subProsedur = require('../model.subProsedur');

exports.prosedur_get_all = (req, res, next) => {
    Prosedur.find()
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
};

exports.prosedur_post = (req, res, next) => {
    const prosedur = new Prosedur({
        _id: new mongoose.Types.ObjectId(),
        prosedur: req.body.prosedur,
       
    });
    prosedur.save()
           .then(function(result) {
             console.log(result);
             res.status(200).json({
               message: "Berhasil menambah data ",
               createProsedur: result
           });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
};

exports.prosedur_get_id = (req, res, next) =>{
    const id = req.params.prosedurid;
    Prosedur.findById(id)
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
};

exports.prosedur_update = (req, res, next) =>{
    const id= req.params.prosedurid;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName]= ops.value;
    }
    Prosedur.update({ _id: id}, {$set: updateOps})
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
};

exports.prosedur_delete = (req, res, next) => {
    const id = req.params.prosedurid;
    Prosedur.remove({ _id: id})
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
};