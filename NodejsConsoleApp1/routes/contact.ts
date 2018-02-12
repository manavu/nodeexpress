'use strict';

const express = require('express');
const router = express.Router();

// get /contact
router.get('/contact', function (req, res, next) {

    req.session.data = { name: 'test_name'};

    var types = [
        { value: '--選択してください--' },
        { value: 'がっこうについて' },
        { value: 'ぶかつについて' },
        { value: 'その他' }
    ];
    res.render('contact', {
        title: 'お問い合わせ',
        types: types,
    });
});

// post /contact
router.post('/contact', function (req, res, next) {

    console.log(req.session.data.name);

    res.redirect('/contact');
});

module.exports = router;