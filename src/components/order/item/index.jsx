import { TouchableOpacity, Text, View } from 'react-native';

import { styles } from './styles';

const formatDate = (time) => {
  const date = new Date(time);
  console.warn({ time, date, locale: date.toLocaleDateString() });
  return date.toLocaleDateString();
};

const OrderItem = ({ id, total, createdAt, items }) => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.orderItemContainer}>
      <View style={styles.orderHeaderContainer}>
        <Text style={styles.orderItemDate}>{formatDate(createdAt)}</Text>
      </View>
      <View style={styles.orderBody}>
        <Text style={styles.orderItemId}>Id: {id}</Text>
        <Text style={styles.orderItemTotal}>Total: USD {total}</Text>
        <Text style={styles.orderItemId}>Total Items: {items.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
