import {fromJS} from 'immutable';
import * as constants from "./constants"


const defaultState=fromJS({
    title:"疫情，让我认识到了老婆原来是个农村人",
    content: '<img src="https://www.purplesoftware.jp/products/seishun_f/img/product/storyb-bg.jpg"/><p>我和老婆结婚已经八年了，在这八年当中，我们几乎是天天吵架，也不知道是为啥吵架，反正总能有话题吵架。</p>'

})

export default (state=defaultState,action)=>{
    switch(action.type){
        case constants.CHANGE_DATAIL:
            return state.merge({
                title:action.title,
                content:action.content
            })
        default:
            return state;
    }
}