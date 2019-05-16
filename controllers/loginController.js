const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = {
    check: (req, res) => {
        let username = req.body.username
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                console.log(err)
                console.log('1')
                return res.render('pages/login', { err: true })
            }
            if (!user) {
                console.log('2')
                return res.render('pages/login', { err: true })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, login) => {
                    //if login == true password correct
                    if (login) {
                        if (user.uType === 'teacher') {
                            res.redirect('/menu')
                        } else if (user.uType === 'staff') {
                            res.redirect('/menu')
                        } else if (user.uType === 'student') {
                            res.redirect('/menu')
                        } else if (user.uType === 'admin') {
                            res.redirect('/menu')
                        } else {
                            res.render('pages/login', { err: true })
                        }
                    } else {
                        res.render('pages/login', { err: true })
                    }
                })
            }
        })
    }
}