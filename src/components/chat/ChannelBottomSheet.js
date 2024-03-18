import { View, Text } from "react-native";
import React, { useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const ChannelBottomSheet = () => {
  const bottomSheetRef = useRef < BottomSheet > null;

  return (
    <View>
     <BottomSheet
        ref={bottomSheetRef}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default ChannelBottomSheet;
