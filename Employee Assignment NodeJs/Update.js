var MongoClient=require('mongodb').MongoClient;
const http=require("http");
const qs=require("querystring");
var eid;
var amt;
http.createServer(function(req,res)
{
    if(req.method=="GET")
    {
        res.end(
           `
            <html>
            <head>
          
            </head>
            <body>
            <h1>Salary Updation</h1><hr>
            <form action="/" method="POST">
            <label>Employee ID:</label><br>
            <input type="text" id="eid" name="eid"  required/><br>
            <label>New Amount</label><br>
            <input type="text" id="amt" name="amt" required/><br>
            "Press Submit to Update Employee Data"<br>
            <button>Submit</button>
            </form></body></html>`
             );
    }
    else if(req.method=="POST")
    {
        var body="";
        req.on("data",function(chunk)
    {
        body+=chunk;
        //console.log(body);
    });
    req.on("end",function()
{
    var obj1=qs.parse(body);
    amt=obj1.amt;
    eid=obj1.eid;
    console.log(eid);
    
    MongoClient.connect(`mongodb://127.0.0.1:27017/`, function(err, db) {
      if (err) throw err;
      var dbo = db.db("EmployeePay");
      var amt1=parseFloat(amt);
      var updval={$inc:{BasicPay: amt1 }}
      console.log(eid);
      console.log(amt1);
    dbo.collection("emp").updateOne({_id:eid},updval,function(err,result){
        if (err)
        {
            res.write("Database error");
        }
        
        if (result.result.nModified == 0){
            console.log("not found");
            res.end("Employee details not found");
        }
        
        else if (result.result.nModified >0){
            console.log()
        res.end(`
        <html>
        <head>
       
        </head>
        <body>
        <h1>Salary Updation</h1><hr>
        <form action="/" method="POST">
        <label>Employee ID:${eid} Updation has been done!</label><br>
        </form></body></html>`);
    ;}
    db.close();
      });
});
    });
}}).listen(3000);
console.log("form server listening on port 3000");