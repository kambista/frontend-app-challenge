import { Text, TouchableOpacity } from 'react-native';

export const Tab: React.FC<{
  label: string;
  active: boolean;
  onPress: () => void;
}> = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 py-3 ${active ? 'bg-secondary' : 'bg-white'}`}
    style={{
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    }}
  >
    <Text
      className={`text-center font-montserrat-bold ${active ? 'text-white' : 'text-gray-40'}`}
      style={{ fontSize: 14 }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
