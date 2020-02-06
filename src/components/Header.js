import React from 'react'
import { withRouter, Link} from 'react-router-dom'
import { Button, 
    Popup, 
    Grid, 
    Header
} from 'semantic-ui-react'

class Headers extends React.Component {

    state = {
        collapsed:false,
        userdata: []
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    handleLogout = (event) => {
        try {
            localStorage.removeItem('dataAccount')
            this.props.history.push('/login') //login again
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
            <div className="ui huge menu">
                <a className="item" href="/order">
                <img alt ="" src="/images/wartallogo.png" style={{height:50, width:70}} />
                 D. Wartal's
                </a>
                <Link to="/order" className="item brown item"> 
                    Order
                </Link>
                <Link to="/Menu" className="item brown item"> 
                    Menu
                </Link>
                <div className="right menu">
                    <div className="item">
                    <Popup position='top right' trigger={<i className="big brown user circle icon" style={{margin:0}}/>} flowing hoverable>
                        <Grid centered divided columns={1}>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Sign Out</Header>
                            <Button onClick={(event) => {this.handleLogout(event)}}>Here</Button>
                        </Grid.Column>
                        </Grid>
                    </Popup>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Headers)