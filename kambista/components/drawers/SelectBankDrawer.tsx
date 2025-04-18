import { Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { BankAccounts } from '@/constants/Backend';

export type Ref = BottomSheetModal;

type SelectBankDrawerProps = {
  onBankAccountSelected: (bankAccount: any) => void;
};

const SelectBankDrawer = forwardRef<Ref, SelectBankDrawerProps>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

  const onBankAccountSelected = (bankAccount: any) => {
    props.onBankAccountSelected(bankAccount);
  };

  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop} enableDynamicSizing={false}>
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 20,
          alignItems: 'flex-start',
        }}
      >
        <Text className="self-center text-base font-mmedium">¿Desde que banco nos envias tu dinero?</Text>

        <View className="flex-1 h-px bg-gray-300 my-2" />

        {BankAccounts.map((acc) => {
          return (
            <TouchableOpacity
              key={acc.id}
              className="bg-white rounded-3xl mb-4 px-6 w-full"
              onPress={() => {
                onBankAccountSelected(acc);
              }}
            >
              <Text className="self-start font-mregular text-black">{acc.name}</Text>
            </TouchableOpacity>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default SelectBankDrawer;
