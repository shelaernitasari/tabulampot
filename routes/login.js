const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next){
    Admin.find({ username: req.body.username })
    .exec()
    .then(admin => {
        if(admin.length < 1){
            return res.status(200).json({
                message: 'gagal',
                status: '205'
            });
        }

        bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
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
                    },
                    'shelaernitasari',
                    {

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
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;