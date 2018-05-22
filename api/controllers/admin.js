const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const BASE_URL = 'https://web-tabulampot.herokuapp.com'

exports.admin_signup = (req, res, next) => {
    Admin.find({ username: req.body.username })
    .exec()
    .then(admin => {
        if(admin.length >= 1){
            return res.status(200).json({
                message: 'username sudah ada',
                status: '204'
            });
        }else{
            bcrypt.hash(req.body.password, 8, (err, hash) => {
                if(err){
                    res.status(500).json({
                        error: err
                    });
                }else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: req.body.password,
                        foto: BASE_URL + 'uploads/' + req.file.foto
                    });

                    menu.save()
                        .then(function(result) {
                            console.log(result);
                            res.status(200).json({
                                message: "Berhasil menambah admin",
                                createdMenu: result
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
        }
    });
};

exports.admin_login = (req, res, next) =>{
    Admin.find({ email: req.body.username })
    .exec()
    .then(admin => {
        if(admin.length < 1){
            return res.status(200).json({
                message: 'gagal',
                status: '205'
            });
        }

        bcrypt.compare(req.body.password), admin[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'gagal sistem',
                    status:"205"
                });
            }
            if(result){
                const token = jwt.sign(
                    {
                        username: admin[0].username
                    }
                    
                );
                return res.status(200).json({
                    message: 'auth sukses',
                    status: '100',
                    token: token,
                    id_admin : admin[0]._id

                });
            }
            return res.status(200).json({
                message: 'password tidak cocok',
                status: '108',
                token: 'null',
                id_admin : 'null'
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

exports.admin_get_all = (req, res, next) => {
    Admin.find()
    .select("_id username password foto")
    .then(docs => {
        console.log(docs);
        if(docs.length >= 0){
            res.status(200).json({
                count : docs.length,
                Admin  : docs.map(doc => {
                    return {
                        _id : doc._id,
                        username : doc.username,
                        password : doc.password,
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

exports.admin_post = (req, res, next) => {
    const admin = new Admin({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        foto: req.body.foto
       
    });
    admin.save()
           .then(function(result) {
             console.log(result);
             res.status(200).json({
               message: "Berhasil menambah admin",
               createdAdmin: result
           });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
};

exports.admin_get_id = (req, res, next) =>{
    const id = req.params.adminid;
    Admin.find()
    .where('username').equals(id)
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            status:"200",
            Admin: docs.map(doc =>{
                return {
                    _id: doc._id,
                    username: doc.username,
                    password: doc.password,
                    foto: doc.foto
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

exports.admin_update = (req, res, next) =>{
   const id= req.params.adminid;
   const updateOps = {};
   for (const ops of req.body){
       updateOps[ops.propName]= ops.value;
   }
   Admin.update({ _id: id}, {$set: updateOps})
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

exports.admin_delete = (req, res, next) => {
    const id = req.params.adminid;
    Admin.remove({ _id: id})
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