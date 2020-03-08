import React from 'react'
import {
    Icon, Table, Grid, GridColumn, Form,
    GridRow, Segment, Header, Modal, Button, Dropdown,
} from 'semantic-ui-react'
import axios from 'axios'
import Moment from 'moment'
import Editaccount from '../components/Editaccount'
import { connect } from 'react-redux'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { toasting } from '../helper'

class Account extends React.Component {
    componentDidMount() {
        this.getAllAccount()
    }
    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })
    closeedit = () => this.setState({ openedit: false })
    closedelete = () => this.setState({ openDelete: false })

    state = {
        dataAccount: [],
        open: false,
        openedit: false,
        openDelete: false,
        fillAccount: {},
        exitsAccount: {},
        limit: 6,
        offset: 0,
        URLimage: {},
        pictures: {},
        password: ''
    }

    getAllAccount = () => {
        axios.get(`${process.env.REACT_APP_HOST}/user/`)
            .then(res => {
                if (res.status === 200) {
                    this.props.setDataUser(res.data.data.result)
                    this.props.setUserPage(res.data.data)
                }
            })
    }
    handleImage = (event) => {
        this.setState({
            URLimage: URL.createObjectURL(event.target.files[0]),
            pictures: event.target.files[0]
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
    handleRole = (value) => {
        this.setState({ role: value })
    }
    handleSubmitAccount = (event) => {
        event.preventDefault()
        if (!this.state.username || !this.state.name ||
            !this.state.role || !this.state.password) {
            toasting('Cannot Submit', 'All Must Fill !!', 'error')
        }
        else {
            const body = new FormData()
            body.append('username', this.state.username)
            body.append('password', this.state.password)
            body.append('name', this.state.name)
            body.append('role', this.state.role)
            body.append('pictures', this.state.pictures)
            axios.post(`${process.env.REACT_APP_HOST}/user/registration`, body)
                .then(res => {
                    if (res.status === 200) {
                        this.getAllAccount()
                        toasting('Done', 'Data Success Submit')
                        this.setState({ open: false, pictures: {} })
                    }
                })
                .catch((error) => {
                    console.log(error);
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
    handleImageUpdate = (value) => {
        let inputImage = value.target.files[0]
        this.setState({
            fillAccount: {
                ...this.state.fillAccount,
                pictures: inputImage,
                URLimage: URL.createObjectURL(inputImage),
            }
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
    handleUpdateSubmit = (event, id_user) => {
        event.preventDefault()
        if (this.state.username === '' || this.state.name === '' ||
            this.state.role === '' || this.state.password === '') {
            toasting('Cannot Submit', 'All Must Fill !!', 'error')
        } else {
            const body = new FormData()     
            body.append('username', this.state.fillAccount.username)
            body.append('password',this.state.fillAccount.password)
            body.append('name',this.state.fillAccount.name)
            body.append('role',this.state.fillAccount.role)
            body.append('pictures', this.state.fillAccount.pictures)
            axios.put(`${process.env.REACT_APP_HOST}/user/edituser/${id_user}`, body)
                .then(res => {
                    if (res.status === 200) {
                        this.getAllAccount()
                        toasting('Done', 'Data Success Submit')
                        this.setState({ openedit: false })

                    }
                })
                .catch(() => {
                    toasting('Cannot Submit', 'check your data !!', 'error')
                })
        }

    }
    handleDeleteModal = (event, data) => {
        event.preventDefault()
        this.setState({
            exitsAccount: data,
            openDelete: true
        })
    }
    handleDeleteAccount = (event, id_user) => {
        event.preventDefault()
        axios.delete(`${process.env.REACT_APP_HOST}/user/${id_user}`)
            .then(res => {
                if (res.status === 200) {
                    this.getAllAccount()
                    try {
                        toasting('Done', 'Data Success Delete')
                        this.setState({ openDelete: false })
                    } catch (error) {
                        toasting('Cannot Delete', 'check your data !!', 'error')
                    }
                }
            })
    }
    getPage = async (event, { limit, offset }) => {
        event.preventDefault()
        await this.setState((prevState, currentState) => {
            return {
                ...prevState,
                limit: limit || prevState.limit,
                offset: offset || 0
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

    handlePageUser = (event, value) => {
        const offset = (value.activepage * this.state.limit) - this.state.limit
        event.preventDefault()
        this.getPage(event, { offset })
    }

    render() {
        const { open, size, openedit, openDelete } = this.state
        const roleOptions = [
            { key: 1, text: 'Administrator', value: 1 },
            { key: 2, text: 'Cashier', value: 2 },
        ]
        const selectAccount = this.state.exitsAccount
        return (
            <Grid padded centered>
                <div style={{ 'zIndex': 2000, 'position': 'absolute' }}>
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
                                            <div style={{ textAlign: 'center' }}>
                                                <img src={!this.state.pictures.name ? require('../public/assets/Images/defaultphoto.png') : this.state.URLimage}
                                                    style={{ height: 180, width: 180, borderRadius: 180 }} alt='upload images' />
                                            </div>
                                            <label>Profile pictures</label>
                                            <input type='file' name='filename' onChange={(event) => this.handleImage(event)} />
                                        </Form.Field>
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
                                    <Button negative onClick={this.close}>Cancel</Button>
                                    <Button
                                        positive
                                        icon='checkmark'
                                        labelPosition='right'
                                        content='Submit'
                                        onClick={(event) => this.handleSubmitAccount(event)}
                                    />
                                </Modal.Actions>
                            </Modal>


                            <Modal size={'mini'} open={openDelete} onClose={this.closedelete} style={{ textAlign: 'center' }}>
                                <Modal.Header>Are you sure delete this Account ?</Modal.Header>
                                <Modal.Content>
                                    {selectAccount.pictures ?
                                        <img src={`${process.env.REACT_APP_HOST}` + '/' + selectAccount.pictures} alt=''
                                            style={{ height: 100, width: 100, borderRadius: 100 }} /> :
                                        <img src={require('../public/assets/Images/defaultphoto.png')} alt=''
                                            style={{ height: 100, width: 100, borderRadius: 100 }} />}
                                    <h3 class="ui header"> {this.state.exitsAccount.name}
                                    </h3>

                                    <div class="sub header">Account Role
                                    <h3 class="ui header"> {this.state.exitsAccount.role === 2 ?
                                            'Cashier' : this.state.exitsAccount.role === 1 ? 'Administrator' : "Customer"}
                                        </h3>
                                    </div>
                                </Modal.Content>

                                <Modal.Actions>
                                    <Button negative onClick={this.closedelete}>No</Button>
                                    <Button
                                        positive
                                        icon='checkmark'
                                        labelPosition='right'
                                        content='Yes'
                                        onClick={(event) => this.handleDeleteAccount(event, this.state.exitsAccount.id_user)}
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
                                    handleImageUpdate={this.handleImageUpdate}
                                />
                                {this.props.getUser.dataAccount.map((item, index) => {
                                    return (
                                        <Table.Row textAlign='center'>
                                            <Table.Cell>{item.name}</Table.Cell>
                                            <Table.Cell>{item.username}</Table.Cell>
                                            <Table.Cell>{item.role === 2 ? "Cashier" : "Administrator"}</Table.Cell>
                                            <Table.Cell textAlign='center'>{Moment(item.create_date).format('DD/MM/YYYY')}</Table.Cell>
                                            <Table.Cell textAlign='center'>{Moment(item.update_date).format('DD/MM/YYYY')}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                <Button primary size='mini' onClick={(event) => {
                                                    this.handleEditAccount(event, item)
                                                }} >Edit</Button>
                                                <Button negative size='mini' onClick={(event) => {
                                                    this.handleDeleteModal(event, item)
                                                }}>Delete</Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                            <Table.Footer>
                            </Table.Footer>
                        </Table>
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        getUser: state.getUser,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    setDataUser: payload => dispatch({
        type: 'GET_USER_ALL',
        payload
    }),
    setUserPage: payload => dispatch({
        type: 'GET_TOTAL_USER_PAGE',
        payload
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)