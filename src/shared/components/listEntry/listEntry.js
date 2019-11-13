import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ListEntry extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.container}>
                <Image style={style.image} source={require('../../../../assets/emojis/beer.png')}></Image>
                <View style={style.text}>
                    <Text style={style.title}>{this.props.title}</Text>
                    <Text>{this.props.description}</Text>
                </View>
            </View>
        );
    }

}

ListEntry.propTypes = {
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 5,
        paddingTop: 5
    },
    image: {
        height: 60,
        width: 60,
    },
    text: {
        marginLeft: 10
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    }
}); 