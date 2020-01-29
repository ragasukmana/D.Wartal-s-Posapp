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

export default class App extends React.Component {
  state = {
      isLogin: true,
      isSignup: true
  }
  componentDidMount() {
      const data = JSON.parse(localStorage.getItem('dataAccount'))
      if(!data) {
          this.setState({ isLogin: false})
      }
  }
  render() {
      return (
          <BrowserRouter>
            {this.state.isLogin && <Headers {...this.props} />}
            {this.state.isLogin && <Order {...this.props} />}
              <Switch>
                  <Route path="/login" render={(props) => (<LoginForm {...props} />)} />
                  <Route path="/registration" render={(props) => (<Registration {...props} />)} />
                  <Route path="/" exact render={(props) => (<Main {...props} />)} /> 
              </Switch>
          </BrowserRouter>
      )
  }
}