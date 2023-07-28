import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import { CartItem } from '../../components';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
  clearCart,
} from '../../store/cart/cart.slice';
import { useCreateOrderMutation } from '../../store/orders/api';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  // eslint-disable-next-line no-unused-vars
  const [createOrder, { data, isError, error, isLoading }] = useCreateOrderMutation();

  const increaseCartItem = (id) => {
    dispatch(increaseItemQuantity({ id }));
  };

  const decreaseCartItem = (id) => {
    dispatch(decreaseItemQuantity({ id }));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart({ id }));
  };

  const onCreateOrder = async () => {
    const newOrder = {
      id: Math.floor(Math.random() * 1000),
      items: cart,
      total,
      user: {
        id: 1,
        name: 'John Doe',
        address: '123 Street',
        phone: 123456789,
        email: 'johndoe@gmail.com',
      },
      payment: {
        method: 'VISA',
      },
      delivery: {
        method: 'UPS',
        trackingNumber: Math.floor(Math.random() * 1000),
      },
      createdAt: Date.now(),
      finishedAt: '',
    };

    try {
      await createOrder(newOrder);
      dispatch(clearCart());
      navigation.navigate('OrdersTab');
    } catch (e) {
      console.warn({ error, e });
    }
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

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
        <TouchableOpacity onPress={onCreateOrder} style={styles.checkoutButton}>
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
