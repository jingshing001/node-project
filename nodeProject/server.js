const express=require('express');
const mongoose = require('mongoose');
const db=require('./config/keys').mongoURI;
const app=express();
const port=process.env.PORT || 3000;

mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }).then(()=>{
        console.log("MONGODB CONNECTED")
  }).catch(err=>console.log(err));

app.get('/',((req,res)=>{
        res.send('HELLO');
}))


app.listen(port,()=>{
    console.log(`server run port:${port}`);
});