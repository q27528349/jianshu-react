import React,{PureComponent} from 'react';
import {RecommenWrapper,RecommenItem} from '../style'
import {connect} from "react-redux";

class Recommen extends PureComponent{
    render(){
        const {list} =this.props;
        return(
            <RecommenWrapper>
               {
                   list.map((item)=>{
                       return (
                        <RecommenItem key={item.get("id")} imgurl={item.get("imgUrl")}/>
                       )
                   })
               }
            </RecommenWrapper>
        )

    }
} 
const mapState=(state)=>({
    list:state.getIn(["home","recommendList"])
})
export default connect(mapState,null)(Recommen);