import React from 'react'
import {
    Button, Modal, Grid, Header, GridRow, GridColumn
} from 'semantic-ui-react'


function Modalinvoice(props) {

    return(
        <Modal size={props.size} open={props.open} onClose={props.close}>
        <Modal.Header >
         <Grid columns={2}>
             <GridRow>
                 <GridColumn>
                    <Header as='h2' textAlign='Right'> Check Out </Header>
                 </GridColumn>
                 <GridColumn>
                    <Header as='h4' textAlign='center'>Receipt Number # {props.receipt.order_reff}</Header>
                 </GridColumn>
             </GridRow>
         </Grid>
         </Modal.Header>
        <Modal.Content>
            <Grid columns>
                <GridRow>
                    <GridColumn>
                        <Header as='h4' textAlign='left'> Cashier: {props.cashier}</Header>
                    </GridColumn>
                </GridRow>
            </Grid>
            {(props.receipt.orders || []).map((item, index) => {
                return(
            <Grid columns={2}>
                <GridRow>
                    <GridColumn>
                <Header as='h5' textAlign='left'> {item.name_product}</Header>
                        <p> Quantity: {item.quantity} </p>
                    </GridColumn>
                    <GridColumn>
                        <Header as='h5' textAlign='right'>Rp. {item.price * item.quantity}  </Header>
                    </GridColumn>
                </GridRow>
            </Grid>
                )
            })}
        </Modal.Content>
        <Modal.Actions>
            <GridColumn>
                <Header textAlign='left'>Total Rp. {props.receipt.total} </Header>
                    <Header as='h4' textAlign='left'>Tax: {props.receipt.total *0.1} </Header>
            </GridColumn>
            <Button
                positive
                icon='checkmark'
                labelPosition='right'
                content='Ok'
                onClick={props.close}
            />
        </Modal.Actions>
    </Modal>
    )
}

export default Modalinvoice