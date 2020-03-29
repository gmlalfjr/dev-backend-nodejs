// const Item = require('../models/Item');

// function createItem(req, res) {
//     Item.create({...req.body, UserId: req.params.id}).then(data => {
//         res.json(data)
//     }).catch(e => {
//         res.json(e)
//     })
// }

// function createItemByToken(req, res) {
//     const item = {
//         item: req.body.item,
//         userId: req.user.id
//     };
//     Item.create({...req.body, UserId: req.user.id}).then(data => {
//         res.json(data)
//     }).catch(e => {
//         res.json(e)
//     })
// }

// function deleteItem(req, res) {
//     Item.destroy({where: {id:req.params.id}}).then(data => {
//         res.json(data)
//     }).catch(e => {
//         res.json(e)
//     })
// }

// function findItemByIdUser(req, res) {
//     Item.findAll({where: {userId: req.user.id}}).then(user => {
//         res.json(user)
//     }).catch(e => {
//         res.json(e)
//     })
// }

// function getALlItem(req, res) {
//     Item.findAll().then(item => {
//         res.json(item)
//     }).catch(err => {
//         res.json(err)
//     })
// }

// module.exports = {createItem, getALlItem, findItemByIdUser, createItemByToken,deleteItem};
