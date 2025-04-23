import { Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { SourceFunds } from '@/constants/Backend';

export type Ref = BottomSheetModal;

type SelectSourceDrawerProps = {
  onSourceFundSelected: (sourceFund: any) => void;
};

const SelectSourceDrawer = forwardRef<Ref, SelectSourceDrawerProps>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

  const onSourceFundSelected = (sourceFund: any) => {
    props.onSourceFundSelected(sourceFund);
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
        <Text className="self-center text-base font-mmedium">Origen de fondos</Text>

        <View className="flex-1 w-full h-px bg-gray-300 my-4" />

        {SourceFunds.map((acc) => {
          return (
            <TouchableOpacity
              key={acc._id}
              className="bg-white rounded-3xl mb-4 px-6 w-full"
              onPress={() => {
                onSourceFundSelected(acc);
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

export default SelectSourceDrawer;
