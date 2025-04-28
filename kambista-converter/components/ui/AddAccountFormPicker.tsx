import { useState } from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MessageBox } from './MessageBox';
import { CustomButton } from './CustomButton';
import { TouchableSelectedField } from './TouchableSelectedField';
import { useCheckbox } from '../../hooks/useCheckbox';
import { CustomCheckbox } from './CustomCheckbox';

export interface NewAccountPayload {
  type: 'Ahorros' | 'Corriente';
  bankId: string;
  currency: 'PEN' | 'USD';
  number: string;
  alias: string;
}

interface Props {
  isVisible: boolean;
  toggle: () => void;
  bankOptions: { label: string; value: string }[];
  onSave: (payload: NewAccountPayload) => void;
}

export const AddAccountFormPicker: React.FC<Props> = ({
  isVisible,
  toggle,
  bankOptions,
  onSave,
}) => {
  const [type, setType] = useState<'Ahorros' | 'Corriente'>('Ahorros');
  const [bankId, setBankId] = useState(bankOptions[0]?.value ?? '');
  const [currency, setCurrency] = useState<'PEN' | 'USD'>('PEN');
  const [number, setNumber] = useState('');
  const [alias, setAlias] = useState('');
  const { checked: agreed, onPress: toggleAgreed } = useCheckbox();

  const title = `Agregar cuenta ${currency === 'PEN' ? 'soles' : 'dólares'}`;
  const canSave = !!number && !!alias && agreed;

  const handleSave = () => {
    onSave({ type, bankId, currency, number, alias });
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={toggle}
    >
      <Pressable style={styles.overlay} onPress={toggle} />

      <ScrollView style={styles.sheet}>
        <Text
          className="font-montserrat-bold text-secondary"
          style={styles.title}
        >
          {title}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: '#E2E8F0',
            marginBottom: 14,
            marginTop: 4,
          }}
        />
        <Text
          style={styles.subtitle}
          className="font-montserrat-medium text-secondary"
        >
          La cuenta que registres{' '}
          <Text className="font-montserrat-bold">debe estar a tu nombre</Text>{' '}
          (titular de este perfil en Kambista)
        </Text>

        <TouchableSelectedField
          label="Tipo de cuenta bancaria"
          placeholder="Selecciona"
          options={[
            { label: 'Ahorros', value: 'Ahorros' },
            { label: 'Corriente', value: 'Corriente' },
          ]}
          value={type}
          onChange={(val) => setType(val as 'Ahorros' | 'Corriente')}
        />

        <TouchableSelectedField
          label="Entidad financiera"
          placeholder="Selecciona"
          options={bankOptions}
          value={bankId}
          onChange={setBankId}
        />

        <MessageBox
          variant="info"
          message="Operamos en Lima con todos los bancos. Y en provincia con el BCP y cuentas digitales Interbank."
        />

        <Text
          style={styles.label}
          className="font-montserrat-medium text-gray-60"
        >
          Moneda
        </Text>
        <View style={styles.toggleRow}>
          {(
            [
              { label: 'SOLES', value: 'PEN' },
              { label: 'DÓLARES', value: 'USD' },
            ] as const
          ).map((c) => (
            <TouchableOpacity
              key={c.value}
              style={[
                styles.toggleBtn,
                currency === c.value && styles.toggleBtnActive,
              ]}
              onPress={() => setCurrency(c.value)}
            >
              <Text
                className="font-montserrat-medium"
                style={[
                  styles.toggleTxt,
                  currency === c.value && styles.toggleTxtActive,
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={styles.label}
          className="font-montserrat-medium text-gray-60 mt-4"
        >
          Número de cuenta
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe número de cuenta de destino"
          placeholderTextColor={'#A7A7A7'}
          value={number}
          onChangeText={setNumber}
          keyboardType="number-pad"
        />

        <Text
          style={styles.label}
          className="font-montserrat-medium text-gray-60 mt-4"
        >
          Ponle nombre a tu cuenta
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe un alias"
          placeholderTextColor={'#A7A7A7'}
          className="mb-2"
          value={alias}
          onChangeText={setAlias}
        />

        <CustomCheckbox
          label="Declaro que esta cuenta es mía"
          checked={agreed}
          onPress={toggleAgreed}
        />

        <CustomButton
          label="Guardar cuenta"
          onPressFunction={handleSave}
          disabled={!canSave}
          style={{ marginTop: 16, marginBottom: 50 }}
        />
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  title: { fontSize: 20, marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 8 },
  label: { fontSize: 14 },
  toggleRow: { flexDirection: 'row', marginTop: 4 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#060F26',
    borderRadius: 8,
    marginRight: 8,
  },
  toggleBtnActive: { backgroundColor: '#060F26' },
  toggleTxt: { fontSize: 14 },
  toggleTxtActive: { color: '#FFFFFF' },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    color: '#060F26',
    padding: 12,
    marginTop: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#0D9488',
    borderColor: '#0D9488',
  },
  checkboxText: { marginLeft: 8, fontSize: 14, color: '#475569' },
});
