import React, { Component } from 'react'
import { SearchInfoList, SearchInfoItem, SearchInfoSwtich, SearchInfoTitie, SearchInfo, HeaderWrapper, Logo, Nav, NavItem, NavSeacth, Addtion, Button, SearchWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux';
import { actionCreators } from "./store"
import {Link } from "react-router-dom"
import {actionCreators as loginactionCreators} from "../../pages/login/store"

class Header extends Component {

  getlistarea() {
    const { focused, list, page, mouseIn, totalpage, } = this.props;
    const pagelist = [];
    const newlist = list.toJS();
    if(newlist.length){
    for (let i = (page - 1) * 10 ; i < page * 10&&i<newlist.length; i++) {
      console.log(i)
      pagelist.push(
        <SearchInfoItem key={newlist[i]}>{newlist[i]}</SearchInfoItem>

      )
    }
  }
    if (focused || mouseIn) {
      return (
        <SearchInfo onMouseEnter={this.props.handlemoustenter}
          onMouseLeave={this.props.handlemouseleave}>
          <SearchInfoTitie>热门搜索
            <SearchInfoSwtich onClick={() => this.props.handlechange(page, totalpage)}>换一换</SearchInfoSwtich>
          </SearchInfoTitie>
          <SearchInfoList>
            {
              pagelist
            }
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null;
    }
  }
  render() {
    const { focused, list, page, mouseIn, totalpage ,login,loginout} = this.props;

    return (
      
      <HeaderWrapper>
        <Link to="/">
        <Logo  />
        </Link>
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载APP</NavItem>
          {
          login? <NavItem onClick={loginout} className="right">退出</NavItem>: 
          <Link to="/login"><NavItem className="right">登录</NavItem></Link>
          }
          <NavItem className="right">Aa</NavItem>
          <SearchWrapper>
            <CSSTransition
              in={this.props.focused}
              timeout={200}
              classNames='slide'>
              <NavSeacth className={this.props.focused ? 'focused' : ''}
                onFocus={()=>this.props.onhandleInputfocese(list)}
                onBlur={this.props.handleInputBlur}
              ></NavSeacth>
            </CSSTransition>
            {this.getlistarea(this.props.focused)}
          </SearchWrapper>
        </Nav>
        <Addtion>
          <Link to="/write"><Button className="writting">写文章</Button></Link>
          <Button className="reg">注册</Button>
        </Addtion>
      </HeaderWrapper>
    )
  }
}





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
    onhandleInputfocese(list) {

      const aciton1 = actionCreators.getlist()
      const action = actionCreators.seachfocus()
      dispatch(action)
      if(list.size===0){
      dispatch(aciton1)
      }

    },
    handlemoustenter() {
      dispatch(actionCreators.mouseEnter());
    },
    handlemouseleave() {
      dispatch(actionCreators.mouseleave());

    },
    handlechange(page, totalpage) {
      if (page < totalpage) {
        dispatch(actionCreators.changepage(page + 1));
      } else {
        dispatch(actionCreators.changepage(1));

      }

    },
    loginout(){
      dispatch(loginactionCreators.loginout())
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps)(Header);