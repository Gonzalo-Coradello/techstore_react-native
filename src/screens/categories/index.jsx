import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { styles } from './styles';
import { CategoryItem } from '../../components';
import { ORIENTATION } from '../../constants/orientation';
import useOrientation from '../../hooks/useOrientation';
import { useGetCategoriesQuery } from '../../store/categories/api';
import { COLORS } from '../../themes';

function Categories({ navigation }) {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const orientation = useOrientation();
  const onSelectCategory = ({ categoryId, color, name }) => {
    navigation.navigate('Products', { categoryId, color, name });
  };

  if (isLoading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );

  if (error) return <Text>{error.message}</Text>;
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        style={styles.categoryContainer}
        contentContainerStyle={styles.listCategory}
        renderItem={({ item }) => (
          <CategoryItem
            {...item}
            onSelectCategory={() =>
              onSelectCategory({
                categoryId: item.id,
                color: item.backgroundColor,
                name: item.name,
              })
            }
            style={orientation === ORIENTATION.LANDSCAPE ? styles.categoryItemLandscape : null}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Categories;
