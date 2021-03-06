const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = {
    check: (req, res) => {
      
        let username = req.body.username
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                console.log(err)
                require('../models/modelYear').find({}, function (err , year) {
                    res.render('pages/login', { err: true  , year : year}) 
                })
            }
            if (!user) {
                require('../models/modelYear').find({}, function (err , year) {
                    res.render('pages/login', { err: true  , year : year}) 
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, login) => {
                    //if login == true password correct
                    if (login) {
                        if (user.uType === 'teacher') {
                            res.redirect('/menu/teacher')
                        } else if (user.uType === 'staff') {
                            res.redirect('/menu/admin')
                        } else if (user.uType === 'student') {
                            res.render('pages/studentMenu' , {user : user})
                        } else if (user.uType === 'admin') {
                            res.redirect('/menu/admin')
                        } else {
                         
                            require('../models/modelYear').find({}, function (err , year) {
                                res.render('pages/login', { err: true  , year : year}) 
                            })
                        }
                    } else {
                       
                        require('../models/modelYear').find({}, function (err , year) {
                            res.render('pages/login', { err: true  , year : year}) 
                        })
                    }
                })
            }
        })
    }
}