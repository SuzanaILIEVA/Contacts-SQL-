import {StyleSheet, View} from 'react-native';
import React from 'react';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import FavoriteItem from '../../components/favorites/FavoriteItem';

const Favorites = ({route}) => {
  const {contact} = route.params;
  return (
    <View style={defaultScreenStyle.container}>
      <FavoriteItem contact={contact} />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
