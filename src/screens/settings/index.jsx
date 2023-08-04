import { View, FlatList } from 'react-native';

import { styles } from './styles';
import MenuItem from '../../components/menu-item';
import { MENUS } from '../../constants/data/menus';

const Settings = ({ navigation }) => {
  const onSelect = ({ route }) => {
    navigation.navigate(route);
  };
  const renderItem = ({ item }) => <MenuItem {...item} onSelect={onSelect} />;
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.settingList}
        data={MENUS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Settings;
