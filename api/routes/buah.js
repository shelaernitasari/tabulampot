const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const buah = require('../models/buah');
const prosedur = require('../models/prosedur');
const subprosedur = require('../models/subProsedur');

const BuahController = require ('../controllers/buah');

router.get("/", BuahController.buah_get_all);

router.post('/', BuahController.buah_post);

router.get('/:buahid', BuahController.buah_get_id);

router.patch('/:buahid', BuahController.buah_update);

router.delete('/:buahid', BuahController.buah_delete);

module.exports= router;