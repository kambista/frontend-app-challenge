import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export const CouponInput = () => {
  const [coupon, setCoupon] = useState('');

  return (
    <View
      className="flex-row"
      style={{
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 0,
        elevation: 4,
      }}
    >
      <TextInput
        value={coupon}
        onChangeText={setCoupon}
        placeholder="Ingresa el cupón"
        placeholderTextColor="#A7A7A7"
        className="flex-1 bg-white text-center font-montserrat-regular border border-[#cccccc]"
        style={{
          fontSize: 14,
          paddingVertical: 12,
          borderWidth: 1,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          borderRightWidth: 0,
        }}
      />
      <TouchableOpacity
        onPress={() => console.log('apply coupon')}
        className="bg-secondary px-3 items-center justify-center"
        style={{
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <Text
          className="text-white font-montserrat-semibold"
          style={{ fontSize: 12 }}
        >
          APLICAR
        </Text>
      </TouchableOpacity>
    </View>
  );
};
