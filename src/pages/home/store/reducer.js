import {fromJS} from 'immutable';
import * as constans from "./constans"

const defaltState=fromJS({
    topicList:[{
        id:1,
        titie:"社会热点",
        imgUrl:"https://www.purplesoftware.jp/products/seishun_f/img/product/storyb-bg.jpg"
    },{
        id:2,
        titie:"历史",
        imgUrl:"https://www.purplesoftware.jp/products/seishun_f/img/product/storyb-bg.jpg"
    }
],
articlelist:[{
    id:1,
    titie:"虎杀虎",
    desc:"随着中国疫情得到大范围的控制，生活逐步回归正常，企业复工复产，学校复学，一些人放松了对疫情防控的警惕。对此，钟南山院士表示，中国不应该骄傲自满，因为第二波疫情的风险仍然很大。",
    imgUrl:"https://www.purplesoftware.jp/products/seishun_f/img/product/storyb-bg.jpg"
},{
    id:2,
    titie:"虎杀虎",
    desc:"随着中国疫情得到大范围的控制，生活逐步回归正常，企业复工复产，学校复学，一些人放松了对疫情防控的警惕。对此，钟南山院士表示，中国不应该骄傲自满，因为第二波疫情的风险仍然很大。",
    imgUrl:"https://www.purplesoftware.jp/products/seishun_f/img/product/storyb-bg.jpg"
},{
    id:3,
    titie:"虎杀虎",
    desc:"随着中国疫情得到大范围的控制，生活逐步回归正常，企业复工复产，学校复学，一些人放松了对疫情防控的警惕。对此，钟南山院士表示，中国不应该骄傲自满，因为第二波疫情的风险仍然很大。",
    imgUrl:"https://www.purplesoftware.jp/products/seishun_f/img/product/storyb-bg.jpg"
}],
recommendList:[{
    id:1,
    imgUrl:"https://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png"

},{
    id:2,
    imgUrl:"https://cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png"
},{
    id:3,
    imgUrl:"https://cdn2.jianshu.io/assets/web/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png"
},{
    id:4,
    imgUrl:"https://cdn2.jianshu.io/assets/web/banner-s-6-c4d6335bfd688f2ca1115b42b04c28a7.png"
}]
,
aticpage:1
});

export default (state=defaltState,action)=>{
    switch(action.type){
        case constans.CHANGE_HOME_DATA:
           return state.merge({
                topicList:fromJS(action.topicList),
                articlelist:fromJS(action.articleList),
                recommendList:fromJS(action.recommendList)
            })
        case constans.ADD_HOME_LIST:
            return state.merge({
                articlelist:state.get('articlelist').concat(action.list),
                aticpage:action.nextpage
            })
        default:
            return state;
    }
}