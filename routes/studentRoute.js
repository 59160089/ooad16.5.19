// require module ต่างๆ
const express = require('express');
const router = express.Router();

//require controller
const Controller = require('../controllers/studentManageController')

router.route('/').get(Controller.index)
router.route('/post').post(Controller.post)
router.route('/update').post(Controller.update)
router.route('/delete/:id').get(Controller.delete)

module.exports = router