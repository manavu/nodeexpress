'use strict';

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize'); // npm install --save sequelize
// npm install --save tedious // MSSQL

// get /login
router.get('/login', function (req, res, next) {

    res.render('login');

});

// post /login
router.post('/login', function (req, res, next) {

    const sequelize = new Sequelize('test_db', 'test', 'password', {
        host: 'localhost',
        dialect: 'mssql'
    });

    const Users = sequelize.define('user', {
        id: {
            type: Sequelize.STRING,
            field: 'cUserID',
            primaryKey: true,
        },
        loginID: {
            type: Sequelize.STRING,
            field: 'vcLoginID',
        },
        password: {
            type: Sequelize.STRING,
            field: 'vcLoginPwd'
        },
        lastName: {
            type: Sequelize.STRING,
            field: 'vcUserLName'
        }
    },
        {
            tableName: 'tbUser',
            timestamps: false
        });

    /*
    Users.findAll().then(users => {
        for (var i = 0; i < users.length; i++) {
            console.log(users[i].id + ' ' + users[i].lastName);
        }
    });*/

    /*
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    */

    console.log(req.param.loginId);
    console.log(req.param.password);

    Users.findOne({
        where:
        {
            loginID: req.param.loginId,
            password: req.param.password
        }
    }).then(user => {
        res.redirect('/contact');
    });

    res.redirect('/login');
});

module.exports = router;