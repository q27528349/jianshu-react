import * as constants from './constants'
import axios from 'axios';
import {fromJS} from 'immutable';


export const seachblur=()=>({
    type:constants.SEARCH_BLUR
})
export const seachfocus=()=>({
    type:constants.SEARCH_FOCUS
})
export const mouseEnter=()=>({
    type:constants.MOUSE_ENTER
})
export const mouseleave=()=>({
    type:constants.MOUST_LEAVE
})
export const changepage=(page)=>({
    type:constants.CHANGE_PAGE,
    page
})
const changelist=(data)=>({
    type:constants.CHANGE_LIST,
    data:fromJS(data),
    totalpage:Math.ceil(data.length/10)
})

export const getlist=()=>{
    return (dispatch)=>{
        axios.get('/api/headerlist.json').then((res)=>{
            const data= res.data;
            const action=changelist(data.data);
            dispatch(action);
        }).catch(()=>{
            console.log('null')
        })
    }
}