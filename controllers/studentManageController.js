const Student = require('../models/modelStudent')
const bcrypt = require('bcrypt')

module.exports = {
    index: (req, res) => {
        Student.find({ uType: "student" }, function (err, person) {
            if (err) {
                console.log(err)
            }
            else {
                return res.render('pages/studentManage', { person: person })
            }
        })
    },
    post: (req, res) => {
        const student = new Student(req.body)
        student.uType = "student"
        bcrypt.hash(req.body.password, 4, (err, hash) => {
            student.password = hash
            console.log(student)
            student.save().then(student => { res.redirect('/manageStudent') }).catch(err => { res.status(400).send("unable to save to database") })
        })
    },
    update: (req, res) => {

        // bcrypt.hash(req.body.password, 4, (err, hash) => {
        //     if (!((req.body.password).length == 60)) {
        Student.findByIdAndUpdate(req.body._id, {
            username: req.body.editusername,
            // password: hash,
            prefixname: req.editprefixname,
            ID: req.body.editID,
            firstName: req.body.editfirstName,
            lastName: req.body.editlastName,
            faculty: req.body.editfaculty,
            major: req.body.editmajor,
            year: req.body.edityear,
            branch: req.body.editbranch,
            sector: req.body.editsector
        }, (err, data) => {
            if (err) {
                return res.status(500).send(err.message)
            }
            res.redirect('/manageStudent')
        })
        //     })

        // }            
    },
    delete: (req, res) => {
        Student.findByIdAndRemove({ _id: req.params.id },
            function (err, person) {
                if (!person) res.json(person)
                else res.redirect('/manageStudent')
            })
    }


}