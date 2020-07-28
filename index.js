const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


mongoose.connect("mongodb://localhost:27017/shortUrl"); //db name
const {urlmodel}=require('./models/urlshort');

//middleware
app.use(express.static('images'));
//ejs
app.set('name',"Code By Lee");
// data  will in body
app.use(bodyParser.urlencoded({extended:true}));
//it will send ejs files
app.set('view engine',"ejs");

// app.get('/',function(req,res){
//     res.send(app.get('name'));
// });
app.get('/',function(req,res){
    // get all data from db
    let allurl=urlmodel.find(function(err,result){
        res.render('home',{
            urlresult:result
        });
    });
    
});

app.post('/create',function(req,res){
   //create a short url
   //store it in db
  // console.log(req.body.longurl);

  //ran res
  //console.log(generateUrl());
  let urlshort=new urlmodel({
    longurl:req.body.longurl,
    shorturl:generateUrl(),
  });
  urlshort.save(function(err,data){
      if(err) throw err;
     // console.log(data);
      res.redirect('/');
  });
});

app.get('/:urlId',function(req,res){
//console.log(req.params.urlId);
urlmodel.findOne({shorturl:req.params.urlId},function(err,data){
    if(err)  throw err;
    urlmodel.findByIdAndUpdate({_id:data.id},{$inc:{clickcount:1}},function(err,updatedata){
        if(err) throw err;

        res.redirect(data.longurl); //short to long//page
    });
});
});

app.get('/delete/:id',function(req,res){
    urlmodel.findByIdAndDelete({_id:req.params.id},function(err,deletedata){
        if(err) throw err;
        res.redirect('/'); 
    });
});

app.listen(3000,function(){
//console.log('Running in 3000');
});

function generateUrl(){
   var ranres="";
   var chracters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charlen=chracters.length; 

   for(var i=0;i<5;i++){
       ranres+= chracters.charAt(
            Math.floor(Math.random()*charlen)
       );
   }
   console.log("random res = ",ranres);
   return ranres;
}