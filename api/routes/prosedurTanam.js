const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const prosedurTanam = require('../models/prosedurTanam');
const Langkah = require('../models/langkah');
const Tanaman = require('../models/tanaman');
const tipeProsedur = require('../models/tipeProsedur');

router.get('/', (req, res, next ) => {
    prosedurTanam.find()
        .select("_id urutanLangkah langkah tanaman")
        .populate({path:'langkah', model:Langkah, select:'langkah tipePosedur', populate: {path: 'tipeProsedur', model:tipeProsedur, select:'prosedur'}})
        .then(docs => {
            console.log(docs);
            if(docs.length >= 0){
                res.status(200).json({
                    count : docs.length,
                    prosedurTanam : docs.map(doc => {
                        return {
                            _id : doc._id,
                            urutanLangkah : doc.urutanLangkah,
                            langkah : doc.langkah,
                            tanaman : doc.tanaman,
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
});

router.post('/', async (req, res, next ) => {
    /*const product = {
        name: req.body.name,
        price: req.body.price
    };*/
    let findlangkah = await  Langkah.findById(req.body.langkahid);
    let findtanaman = await  Tanaman.findById(req.body.tanamanid);
    let findtipeprosedur = await  tipeProsedur.findById(req.body.tipeprosedurid);
   
    if(findlangkah === null || findtanaman === null || findtipeprosedur === null){
        message : "id tidak ditemukan" ;
    } 
    else{
        const prosedur = new prosedurTanam({
            _id: new mongoose.Types.ObjectId(),
            langkah: req.body.langkahid,
            tanaman: req.body.tanamanid,
            urutanLangkah: req.body.urutanLangkah
        });
        prosedur.save()
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