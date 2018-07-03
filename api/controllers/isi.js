const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Isi = require('../models/isi');
const Menu = require('../models/menu');

const BASE_URL = 'https://shela.jagopesan.com/'

exports.isi_get_all = (req, res, next) => {
    Isi.find()
    .select("_id judul content tanggal idmenu foto")
    .populate('idmenu','menu')
    .then(docs => {
        console.log(docs);
        if(docs.length >= 0){
            res.status(200).json({
                count : docs.length,
                Isi  : docs.map(doc => {
                    return {
                        _id : doc._id,
                        judul : doc.judul,
                        content : doc.content,
                        tanggal : doc.tanggal,
                        idmenu : doc.idmenu,
                        foto : doc.foto
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

exports.isi_post = async (req, res, next ) => {
    let findmenu = await Menu.findById(req.body.idmenu);
    
    if(findmenu === null){
        message : "id tidak ditemukan" ;
    } 
    else{
        const isi = new Isi({
            _id: new mongoose.Types.ObjectId(),
            judul: req.body.judul,
            content: req.body.content,
            tanggal: Date.now(),
            idmenu: req.body.idmenu,
            foto: BASE_URL + 'uploads/' + req.file.filename
        });
        isi.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "berhasil disimpan",
                createdIsi: result
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

exports.isi_get_id = (req, res, next) =>{
    const id = req.params.isiid;
    Isi.find()
    .where('idmenu').equals(id)
    .select("_id judul content tanggal idmenu foto")
    .populate('idmenu','menu')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            status:"200",
            Isi: docs.map(doc =>{
                return {
                    _id: doc._id,
                    judul: doc.judul,
                    content: doc.content,
                    tanggal: Date.now(),
                    idmenu: doc.idmenu
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

exports.isi_update = (req, res, next) =>{
   const id= req.params.isiid;
   const updateOps = {};
   for (const ops of req.body ){
       updateOps[ops.propName]= ops.value;
   }
   Isi.update({ _id: id}, {$set: updateOps})
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

exports.isi_delete = (req, res, next) => {
    const id = req.params.isiid;
    Isi.remove({ _id: id})
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