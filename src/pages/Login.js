import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react'
import qs from 'qs'
import { connect } from 'react-redux'
import axios from 'axios'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { toasting } from '../helper'


class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleusername = (event) => {
    let localusername = event.target.value
    this.setState({
      username: localusername
    })
  }
  handlepassword = (event) => {
    let localpassword = event.target.value
    this.setState({
      password: localpassword
    })
  }
  handlesubmitlogin = (event) => {
    event.preventDefault()
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    if (this.state.username === "" || this.state.password === "") {
        toasting('Forbidden', 'Please Input your accout', 'error')
    } else {
      axios.post(`${process.env.REACT_APP_HOST}/user/login`, qs.stringify(data))
        .then(response => {
          if (response.status === 200) {
            this.props.setDataLogin(response.data.data)
            this.props.history.push('/order')
          } else {
            
            console.log("err");
          }

        })
        .catch(err => {
          toasting('Failed Login', 'username or password invalid','error')
        })
    }
  }
  render() {
    return (
      <div>
        <div style={{width:280, paddingTop:80, position:'fixed', 
        marginLeft:250}}>
          <SemanticToastContainer position="top-right" />
        </div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='brown' textAlign='center'>
            <Image src='/images/wartallogo.png' className="logo" style={{height:170, width:230}}></Image>
              <p>Login Your Account</p>
           </Header>
          <Form size='large'>
            <Segment raised color='orange'>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                onChange={(event) => this.handleusername(event)} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(event) => this.handlepassword(event)} />
              <Button color='brown' fluid size='large'
                onClick={(event) => this.handlesubmitlogin(event)}>
                Login </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  setDataLogin: payload => dispatch({
    type: 'POST_LOGIN_FULFILLED',
    payload
  })
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)