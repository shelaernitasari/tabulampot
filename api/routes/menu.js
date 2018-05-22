const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/menu');
const checkAuth = require('../middleware/check-auth');

const MenuController = require ('../controllers/menu');

router.get("/", checkAuth, MenuController.menu_get_all);

router.post('/', checkAuth, MenuController.menu_post);

router.get('/:menuid', checkAuth, MenuController.menu_get_id);

router.patch('/:menuid', checkAuth, MenuController.menu_update);

router.delete('/:menuid', checkAuth, MenuController.menu_delete);

module.exports= router;