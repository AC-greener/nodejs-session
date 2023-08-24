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
// app.get('/', (req, res) => {
// 	res.send("hello");
// });
app.get('/', function (req, res, next) {
	if (req.session.views) {
		req.session.views++
		res.send('views: ' + req.session.views)
	} else {
		req.session.views = 1
		res.end('welcome to the session demo. please curl again!')
	}
})
app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
