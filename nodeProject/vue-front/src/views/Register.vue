<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">
                    後臺管理系統
                </span>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:'register',
    components:{}
}
</script>

<style scoped>
    .register{
        position: relative;
        width:100%;
        height:100%;
        background: url('../assets/bg.jpg') no-repeat center ; 
        background-size:cover;
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


</style>