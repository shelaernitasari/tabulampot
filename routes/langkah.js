const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Langkah = require('../models/langkah');
const tipeProsedur = require('../models/tipeProsedur');

router.get('/', (req, res, next ) => {
    Langkah.find()
        .select("_id langkah tipeProsedur ")
        .populate('tipeProsedur', '_id prosedur')
        .then(docs => {
            console.log(docs);
            if(docs.length >= 0){
                res.status(200).json({
                    count : docs.length,
                    Langkah : docs.map(doc => {
                        return {
                            _id : doc._id,
                            langkah : doc.langkah,
                            tipeProsedur : doc.tipeProsedur
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
    let findtipeprosedur = await  tipeProsedur.findById(req.body.prosedurid);
    if(findtipeprosedur === null){
        message:"id tidak ditemukan";
    }
    else{
        const langkah = new Langkah({
            _id: new mongoose.Types.ObjectId(),
            langkah: req.body.langkah,
            tipeProsedur: req.body.prosedurid
        });
        langkah.save()
    
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "berhasil disimpan",
                createdLangkah: result
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

router.get('/:langkahid', (req, res, next) => {
    const id = req.params.langkahid;
    Langkah.findById(id)
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

router.patch('/:langkahid', (req, res, next) => {
   const id= req.params.langkahid;
   const updateOps = {};
   for (const ops of req.body){
       updateOps[ops.propName]= ops.value;
   }
   Langkah.update({ _id: id}, {$set: updateOps})
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

router.delete('/:langkahid', (req, res, next) => {
   const id = req.params.langkahid;
   Langkah.remove({ _id: id})
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