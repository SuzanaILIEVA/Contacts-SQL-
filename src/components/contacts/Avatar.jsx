import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getInitials} from '../../utils/functions';
import {colors} from '../../theme/colors';
import {height, sizes, width} from '../../utils/constant';

const Avatar = ({name, surname, size = sizes.MEDIUM}) => {
  const setSize = () => {
    switch (size) {
      case sizes.SMALL:
        return {
          width: width * 0.15,
          height: width * 0.15,
        };

      case sizes.MEDIUM:
        return {
          width: width * 0.2,
          height: width * 0.2,
        };

      case sizes.LARGE:
        return {
          width: width * 0.25,
          height: width * 0.25,
        };

      default:
        return {
          width: height * 0.2,
          height: height * 0.2,
        };
    }
  };
  return (
    <View style={[styles.container, setSize()]}>
      <Text style={styles.avatar}>{getInitials(name, surname)}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    color: colors.WHITE,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: colors.DARK_GRAY,
    borderRadius: 100,
  },
  avatar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
});
