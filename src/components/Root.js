import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/App.sass'
import reducer from '../reducer'
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import App from './App'
import Nav from './Navbar'
import Foot from './Footer'
import { Layout } from 'antd'
import ListContainer from '../containers/ListContainer'
import Article from './article'

const { Footer, Content } = Layout
import {
  BrowserRouter as Router,
  Route,
  Redirect
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
          basename='/blog'
        >
          <Layout>
            <Nav />
            <Content className='container'>
              <Redirect exact from='/' to='/home' />
              <Route path='/home' component={App}/>
              <Route path='/list' component={ListContainer} />
              <Route path='/create' component={Article} />
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
