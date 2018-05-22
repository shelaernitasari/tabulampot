const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Admin = require('../models/admin');
const checkAuth = require('../middleware/check-auth');

const adminController = require ('../controllers/admin');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() +'_'+ file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png'){
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

router.post("/", checkAuth, upload.single('foto'), adminController.admin_signup);

router.post("/login", checkAuth, adminController.admin_login);

router.get("/", checkAuth, adminController.admin_get_all);

router.post('/signup', checkAuth, adminController.admin_post);

router.get('/:adminid', checkAuth, adminController.admin_get_id);

router.patch('/:adminid', checkAuth, adminController.admin_update);

router.delete('/:adminid', checkAuth, adminController.admin_delete);

module.exports= router;