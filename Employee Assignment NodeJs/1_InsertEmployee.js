var ext=require("./1_empPayBL");
var http=require("http");
var fs=require("fs");
var qs=require("querystring");
var MongoClient=require('mongodb').MongoClient;
http.createServer(function(req,res){
    console.log(req.method);
    if(req.method=="GET"){
        res.writeHead(200,{"Content-Type":"text/html"});
        fs.createReadStream("./1_Employee.html").pipe(res);
    }
    if(req.method=="POST")
    {
        var temp="";
        req.on("data",function(chunk){
            temp+=chunk;
        })
        req.on("end",function(){
            var out=qs.parse(temp); //now out is json document
            var id=out.id;
            var name=out.name;
            var bp=parseFloat(out.bp);
            var netPay=ext.netPay(bp);
            res.write(`
            <!DOCTYPE html>
<html>
<head>
<title>Employee Details</title>
</head>
<body>
<H1>New Employee</H1>
<form>
<label>Id : </label>
<input type="text" name="id" value=${id}>

<label>Name : </label>
<input type="text" name="name" value=${name}>

<label>Basic pay : </label>
<input type="text" name="bp" value=${bp}>


<label>Net pay : </label>
<input type="text" name="bp" value=${netPay}>


</form>
</body>
</html>
            `);
            MongoClient.connect("mongodb://127.0.0.1:27017/",function(err,db){
                var dbo=db.db("EmployeePay");
                var insObj={_id:id,Name:name,BasicPay:bp,NetPay:netPay}
                dbo.collection("emp").insertOne(insObj,function(err,doc){
                    if(err){
                        res.write("Employee already present");
                    }
                    else{
                        res.end("One document inserted");
                    }
                });
            });
        });
    }
}).listen(3000);
console.log("Server running on port 3000");