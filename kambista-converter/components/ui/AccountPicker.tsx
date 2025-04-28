import {
  Modal,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AddSquareIcon } from '../icons/AddSquareIcon';

export interface Account {
  id: string;
  alias: string;
  number: string;
}

interface Props {
  isVisible: boolean;
  toggle: () => void;
  accounts: Account[];
  selectedValue: string | null;
  onSelect: (id: string) => void;
  onAddAccount: () => void;
}

export const AccountPicker: React.FC<Props> = ({
  isVisible,
  toggle,
  accounts,
  selectedValue,
  onSelect,
  onAddAccount,
}) => (
  <Modal
    visible={isVisible}
    transparent
    animationType="fade"
    onRequestClose={toggle}
  >
    <Pressable style={styles.overlay} onPress={toggle} />

    <View style={styles.sheet}>
      <Text style={styles.sheetTitle}>Selecciona tu cuenta destino</Text>

      <FlatList
        data={accounts}
        keyExtractor={(a) => a.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const active = item.id === selectedValue;
          return (
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                onSelect(item.id);
                toggle();
              }}
            >
              <View style={styles.rowText}>
                <Text
                  style={[styles.alias, active && styles.aliasActive]}
                  numberOfLines={1}
                >
                  {item.alias}
                </Text>
                <Text style={styles.number}>{item.number}</Text>
              </View>
              {active && (
                <Ionicons name="checkmark" size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={styles.addRow}
        onPress={() => {
          onAddAccount();
        }}
      >
        <AddSquareIcon />
        <Text
          className="text-secondary font-montserrat"
          style={styles.addLabel}
        >
          Agregar cuenta
        </Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.6)' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '75%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sheetTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  separator: { height: 1, backgroundColor: '#E2E8F0' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  rowText: { flex: 1 },
  alias: { fontSize: 14, fontWeight: '500', color: '#475569' },
  aliasActive: { color: '#0F172A' },
  number: { fontSize: 12, color: '#94A3B8' },
  addRow: { marginTop: 20, flexDirection: 'row', alignItems: 'center' },
  addLabel: {
    marginLeft: 12,
    fontSize: 14,
  },
});
