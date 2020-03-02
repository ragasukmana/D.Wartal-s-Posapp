import React from 'react'
import { Table, Grid, GridColumn,GridRow, Segment, 
    SegmentGroup } from 'semantic-ui-react'
import axios from 'axios'
import Moment from 'moment'
import Chart from "react-apexcharts";

class History extends React.Component {
    componentDidMount() {
        this.getAllOrders()
        this.getAllOrdersDetails()
    }
    
    state={
     dataDetails:[],
     dataPost:[],
     options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ],
      total:0
    }
    
    getAllOrders = () => {
        axios.get(`${process.env.REACT_APP_HOST}/order/postorder?sortby=add_date DESC&limit=6`)
        .then(res => {
            if (res.status === 200){
                this.setState({ 
                    dataPost: res.data.data,
                })
                let sum = a => a.reduce((x, y) => x + y);
                let totalAmount = sum(this.state.dataPost.map(x => Number(x.total_price)));
                console.log(totalAmount);
                this.setState ({
                    total: totalAmount
                })
            }
            
        })
    }
    getAllOrdersDetails = () => {
        axios.get(`${process.env.REACT_APP_HOST}/order/`)
        .then(res => {
            if (res.status === 200){
                this.setState({ dataDetails: res.data.data })
            }
        })
    }
   
    render(){ 
        
        
        return(
            <div>
             <Grid columns='equal'>
                    <Grid.Row>
                    <Grid.Column width={5}/>
                    <Grid.Column>
                        <SegmentGroup>
                        <Segment textAlign='center'>Total Income</Segment>
                            <Segment textAlign='center'>Rp. {this.state.total}</Segment>
                        </SegmentGroup>
                    </Grid.Column>
                    <Grid.Column>
                        <SegmentGroup>
                        <Segment textAlign='center'>Total Order</Segment>
                            <Segment textAlign='center'>{this.state.dataDetails.length}</Segment>
                        </SegmentGroup>
                    </Grid.Column>
                    <Grid.Column width={5}/>
                    </Grid.Row>
                </Grid>
                <Grid>
                  <GridRow>
                      <GridColumn width={1}></GridColumn>
                      <GridColumn width={7} > 
                      <Segment>
                        <div className="app">
                        <div className="row">
                        <div className="mixed-chart">
                            <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="600"
                            
                            />
                        </div>
                        </div>
                    </div>
                    </Segment>
                    </GridColumn>
                    <GridColumn width={7}>
                    <Table padded>
                            <Table.Header>
                            <Table.HeaderCell colSpan='4' textAlign='left'>Recent Order</Table.HeaderCell>
                            <Table.Row textAlign='center'>
                                <Table.HeaderCell> Employee </Table.HeaderCell>
                                <Table.HeaderCell singleLine >Receipt Number</Table.HeaderCell>
                                <Table.HeaderCell singleLine> Total Price</Table.HeaderCell>
                                <Table.HeaderCell singleLine>Date Order</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            {this.state.dataPost.map((item, index) =>{
                                return(
                                <Table.Row textAlign='center' style={{height:64}}>
                                    <Table.Cell>{item.name_account} </Table.Cell>
                                    <Table.Cell singleLine> {item.order_reff} </Table.Cell>
                                    <Table.Cell>Rp. {item.total_price} </Table.Cell>
                                    <Table.Cell>{Moment (item.add_date).format('DD/MM/YYYY')} </Table.Cell>
                                </Table.Row>               
                                )
                            })}
                            </Table.Body>
                        </Table>       
                    </GridColumn>
                    <GridColumn width={1}></GridColumn>
                    </GridRow>
                </Grid>
            </div>
        )
    }
}

export default History