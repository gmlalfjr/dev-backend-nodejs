const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {createItem, getALlItem,findItemByIdUser,createItemByToken,deleteItem} = require('../controller/ItemController');
const {verifyToken,verifyToken2} = require('../controller/Auth');
const Item = require('../models').Item;

router.post('/byid/:id', verifyToken,createItem);
router.post('/create/', verifyToken,createItemByToken);
router.get('/',verifyToken ,getALlItem);
router.delete('/:id',verifyToken ,deleteItem);
router.get('/item',verifyToken ,findItemByIdUser);

module.exports = router;
