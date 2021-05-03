require("dotenv").config();

const {Pool}=require('pg');
const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
});

const getTotalRecords=()=>{
    sql="SELECT COUNT(*) FROM customer";
    return pool.query(sql)
        .then(result=>{
            return{
                msg:"success",
                total_records:result.rows[0].count
            }
        })
        .catch(err=>{
            return{
                msg:`Error:${err.message}`
            }
        });
};

module.exports.getTotalRecords=getTotalRecords;