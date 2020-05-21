import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom"
class Write extends Component{

    render(){
        const {loginstate} =this.props;
        if(loginstate){
        return(
            <div>写文章</div>
        )
        }else{
            return <Redirect to='/login'/> 
        }

    }
   
} 
const mapState=(state)=>({
    loginstate:state.getIn(["login","login"])
})


export default connect(mapState,null)(Write);