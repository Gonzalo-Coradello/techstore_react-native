import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import { CartItem } from '../../components';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
} from '../../store/cart/cart.slice';

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  const increaseCartItem = (id) => {
    dispatch(increaseItemQuantity({ id }));
  };
  const decreaseCartItem = (id) => {
    dispatch(decreaseItemQuantity({ id }));
  };
  const removeItem = (id) => {
    dispatch(removeItemFromCart({ id }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            {...item}
            increaseCartItem={increaseCartItem}
            decreaseCartItem={decreaseCartItem}
            removeItem={removeItem}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listContainer}
      />
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => null} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: </Text>
            <Text style={styles.totalPriceText}>USD {total}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
