const express=require("express");
const path=require("path");
const dblib=require("./dblib.js");
const multer=require("multer");
const app=express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: false }));

dblib.getTotalRecords()
    .then(result=>{
        if(result.msg.substring(0,5)==="Error"){
            console.log(`Error Encountered.${reult.msg}`);
        }else{
            console.log(`Total number of database records:${result.total_records}`);
        };
    })
    .catch(err=>{
        console.log(`Error:${err.message}`);
    });

const listener=app.listen(process.env.PORT||3000,()=>{
    console.log(`Your app is listening on port ${listener.address().port}`);
    });

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/Manage_Customers",async(req,res)=>{

    const sum_records=await dblib.getTotalRecords();
    res.render("Manage_Customers",{
        type:"get",
        sum_records:sum_records.total_records
    });
});

app.post("/Manage_Customers",async(req,res)=>{
    const sum_records=await dblib.getTotalRecords();

    dblib.findCustomers(req.body)
        .then(result=>{
            res.render("Manage_Customers",{
                type:"post",
                sum_records:sum_records.total_records,
                result=result,
                cust:req.body
            })
        })

        .catch(err=>{
            res.render("/Manage_Customers",{
                type:"post",
                sum_records:sum_records.total_records,
                result:`Unexpected Error:${err.message}`,
                cust:req.body
            });
        });

    });
app.get("/Create_Customers",async(res,req)=>{
    res.render("Create_Customers");
});