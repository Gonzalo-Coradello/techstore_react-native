import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Input } from '../../components';
import PRODUCTS from '../../constants/data/products.json';
import { COLORS } from '../../themes';

function Products({ handleGoBack, categoryId }) {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [borderColor] = useState(COLORS.primary);

  const handleChangeText = (text) => {
    setSearch(text);
    filterBySearch(text);
  };

  const handleFocus = () => {};

  const handleBlur = () => {};

  const filteredProductsByCategory = PRODUCTS.filter((p) => p.categoryId === categoryId);

  const filterBySearch = (query) => {
    let updatedProductList = [...filteredProductsByCategory];

    updatedProductList = updatedProductList.filter((product) => {
      return product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredProducts(updatedProductList);
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBack} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={30} color={COLORS.black} />
        <Text style={styles.goBackText}>Go back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Input
          value={search}
          handleChangeText={handleChangeText}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          borderColor={borderColor}
          placeholder="Search"
        />
        {search.length > 0 && (
          <Ionicons onPress={clearSearch} name="close-circle" size={30} color={COLORS.black} />
        )}
      </View>
      <View>
        <FlatList
          style={styles.products}
          data={search.length > 0 ? filteredProducts : filteredProductsByCategory}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {filteredProducts.length === 0 && search.length > 0 && (
        <View style={styles.notFound}>
          <Text>Not found</Text>
        </View>
      )}
    </View>
  );
}

export default Products;
