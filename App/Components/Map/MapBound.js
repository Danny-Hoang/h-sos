import React from "react";
import MapView from "react-native-maps";
import { Colors } from "../../Theme";

export default ({region, bound, unit = 1000}) => {
  return(
    <MapView.Circle
    key={(region.longitude + region.latitude).toString()}
    center={region}
    radius={bound * unit}
    strokeWidth={1}
    strokeColor={Colors.charcoalGreyTwo}
    fillColor={'rgba(76, 78, 80, 0.15)'}
  />
  )
  ;
};
