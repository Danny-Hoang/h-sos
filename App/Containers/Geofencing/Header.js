import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Images, Fonts, Colors, Strings } from "../../Theme";
import { TextButton } from "../../Components";

export default ({onClickAdd, onClickBack}) => {
  return (
    <View
          style={{
            height: 56,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={onClickBack}>
                  <View>
                      <Image style={{width:24, height: 24, marginRight: 15}} source={Images.iconArrowLeft}/>
                  </View>
              </TouchableOpacity>
            <Text style={{ fontFamily: Fonts.family.Bold, fontSize: 22 }}>
              {Strings.geofencing.title}
            </Text>
          </View>

          <TextButton
            onClick={onClickAdd}
            style={{
              alignSelf: "flex-end",
              backgroundColor: Colors.transparent,
              color: Colors.lightishBlue,
            }}
          >
            {Strings.geofencing.buttonAdd}
          </TextButton>
        </View>
  );
};
