import React from "react"
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom"
import LoginForm from './pages/Login'
import Headers from './components/Header'
import Main from './pages/Main'
import Registration from './pages/registration'
import Order from './pages/Order'
import Menus from './pages/Menu'
import { connect } from "react-redux"

 class App extends React.Component {
  render() {
      return (
          <BrowserRouter>
            {this.props.auth.data.token && <Headers {...this.props} />}
              <Switch>
                  <Route path="/login" render={(props) => (<LoginForm {...props} />)} />
                  <Route path="/registration" render={(props) => (<Registration {...props} />)} />
                  <Route path="/" exact render={(props) => (<Main {...props} />)} /> 
                  <Route path="/order" exact render={(props) => (<Order {...props} />)} /> 
                  <Route path="/menu" exact render={(props) => (<Menus {...props} />)} /> 
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