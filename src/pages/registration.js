import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Message
} from 'semantic-ui-react'
import './css/login.css'
import axios from 'axios'
import qs from 'qs'
import { withRouter, Link } from 'react-router-dom'

class Registration extends React.Component {

      constructor(props) {
        super(props)
        this.state = {
          username: '',
          password: '',
          name:''
        }
      }
      
      handleinputusername = (event) => {
        let localusername = event.target.value
        this.setState({
          username: localusername
        })
      }
      handleinputpassword = (event) => {
        let localpassword = event.target.value
        this.setState({
          password: localpassword
        })
      
      }
      handleinputname = (event) => {
        let localname = event.target.value
        this.setState({
          name: localname
        })
      }
    
      handleSubmitSignup = (event) => {
        event.preventDefault()
        const data = {
          username: this.state.username,
          password: this.state.password,
          name: this.state.name
        }
        if (this.state.username==="" || this.state.password === "" || this.state.name ===""){
          alert("All requirement must be filled")
        }
        
        else{
          const body = qs.stringify(data)
          axios.post('http://127.0.0.1:3003/user/registration', body)
          .then(res => {
            if(res.status === 200) {
                try {
                    alert("Registration Success")
                    localStorage.setItem('dataSignup', JSON.stringify(res.data.data))
                    this.props.history.push('/login')
                } catch (err) {
                }
            }
          })
          .catch(err => {
          })
        }
      }
    render(){
      // console.log(this.state.password);
      // console.log(this.state.username);
      
      
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='brown' textAlign='center'>
            <Image src='/images/wartallogo.png' className="logo" /> Registration
           </Header>
          <Form size='large'>
            <Segment raised color='orange'>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                onChange={(event) => this.handleinputusername(event)} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(event) => this.handleinputpassword(event)} />
             <Form.Input fluid icon='user' iconPosition='left' placeholder='Name'
                onChange={(event) => this.handleinputname(event)} />
              <Button color='brown' fluid size='large'
                onClick={(event) => this.handleSubmitSignup(event)}>
                Submit </Button>
            </Segment>
          </Form>
          <Message floating>
              Have Account ? Here To <Link to="/login" color='brown'> Login </Link>
          </Message>
        </Grid.Column>
      </Grid>
        )
    }
}

export default withRouter(Registration)