APP.js 
import React,{Component} from 'react';
import Header from './common/header'
import store from './store'
import {Provider} from 'react-redux' 
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './pages/home/home';
import Detail from './pages/detail/loadable'
import Login from './pages/login/index'
import Write from './pages/write/index'


class App extends Component{
render(){
  return(
    <Provider store={store}>
      
      <BrowserRouter>
      <Header/>
      <div>
      <Route path="/write" exact component={Write}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/" exact component={Home} ></Route>
        <Route path="/detail/:id" exact component={Detail}></Route> :id利用id来切换页面
      </div>
      </BrowserRouter>
      </Provider>
  )
}
}

export default App;

可以写成单页面切换的模式 
最上面为header
Provider 是为了传递react-redux 其他子页面可以写connect来连接
react-redux 是连接react-redux之间的
react-router-dom 为react路由 为了让子页面能通过path来路由上
每个子页面都需要 from exact是为了完全一致 componect是指定的子页面

store/index.js(主):

import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk' 
import reducer from './reducer'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;  这是浏览器的插件
    
const store=createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
export default store;

redux-thunk是为了让action 和store能连接的中间件 这中间件让dispatch进行了升级
当dispatch收到一个函数会直接执行 对象会传递给store


主reducer:
import {combineReducers}  from 'redux-immutable'; 这是让reducer有主次之分的组件
import {reducer as headerReducers} from '../common/header/store';
import {reducer as homeReducers} from '../pages/home/store';
import {reducer as detailReducers} from '../pages/detail/store'
import {reducer as login} from '../pages/login/store'



const reducer =combineReducers({ 写好每个子组件的位置和名字
    header:headerReducers,
    home:homeReducers,
    detail:detailReducers,
    login:login
})
export default reducer;




子页面index：
import { SearchInfoList, SearchInfoItem, SearchInfoSwtich, SearchInfoTitie, SearchInfo, HeaderWrapper, Logo, Nav, NavItem, NavSeacth, Addtion, Button, SearchWrapper } from './style'
styled写法

import { CSSTransition } from 'react-transition-group' 动画组件

<CSSTransition
              in={this.props.focused} 变化的参数
              timeout={200} 时间
              classNames='slide'> 前缀
              <NavSeacth className={this.props.focused ? 'focused' : ''}
                onFocus={()=>this.props.onhandleInputfocese(list)}
                onBlur={this.props.handleInputBlur}
              ></NavSeacth>
   </CSSTransition>

import { connect } from 'react-redux';
import { actionCreators } from "./store"
import {actionCreators as loginactionCreators} from "../../pages/login/store" 要从其他子组件的 actioncreator中找方法的话 这样写


const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    totalpage: state.getIn(['header', 'totalpage']),
    login:state.getIn(['login','login'])
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    handleInputBlur() {
      const action = actionCreators.seachblur()
      dispatch(action)


    },

上面是两connect的写法 一个是接收state可以来自其他子组件 dispatch action action的方法写在actioncreators 写在其他js中即可
记得import

import {Link } from "react-router-dom" 路由的定向
import {Redirect} from "react-router-dom" 这会直接返回 to的定向


   <Link to="/">  定向到主页面
        <Logo  />
        </Link>
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载APP</NavItem>
          {
          login? <NavItem onClick={loginout} className="right">退出</NavItem>:  子页面写法
          <Link to="/login"><NavItem className="right">登录</NavItem></Link> 
          }

            return <Redirect to='/'/> 



            <LoginWrapper>
                <LoginBox>
                    <Input placeholder="账户" ref={(input)=>{this.account=input}}/> ref取到一个dom的节点
                    <Input placeholder="密码" type="password" ref={(input)=>{this.password=input}} />
                    <Buttom onClick={()=>this.props.login(this.account,this.password)}>登录</Buttom>
                </LoginBox>
            </LoginWrapper>


                <Conntent dangerouslySetInnerHTML={{__html:this.props.content}}/> 将对象中的html元素强行展示成dom


loadable.js

import React from 'react';
import Loadable from 'react-loadable'; 这组件为了让单页面不直接加载所有的子页面 而是一个个加载

const LoadableComponent = Loadable({
  loader: () => import('./detail.js'), 需要这个组件的子页面
  loading: ()=>{
      return <div>加载中</div>
  }
});

export default ()=><LoadableComponent/>

import {withRouter} from "react-router-dom" 子页面
componentDidMount(){
        this.props.getInDetail(this.props.match.params.id); 这里的params需要是route才能获得
    }
export default connect(mapState,mapDispatch)(withRouter(Detail));  这里能让这个组件有loadable参与后也能获得router所有的参数内容




style.js
import styled from 'styled-components'; styled-components 用这种写法增加style和dom元素

export const NavSeacth = styled.input.attrs({
    placeholder: '搜索'
})`
width:160px;
height:38px;
padding:0 35px 0 20px;
margin-top:9px;
margin-left:20px;
box-sizing:border-box;
border:none;
outline:none;
border-radius:19px;
background:#eee;
font-size:14px;
color:#666;
&::placeholder{
    color:#999;
}
&.focused{  同级写法
    width:300px;
}
&.slide-enter{ 下面都是cssTransition的写法

transition:all .2s ease-out;
}
&.slide-enter-active{
width:300px;
}
&.slide-exit{
transition:all .2s ease-out;
}
&.slide-exit-active{
width:160px;
}`

background:url(${(props)=>props.imgurl}); styled中也可以传递参数 要在子组件中写入参数state


actioncreators.js

import axios from 'axios'; 用于接收api后端json
import * as constans from "./constans" 用于防止写错type而无报错
import {fromJS} from 'immutable' 将对象转换成这个immutable

const changehomedatar=(data)=>({
    type:constans.CHANGE_HOME_DATA,
     topicList:data.topicList,
   articleList:data.articleList,
 recommendList:data.recommendList
})
const addHomeList=(data,page)=>({ 传递的对象action 也写在这里面
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

export const getInDetail=(id)=>{
    return (dispatch)=>{
        axios.get("/api/detail.json?id="+id).then((res)=>{ 这id要在app中进行：id更改 子页面也要传递过来id
            const data =res.data.data;
            dispatch(changeDtail(data.title,data.content))
        })
    }
}

list.toJS(); 将数组变成js  immutable到js
    list :fromJS(data) 或转换成fromjs  js到immutable


store 子index ：

import reducer from './reducer';
import * as actioncreators from './actioncreators'
import * as constans from './constans'

export  {reducer,actioncreators,constans};
用于整合store内容


reducer：
import {fromJS} from 'immutable';
import * as constans from "./constans"

const defaltState=fromJS({
    topicList:[{
        id:1,
        titie:"社会热点",
        imgUrl:"https://www.purplesoftware.jp/products/seishun_f/img/product/storyb-bg.jpg"
    }

export default (state=defaltState,action)=>{
    switch(action.type){
        case constans.CHANGE_HOME_DATA:
           return state.merge({
                topicList:fromJS(action.topicList),
                articlelist:fromJS(action.articleList),
                recommendList:fromJS(action.recommendList)
            })
        case constans.ADD_HOME_LIST:
            return state.merge({ 更改多时的写法             return state.set('list',action.data).set('totalpage',action.totalpage) 单个写法
                articlelist:state.get('articlelist').concat(action.list),
                aticpage:action.nextpage
            })
        default:
            return state;
    }
}


This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
