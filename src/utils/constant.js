import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const sizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export {width, height, sizes};
