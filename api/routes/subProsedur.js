const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const buah = require('../models/buah');
const prosedur = require('../models/prosedur');
const subprosedur = require('../models/subProsedur');

const SubProsedurController = require ('../controllers/subProsedur');

router.get("/", SubProsedurController.subProsedur_get_all);

router.post('/', SubProsedurController.subProsedur_post);

router.get('/:subProsedurid', SubProsedurController.subProsedur_get_id);

router.patch('/:subProsedurid', SubProsedurController.subProsedur_update);

router.delete('/:subProsedurid', SubProsedurController.subProsedur_delete);

module.exports= router;