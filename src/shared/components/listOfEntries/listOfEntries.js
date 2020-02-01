import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {PropTypes} from 'prop-types';
import {PlaceItem} from '../listItems/listItem';

export default class ListOfEntries extends Component {
  render() {
    return (
      <FlatList
        style={style.homeList}
        data={this.props.list}
        renderItem={this.listEntry}
        ItemSeparatorComponent={this.separator}
        keyExtractor={item => item.id.toString()}></FlatList>
    );
  }

  listEntry = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.props.onEntryPress(item)}>
        <PlaceItem item={item}></PlaceItem>
      </TouchableOpacity>
    );
  };

  separator = () => {
    return <View style={style.separator}></View>;
  };
}

ListOfEntries.propTypes = {
  list: PropTypes.array,
  onEntryPress: PropTypes.func,
};

const style = StyleSheet.create({
  homeList: {
    marginTop: 10,
  },
  separator: {
    borderColor: 'black',
    borderWidth: 0.5,
    margin: 10,
  },
});
