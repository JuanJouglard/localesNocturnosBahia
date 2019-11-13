import React, { Component } from 'react';
import { StyleSheet,FlatList, View } from 'react-native';
import { PlacesService } from '../../services.js/places';
import ListEntry from '../../../shared/components/listEntry/listEntry';

export default class Home extends Component {
    
    placesService;

    constructor(props){
        super(props);
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        this.placesService = PlacesService.getInstance();
        this.placesService.getPlaces().then(
            (places) => {
                this.setState({places: places.docs});
            }
        );
    }
    
    render() {
        return (
            <FlatList
                style={style.homeList}
                data={this.state.places}
                renderItem={this.listEntry}
                ItemSeparatorComponent={this.separator}
                keyExtractor={item => item.id}
            >   

            </FlatList>);
    }

    listEntry = ({item}) => {
        return <ListEntry
                    title={item.data().name}
                    description={item.data().address}
                    image=''
                ></ListEntry>
    }

    separator =() => {
        return (<View style={style.separator}></View>)
    }
}

const style = StyleSheet.create({
    homeList: {
        marginTop: 10,
    },
    separator: {
        borderColor:'black',
        borderWidth: 0.5,
        margin:10,
    }
});