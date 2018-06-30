var http=require("http");
var fs=require("fs");
var qs=require("querystring");
var MongoClient=require('mongodb').MongoClient;
http.createServer(function(req,res){
    
    if(req.method=="GET"){
        if(req.method=="GET"){
            res.writeHead(200,{"Content-Type":"text/html"});
            fs.createReadStream("./Delete.html").pipe(res);
        }
    }
    else if(req.method=="POST")
    {
        var temp="";
        req.on("data",function(chunk){
            temp+=chunk;
        })
        req.on("end",function(){
            var out=qs.parse(temp); //now out is json document
            var id=out.id;


            MongoClient.connect(`mongodb://127.0.0.1:27017/`,function(err,db){
                var dbo=db.db("EmployeePay");
                var Del={_id:id};
                dbo.collection("emp").findOneAndDelete(Del,function(err,doc){
                    if(err){
                        res.write("Employee not present");
                    }
                    else{
                        res.end("Employee Deleted");
                        console.log("1 document deleted");
                    }
                });
            });



            
           
          
    });
}

}).listen(3000);
console.log("Server running on port 3000");