import React from 'react'
import {  Icon, Menu, Table, Grid, GridColumn, Form,
    GridRow, Segment, Header, Modal, Button, Pagination} from 'semantic-ui-react'
import axios from 'axios'
import Moment from 'moment'
import Editcategory from '../components/Editcategory'
import {connect} from 'react-redux'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { toasting } from '../helper'

class Categories extends React.Component {
    componentDidMount() {
        this.getAllCategory()
    }
    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })
    closeedit = () => this.setState({ openedit: false })

    state={
        dataCategory: [],
        open: false,
        fillCategory: {},
        openedit: false,
        limit: 6,
        offset:0
    }
    
    getAllCategory = () => {
        axios.get(`${process.env.REACT_APP_HOST}/category/`)
        .then(res => {
            if (res.status === 200){
                this.props.setDataCategory(res.data.data.result)
                this.props.setDataPageCategory(res.data.data.totalPage)
            }
        })
    }
    handleAddCategory = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleSubmitCategory = (event) => {
        event.preventDefault()
        if(this.state.name ===undefined){
            toasting('Cannot Submit','Data Must Fill!!', 'error')
        }
        else{
            const body = {
                name: this.state.name
            }
            axios.post(`${process.env.REACT_APP_HOST}/category`, body)
            .then(res => {
                if(res.status === 200){
                    try {
                        this.getAllCategory()
                        toasting('Done', 'Data Success Delete')
                    } catch (error) {
                        
                    }
                }
            })
        }
    }
    handleEditCategory = (event, data) => {
        event.preventDefault()
        this.setState({
            fillCategory: data,
            openedit: true
        })
    }
    handleUpdateName = (value) => {
        this.setState({
            fillCategory: {
                ...this.state.fillCategory,
                name: value
            }
        })
    }
    handleSubmitUpdate = (event, id) => {
        event.preventDefault()
        const body = {
            name: this.state.fillCategory.name
        }
        axios.put(`${process.env.REACT_APP_HOST}/category/${id}`, body)
        .then(res => {
            if(res.status === 200){
                try {
                    toasting('Done', 'Data Success Submit')
                    this.getAllCategory()
                } catch (error) {
                    
                }
            }
        })
    }
    handleDeleteCategory = (event, id) => {
        event.preventDefault()
        axios.delete(`${process.env.REACT_APP_HOST}/category/${id}`)
        .then(res => {
            if(res.status === 200){
                this.getAllCategory()
                try {
                    toasting('Done', 'Data Success Delete')
                } catch (error) {
                    
                }
            }
        })
    }
    getPage = async(event, {limit, offset}) =>{
        event.preventDefault()
        await this.setState((prevState, currentState) => {
            return {
                ...prevState,
                limit:limit || prevState.limit,
                offset: offset || 0
            }
        })
        await axios.get(`${process.env.REACT_APP_HOST}/category/`)
        .then(res => {
            this.setState ({
                TotalPage: res.data.data.totalPage
            })
            this.props.setDataCategory(res.data.data.result)
        })
    }


    handlePageCategory=(event, value) => {
        const offset = (value.activepage * this.state.limit) - this.state.limit
        event.preventDefault()
        this.getPage(event, {offset})
    }

    render(){ 
        const { open, size, openedit} = this.state
        
        return(
            <Grid padded centered>
                <div style={{'zIndex': 2000, 'display': 'fixed'}}>
                <SemanticToastContainer position="top-right" />
                </div>
                <GridRow>
                    <GridColumn width={2}>
                        <Segment.Group>
                            <Segment textAlign='center'>
                                <Header as='h3'>Category</Header>
                            </Segment>
                            <Segment textAlign='center' onClick={this.show('mini')} >
                                <Icon name='circle add' size='large' color='green' />
                            </Segment>
                            <Modal size={size} open={open} onClose={this.close}>
                                <Modal.Header>Add Category</Modal.Header>
                                <Modal.Content>
                                    <Form>
                                        <Form.Field>
                                            <label>Name Category</label>
                                            <input placeholder='Name Category'
                                                onChange={(event) => this.handleAddCategory(event)} />
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
                                    onClick={(event) => this.handleSubmitCategory(event)}
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
                                    <Table.HeaderCell >Date Add</Table.HeaderCell>
                                    <Table.HeaderCell >Date Update</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Editcategory
                                    size={'mini'}
                                    open={openedit}
                                    data={this.state.fillCategory}
                                    closeedit={this.closeedit}
                                    handleUpdateName={this.handleUpdateName}
                                    handleSubmitUpdate={this.handleSubmitUpdate}
                                />
                                {this.props.getCategory.dataCategory.map((item, index) => {
                                    return(
                                <Table.Row > 
                                    <Table.Cell textAlign='center'>{item.name}</Table.Cell>
                                    <Table.Cell textAlign='center'>{Moment(item.dateadd).format('DD/MM/YYYY')}</Table.Cell>
                                    <Table.Cell textAlign='center'>{Moment(item.dateupdate).format('DD/MM/YYYY')}</Table.Cell>
                                    <Table.Cell textAlign='center'>
                                         <Button primary size='mini' onClick={(event) => {
                                             this.handleEditCategory(event, item)
                                         }} >Edit</Button>
                                         <Button negative size='mini' onClick={(event) => {
                                             this.handleDeleteCategory(event, item.id)
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
                            onPageChange={this.handlePageCategory}
                            />
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        getCategory: state.getCategory,
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => ({
    setDataCategory: payload => dispatch ({
        type: 'GET_CATEGORY_ALL',
        payload
    }),
    setDataPageCategory: payload => dispatch ({
        type: 'GET_CATEGORY_PAGE',
        payload
    })
})


export default connect(mapStateToProps, mapDispatchToProps)(Categories)