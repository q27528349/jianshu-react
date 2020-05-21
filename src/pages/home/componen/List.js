import React, { PureComponent } from 'react';
import { ListItem, ListInfo,LoadMore } from '../style'
import { connect } from "react-redux";
import {actioncreators} from '../store'
import {Link} from 'react-router-dom';

class List extends PureComponent {

    render() {
        const{ list,getmorelist,page} =this.props; 
        return (
            <div>
            {
                list.map((item,index) => {
                    return (
                        <Link key={index} to={"./detail/" + item.get("id")} >
                        <ListItem >
                            <img className="pic"
                            src={item.get("imgUrl")}
                            alt="123"/>
                            <ListInfo>
                             <h3 className="title">{item.get("titie")}</h3>
                              <p className="desc">{item.get("desc")}</p>
                            </ListInfo>
                        </ListItem>
                        </Link>
                    )
                })
            }
            <LoadMore onClick={()=>getmorelist(page)}>更多文字</LoadMore>
            </div>
        )

    }

}
const mapState = (state) => ({
    list:state.getIn(["home", "articlelist"]),
    page:state.getIn(["home", "aticpage"])
})
const mapDispach=(dispatch)=>({
    getmorelist(page){
        dispatch(actioncreators.getMoreLists(page))

    }
})
export default connect(mapState, mapDispach)(List);