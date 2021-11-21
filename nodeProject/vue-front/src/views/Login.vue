<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">後臺管理系統</span>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
                        <el-form-item label="電子信箱" prop="email">
                            <el-input v-model="loginUser.email" placeholder="請輸入email"></el-input>
                        </el-form-item>
                         <el-form-item  label="密碼" prop="password">
                            <el-input v-model="loginUser.password" type='password' placeholder="請輸入密碼" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登入</el-button>
                        </el-form-item>
                        <div class="goRegister">
                            <p>還沒有帳號?現在<router-link to='/register'>註冊</router-link></p>
                        </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'login',
    components:{},
    data(){
    return {
            loginUser:{
                email:'',
                password:''
            },
            rules:{
                email:[
                    {
                        type:"email",
                        required:true,
                        message:"電子信箱格式不正確",
                        trigger:'blur'
                    }
                    ],
                password:[
                    {
                        required:true,
                        message:'密碼不能為空',
                        trigger:'blur'
                    },
                    {
                        min:6,
                        max:30,
                        message:'長度在6到30之間',
                        trigger:'blur'
                    }
                    ]
            }
        }
    },
    methods:{
        submitForm(formName){
        this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post("/api/users/login",this.loginUser)
                    .then(res=>{
                    //console.log(res);
                    //token
                    const { token }=res.data;
                
                    localStorage.setItem('tokenId',token);
                    //解析token
                    const decoded=jwt_decode(token);
                    // console.log(decoded);

                    //token存儲到vuex中
                    this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded));
                    this.$store.dispatch("setUser",decoded);

                    this.$router.push('/index');
                    }).catch(()=>{
                        console.log('密碼或使用者輸入錯誤')
                    })
                 
             }
        });
        },
        isEmpty(value){
            return(
                value === undefined||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0)||
                (typeof value === "string" && value.trim().length === 0)
            )
        }
         
    }
}
</script>

<style scoped>
    .login{
        position: relative;
        width:100%;
        height:100%;
        background: url('../assets/bg.jpg') no-repeat center ; 
        background-size:cover;
    }

    span{
        margin-left: 55px;
    }
    
    .form_container{
        width:370px;
        height:210px;
        position: absolute;
        top:10%;
        left:34%;
        border-radius: 5px;
        text-align:center;
    }

    .form_container .manage_tip .title{
        font-weight: bold;
        font-size: 26px;
        color:rgb(228, 147, 147);
    }

    .loginForm{
        margin-top: 20px;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
    }
    
    .submit_btn{
        width:100%
    }
    
    .goRegister{
        font-size: 0.5rem;
        float: right;
        letter-spacing: 2px;
    }
     

</style>