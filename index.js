const { urlencoded } = require('express');
const express=require('express');
const path=require('path');
const port=8000;
const app=express();
const db=require('./config/mongoose');
const Contact=require('./models/contact');
app.use(express.urlencoded());
app.use(express.static('assets'))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res){
    return res.render('Home',{title:"My Contact_list"});
})

app.get('/practice',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log("error in fetching contacts");
            return ;
        }
        return res.render('practice',{title:"My Contact_list",contact_list:contacts});

    });
    
});
app.post('/create-contact',function(req,res){
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
       if(err){
        console.log('error in creating contact');
        return;
       }
       console.log('contact created ',newContact)
       return res.redirect('back');
    });
    
});
app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting contact');
            return ;
        }
        return res.redirect('back');
    });
    
});
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;

    }
    console.log("Server is up and running on port:",port)
});