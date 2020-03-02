import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Icon, Button, Menu, Table, Grid, GridColumn,
    GridRow, Segment, Header, Modal, Form, Dropdown,
    Pagination
} from 'semantic-ui-react'
import axios from 'axios'
import Editproduct from '../components/Editproduct'
import Moment from 'moment'
import {connect} from 'react-redux'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { toasting } from '../helper'

class Menus extends React.Component {
    componentDidMount() {
        this.getAllMenu()
        this.getAllCategory()
    }
    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })
    closeedit = () => this.setState({ openedit: false })

    state = {
        dataProduct: [],
        limit: 6,
        offset: 0,
        sortby: '',
        open: false,
        openedit: false,
        dataCategory: [],
        fillProduct: {}
    }
    getAllMenu = () => {
        axios.get(`${process.env.REACT_APP_HOST}/products?limit=${this.state.limit}&offset=${this.state.offset}`)
            .then(res => {
                if (res.status === 200) {
                    this.props.setDataProduct(res.data.data.result) 
                    this.props.setDataTotalPage(res.data.data.TotalPage)
                }
            })
            .catch(err => {

            })
    }
    getAllCategory = () => {
        axios.get(`${process.env.REACT_APP_HOST}/category/`)
            .then(res => {
                if (res.status === 200) {
                    this.props.setDataCategory(res.data.data.result)
                }
            })
            .catch(err => {

            })
    }
    onHandleEditProduct = (event, data) => {
        event.preventDefault()
        this.setState({
            fillProduct: data,
            openedit: true
        })
    }
    handleInputNameProduct = (event) => {
        this.setState({
            name_product: event.target.value
        })
    }
    handleDescriptionProduct = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handlePrice = (event) => {
        this.setState({
            price: event.target.value
        })
    }

    handleCategory = (value) => {
        this.setState({ category: value })
    }

    handleImage = (event) => {
        let inputImage = event.target.files[0]
        this.setState({
            image: inputImage
        })
        
    }

    handleSubmitProduct = (event) => {
        event.preventDefault()
        if (this.state.description===''||
        this.state.image===undefined || this.state.price===''){
            toasting('Cannot Submit', 'All must fill','error')
        }
        else {
            const body = new FormData()
            body.append('name_product', this.state.name_product)
            body.append('description', this.state.description)
            body.append('image', this.state.image)
            body.append('category', this.state.category)
            body.append('price', this.state.price)
            axios.post(`${process.env.REACT_APP_HOST}/products`, body)
                .then(res => {
                    if (res.status === 200) {
                    toasting('Done', 'Data Success Submit')
                    this.getAllMenu()
                    }
                })
                .catch(err =>{
                    toasting('Forbidden', 'Invalid file format/size !!!', 'error')
                })
        }
    }
    handleNameUpdate = (value) => {
        this.setState({
            fillProduct: {
                ...this.state.fillProduct,
                name_product: value
            }
        })
    }
    handleImageUpdate = (event) => {
        let inputImage = event.target.files[0]
        this.setState({
            fillProduct: {
                ...this.state.fillProduct,
                image: inputImage
            }
        })
        
    }

    handleCategoryUpdate = (value) => {
        this.setState({
            fillProduct: {
                ...this.state.fillProduct,
                category: value
            }
        })
    }

    handleEditDescription = (value) => {
        this.setState({
            fillProduct: {
                ...this.state.fillProduct,
                description: value
            }
        })
    }

    handlePriceUpdate = (value) => {
        this.setState({
            fillProduct: {
                ...this.state.fillProduct,
                price: value
            }
        })
    }
    handleUpdateSubmit = (event, id) => {
        event.preventDefault()
        const body = new FormData()
        body.append('name_product', this.state.fillProduct.name_product)
        body.append('description', this.state.fillProduct.description)
        body.append('image', this.state.fillProduct.image)
        body.append('category', this.state.fillProduct.category)
        body.append('price', this.state.fillProduct.price)
        axios.put(`${process.env.REACT_APP_HOST}/products/${id}`, body)
            .then(res => {
                if (res.status === 200) {
                    toasting('Done', 'Data Success Submit')
                    // this.props.setDataProduct(res.data.data.result)
                }
            })
            .catch(err => {
                toasting('Forbidden', 'Invalid Format/size', 'error')
            })
    }
    handleDeleteProduct = (event, id) => {
        event.preventDefault()
        axios.delete(`${process.env.REACT_APP_HOST}/products/${id}`)
        .then(res => {
            if(res.status === 200){
                this.getAllMenu()
                try {
                    toasting('Done', 'Success Delete')
                } catch (error) {
                    
                }
            }
        })
    }
    getPage = async(event, {limit, offset, sortby}) =>{
        event.preventDefault()
        await this.setState((prevState, currentState) => {
            return {
                ...prevState,
                sortby:sortby || prevState.sortby,
                limit:limit || prevState.limit,
                offset: offset || 0
            }
        })
        await axios.get(`${process.env.REACT_APP_HOST}/products?limit=${this.state.limit}&offset=${this.state.offset}&sortby=${this.state.sortby}`)
        .then(res => {
            this.setState ({
                TotalPage: res.data.data.TotalPage
            })
            this.props.setDataProduct(res.data.data.result)
        })
    }
    handlePageProduct = (event, value) => {
        const offset = (value.activePage * this.state.limit) - this.state.limit
        event.preventDefault()
        this.getPage(event, {offset})

    }
    render() {
        const { open, size, openedit } = this.state
        const categoryOption = this.props.getCategory.dataCategory.map(item => {
            return {
                key: item.id,
                text: item.name,
                value: item.id
            }
        })
        
      return (
            <Grid padded centered>
                <div style={{'zIndex': 2000, position: 'fixed'}}>
                <SemanticToastContainer position="top-right" />
                </div>
                <GridRow>
                    <GridColumn width={2}>
                        <Segment.Group>
                            <Segment textAlign='center'>
                                <Header as='h3'>Menu</Header>
                            </Segment>
                            <Segment textAlign='center' onClick={this.show('tiny')}>
                                <Icon name='circle add' size='large' color='green' />
                            </Segment>
                            <Modal size={size} open={open} onClose={this.close}>
                                <Modal.Header >Add Menu</Modal.Header>
                                <Modal.Content>
                                    <Form>
                                        <Form.Field>
                                            <label>Name</label>
                                            <input placeholder='Name menu'
                                                onChange={(event) => this.handleInputNameProduct(event)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Description</label>
                                            <textarea placeholder='Input here description'
                                                onChange={(event) => this.handleDescriptionProduct(event)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Image</label>
                                            <input type="file" name="filename"
                                                onChange={(event) => this.handleImage(event)}></input>
                                            <p>max file size 500 Kb and format (.jpg/.png/.jpeg)</p>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Category</label>
                                            <Dropdown placeholder='Category' search selection
                                                options={categoryOption}
                                                onChange={(event, { value }) => this.handleCategory(value)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Price</label>
                                            <input placeholder='Price'
                                                onChange={(event) => this.handlePrice(event)} />
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
                                        onClick={(event) => this.handleSubmitProduct(event)}
                                    />
                                </Modal.Actions>
                            </Modal>
                        </Segment.Group>
                    </GridColumn>
                    <GridColumn width={14}>
                        <Table celled sortable>
                            <Table.Header>
                                <Table.Row textAlign='center'>
                                    <Table.HeaderCell>Image</Table.HeaderCell>
                                    <Table.HeaderCell
                                    onClick={(event) => this.getPage(event, {sortby:'name_product ASC'})}
                                    >Name</Table.HeaderCell>
                                    <Table.HeaderCell width={5}>Description</Table.HeaderCell>
                                    <Table.HeaderCell
                                    onClick={(event) => this.getPage(event, {sortby:'price ASC'})}>Price</Table.HeaderCell>
                                    <Table.HeaderCell width={1}>Category</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Action</Table.HeaderCell>
                                    <Table.HeaderCell 
                                    onClick={(event) => this.getPage(event, {sortby:'dateadd DESC'})}>
                                    Date Add</Table.HeaderCell>
                                    <Table.HeaderCell
                                    onClick={(event) => this.getPage(event, {sortby:'dateupdate DESC'})} 
                                    >Date Update</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Editproduct
                                    size={'tiny'}
                                    open={openedit}
                                    handleEditDescription={this.handleEditDescription}
                                    handleNameUpdate={this.handleNameUpdate}
                                    handleImageUpdate={this.handleImageUpdate}
                                    handleCategoryUpdate={this.handleCategoryUpdate}
                                    handlePriceUpdate={this.handlePriceUpdate}
                                    categoryOption={categoryOption}
                                    data={this.state.fillProduct}
                                    selected={this.state.fillProduct.category}
                                    closeedit={this.closeedit}
                                    handleUpdated={this.handleUpdateSubmit}
                                />
                                {this.props.getProduct.dataProduct.map((item, index) => {
                                    return (
                                        <Table.Row textAlign='center'>
                                            <Table.Cell>
                                                <img alt="" height={100} width={100}
                                                    src={`http://localhost:3003/` + `${item.image}`} />
                                            </Table.Cell>
                                            <Table.Cell>{item.name_product}</Table.Cell>
                                            <Table.Cell>{item.description}</Table.Cell>
                                            <Table.Cell>{item.price}</Table.Cell>
                                            <Table.Cell>{item.name_category}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                <Button primary size='mini' onClick={(event) => {
                                                    this.onHandleEditProduct(event, item)
                                                }}>Edit</Button>
                                                <Button negative size='mini' onClick={(event) => {
                                                    this.handleDeleteProduct(event, item.id)
                                                }}>Delete</Button>
                                            </Table.Cell>
                                            <Table.Cell>{Moment(item.dateadd).format('DD/MM/YYYY')}</Table.Cell>
                                            <Table.Cell>{Moment(item.dateupdate).format('DD/MM/YYYY')}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                        <Pagination
                            boundaryRange={0}
                            defaultActivePage={1}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={this.props.getProduct.TotalPage}
                            onPageChange={this.handlePageProduct}
                                />
                    </GridColumn>
                </GridRow>
            </Grid>
        )
    }
}
const mapStateToProps = state => {
    return {
        getProduct: state.getProduct,
        auth: state.auth,
        getCategory: state.getCategory
    }
}
const mapDispatchToProps = dispatch => ({
    setDataProduct: payload => dispatch ({
        type: 'GET_PRODUCT_SHOW',
        payload
    }),
    setDataTotalPage: payload => dispatch ({
        type: 'GET_TOTAL_PRODUCT',
        payload
    }),
    setDataCategory: payload => dispatch ({
        type: 'GET_CATEGORY_ALL',
        payload
    })
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menus))