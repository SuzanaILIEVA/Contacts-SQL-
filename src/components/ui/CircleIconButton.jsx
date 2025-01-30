import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {width} from '../../utils/constant';
import {colors} from '../../theme/colors';

const CircleIconButton = props => {
  const {color = colors.DARK_GRAY, icon} = props;
  return (
    <Pressable {...props} style={[styles.container, {backgroundColor: color}]}>
      {icon}
    </Pressable>
  );
};

export default CircleIconButton;

const styles = StyleSheet.create({
  container: {
    height: width * 0.14,
    width: width * 0.14,
    borderRadius: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
