const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const buah = require('../models/buah');
const prosedur = require('../models/prosedur');
const subprosedur = require('../models/subProsedur');

const ProsedurController = require ('../controllers/prosedur');

router.get("/", ProsedurController.prosedur_get_all);

router.post('/', ProsedurController.prosedur_post);

router.get('/:prosedurid', ProsedurController.prosedur_get_id);

router.patch('/:prosedurid', ProsedurController.prosedur_update);

router.delete('/:prosedurid', ProsedurController.prosedur_delete);

module.exports= router;