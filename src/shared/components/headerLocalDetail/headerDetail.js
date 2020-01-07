import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

export default class DetailHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={style.header}>
                    <Text style={style.headerText}>{this.props.item.name}</Text>
                    <TouchableOpacity 
                        style={style.arrow}
                        onPress={() => this.props.goBack()}>
                        <FontAwesomeIcon
                            style={style.icon}
                            size={32}
                            icon={ faArrowLeft }/>
                    </TouchableOpacity>
                </View>);
    }
}

DetailHeader.propTypes = {
    goBack: PropTypes.func,
    item: PropTypes.object
}

const style= StyleSheet.create({
    arrow: {
        height: '100%',
        left: 0,
        paddingBottom:'auto',
        paddingTop: 'auto',
        position: 'absolute',
        top: 0,
        width: 64
    },
    header: {
        flexDirection: 'row'
    },
    headerText: {
        fontFamily: 'Lobster-Regular',
        fontSize: 32,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%'
    },
    icon: {
        marginBottom: 'auto',
        marginLeft: 10,
        marginTop: 'auto'
    }
});