import axios from 'axios';
import * as constans from "./constans"
import {fromJS} from 'immutable'

const changehomedatar=(data)=>({
    type:constans.CHANGE_HOME_DATA,
     topicList:data.topicList,
   articleList:data.articleList,
 recommendList:data.recommendList
})
const addHomeList=(data,page)=>({
    type:constans.ADD_HOME_LIST,
    list :fromJS(data),
    nextpage:page
})


export const gethomeinfo=()=>{
    return (dispatch)=>{
        axios.get('/api/home.json').then((res)=>{
            const data =res.data.data;
            dispatch(changehomedatar(data));
    })
}
}
export const getMoreLists=(page)=>{
    return (dispatch)=>{
        axios.get('/api/homeList.json?page=' + page).then((res)=>{
            const data1 =res.data.data;
            dispatch(addHomeList(data1,page+1));
    })
    }
}