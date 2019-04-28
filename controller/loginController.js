var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient = require('mongodb').MongoClient;
var assert =require('assert');
var url = 'mongodb://localhost:27017/mydb';
var urll = 'mongodb://localhost:27017/property';
var url2 = 'mongodb://localhost:27017/sell';
var url3 ='mongodb://localhost:27017/AdharDatabase';
//changed
var url4 ='mongodb://localhost:27017/Bankdatabase';

//var nurl = 'mongodb://localhost:27017/notary';
var fs= require("fs");

module.exports = (function(app){

  app.get('/', function(req,res){
    res.render('home1');
  });
 app.get('/changep',function(req,res){
    res.render('changep');
  });
  app.get('/profile',function(req,res){
    res.render('profile');
  });
  app.get('/view1',function(req,res){
    res.render('view1');
  });

  app.get('/login',function(req,res){
    res.render('login');
  }); 
  app.get('/notlog',function(req,res){
    res.render('notlog');
  }); 
  app.get('/notprofile',function(req,res){
    res.render('notprofile');
  }); 
    app.get('/buyer',function(req,res){
    res.render('buyer');
  }); 
    app.get('/pay',function(req,res){
    res.render('pay');
  }); 

//notary page=====================================================================
app.get('/nota',function(req,res){
 res.render('notary');
});

//land database display=================================================================================
app.post('/demo1',urlencodedParser,function(req,res){
 
   MongoClient.connect(urll, function(err, db) {
    db.collection('own_property').findOne({ Aadhaarno: req.body.Aadhaarno}, function(err, user) {

              
             if(user ===null)
             {
               res.end(" invalid Aadhaarno");
            }
            else if (user.Aadhaarno === req.body.Aadhaarno )
          { 
          //  global.owneraddress=user.ownedaddress;
           var resultArray=[];
          
           var cursor=db.collection('own_property').find({ Aadhaarno: req.body.Aadhaarno});
            cursor.forEach(function(doc,err){
            assert.equal(null,err);
            resultArray.push(doc);
              },function() {
                db.close();

              res.render('completeprofile1',{profileData:resultArray});
            });
           }
           else {
            console.log("Credentials wrong");
            res.end(" invalid");
          }
             
 });
  });
 });
// changeprice TO DB==================================================================
  app.post('/changeprice',urlencodedParser,function(req,res){
//changed
    var price1=req.body.price;
    var landid=req.body.landid;
    MongoClient.connect(url2, function(err, db) {
   db.collection('propsell').findOne({ landid: req.body.landid}, function(err, user) {
             if(user ===null){
              res.send("this land is not for sale");
             }
             else if(userAadhaarno!==user.Aadhaarno){
              res.send("this is not your land");

             }
             else if(user.buyername!==" "){
              res.send("buyer is added you cannot change price");
             }
             else{
              var myquery = { price:user.price };
              var newvalues = { landid:user.landid,Aadhaarno:user.Aadhaarno,ownedaddress:user.ownedaddress,prevownname:user.prevownname,cordone:user.cordone,cordtwo:user.cordtwo,area:user.area,taxstat:user.taxstat,liabstat:user.liabstat,price:req.body.price,buyername: user.buyername,approved:'true'};
              db.collection("propsell").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
              });
    res.send("price has changed");
  }
   
});
 });
  });

// Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){
   MongoClient.connect(url, function(err, db) {
   db.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
             if(user ===null){
               res.end("Login invalid");
            }else if (user.name === req.body.name && user.pass === req.body.pass){

              global.ousername=req.body.name;
              global.userAadhaarno=user.aadhaar
            res.render('completeprofile',{profileData:user});

          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
 });
});

//public page=====================================================================
app.get('/public', function(req,res,next){
  var resultArray=[];
  MongoClient.connect(url2,function(err,db){
    assert.equal(null,err);
    var cursor=db.collection('propsell').find();
    cursor.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);
    },function() {
      db.close();
      res.render('public1',{questions:resultArray});
    });
  });
});

//already approved page=====================================================================
app.get('/already', function(req,res,next){
  var resultArray=[];

  MongoClient.connect(url2,function(err,db){
    assert.equal(null,err);
    var cursor=db.collection('propsell').find({approved:'true'});
    cursor.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);
    },function() {
      db.close();
      res.render('approved',{questions:resultArray});
    });
  });
});

//yet to approve page=====================================================================
app.get('/yet', function(req,res,next){
  var resultArray=[];
  MongoClient.connect(url2,function(err,db){
    assert.equal(null,err);
    var cursor=db.collection('propsell').find({approved:'false'});
    cursor.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);
    },function() {
      db.close();
      res.render('yetapproved',{questions:resultArray});
    });
  });
});


// Not Login TO DB==================================================================
  app.post('/notaryy',urlencodedParser,function(req,res){
   MongoClient.connect('mongodb://localhost:27017/notary', function(err, db) {
   db.collection('notuserprofile').findOne({ username: req.body.name}, function(err, user) {
             if(user ===null){
               res.end("Login invalid");
            }else if (user.username === req.body.name && user.password === req.body.pass){
              
            res.render('notprofile',{profileData:user});

          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
 });
});


//payprice===========================================================================
app.get('/opay',urlencodedParser,function(req,res){
          console.log(selleraadhar);
          
          console.log(sellerlandid);


          MongoClient.connect(url, function(err, db) {
             db.collection('userprofile').findOne({ aadhaar:selleraadhar}, function(err, user) {
              global.sellerusername=user.name;
              console.log(sellerusername);
            });
             db.close();
          });
          MongoClient.connect('mongodb://localhost:27017/property', function(err, db) {
             db.collection('own_property').findOne({Aadhaarno:userAadhaarno }, function(err, user) {
              global.owneraddress=user.ownedaddress;
              console.log(owneraddress);
            });
             db.close();
          });
         MongoClient.connect('mongodb://localhost:27017/property', function(err, db) {
             

              db.collection('own_property').findOne({ landid:sellerlandid},function(err, seller) {
                if(err) {throw err;
                  res.send("no such land");
                }
                console.log(seller);
              var myquery = { Aadhaarno:seller.Aadhaarno,ownedaddress:seller.ownedaddress,prevownname:seller.prevownname };
            var newvalues = { landid:seller.landid,Aadhaarno:userAadhaarno,ownedaddress:owneraddress,prevownname:sellerusername,cordone:seller.cordone,cordtwo:seller.cordtwo,area:seller.area,taxstat:seller.taxstat,liabstat:seller.liabstat,price:seller.price,buyername:"",approved:'false'};
            db.collection("own_property").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
            
          });
              });
        MongoClient.connect(url2, function(err, db) {
             db.collection('propsell').remove({landid:sellerlandid}, function(err, results) {

            console.log(results.result);
        });
        res.send("ownership is changed");
        db.close();
          });

   
 });

//userpage=====================================================================
app.get('/userr',urlencodedParser,function(req,res){

     res.render('home');

  });
//register to DB================================================================
app.get('/regiterToDb',urlencodedParser,function(req,res){
 
     res.render('profile');

  });

//paycheck function============================================================================
app.post('/paycheck',urlencodedParser,function(req,res){

   MongoClient.connect('mongodb://localhost:27017/sell', function(err, db) {
   

    db.collection('propsell').findOne({ buyername:ousername},function(err, seller) {
     
      
           if(seller===null){
            res.send(" there is no property to pay for you");
            }
            else if (seller.buyername === ousername)
            {
              if(seller.approved === "false")
              {
                res.send("notary is not approved your property");
              }
              else
              { global.selleraadhar=seller.Aadhaarno;
                global.sellerlandid=seller.landid;
                res.render('paypage',{profileData:seller});
              }
            }
            else{
               
              res.end("you are not the buyer");
            }

        db.close();
    });
});
    });

//cancel btn working===========================================================================
app.post('/cancel',urlencodedParser,function(req,res){
   // fs.readFile('test.txt', 'utf8', function(err, data) {  
   //  if (err) throw err;
   //  console.log(data);
   MongoClient.connect('mongodb://localhost:27017/sell', function(err, db) {
   

    db.collection('propsell').findOne({ landid:req.body.landidd},function(err, user) {
      console.log(user)
           if(user === null){
               res.send("your land is not for sale now");
            }else {
              db.collection('propsell').remove({landid:user.landid}, function(err, results) {
                 res.send("your land is removed from sale");
            console.log(results.result);
        });
       
        db.close();
    }
});
    });
 });

app.post('/addb',urlencodedParser,function(req,res){
 //changed
   MongoClient.connect(url2, function(err, db1) {
    db1.collection('propsell').findOne({ landid: req.body.landidd}, function(err, user) {
    
              //changed
              if(user ===null)
              {
                res.end(" this land is not for sale");
             }
            else if (userAadhaarno!==user.Aadhaarno) {
              res.end("you are not the owner of this land");

            }
      else{
            MongoClient.connect('mongodb://localhost:27017/Bankdatabase', function(err, db) {
             db.collection('bank').findOne({ name: req.body.buyername}, function(err, suser) {
              console.log(req.body.buyername);
              console.log(suser);
              if(suser === null)
              {res.send("he is not a buyer");
              }
              else if(suser.balance<user.price)
              {
                res.send("buyer has not sufficient balance");
              }
              else {

            var myquery = { buyername:" " };
            var newvalues = { landid:user.landid,Aadhaarno:user.Aadhaarno,ownedaddress:user.ownedaddress,prevownname:user.prevownname,cordone:user.cordone,cordtwo:user.cordtwo,area:user.area,taxstat:user.taxstat,liabstat:user.liabstat,price:user.price,buyername: req.body.buyername,approved:user.approved};
            db1.collection("propsell").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log(user);
              console.log("1 document updated");
              db.close();
              db1.close();
            });
            res.end("buyer is added");
          }
        });
           });
}
});
  });
 });



app.post('/approveb',urlencodedParser,function(req,res){
 
   MongoClient.connect(url2, function(err, db) {
    db.collection('propsell').findOne({ landid: req.body.landidd}, function(err, user) {
    
              
            //  if(user ===null)
            //  {
            //    res.end(" invalid landid");
            // }
            if (err) throw err;
  var myquery = { approved: "false" };
  var newvalues = { landid:user.landid,Aadhaarno:user.Aadhaarno,ownedaddress:user.ownedaddress,prevownname:user.prevownname,cordone:user.cordone,cordtwo:user.cordtwo,area:user.area,taxstat:user.taxstat,liabstat:user.liabstat,price:user.price,buyername: user.buyername,approved:'true'};
  db.collection("propsell").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
  res.end("land is approved");
});
  });
 });


//insert into sell database==============================
app.post('/gemo',urlencodedParser,function(req,res){
   MongoClient.connect(urll, function(err, db) {
   

    db.collection('own_property').findOne({landid: req.body.landid},function(err, user) {
      //changed
      if(user=== null)
      {
        res.send("print you dont own this property");
      }
      else{
          var ob_data={'landid':user.landid,'Aadhaarno':user.Aadhaarno,'ownedaddress':user.ownedaddress,'prevownname':user.prevownname,'cordone':user.cordone,'cordtwo':user.cordtwo,'area':user.area,'taxstat':user.taxstat,'liabstat':user.liabstat,'price':user.price,'buyername': " ",'approved':'false'}
           var obj1=JSON.stringify(ob_data);
          console.log("Final reg Data : "+obj1);
          var jsonObj = JSON.parse(obj1);
         MongoClient.connect('mongodb://localhost:27017/sell', function(err, db) {
          //changed
        db.collection("propsell").findOne({landid: req.body.landid},function(err, suuser) {
           if (suuser === null)
           {
            db.collection("propsell").insertOne(jsonObj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            

           });
          }
          else{
      res.send("already the land is for sale ");
    }
     db.close();
   });

      });
}

  });

 });

 });
//register profile to MongoDB================================================================
  app.post('/completeprofile',urlencodedParser,function(req,res){
  MongoClient.connect(url3, function(err, db) {
   

    db.collection('profile1').findOne({adhar: req.body.aadhaar},function(err, user) {
        if(user ===null){
               res.end("register invalid");
            }
            else if (user.adhar === req.body.aadhaar)
            {
               var obj = JSON.stringify(req.body);
               console.log("Final reg Data : "+obj);
               var jsonObj = JSON.parse(obj);
                  MongoClient.connect(url, function(err, db) {
                  db.collection("userprofile").insertOne(jsonObj, function(err, res) {
                 if (err) throw err;
                 console.log("1 document inserted");
                 db.close();
                  });
                   res.render('completeprofile',{profileData:req.body});
                  });
              
          } 
          else {
            console.log("Credentials wrong");
            res.end("registration invalid invalid");
          }
   });
 });  
}); 
});
