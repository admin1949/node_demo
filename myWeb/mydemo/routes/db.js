var sql = require('mysql');
var pool=sql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'wasd1597531',
    port : '3306',
    database : 'test'
});
var query = function (sql,option,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            callback(err,null,null)
        }else{
            conn.query(sql,option,function (err,result,fields) {
                conn.release();
                callback(err,result,fields);
            })
        }
    })
};
module.exports = query;