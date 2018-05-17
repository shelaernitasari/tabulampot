const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Buah = require('../models/buah');
const prosedur = require('../model/prosedur');
const subProsedur = require('../model.subProsedur');

exports.buah_get_all = (req, res, next) => {
    Buah.find()
    .select("_id buah prosedur subProsedur")
    .populate({path:'prosedur', model:prosedur, select:'prosedur', populate: {path: 'subProsedur', model:subProsedur, select:'subProsedur'}})
    .then(docs => {
        console.log(docs);
        if(docs.length >= 0){
            res.status(200).json({
                count : docs.length,
                Buah  : docs.map(doc => {
                    return {
                        _id : doc._id,
                        buah : doc.buah,
                        prosedur : doc.prosedur,
                        subProsedur : doc.subProsedur,
                    }
                })
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
};

exports.buah_post = (req, res, next) => {
    let findprosedur = await  prosedur.findById(req.body.prosedurid);
    let findsubProsedur = await  subProsedur.findById(req.body.subprosedurid);
    
    if(findprosedur === null || findsubProsedur === null){
        message : "id tidak ditemukan" ;
    } 
    else{
        const buah = new Buah({
            _id: new mongoose.Types.ObjectId(),
            buah: req.body.buah,
            prosedur: req.body.prosedurid,
            subprosedur: req.body.subprosedurid
        });
        buah.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "berhasil disimpan",
                createdProsedurTanam: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

        });
    }
};

exports.buah_get_id = (req, res, next) =>{
    const id = req.params.buahid;
    Buah.findById(id)
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

exports.buah_update = (req, res, next) =>{
   const id= req.params.buahid;
   const updateOps = {};
   for (const ops of req.body){
       updateOps[ops.propName]= ops.value;
   }
   Buah.update({ _id: id}, {$set: updateOps})
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

exports.buah_delete = (req, res, next) => {
    const id = req.params.buahid;
    Buah.remove({ _id: id})
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
}