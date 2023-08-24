const express = require('express')
const session = require('express-session')
const app = express()

//过期时间为一天
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'Your_Secret_Key',
    resave: false,
    cookie: { maxAge: oneDay, HttpOnly: true, secure: false },
    name: 'mycookie'
}))

//使用urlencoded中间件解析post请求
app.use(express.urlencoded());

app.get('/', function (req, res, next) {
    if (req.session.userid) {
        res.send("欢迎 <a href=\'/logout'>点击退出</a>");
    } else {
        res.sendFile('./login.html', { root: __dirname })
    }
})

const myusername = 'admin';
const mypassword = 'admin';
app.post('/login', (req, res) => {
    if (req.body.username === myusername && req.body.password === mypassword) {
        req.session.userid = req.body.username;
        console.log(req.session)
        res.send(`登录成功 <a href=\'/logout'>点击退出</a>`);
    } else {
        res.send('不合理的 username 或 password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})
