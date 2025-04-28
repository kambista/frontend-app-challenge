import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useTransactionStore } from '../../stores/transactionStore';

export const CouponInput = () => {
  const [localCoupon, setLocalCoupon] = useState('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isEditable, setIsEditable] = useState(true);

  const { transaction, setTransaction } = useTransactionStore();

  const handleApplyCoupon = () => {
    if (!localCoupon.trim() || !transaction) return;

    const couponCode = localCoupon.trim().toUpperCase();
    const originalMarketRate = parseFloat(transaction.marketRate || '0');

    if (couponCode === 'MICASA21') {
      const newUsedRate = (originalMarketRate - 0.01).toFixed(3);

      setTransaction({
        ...transaction,
        coupon: couponCode,
        usedRate: newUsedRate,
      });

      setStatusMessage({
        type: 'success',
        message: '¡Cupón aplicado exitosamente!',
      });
    } else {
      setStatusMessage({
        type: 'error',
        message: 'Este cupón no aplica.',
      });
    }

    setIsEditable(false);

    setTimeout(() => {
      setStatusMessage(null);
      setIsEditable(true);
    }, 1500);
  };

  const handleChangeText = (text: string) => {
    if (isEditable) {
      setLocalCoupon(text);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.inputContainer}>
        <TextInput
          value={localCoupon}
          onChangeText={handleChangeText}
          placeholder="Ingresa el cupón"
          placeholderTextColor="#A7A7A7"
          editable={isEditable}
          style={styles.input}
          autoCapitalize="characters"
          maxLength={12}
        />
        <TouchableOpacity
          onPress={handleApplyCoupon}
          style={styles.button}
          disabled={!isEditable}
        >
          <Text style={styles.buttonText}>APLICAR</Text>
        </TouchableOpacity>
      </View>

      {statusMessage && (
        <Text
          style={{
            fontSize: 12,
            color: statusMessage.type === 'success' ? '#16A34A' : '#DC2626',
            textAlign: 'center',
            marginTop: 6,
            fontFamily: 'Montserrat-Medium',
          }}
        >
          {statusMessage.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 0,
    color: '#060F26',
  },
  button: {
    backgroundColor: '#060F26',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
});
