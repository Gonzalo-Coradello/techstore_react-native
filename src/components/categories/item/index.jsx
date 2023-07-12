import { TouchableHighlight, ImageBackground, Text } from 'react-native';

import { styles } from './styles';
import { COLORS } from '../../../themes';

const CategoryItem = ({ name, id, backgroundColor, backgroundImage, onSelectCategory, style }) => {
  // const { width } = useWindowDimensions();

  // const isTablet = width > 650
  return (
    <TouchableHighlight
      onPress={onSelectCategory}
      style={[styles.container, { backgroundColor }]}
      underlayColor={COLORS.primary}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={[styles.imageBackground, style]}
        resizeMode="cover">
        <Text style={styles.categoryName}>{name}</Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

export default CategoryItem;
