import axios from 'axios';
import * as constants from './constants'

const changeLogin=()=>({
    type:constants.CHANGE_LOGIN,
    value:true
     
})

export const loginout=()=>({
    type:constants.CHANGE_OUT,
    value:false
})
export const login=(accout,password)=>{
    return (dispatch)=>{
        axios.get("/api/login.json?accout="+accout+"&password"+password).then((res)=>{
            const data =res.data.data;
            if(data){
                dispatch(changeLogin())
            }else{
                alert("失败了失败了")
            }
        })
    }
}