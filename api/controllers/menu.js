const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/menu');

exports.menu_get_all = (req, res, next) => {
    Menu.find()
    .select("_id root menu pertanyaan katakunci")
    .then(docs => {
        console.log(docs);
        if(docs.length >= 0){
            res.status(200).json({
                count : docs.length,
                Menu  : docs.map(doc => {
                    return {
                        _id : doc._id,
                        root : doc.root,
                        menu : doc.menu,
                        pertanyaan : doc.pertanyaan,
                        katakunci : doc.katakunci
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

exports.menu_post = (req, res, next) => {
    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        root: req.body.root,
        menu: req.body.menu,
        pertanyaan : req.body.pertanyaan,
        katakunci : req.body.katakunci
       
    });
    menu.save()
           .then(function(result) {
             console.log(result);
             res.status(200).json({
               message: "Berhasil menambah menu",
               createdMenu: result
           });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
};

exports.menu_get_id = (req, res, next) =>{
    const id = req.params.menuid;
    Menu.find()
    .where('root').equals(id)
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            status:"200",
            Menu: docs.map(doc =>{
                return {
                    _id: doc._id,
                    root: doc.root,
                    menu: doc.menu,
                    pertanyaan : doc.pertanyaan,
                    katakunci : doc.katakunci
                }
            })
        };

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
};

exports.menu_update = (req, res, next) =>{
   const id= req.params.menuid;
   const updateOps = {};
   for (const ops of req.body){
       updateOps[ops.propName]= ops.value;
   }
   Menu.update({ _id: id}, {$set: updateOps})
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

exports.menu_delete = (req, res, next) => {
    const id = req.params.menuid;
    Menu.remove({ _id: id})
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