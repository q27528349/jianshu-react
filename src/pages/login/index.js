import React,{Component} from 'react';
import {connect} from 'react-redux';
import {LoginWrapper,LoginBox,Input,Buttom} from './style'
import {actionCreators} from './store'
import {Redirect} from "react-router-dom"
class Login extends Component{

    render(){
        const {loginstate} =this.props;
        if(!loginstate){
        return(
            
            <LoginWrapper>
                <LoginBox>
                    <Input placeholder="账户" ref={(input)=>{this.account=input}}/>
                    <Input placeholder="密码" type="password" ref={(input)=>{this.password=input}} />
                    <Buttom onClick={()=>this.props.login(this.account,this.password)}>登录</Buttom>
                </LoginBox>
            </LoginWrapper>
            
        )
        }else{
            return <Redirect to='/'/> 
        }

    }
   
} 
const mapState=(state)=>({
    loginstate:state.getIn(["login","login"])
})

const mapDispatch=(dispatch)=>({
    login(accel,passel){
       dispatch(actionCreators.login(accel.value,passel.value))

    }

})
export default connect(mapState,mapDispatch)(Login);