const Teacher = require('../models/modelTeacher')
const bcrypt = require('bcrypt')

module.exports = {
    index: (req, res) => {
        Teacher.find({ uType: 'teacher' }, function (err, person) {
            if (err) {
                console.log(err)
            } else {
                // eslint-disable-next-line no-dupe-keys
                res.render('pages/teacherManage', { person, person })
            }
        })
    },
    post: (req, res) => {
        const teacher = new Teacher(req.body)
        teacher.uType = 'teacher'
        bcrypt.hash(teacher.password, 4, (err, hash) => {
            console.log(hash)
            teacher.password = hash
            teacher.save().then(() => { res.redirect('/manageTeacher') }).catch(() => { res.status(400).send('unable to save to database') })
        })
    },
    update: (req, res) => {
        Teacher.findByIdAndUpdate(req.body._id, {
            username: req.body.editusername,
            // password: hash,
            prefixname: req.editprefixname,
            firstName: req.body.editfirstName,
            lastName: req.body.editlastName,
            faculty: req.body.editfaculty,
            major: req.body.editmajor,
            position: req.body.editposition
        }, (err, data) => {
            if (err) {
                return res.status(500).send(err.message)
            }
            res.redirect('/manageTeacher')
        })
    },
    delete: (req, res) => {
        Teacher.findByIdAndRemove({ _id: req.params.id },
            function (_err, person) {
                if (!person) res.json(person)
                else res.redirect('/manageTeacher')
            })
    }
}