import React, { Component } from 'react';
import { Image, StyleSheet, Text,  View } from 'react-native';
import { firebase } from '@react-native-firebase/auth';

export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        this.setState({currentUser: firebase.auth().currentUser});
    }

    render() {
        if (this.state.currentUser)
            return (
                <View style={style.layout}>
                    <Image
                        style={style.profilePicture}
                        source={{uri: this.state.currentUser.photoURL}}
                    >

                    </Image>
                    <Text
                        style={style.profileName}
                    >{this.state.currentUser.displayName}</Text>
                    <Text
                        style={style.emailText}
                    >{this.state.currentUser.email}</Text>
                </View>
            )
        else
            return false;
    }
}

const profileSize = 150;

const style = StyleSheet.create({
    emailText: {
        fontFamily: 'Roboto-Light',
        fontSize: 20
    },
    layout: {
        alignItems: 'center',
        borderColor:'black',
        borderWidth: 5,
        height: '100%',
        justifyContent: 'space-around',
        width: '100%',
    },
    profileName: {
        fontFamily: 'Roboto-Light',
        fontSize: 25
    },
    profilePicture: {
        borderRadius: profileSize/2,
        height: profileSize,
        width: profileSize
    }
});

