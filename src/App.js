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
        <Route path="/detail/:id" exact component={Detail}></Route>
      </div>
      </BrowserRouter>
      </Provider>
  )
}
}

export default App;
