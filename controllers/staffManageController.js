const Staff = require('../models/modelStaff')
const bcrypt = require('bcrypt')

module.exports = {
    index: (req, res) => {
        Staff.find({ uType: "staff" }, function (err, person) {
            if (err) {
                console.log(err)
            }
            else {
                res.render('pages/staffManage', { person: person })
            }
        })
    },
    post: (req, res) => {
        const staff = Staff(req.body)
        staff.uType = "staff"

        bcrypt.hash(req.body.password, 4, (err, hash) => {
            staff.password = hash
            console.log(staff)
            staff.save().then(staff => { res.redirect('/manageStaff') }).catch(err => { res.status(400).send("unable to save to database") })
        })
    },
    update: (req, res) => {
        Staff.findByIdAndUpdate(req.body._id, {
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
            res.redirect('/manageStaff')
        })
    },
    delete: (req, res) => {
        Staff.findByIdAndRemove({ _id: req.params.id },
            function (err, person) {
                if (!person) res.json(person)
                else res.redirect('/manageStaff')
            })
    }
}