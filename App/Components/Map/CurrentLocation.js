import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Images } from "../../Theme";

export default ({}) => {
  return (
    <View style={styles.mapMarkerContainer}>
      <Image
        style={{ height: 50, width: 40 }}
        source={Images.icCurrentLocation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mapMarkerContainer: {
    left: "47%",
    position: "absolute",
    top: "42%",
  },
});
