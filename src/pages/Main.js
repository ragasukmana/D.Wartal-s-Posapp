import React from "react"
import {connect} from 'react-redux'

class Main extends React.Component{
    componentDidMount(){
        if(this.props.auth.data.token){
            this.props.history.push('/order')
        } else{
            this.props.history.push('/login')
        }
    }
    render() {
        return null
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect (mapStateToProps)(Main)