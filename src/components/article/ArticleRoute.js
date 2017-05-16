import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import ArticleListContainer from '../../containers/ListContainer'
import ArticleCreate from './ArticleCreate'
import ArticleView from './ArticleView'
import ArticleEdit from './ArticleEdit'

export default class ArticleRoute extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/passage/list' component={ArticleListContainer}/>
          <Route exact path='/passage/create' component={ArticleCreate}/>
          <Route exact path='/passage/:pid' component={ArticleView}/>
          <Route path='/passage/edit/:pid' component={ArticleEdit} />
        </Switch>       
      </div>
    )
  }
}