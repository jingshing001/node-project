import axios from 'axios'
import { Message,Loading } from 'element-ui';
import router from './router';

let loading;

function startLoading(){
    loading=Loading.service({
        lock:true,
        text:'讀取中...',
        background:'rgba(0,0,0,0.7)'
    });
}

function endLoading(){
    loading.close();
}

//請求攔截
axios.interceptors.request.use(config =>{
    //加載動畫
    startLoading();
    console.log(config);

    if(localStorage.getItem('tokenId')){
        config.headers.Authorization=localStorage.getItem('tokenId')
    }

    return config;
},error=>{
    return Promise.reject(error);
})

//響應攔截
axios.interceptors.response.use(response =>{
    //結束動畫
    endLoading();
    return response;
},error=>{
    endLoading();
    Message.error(error.response.data);
    //錯誤代碼
    const {status}=error.response;
        if(status==401){
            Message.error('token失效,請重新登入!');
            //清除tokenId
            localStorage.removeItem('tokenId');
            //跳轉到登入頁面
            router.push('/login');
        }

    return Promise.reject(error);
})



export default axios;