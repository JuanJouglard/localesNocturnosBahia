import React, { Component } from 'react';
import { StyleSheet,FlatList, View } from 'react-native';
import { PlacesService } from '../../services.js/places';
import ListEntry from '../../../shared/components/listEntry/listEntry';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as images from '../../../core/images/images';

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
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Local', {
                    item: item.data(),
                })}
            >
                <ListEntry
                    title={item.data().name}
                    description={item.data().address}
                    image={images[item.data().type + 'IMAGE']}
                ></ListEntry>
            </TouchableOpacity>)
    }

    separator =() => {
        return (<View style={style.separator}></View>)
    }
}

Home.propTypes = {
    navigation: PropTypes.object.isRequired
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