var express = require('express');
var router = express.Router();
var bds = require('body-parser');
var mmsql = require('./mmysql.js');
var md5 = require('md5');
var svg = require('svg-captcha');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//路由
router.get('/logo',function (req, res) {
   res.render('logo', { title : svg.create().data })
});
router.post('/logo',function (req, res) {
    if(req.body.isRegister == 'yes'){
        mmsql.savePerson(req.body.name,req.body.password,function (data) {
            if(data == 'error'){
                res.send('error,注册失败')
            }else {
                res.send('注册成功')
            }
        })
    }else{
        console.log(req.body);
        mmsql.myselect(req.body.username,function (user) {
            if( user == md5(req.body.password+'hellworld')){
                res.render('index',{ title : 'logo success111' })
            }else {
                res.render('index', { title : '登陆失败，密码错误或用户名不正确' })
            }
        });
    }
});
//处理查询用户名是否被占用
router.post('/select',function (req,res) {
    mmsql.myselect(req.body.name,function (data) {
        if(data == 'error'){
            //1:用户名可用，2用户名被占用
            res.send('1');
        }else {
            res.send('2');
        }
    })
});

router.get('/myweb',function (req,res) {
   res.render('v5')
});
router.post('/myweb',function (req,res) {
    console.log(req.body.mya);
    res.send('ok');
});

module.exports = router;
