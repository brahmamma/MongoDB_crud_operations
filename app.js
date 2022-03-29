var mongodb=require('mongodb');
var MongoClient=mongodb.MongoClient;
var pug=require('pug');
var bodyparser=require('body-parser');
var express=require('express');
var app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname+"/public"))
app.set('view engine','pug');
var objectID=mongodb.ObjectId;


app.get('/unicornstable',function(req,res){

    var connection=new MongoClient("mongodb://127.0.0.1:27017");
    connection.connect(function(err,con){
        if(err){
            console.log(err);
    
        }  
        else{
            var db=con.db('myinternship');
            db.collection('unicorns').find().toArray(function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    res.render('unicorntable',{unicorns:data})
                    con.close();
                }
            })
        }  

    })

})
app.get('/unicornedit/:id',function(req,res){

    var connection=new MongoClient("mongodb://127.0.0.1:27017");
    connection.connect(function(err,con){
        if(err){
            console.log(err);
    
        }  
        else{
            var db=con.db('myinternship');
            db.collection('unicorns').find({"_id":objectID(req.params.id)}).toArray(function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    
                    res.render('editform',{unicorn:data[0]})
                    
                    con.close();
                }
            })
        }  

    })

})
app.get('/unicorndelete/:id',function(req,res){

    var connection=new MongoClient("mongodb://127.0.0.1:27017");
    connection.connect(function(err,con){
        if(err){
            console.log(err);
    
        }  
        else{
            var db=con.db('myinternship');
            var result=db.collection('unicorns').deleteOne({"_id":objectID(req.params.id)},function(err,data){;
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/unicornstable')
                    con.close();
                }
            })
        }  

    })

})
app.post('/unicornadd',function(req,res){

    var connection=new MongoClient("mongodb://127.0.0.1:27017");
    connection.connect(function(err,con){
        if(err){
            console.log(err);
    
        }  
        else{   
            var obj={}
            obj.name=req.body.name
            obj.dob=new Date(req.body.dob)
            obj.loves=req.body.loves.split(',')
            obj.weight=parseInt(req.body.weight)
            obj.gender=req.body.gender
            obj.vampires=parseInt(req.body.vampires)
            var db=con.db('myinternship');
            db.collection("unicorns").insertOne(obj);
            res.redirect("/unicornstable");
                    
                
            }
          
    })

})
app.post('/update/:id',function(req,res){

    var connection=new MongoClient("mongodb://127.0.0.1:27017");
    connection.connect(function(err,con){
        if(err){
            console.log(err);
    
        }  
        else{   
            var obj={}
            obj.name=req.body.name
            obj.dob=new Date(req.body.dob)
            obj.loves=req.body.loves.split(',')
            obj.weight=parseInt(req.body.weight)
            obj.gender=req.body.gender
            obj.vampires=parseInt(req.body.vampires)
            var db=con.db('myinternship');
            db.collection("unicorns").updateOne({"_id":objectID(req.params.id)},{$set:obj},function(err,data){
                if(err)
                        {
                            console.log("update error::",err);
                        }
                        else{
                            res.redirect("/unicornstable");
                            con.close();
                        }


            });
           
                    
                
            }
          
    })

})
app.listen(3400);