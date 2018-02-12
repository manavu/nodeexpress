'use strict';

const express = require('express');         // npm install --save express
const session = require('express-session'); // npm install --save express-session
const app = express();

// セッションを使用可能にする
app.use(session({
    secret: "YOUR_SECRET_KEY_uhawwwwokwwwww",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 172800000 }
}));

// express が使用するview engine を設定する
app.set('view engine', 'ejs');  // npm install --save ejs

// ルーティングモジュールを読み込む
const contact = require('./routes/contact');
const login = require('./routes/login');

// ルーティングモジュールを / に割り当てる
app.use('/', contact);
app.use('/', login);
// ルーティングモジュールを /contact に割り当てる
// app.use('/contact', contact);

/*
// get /contact
app.get('/contact', function (req, res, next) {
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
app.post('/contact', function (req, res, next) {
    res.redirect('/contact');
});
*/

// 写真のサンプルデータ
var photoList = [
    {
        id: "001",
        name: "photo001.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo001.jpg"
    }, {
        id: "002",
        name: "photo002.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo002.jpg"
    }
]

// webapi 的なやつ
app.get('/api/photo', function (req, res, next) {
    res.json(photoList);
});

// webapi 的なやつにパラメータを受け取る
app.get('/api/photo/:photoId', function (req, res, next) {

    var photo;

    for (var i = 0; i < photoList.length; i++) {
        if (photoList[i].id == req.params.photoId) {
            photo = photoList[i];
        }
    }

    res.json(photo);
});

// 静的ファイル（ルート）への参照のミドルウェアを追加する
app.use(express.static('./public'));

app.listen(8001, () => {
    // console.log(process.cwd()); // カレントディレクトリ
    console.log('Express Server 01');
});

// console.log('Hello world');
