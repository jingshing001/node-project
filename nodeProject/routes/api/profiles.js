const express=require("express");
const Profile=require('../../models/Profile');
const passport=require("passport");
const router=express.Router();

router.get('/test',(req,res)=>{
    res.json({msg:'profile works'})
})


//註冊路由


module.exports= router;