import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchInput, ListOfEntries} from '../../../shared';

export const routes = [
  {
    key: 'places',
    title: 'Locales',
  },
  {
    key: 'events',
    title: 'Eventos',
  },
];

export function componentToRoute(route) {
  return (
    <View>
      <SearchInput
        section={route.title}
        onInput={this.filterArray(route.key)}></SearchInput>
      <ListOfEntries
        style={style.list}
        onEntryPress={item =>
          this.props.navigation.navigate('Local', {
            item: item,
          })
        }
        list={this.state[route.key]}></ListOfEntries>
    </View>
  );
}

const style = StyleSheet.create({
  list: {
    height: '100%',
    width: '100%',
  },
});
