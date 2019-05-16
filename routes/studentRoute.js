// require module ต่างๆ
const express = require('express');
const router = express.Router();

//require controller
const Controller = require('../controllers/studentManageController')

router.route('/').get(Controller.index)
router.route('/post').post(Controller.post)
router.route('/update').post(Controller.update)
router.route('/delete/:id').get(Controller.delete)

router.get('/showExam/:studentId', (req, res) => {
    console.log(req.params)
    require('../models/modelStudent').findById(req.params.studentId, (err, stu) => {
        console.log(stu.course)
    }).populate('course')
})

module.exports = router