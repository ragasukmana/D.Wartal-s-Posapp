import React from 'react'
import { withRouter} from 'react-router-dom'
import {
    Segment,
    Card,
    Icon,
    Grid,
    Header,
    Button,
    Input,
    Menu,
    CardContent,
    Dropdown,
    Responsive,
    Pagination
} from 'semantic-ui-react'
import axios from 'axios'
import {connect} from 'react-redux'
import '../components/Header'
import Modalinvoice from '../components/ModalInvoice'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { toasting } from '../helper'

class Order extends React.Component {

    componentDidMount() {
        this.GetListOrder()
    }
    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })
    state = {
        cart: [],
        order: [],
        grandTotal: 0,
        name_product: '',
        limit: 6,
        offset: 0,
        sortby: '',
        category: '',
        open: false,
        checkListOut:{}
    }

    GetListOrder = () => {
        axios.get(`${process.env.REACT_APP_HOST}/products?limit=${this.state.limit}&offset=${this.state.offset}&category=${this.state.category}`)
            .then(res => {
                if (res.status === 200) {
                    this.props.setDataProduct(res.data.data.result)
                    this.props.setDataTotalPage(res.data.data.TotalPage)
                }
            })
    }
    increaseOrder = (id, price) => {
        this.setState({
            order: this.state.order.map((order) => (order.id === id ?
                { ...order, quantity: order.quantity + 1, totalPrice: price * (order.quantity + 1) } : order)),
            grandTotal: this.state.grandTotal + parseInt(price)
        })

    }
    decreaseOrder = (id, price) => {
        this.setState({
            order: this.state.order.map((order) => (order.id === id ?
                { ...order, quantity: order.quantity - 1, totalPrice: price * (order.quantity - 1) } : order)),
            grandTotal: this.state.grandTotal - parseInt(price)
        })

    }
    onSelectProduct = (event, data) => {
        let checkProduct = []
        if (this.state.cart.length === 0) {
            this.setState({
                cart: [...this.state.cart, data],
                order: [...this.state.order, {
                    id: data.id,
                    name_product: data.name_product,
                    price: data.price,
                    quantity: 1,
                    totalPrice: data.price * 1
                }],
                grandTotal: this.state.grandTotal + parseInt(data.price)
            })
        } else {
            this.state.cart.map((item) => {
                if (item.id === data.id) {
                    checkProduct.push('1')
                }
            })
            if (checkProduct.length === 0) {
                this.setState({
                    cart: [...this.state.cart, data],
                    order: [...this.state.order, {
                        id: data.id,
                        name_product: data.name_product,
                        price: data.price,
                        quantity: 1,
                        totalPrice: data.price * 1

                    }],
                    grandTotal: this.state.grandTotal + parseInt(data.price)
                }, () => {

                })
            } else {

            }
        }
    }
    deleteListCart = (id) => {
        let totalPrice = 0
        this.state.order.map((order, index) => {
            if (order.id === id) {
                totalPrice = order.totalPrice
            }
        })
        let cartForDelete = this.state.cart.filter((data) => {
            return data.id !== id
        })
        let orderForDelete = this.state.order.filter((data) => {
            return data.id !== id

        })
        this.setState({
            cart: cartForDelete,
            order: orderForDelete,
            grandTotal: (this.state.grandTotal - parseInt(totalPrice)) || 0
        });
    }

    cancelListCart = () => {
        this.setState({
            cart: [],
            order: [],
            grandTotal: 0
        })
    }

    onCheckOut = async (event) => {
        this.setState({
            open: true
        })
        const body = {
            user_id: this.props.auth.data.id_user,
            order: this.state.order
        }
        await axios.post(`${process.env.REACT_APP_HOST}/order/`, body)
        .then(
            res => {
                if (res.status === 200) {
                    toasting('Done', 'Order Already Set')
                    this.setState({ cart: [],
                        order: [],
                        grandTotal: 0,
                        checkListOut: res.data.data
                    })
                }else{
                    
                }
            })
            .catch(err => {
				
			})

    }
    onSearch = async (event, { name_product,limit,offset,sortby,category}) => {
        event.preventDefault()
        await this.setState((prevState, currentState) => {
            return {
                ...prevState,
                name_product: name_product || prevState.name_product,
                sortby: sortby || prevState.sortby,
                category: category || prevState.category,
                limit: limit || prevState.limit,
                offset: offset|| 0
                
            }
        })
        if (name_product !== '') {
        await axios.get(`${process.env.REACT_APP_HOST}/products?name_product=${this.state.name_product}&limit=${this.state.limit}&offset=${this.state.offset}&sortby=${this.state.sortby}&category=${this.state.category}`)
                .then(res => {
                    this.setState({
                        TotalPage: res.data.data.TotalPage
                    })
                    this.props.setDataProduct(res.data.data.result)
                })
        } else {
            await axios.get(`${process.env.REACT_APP_HOST}/products?`)
                .then(res => {
                    this.props.setDataProduct(res.data.data.result)
                })
        }
    }
    handlePageProduct = (event, value) => {
    const offset = (value.activePage * this.state.limit) - this.state.limit
    event.preventDefault()
    this.onSearch(event, {offset})
    }

    render() {
        const { open } = this.state
        return (
            <Grid>
            <div style={{'zIndex': 2000, 'display': 'fixed'}}>
            <SemanticToastContainer position="top-right" />
             </div>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Menu compact icon='labeled' vertical>
                            <Menu.Item name='Manu' >
                                <Icon name='book' />
                                List Menu
                        </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment.Group>
                            <Responsive as={Segment}>
                                <Menu secondary>
                                    <Menu.Item> Sorting By :</Menu.Item>
                                    <Menu.Item name='Newest'
                                        onClick={(event) => this.onSearch(event, {sortby: 'dateadd DESC'})} />
                                    <Dropdown item text='Name'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={(event) => this.onSearch(event, {sortby:'name_product ASC'})}>Name(A-Z)</Dropdown.Item>
                                            <Dropdown.Item onClick={(event) => this.onSearch(event, {sortby: 'name_product DESC'})}>Name(Z-A)</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown item text='Price'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={(event) => this.onSearch(event, {sortby: 'price DESC'})}>Price Higher</Dropdown.Item>
                                            <Dropdown.Item onClick={(event) => this.onSearch(event, {sortby: 'price ASC'})}>Price Lower</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown item text='Category'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={(event) => this.onSearch(event, {category:'1'})}>Food</Dropdown.Item>
                                            <Dropdown.Item onClick={(event) => this.onSearch(event, {category: '2'})}>Drink</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Menu.Menu position='right'>
                                        <Menu.Item>
                                            <Responsive>
                                                <Input icon='search' placeholder='Search...' onChange={(event) => this.onSearch(event, { name_product: event.target.value })} />
                                            </Responsive>
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu>
                            </Responsive>
                            <Segment>
                                <div style={{
                                    display: 'flex', flexWrap: 'wrap',
                                    justifyContent: 'space-evenly', alignSelf: 'auto'
                                }}>
                                    {this.props.getProduct.dataProduct.map((item, index) => {
                                        return (
                                            <div style={{ marginBottom: 20 }}>
                                                <Card onClick={(event) => this.onSelectProduct(event, item)}>
                                                    <img alt="" height={200} src={`${process.env.REACT_APP_HOST}` + '/' + `${item.image}`} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>{item.name_product}</Card.Header>
                                                        <Card.Description> Price : Rp.{item.price}
                                                        </Card.Description>
                                                    </Card.Content>
                                                </Card>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Segment>
                        </Segment.Group>
                        <Button.Group>
                        <Pagination
                            boundaryRange={0}
                            defaultActivePage={1}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={this.state.TotalPage}
                            onPageChange={this.handlePageProduct}
                        />
                        </Button.Group>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Segment.Group>
                            <Segment>
                                <Header as='h2' textAlign='center'>List Cart</Header>
                            </Segment>
                            <Segment>
                                <Card.Group>
                                    {this.state.order.map((item, index) => {
                                        return (
                                            <Card fluid color='red'>
                                                <CardContent>
                                                    <div>
                                                        <Header as='h3' textAlign='center'>{item.name_product}  Rp.{item.price}</Header>
                                                    </div>
                                                    <center>
                                                        <div style={{ float: 'center', marginTop: 8 }}>
                                                            <Button.Group size='mini'>
                                                                <Button id={item.id} 
                                                                onClick={(event) => this.increaseOrder(item.id, item.price)} >
                                                                    <Icon name='add' />
                                                                    Add
                                                                </Button>
                                                                <Button> {item.quantity} </Button>
                                                                <Button id={item.id} disabled={item.quantity === 1}
                                                                    onClick={(event) => this.decreaseOrder(item.id, item.price)}>
                                                                    <Icon name='minus' /> Min
                                                                </Button>
                                                                <Button id={item.id} onClick={(event) => { this.deleteListCart(item.id) }}>
                                                                    <Icon name='trash alternate outline' />
                                                                </Button>
                                                            </Button.Group>
                                                        </div>
                                                    </center>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </Card.Group>
                            </Segment>
                            <Segment> <Header as='h3'> Total : Rp. {this.state.grandTotal + (this.state.grandTotal * 0.1)} </Header>
                                <p>Total include tax 10%</p>
                                <Modalinvoice
                                  size={'tiny'}
                                  open={open}
                                  close={this.close}
                                  cashier={this.props.auth.data.name}
                                  receipt={this.state.checkListOut}
                                /> 
                                <Button 
                                onClick={(event) => {this.onCheckOut(event)}}
                                 primary animated='vertical' attached='top'>
                                    <Button.Content hidden>
                                        <Icon name='shop' />
                                    </Button.Content>
                                    <Button.Content visible>
                                        Check Out
                                    </Button.Content>
                                </Button>
                                <Button color='red' animated='vertical' attached='bottom' onClick={() => this.cancelListCart()}>         
                                    <Button.Content hidden>
                                        <Icon name='cancel' />
                                    </Button.Content>
                                    <Button.Content visible>
                                        Cancel
                                    </Button.Content>       
                                </Button>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        getProduct: state.getProduct,
        auth: state.auth,
        checkOut: state.checkOut
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
    setCheckOut: payload => dispatch ({
        type: 'CHECKOUT_FULLFILLED',
        payload
    })
    
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order))