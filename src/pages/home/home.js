import React,{PureComponent} from 'react';
import {HomeWrapper,HomeLeft,HomeRight,BackTop} from './style'
import  Topic from './componen/Topic';
import  List from './componen/List';
import  Recommen from './componen/Recommen';
import  Writer from './componen/Writer';
import axios from 'axios';
import {connect} from "react-redux";
import {actioncreators} from "./store"
import { act } from 'react-dom/test-utils';

class Home extends PureComponent{
    
    render(){
        return(
            <HomeWrapper id="">
                <HomeLeft>
                    <img className="banner-img" src="https://www.purplesoftware.jp/products/seishun_f/img/product/storyb-bg.jpg"/>
                    <Topic/>
                    <List/>
                </HomeLeft>
                <HomeRight>
                    <Recommen/>
                    <Writer/>
                </HomeRight>
             <BackTop href="#">回到顶部</BackTop>
             {console.log(this.scrolltops())}
                </HomeWrapper>
        )

    }
    componentDidMount(){
        this.props.changehomedata();
        window.addEventListener("scroll",this.scrolltops)
    }
    scrolltops(){
        const scroll=document.documentElement.scrollTop;
       

    }

} 
const mapDispatch=(dispatch)=>({
    changehomedata(){
       const action =actioncreators.gethomeinfo();
       dispatch(action);
        
    }
})

export default connect(null,mapDispatch)(Home);