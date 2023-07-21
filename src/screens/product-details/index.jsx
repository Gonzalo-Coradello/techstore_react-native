import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { styles } from './styles';
import { addToCart } from '../../store/cart/cart.slice';

const ProductDetail = ({ navigation, route }) => {
  const { color, productId } = route.params;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const product = products.find((p) => p.id === productId);

  const onAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.containerImage, { backgroundColor: color }]}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>USD {product.price}</Text>
        <Text style={styles.tagTitle}>Tags</Text>
        <View style={styles.containerTags}>
          {product.tags.map((tag) => (
            <TouchableOpacity key={tag} style={[styles.containerTag, { backgroundColor: color }]}>
              <Text style={styles.tag}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={onAdd} style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
