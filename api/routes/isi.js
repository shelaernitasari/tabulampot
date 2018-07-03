const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Isi = require('../models/isi');
const Menu = require('../models/menu');
const checkAuth = require('../middleware/check-auth');

const IsiController = require ('../controllers/isi');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() +'_'+ file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('not supported type of file'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});


router.get("/",  IsiController.isi_get_all);

router.post('/', upload.single('foto'),  IsiController.isi_post);

router.get('/:isiid', IsiController.isi_get_id);

router.patch('/:isiid', IsiController.isi_update);

router.delete('/:isiid', IsiController.isi_delete);

module.exports= router;