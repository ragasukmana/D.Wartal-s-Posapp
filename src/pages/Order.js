
import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Segment,
    Card,
    Icon,
    Grid,
    Header,
    Button,
    Input,
    Menu,
    CardContent
} from 'semantic-ui-react'
import axios from 'axios'

class Order extends React.Component {

    componentDidMount() {
        this.GetListOrder()
    }
    state = {
        dataProduct: [],
        cart: [],
        order: [],
        grandTotal: 0,
        name: [],
        input:""
    }
    
    GetListOrder = () => {
        axios.get('http://127.0.0.1:3003/products')
            .then(res => {
                this.setState({ dataProduct: res.data.data })
            })
            .catch(err => {

            })
    }

    increaseOrder = (event, price) => {
        this.setState({
            order: this.state.order.map((order) => (order.id == event.target.id ? 
                {...order, quantity: order.quantity + 1, totalPrice:price*(order.quantity+1)} : order)),
            grandTotal : this.state.grandTotal + parseInt(price)
        },()=>{
            // console.log(this.state.order);
            
        }) 
        
    }

    decreaseOrder = (event, price) => {
        this.setState({
            order: this.state.order.map((order)=>(order.id == event.target.id ? 
                {...order, quantity:order.quantity - 1, totalPrice:price*(order.quantity-1)} : order)),
            grandTotal : this.state.grandTotal - parseInt(price)

        })
        // console.log(this.decreaseOrder);
    }
    

    onSelectProduct = (event, data) => {
        let checkProduct = []
        if(this.state.cart.length === 0){
            this.setState({
                cart: [...this.state.cart, data],
                order: [...this.state.order, {
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    quantity: 1,
                    totalPrice: data.price*1
                }],
                grandTotal: this.state.grandTotal + parseInt(data.price)
            }, () => {
                // console.log(this.state.cart);
            })
        }else{
            this.state.cart.map((item, index) => {
                if(item.id === data.id){
                    checkProduct.push('1')
                }
            })
            if(checkProduct.length === 0){
                this.setState({
                    cart:[...this.state.cart, data],
                    order: [...this.state.order, {
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        quantity: 1,
                        totalPrice: data.price*1

                    }],
            grandTotal: this.state.grandTotal + parseInt(data.price)
                },()=>{
                    // console.log(this.state.cart, this.state.order);
                })
            }else{
                // console.log('item exits');
                
            }
        }
    }
    deleteListCart = (event) => {
        var totalPrice = 0
        this.state.order.map((order, index) => {
            if(order.id == event.target.id){
                totalPrice = order.totalPrice
                // console.log(totalPrice);
                
            }
        })
        let cartForDelete = this.state.cart.filter((data) => {
            return data.id != event.target.id
        })
        let orderForDelete = this.state.cart.filter((data) => {
            return data.id != event.target.id
            
        })
        this.setState({
            cart: cartForDelete,
            order: orderForDelete,
            // grandTotal: (this.state.grandTotal - parseInt(totalPrice))
            grandTotal: (this.state.grandTotal - parseInt(totalPrice)) || 0
        });
        // console.log(this.state.cartForDelete);
        
    }

    onCheckOut = async (event)  => {
        const body = {
            user_id: 43,
            order: this.state.order
        }
        console.log(body);
        await axios.post('http://127.0.0.1:3003/order/', body).then(
            res=>{
                this.setState({
                    cart:[],
                    order:[]
                })
            }) 
            .catch(console.log)
    }

    onSearch = async (event ,values) => {
        event.preventDefault()
        if(values !=='' ){
            await axios.get(`http://127.0.0.1:3003/products?name=${values}`)
            .then(res=>{
                this.setState((prevState, currentState) => {
                    return {
                        ...prevState,
                        dataProduct:[...res.data.data]
                    }
                })
            })
        } else {
            await axios.get(`http://127.0.0.1:3003/products?`)
            .then(res => {
                this.setState((prevState, currentState) => {
                    return{
                        ...prevState,
                        dataProduct:[...res.data.data]
                    }
                })
            })
        }
    }

    onSortByName = async(event, values) => {
        event.preventDefault()
        if(values !== ''){
            await axios.get(`http://127.0.0.1:3003/products?sortby=${values}`)
            .then(res => {
                this.setState((prevState, currentState) => {
                    return{
                        ...prevState,
                        dataProduct:[...res.data.data]
                    }
                })
            })
        }else{
            await axios.get(`http://127.0.0.1:3003/products?sortby=?`)
            .then(res => {
                this.setState((prevState, currentState) => {
                    return{
                        ...prevState,
                        dataProduct:[...res.data.data]
                    }
                })
            })
        }
    }
    onSortByPrice = async(event, values) => {
        event.preventDefault()
        if(values !== ''){
            await axios.get(`http://127.0.0.1:3003/products?price=${values}`)
            .then(res => {
                this.setState((prevState, currentState) => {
                    return{
                        ...prevState,
                        dataProduct:[...res.data.data]
                    }
                })
            })
        }else{
            await axios.get(`http://127.0.0.1:3003/products?price=?`)
            .then(res => {
                this.setState((prevState, currentState) => {
                    return{
                        ...prevState,
                        dataProduct:[...res.data.data]
                    }
                })
            })
        }
    }    
    render() {
        return (
            <Grid >
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Segment> Side Bar</Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment.Group>
                        <Segment>
                        <Menu secondary>
                            <div class="ui text menu">
                                <div class="header item">Sort By</div>
                                <a class="item" onClick={(event) => this.onSortByName(event,'name ASC')}>Name (A-Z)</a>
                                <a class="item" onClick={(event) => this.onSortByName(event,'name DESC')}>Name (Z-A)</a>
                                <a class="item" onClick={(event) => this.onSortByPrice(event,'price ASC')}>Price (Higher)</a>
                                <a class="item" onClick={(event) => this.onSortByPrice(event,'price DESC')}>Price (Lower)</a>
                            </div>
                            <Menu.Menu position='right'>
                                <Input icon='search' placeholder='Search Menu..' onChange={(event) => this.onSearch(event, event.target.value)}/> 
                            </Menu.Menu>
                        </Menu>
                        </Segment>
                        <Segment>
                            <div style={{
                                display: 'flex', flexWrap: 'wrap',
                                justifyContent: 'space-evenly', alignSelf: 'auto'
                            }}>
                                {this.state.dataProduct.map((item, index) => {
                                    return (
                                        <div style={{ marginBottom: 20 }}>
                                            <Card onClick={(event) => this.onSelectProduct(event, item)}>
                                                <img alt="" height={200} src={`http://localhost:3003/` + `${item.image}`} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header>{item.name}</Card.Header>
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
                    </Grid.Column>
                    <Grid.Column width={5}>
                    <Segment.Group>
                    <Segment>
                        <Header as='h2'textAlign='center'>List Cart</Header>
                    </Segment>
                    <Segment>
                        <Card.Group>
                            {this.state.order.map((item, index) => {
                                return(
                                    <Card fluid color='red'>
                                           <CardContent>
                                                <div>
                                                <Header as='h3' textAlign='center'>{item.name}  Rp.{item.price}</Header>
                                                </div>
                                                <center>
                                                <div style={{float:'center', marginTop: 8}}>
                                                <Button.Group size='mini'> 
                                                <Button id={item.id} onClick={(event) => this.increaseOrder(event, item.price)} >
                                                    <Icon name='add' />
                                                    Add
                                                </Button>
                                                <Button> {item.quantity} </Button>
                                                <Button id={item.id} disabled={item.quantity == 1 }
                                                onClick={(event) => this.decreaseOrder(event, item.price)}>
                                                    <Icon name='minus' /> Min
                                                </Button>
                                                <Button id={item.id} onClick={(event) => {this.deleteListCart(event)}}>
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
                    <Segment> <Header as='h3'>Total : Rp. {this.state.grandTotal + (this.state.grandTotal *0.1)} </Header>
                            <p>Total include tax 10%</p>
                    <Button onClick={(event) => {this.onCheckOut(event)}} primary animated='vertical' attached='top'>
                        <Button.Content hidden>
                                 <Icon name='shop'/>
                        </Button.Content>
                        <Button.Content visible>
                                Check Out
                        </Button.Content>
                    </Button>
                    <Button color='red' animated='vertical' attached='bottom'>
                        <Button.Content hidden>
                                 <Icon name='cancel'/>
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

export default withRouter(Order)