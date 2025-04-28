import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  label: string;
  checked: boolean;
  onPress: () => void;
}

const CheckIcon = () => (
  <Svg width={16} height={12} viewBox="0 0 16 12">
    <Path
      d="M1 6L5.5 10.5L15 1"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CustomCheckbox: React.FC<Props> = ({
  label,
  checked,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={[styles.box, checked && styles.boxChecked]}>
      {checked && <CheckIcon />}
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const BOX_SIZE = 24;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 2,
    borderColor: '#060F26',
    borderRadius: 6,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  boxChecked: {
    backgroundColor: '#060F26',
    borderColor: '#060F26',
  },
  label: {
    fontSize: 14,
    color: '#060F26',
    fontFamily: 'montserrat-medium',
  },
});
