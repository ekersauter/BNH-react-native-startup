import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultLayout from './Layout'


export default class CustomComponents extends Component{
    static propTypes = {
        dataArray: React.PropTypes.array.isRequired,
        selectedOption:React.PropTypes.number.isRequired,
        getSelectedOption:React.PropTypes.func.isRequired,
    };
    static defaultProps = {
        selectedOption:1

    };
    constructor(props){
    super(props)
    this.state = {
        selectedOption:this.props.selectedOption,
    }
}
_changeIcon(index){
    this.setState({selectedOption: index})
    this.props.getSelectedOption(index)
}
    render(){
        return(
            <this.props.getCustomLayout onChange={this._changeIcon.bind(this)}
                            dataArray={this.props.dataArray}
                           selectedOption={this.state.selectedOption}

                           />
        );
    }
}