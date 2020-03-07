import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {
    Button,
    Popup,
    Grid,
    Header,
    Dropdown
} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Headers extends React.Component {

    state = {
        collapsed: false,
        data: []
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    handleLogout = (event) => {
        try {
            this.props.setDataLogout()
            this.props.history.push('/login') //login again
        } catch (err) {
        }
    }
    render() {
        return (
            <div className="ui huge menu">
                <a className="item" href="/order">
                    <img alt="" src="/images/wartallogo.png" style={{ height: 50, width: 70 }} />
                    D. Wartal's
                </a>
                <Link to="/order" className="item brown item">Order</Link>
                {this.props.auth.data.role === 1 ? <Dropdown item text='Admin Panel'>
                    <Dropdown.Menu>
                        <Link to="/Menu" className="item brown item"> Manage Menu </Link>
                        <Link to="/category" className="item brown item"> Manage Category </Link>
                        <Link to="/account" className="item brown item"> Manage Account </Link>
                        <Link to="/history" className="item brown item"> History Data </Link>
                    </Dropdown.Menu>
                </Dropdown> : null}
                <div className="right menu">
                        <div className="item">
                            <div>{this.props.auth.data.name}</div>
                        </div>
                    <div className="item">
                        <Popup position='top right' trigger={<i className="big brown user circle icon" style={{ margin: 0 }} />} flowing hoverable>
                            <Grid centered divided columns={1}>
                                <Grid.Column textAlign='center'>
                                    <Header as='h4'>Sign Out</Header>
                                    <Button onClick={(event) => { this.handleLogout(event) }}>Here</Button>
                                </Grid.Column>
                            </Grid>
                        </Popup>
                    </div>
                </div>
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
    setDataLogout: payload => dispatch({
        type: 'POST_LOGOUT',
        payload
    })
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Headers))