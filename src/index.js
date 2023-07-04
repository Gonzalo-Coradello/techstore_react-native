import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { CategoryItem, Header } from './components';
import CATEGORIES from './constants/data/categories.json';
import { COLORS } from './themes';

export default function App() {
  const onSelectCategory = (id) => {
    console.log(id);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title="Categories" />
        <FlatList
          data={CATEGORIES}
          style={styles.categoryContainer}
          contentContainerStyle={styles.listCategory}
          renderItem={({ item }) => <CategoryItem {...item} onSelectCategory={onSelectCategory} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  categoryContainer: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  listCategory: {
    gap: 15,
    paddingBottom: 20,
  },
});
