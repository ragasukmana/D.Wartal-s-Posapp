import React from 'react'
import {  Icon, Table, Grid, GridColumn, Form,
    GridRow, Segment, Header, Modal, Button, Dropdown, Pagination } from 'semantic-ui-react'
import axios from 'axios'
import Moment from 'moment'
import Editaccount from '../components/Editaccount'
import {connect} from 'react-redux'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { toasting } from '../helper'

class Account extends React.Component {
    componentDidMount() {
        this.getAllAccount()
    }
    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })
    closeedit = () => this.setState({ openedit: false })

    state={
        dataAccount: [],
        open: false,
        openedit: false,
        fillAccount:{},
        limit: 6,
        offset:0
    }
    
    getAllAccount = () => {
        axios.get(`${process.env.REACT_APP_HOST}/user/`)
        .then(res => {
            if (res.status === 200){
                this.props.setDataUser(res.data.data.result)
                this.props.setUserPage(res.data.data)
            }
        })
    }
    handleInputUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleInputName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleRole = (value) =>{
        this.setState({ role: value })
    }

    handleSubmitAccount = (event) => {
        event.preventDefault()
        if(this.state.username==='' || this.state.password ===undefined || this.state.name===undefined || 
        this.state.role === undefined){
            toasting('Cannot Submit', 'All Must Fill !!', 'error')
        }
        else{
            const body = {
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                role: this.state.role
            }
            axios.post(`${process.env.REACT_APP_HOST}/user/registration`, body)
            .then(res => {
                if(res.status === 200){
                    this.getAllAccount()
                    toasting('Done', 'Data Success Submit')
                }
            })
            .catch(err => {
                toasting('Cannot Submit', 'check usename or password !!', 'error')
            })
        }
    }
    handleEditAccount = (event, data) => {
        event.preventDefault()
        this.setState({
            fillAccount: data,
            openedit: true
        })
    }
    handleUsernameUpdate = (value) => {
        this.setState({
            fillAccount: {
                ...this.state.fillAccount,
                username: value
            }
        })
    }
    handleUpdatePassword = (value) => {
        this.setState({
            fillAccount: {
                ...this.state.fillAccount,
                password: value
            }
        })
    }
    handleEditName = (value) => {
        this.setState({
            fillAccount: {
                ...this.state.fillAccount,
                name: value
            }
        })
    }
    handleUpdateRole = (value) => {
        this.setState({
            fillAccount: {
                ...this.state.fillAccount,
                role: value
            }
        })
    }
    handleUpdateSubmit = (event, id_user)=> {
        event.preventDefault()
        if(this.state.username==='' || this.state.name==='' || 
        this.state.role === '' || this.state.password===''){
            toasting('Cannot Submit', 'All Must Fill !!', 'error')
        }else{
            const body = {
            username: this.state.fillAccount.username,
            password: this.state.fillAccount.password,
            name: this.state.fillAccount.name,
            role: this.state.fillAccount.role
        }
            axios.put(`${process.env.REACT_APP_HOST}/user/edituser/${id_user}`, body)
            .then(res => {
            if(res.status === 200){
                this.getAllAccount()
                toasting('Done', 'Data Success Submit')
                        
            }
                })
                .catch(err => {
                    toasting('Cannot Submit', 'check your data !!', 'error')
                })
        }
        
    }
    handleDeleteAccount = (event, id_user) => {
        event.preventDefault()
        axios.delete(`${process.env.REACT_APP_HOST}/user/${id_user}`)
        .then(res => {
            if(res.status === 200){
                this.getAllAccount()
                try {
                    toasting('Done', 'Data Success Delete')
                } catch (error) {
                    
                }
            }
        })
    }
    getPage = async(event, {limit, offset}) => {
        event.preventDefault()
        await this.setState((prevState, currentState) => {
            return {
                ...prevState,
                limit:limit || prevState.limit,
                offset:offset || 0
            }
        })
        await axios.get(`${process.env.REACT_APP_HOST}/user/`)
        .then(res => {
            this.setState({
                TotalPage: res.data.data.totalPage
            })
            this.props.setDataUser(res.data.data.result)
        })
    }

    handlePageUser=(event, value) => {
        const offset = (value.activepage * this.state.limit) - this.state.limit
        event.preventDefault()
        this.getPage(event, {offset})
    }

    render(){ 
        const { open, size, openedit} = this.state
        const roleOptions = [
            { key: 1, text: 'Administrator', value: 1 },
            { key: 2, text: 'Cashier', value: 2 },
          ]
        
        return(
            <Grid padded centered>
                <div style={{'zIndex': 2000, 'display': 'fixed'}}>
                <SemanticToastContainer position="top-right" />
                </div>
                <GridRow>
                    <GridColumn width={2}>
                        <Segment.Group>
                            <Segment textAlign='center'>
                                <Header as='h3'>New Account</Header>
                            </Segment>
                            <Segment textAlign='center' onClick={this.show('mini')} >
                                <Icon name='circle add' size='large' color='green' />
                            </Segment>
                            <Modal size={size} open={open} onClose={this.close}>
                                <Modal.Header>Registration Account</Modal.Header>
                                <Modal.Content>
                                    <Form>
                                        <Form.Field>
                                            <label>Username</label>
                                            <input placeholder='Username'
                                                onChange={(event) => this.handleInputUsername(event)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Password</label>
                                            <input placeholder='Password' type='password'
                                                onChange={(event) => this.handleInputPassword(event)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Name Account</label>
                                            <input placeholder='Name account'
                                                onChange={(event) => this.handleInputName(event)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Role</label>
                                            <Dropdown placeholder='Role' search selection
                                                options={roleOptions}
                                                onChange={(event, { value }) => this.handleRole(value)} />
                                        </Form.Field>
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button negative onClick={this.close} >Cancel</Button>
                                    <Button
                                    positive
                                    icon='checkmark'
                                    labelPosition='right'
                                    content='Submit'
                                    onClick={(event) => this.handleSubmitAccount(event)}
                                    />
                                </Modal.Actions>
                                </Modal>
                        </Segment.Group>
                    </GridColumn>
                    <GridColumn width={14}>
                        <Table celled centered>
                            <Table.Header>
                                <Table.Row textAlign='center'>
                                    <Table.HeaderCell width={4}>Name</Table.HeaderCell>
                                    <Table.HeaderCell >Username</Table.HeaderCell>
                                    <Table.HeaderCell >Role</Table.HeaderCell>
                                    <Table.HeaderCell >Date Add</Table.HeaderCell>
                                    <Table.HeaderCell >Date Update</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Editaccount
                                 size={'tiny'}
                                 open={openedit}
                                 closeedit={this.closeedit}
                                 data={this.state.fillAccount}
                                 handleUpdateUsername={this.handleUsernameUpdate}
                                 roleOptions={roleOptions}
                                 handlePasswordUpdate={this.handleUpdatePassword}
                                 handleNameEdit={this.handleEditName}
                                 handleRoleUpdate={this.handleUpdateRole}
                                 handleUpdateSubmit={this.handleUpdateSubmit}
                                />
                                {this.props.getUser.dataAccount.map((item, index) => {
                                    return(
                                <Table.Row textAlign='center'> 
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.username}</Table.Cell>
                                    <Table.Cell>{item.role == "2" ? "Cashier" : "Administrator"}</Table.Cell>
                                    <Table.Cell textAlign='center'>{Moment(item.create_date).format('DD/MM/YYYY')}</Table.Cell>
                                    <Table.Cell textAlign='center'>{Moment(item.update_date).format('DD/MM/YYYY')}</Table.Cell>
                                    <Table.Cell textAlign='center'>
                                         <Button primary size='mini' onClick={(event) => {
                                             this.handleEditAccount(event, item)
                                         }} >Edit</Button>
                                         <Button negative size='mini' onClick={(event) => {
                                             this.handleDeleteAccount(event, item.id_user)
                                         }}>Delete</Button>
                                    </Table.Cell>
                                </Table.Row>
                                    )
                                })}
                            </Table.Body>
                            <Table.Footer>
                            </Table.Footer>
                        </Table>
                        <Pagination
                            boundaryRange={0}
                            defaultActivePage={1}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={this.state.TotalPage}
                            onPageChange={this.handlePageUser}
                            />
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return{
        getUser: state.getUser,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    setDataUser : payload => dispatch ({
        type: 'GET_USER_ALL',
        payload
    }),
    setUserPage: payload => dispatch ({
        type: 'GET_TOTAL_USER_PAGE',
        payload
    })
})




export default connect(mapStateToProps, mapDispatchToProps)(Account)