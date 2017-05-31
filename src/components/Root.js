import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/App.sass'
import reducer from '../reducer'
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import Home from './Home'
import Nav from './Navbar'
import Foot from './Footer'
import { Layout } from 'antd'
import ArticleRoute from './article/ArticleRoute'


const { Footer, Content } = Layout
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'



const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    thunk
  )
)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router
          basename='/'  
        >
          <Layout>
            <Nav />
            <Content className='container'>
              <Route exact path='/home' component={Home}/>
              <Route path='/passage' component={ArticleRoute} />           
            </Content>  
            <Footer>
              <Foot />
            </Footer>
          </Layout>         
        </Router> 
      </Provider>
    );
  }
}

export default Root;
