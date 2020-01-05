import React, { Component } from "react";
import { Text } from "react-native";
import { PropTypes } from 'prop-types';

export default class LocalDetail extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(<Text>{this.props.navigation.getParam('itemId')}</Text>)
    }
}

LocalDetail.propTypes = {
    navigation: PropTypes.object.isRequired
}