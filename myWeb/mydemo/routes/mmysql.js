var md5 = require('md5');
var query = require('./db.js');
module.exports = {
    myselect : function (name, callback) {
        //var creat = 'crate table '+name+' (id int, user varchar(255), password varchar(255))';
        var sql = 'select password from websit where name=?';
        query(sql,name,function (err,result,fienld) {
            if(err){
                return false;
            }else if(JSON.stringify(result) == '[]'){
                callback('error');
            }else{
                callback(result[0].password);
            }
        });
    },

    savePerson : function (name,password,callback) {
        var sql_select = 'select * from websit where name=?';
        var sql_add = 'insert into websit (name,password) values ("'+name+'","'+md5(password+'hellworld')+'")';
        query(sql_select,name,function (err,result) {
            if(err){
                callback('error')
            }else if (JSON.stringify(result) == '[]'){
                query(sql_add,null,function (err,result) {
                    if(err){
                        //语法错误
                        console.log('插入数据失败'+err);
                        callback('error')
                    }else if(JSON.stringify(result) != '[]') {
                        console.log('插入数据 '+name+' 成功');
                        callback('ok');
                    }else {
                        callback('error')
                    }
                });
            }else {
                console.log('数据'+name+'已存在');
                callback('error')
            }
        });
    }
};