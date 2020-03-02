import React from "react"
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import LoginForm from './pages/Login'
import Headers from './components/Header'
import Main from './pages/Main'
import History from './pages/History'
import Order from './pages/Order'
import Menus from './pages/Menu'
import Categories from './pages/category'
import Account from './pages/Account'
import { connect } from "react-redux"

 class App extends React.Component {
  render() {
      return (
          <BrowserRouter>
            {this.props.auth.data.token && <Headers {...this.props} />}
              <Switch>
                  <Route path="/login" render={(props) => (<LoginForm {...props} />)} />
                  <Route path="/history" render={(props) => {
                      return this.props.auth.data.role === 1 ? (<History {...props} />) : (<Redirect to="/order" />)
                  }} />
                  <Route path="/menu" render={(props) => {
                      return this.props.auth.data.role === 1 ? (<Menus {...props} />) : (<Redirect to="/order" />)
                  }} />
                  <Route path="/category" render={(props) => {
                      return this.props.auth.data.role === 1 ? (<Categories {...props} />) : (<Redirect to="/order" />)
                  }} />
                  <Route path="/account" render={(props) => {
                      return this.props.auth.data.role === 1 ? (<Account {...props} />) : (<Redirect to="/order" />)
                  }} />
                  <Route path="/" exact render={(props) => (<Main {...props} />)} /> 
                  <Route path="/order" render={(props) => {
                      return this.props.auth.data.token ? (<Order {...props} />) : (<Redirect to="/login" />)
                  }} />
    
              </Switch>
          </BrowserRouter>
      )
  }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(App)