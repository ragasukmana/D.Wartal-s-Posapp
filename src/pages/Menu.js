import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Icon, Button, Menu, Table, Grid, GridColumn,
    GridRow, Segment, Header, Modal
} from 'semantic-ui-react'
import axios from 'axios'
import addMenuModal from '../components/AddMenuModal'

class Menus extends React.Component {
    componentDidMount() {
        this.getAllMenu()
    }
    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    state = {
        dataProduct: [],
        limit: 6,
        offset: 0,
        TotalPage: 0,
        open: false
    }

    getAllMenu = () => {
        axios.get('http://127.0.0.1:3003/products?')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ dataProduct: res.data.data.result })
                    console.log(res.data.data.result);
                }
            })
            .catch(err => {

            })
    }
    render() {
        const { open, size } = this.state
        return (
            <Grid padded centered>
                <GridRow>
                    <GridColumn width={2}>
                        <Segment.Group>
                            <Segment textAlign='center'>
                                <Header as='h3'>Menu</Header>
                            </Segment>
                            <div>
                                <Segment textAlign='center' onClick={this.show('small')}>
                                    <Icon name='circle add' size='large' color='green' />
                                </Segment>
                                <Modal size={size} open={open} onClose={this.close}>
                                    <Modal.Header>Delete Your Account</Modal.Header>
                                    <Modal.Content>
                                        <p>Are you sure you want to delete your account</p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                            <Button negative onClick={this.close}> No</Button>
                                        <Button
                                            positive
                                            icon='checkmark'
                                            labelPosition='right'
                                            content='Yes'
                                            onClick={this.close}
                                        />
                                    </Modal.Actions>
                                </Modal>
                            </div>
                            <Segment textAlign='center'>
                                <Header as='h3'>Category</Header>
                            </Segment>
                            <Segment textAlign='center'>
                                <Icon name='circle add' size='large' color='green' />
                            </Segment>
                            <Segment textAlign='center'>
                                <Icon name='circle edit' size='large' color='orange' />
                            </Segment>
                            <Segment textAlign='center'>
                                <Icon name='delete' size='large' color='red' />
                            </Segment>
                        </Segment.Group>
                    </GridColumn>
                    <GridColumn width={14}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row textAlign='center'>
                                    <Table.HeaderCell>Image</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell width={5}>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell width={1}>Category</Table.HeaderCell>
                                    <Table.HeaderCell width={2}>Action</Table.HeaderCell>
                                    <Table.HeaderCell >Date Add</Table.HeaderCell>
                                    <Table.HeaderCell >Dade Update</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.state.dataProduct.map((item, index) => {
                                    return (
                                        <Table.Row textAlign='center'>
                                            <Table.Cell>
                                                <img alt="" height={100} width={100}
                                                    src={`http://localhost:3003/` + `${item.image}`} />
                                            </Table.Cell>
                                            <Table.Cell>{item.name}</Table.Cell>
                                            <Table.Cell>{item.description}</Table.Cell>
                                            <Table.Cell>{item.price}</Table.Cell>
                                            <Table.Cell>{item.name_category}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                <Button primary size='mini'>Edit</Button>
                                                <Button negative size='mini'>Delete</Button>
                                            </Table.Cell>
                                            <Table.Cell>{item.dateadd}</Table.Cell>
                                            <Table.Cell>{item.dateupdate}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='8'>
                                        <Menu floated='right' pagination>
                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron left' />
                                            </Menu.Item>
                                            <Menu.Item as='a'>1</Menu.Item>
                                            <Menu.Item as='a'>2</Menu.Item>
                                            <Menu.Item as='a'>3</Menu.Item>
                                            <Menu.Item as='a'>4</Menu.Item>
                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron right' />
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </GridColumn>
                    {/* <GridColumn width={2}>
                    </GridColumn> */}
                </GridRow>
            </Grid>
        )
    }

}




export default withRouter(Menus)