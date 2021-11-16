const express=require("express");
const User=require('../../models/User');
const bcrypt=require("bcrypt");
const gravatar=require('gravatar');
const jwt=require('jsonwebtoken');
const keys=require("../../config/keys")
const router=express.Router();



//路由測試
router.get("/test",(req,res)=>{
    res.json({msg:"login works"});
})

//註冊路由
router.post('/register',((req,res)=>{
    console.log(req.body);
    User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json({email:"已經有人註冊過!"})
            }else{
                const avatar=gravatar.url(req.body.email,{ s : '200' ,  r : 'pg' ,  d : 'mm' }); 
                const newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password,
                })
                bcrypt.genSalt(10,function(err,salt){ 
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{ 
                            if(err) throw err;

                            newUser.password=hash;

                            newUser.save()
                                   .then(user=>res.json(user))
                                   .catch(err=>console.log(err));
                    }) ; 
                });

            }
        })
}))

//登入路由
router.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    //查詢數據庫
    User.findOne({email})
        .then((user)=>{
            if(!user){
                return res.status(404).json({email:'用戶不存在!'})
            }

            //密碼配對
            bcrypt.compare(password,user.password)
                  .then(isMatch=>{
                      if(isMatch){
                        const rule={id:user.id,name:user.name}
                        jwt.sign(rule,keys.secretOrkey,{expiresIn:3600},(err,token)=>{
                            if(err)throw err;
                            res.json({
                                success:true,
                                token:"mrwu"+token
                            })
                        })
                        // res.json({msg:"success"});
                      }else{
                            return res.status(400).json({password:"密碼錯誤"});
                      }
                  }) 
        })
})


module.exports= router;