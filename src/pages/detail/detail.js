import React,{Component} from 'react';
import {DetailWrapper,Header,Conntent} from './style'
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom"
import * as actionCreators from './store/actionCreators'

class Detail extends Component{

    render(){
        console.log(this.props)
        return(
            <DetailWrapper>
                <Header>疫情，让我认识到了老婆原来是个农村人</Header>
                <Conntent dangerouslySetInnerHTML={{__html:this.props.content}}/>
                </DetailWrapper>
        )

    }
    componentDidMount(){
        this.props.getInDetail(this.props.match.params.id);
    }
} 
const mapState=(state)=>({
    title:state.getIn(['detail','title']),
    content:state.getIn(['detail','content'])

})
const mapDispatch=(dispatch)=>({
    getInDetail(id){
        dispatch(actionCreators.getInDetail(id))
    }

})
export default connect(mapState,mapDispatch)(withRouter(Detail));