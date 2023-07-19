import { View, Text, FlatList } from 'react-native';
import CART from '../../constants/data/cart.json';
import { styles } from './styles';
import { CartItem } from '../../components';

const Cart = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={CART}
        renderItem={({ item }) => <CartItem {...item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listContainer}
      />
    </View>
  );
};

export default Cart;
