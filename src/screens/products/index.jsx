import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
// import { useSelector } from 'react-redux';

import { styles } from './styles';
import { Input } from '../../components';
import { useGetProductsByCategoryQuery } from '../../store/products/api';
import { COLORS } from '../../themes';

function Products({ navigation, route }) {
  const { categoryId, color } = route.params;
  // const products = useSelector((state) => state.products.data);
  const { data: products, isLoading } = useGetProductsByCategoryQuery(categoryId);

  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [borderColor] = useState(COLORS.primary);

  const handleChangeText = (text) => {
    setSearch(text);
    filterBySearch(text);
  };

  const handleFocus = () => {};
  const handleBlur = () => {};

  const filteredProductsByCategory = products?.filter((p) => p.categoryId === categoryId);

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

  const onSelectProduct = ({ productId, name }) => {
    navigation.navigate('ProductDetail', { productId, color, name });
  };

  if (isLoading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );

  return (
    <View style={styles.container}>
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
            <TouchableOpacity
              onPress={() => onSelectProduct({ productId: item.id, name: item.name })}
              style={styles.productContainer}>
              <ImageBackground
                source={{ uri: item.image }}
                style={[styles.productImage, { backgroundColor: color }]}
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
          <Text style={styles.notFoundText}>No products found</Text>
        </View>
      )}
    </View>
  );
}

export default Products;
