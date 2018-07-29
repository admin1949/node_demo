var query = require('./db.js');
var sql = 'insert into websit (name,password) values ("252525","323232")';
query(sql,null,function (err,result,inx) {
    console.log(err+'\n'+JSON.stringify(result)+'\n'+JSON.stringify(inx)+'\nno result '+(typeof inx));
});