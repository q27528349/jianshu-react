import axios from 'axios';
import * as constants from './constants'

const changeDtail=(title,content)=>({
    type:constants.CHANGE_DATAIL,
    title:title,
    content:content 
})
export const getInDetail=(id)=>{
    return (dispatch)=>{
        axios.get("/api/detail.json?id="+id).then((res)=>{
            const data =res.data.data;
            dispatch(changeDtail(data.title,data.content))
        })
    }
}