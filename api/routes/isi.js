const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Isi = require('../models/isi');
const Menu = require('../models/menu');
const checkAuth = require('../middleware/check-auth');

const IsiController = require ('../controllers/isi');

router.get("/", checkAuth, IsiController.isi_get_all);

router.post('/', checkAuth, IsiController.isi_post);

router.get('/:isiid', checkAuth, IsiController.isi_get_id);

router.patch('/:isiid', checkAuth, IsiController.isi_update);

router.delete('/:isiid', checkAuth, IsiController.isi_delete);

module.exports= router;