import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

import { styles } from './styles';
import { Input } from '../../components';
import PRODUCTS from '../../constants/data/products.json';
import { COLORS } from '../../themes';

function Products({ handleGoBack, categorySelected }) {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [borderColor] = useState(COLORS.primary);

  const handleChangeText = (text) => {
    setSearch(text);
    filterBySearch(text);
  };

  const handleFocus = () => {};

  const handleBlur = () => {};

  const filteredProductsByCategory = PRODUCTS.filter(
    (p) => p.categoryId === categorySelected.categoryId
  );

  const filterBySearch = (query) => {
    let updatedProductList = [...filteredProductsByCategory];

    updatedProductList = updatedProductList.filter((product) => {
      return product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredProducts(updatedProductList);
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredProducts([]);
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
          <Ionicons
            style={styles.clearIcon}
            onPress={clearSearch}
            name="close-circle"
            size={20}
            color={COLORS.black}
          />
        )}
      </View>
      <View>
        <FlatList
          style={styles.products}
          data={search.length > 0 ? filteredProducts : filteredProductsByCategory}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => null} style={styles.productContainer}>
              <ImageBackground
                source={{ uri: item.image }}
                style={[styles.productImage, { backgroundColor: categorySelected.color }]}
                resizeMethod="resize"
                resizeMode="contain"
              />
              <View style={styles.productDetail}>
                <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>{`${item.currency.code} ${item.price}`}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.productsContent}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {filteredProducts.length === 0 && search.length > 0 && (
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Not found</Text>
        </View>
      )}
    </View>
  );
}

export default Products;