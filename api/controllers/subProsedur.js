const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Buah = require('../models/buah');
const Prosedur = require('../model/prosedur');
const subProsedur = require('../model.subProsedur');

exports.subProsedur_get_all = (req, res, next) => {
    subProsedur.find()
    .select("_id proses")
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

exports.subProsedur_post = (req, res, next) => {
    const subprosedur = new Prosedur({
        _id: new mongoose.Types.ObjectId(),
        proses: req.body.proses,
       
    });
    subprosedur.save()
           .then(function(result) {
             console.log(result);
             res.status(200).json({
               message: "Berhasil menambah data ",
               createsubProsedur: result
           });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
};

exports.subProsedur_get_id = (req, res, next) =>{
    const id = req.params.subProsedurid;
    subProsedur.findById(id)
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

exports.subProsedur_update = (req, res, next) =>{
    const id= req.params.subProsedurid;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName]= ops.value;
    }
    subProsedur.update({ _id: id}, {$set: updateOps})
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

exports.subProsedur_delete = (req, res, next) => {
    const id = req.params.subProsedurid;
    subProsedur.remove({ _id: id})
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