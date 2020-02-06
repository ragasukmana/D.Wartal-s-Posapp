import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react'
import './css/login.css'
import { withRouter, Link } from 'react-router-dom'
import qs from 'qs'
import {requestLogin} from '../public/redux/actions/auth'
import {connect} from 'react-redux'
import axios from 'axios'
 

class LoginForm extends React.Component {
  componentDidMount() {
    console.log("Ini komponen didmount");
  }
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
      alert("Username and Password must be filled")
    } else {
      // this.props.dispatch(requestLogin(data, this.props.data.auth.token)) //get data
       //validasi
       axios.post('http://127.0.0.1:3003/user/login', qs.stringify(data))
       .then(response => {
         if(response.status === 200){
              this.props.setDataLogin(response.data.data)
              this.props.history.push('/order')
         }else{
            console.log("err");
         }
         
       })
      .catch(err => {
        console.log(err);
        
      })
  }
}
  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='brown' textAlign='center'>
            <Image src='/images/wartallogo.png' className="logo" /> Login Your Account Here
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
          <Message floating>
              Don't Have Account ? Please <Link to="/registration" color='brown'> Sign Up </Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
     auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  setDataLogin: payload => dispatch ({
    type: 'POST_LOGIN_FULFILLED',
    payload
  })
})


export default  connect(mapStateToProps, mapDispatchToProps)(LoginForm)