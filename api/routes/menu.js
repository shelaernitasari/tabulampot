const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/menu');

const MenuController = require ('../controllers/menu');

router.get("/", MenuController.menu_get_all);

router.post('/', MenuController.menu_post);

router.get('/:menuid', MenuController.menu_get_id);

router.patch('/:menuid', MenuController.menu_update);

router.delete('/:menuid', MenuController.menu_delete);

module.exports= router;