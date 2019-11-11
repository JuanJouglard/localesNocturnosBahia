import React, { Component } from 'react';
import { Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class Home extends Component {
    
    async componentDidMount(){
        const querySnapshot = await firestore()
                                    .collection('Locales')
                                    .get();
        console.log('Docs',querySnapshot.docs);
    }
    
    render() {
        return (<Text>Home works!</Text>)
    }
}