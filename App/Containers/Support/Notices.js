import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Fonts, Images, Strings } from "../../Theme";
import { HeaderWithBack } from "../../Components";

const strings = Strings.support;

const ItemNotices = ({ item, onPress }) => (
  <View style={styles.rowContainer} key={item}>
    <TouchableOpacity
      key={item.title}
      style={styles.rowItem}
      onPress={(e) => onPress(item)}
    >
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.name}>{item.title}</Text>
          {item.hasNews && (
            <Image source={Images.icNew} style={styles.imageNew} />
          )}
        </View>

        <Text style={styles.date}>{item.date}</Text>
      </View>

      <Image
        source={item.isOpenDesc ? Images.btnArrowUp : Images.btnArrowDown2}
        style={styles.image}
      />
    </TouchableOpacity>
    {item.isOpenDesc && (
      <View style={{ backgroundColor: Colors.paleGrey }}>
        <Text
          style={{
            color: Colors.darkGrey,
            fontSize: Fonts.size.regular,
            paddingHorizontal: 15,
            paddingVertical: 20,
          }}
        >
          {item.desc}
        </Text>
      </View>
    )}
  </View>
);

export default class Notices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsNotices: [
        {
          id: "0",
          title: "Notice 1",
          date: "1.2.2021",
          isOpenDesc: false,
          hasNews: true,
          desc:
            "-Show all contents (regardless of sentence length) (occured page scroll, not contents area scroll). Show all contents (regardless of sentence length) (occured page scroll, not contents area scroll)",
        },
        {
          id: "1",
          title: "Notice 2",
          date: "24.1.2021",
          isOpenDesc: false,
          hasNews: false,
          desc:
            "-Show all contents (regardless of sentence length) (occured page scroll, not contents area scroll). Show all contents (regardless of sentence length) (occured page scroll, not contents area scroll)",
        },
        {
          id: "2",
          title: "Notice 3",
          date: "23.1.2021",
          isOpenDesc: false,
          hasNews: false,
          desc:
            "-Show all contents (regardless of sentence length) (occured page scroll, not contents area scroll). Show all contents (regardless of sentence length) (occured page scroll, not contents area scroll)",
        },
      ],
    };
  }

  onPressNotice = (item) => {
    const { itemsNotices } = this.state;
      let index = itemsNotices.indexOf(item);
      if (index >= 0) {
        this.setState(({ itemsNotices }) => ({
          itemsNotices: [
            ...itemsNotices.slice(0, index),
            {
              ...itemsNotices[index],
              isOpenDesc: !itemsNotices[index].isOpenDesc,
            },
            ...itemsNotices.slice(index + 1),
          ],
        }));
      }
  };

  render() {
    const { navigation, isNotices = false } = this.props;
    const { itemsNotices } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <HeaderWithBack navigation={navigation} title={strings.notices} />

          <ScrollView>
            {
              itemsNotices.map((item) => {
                return <ItemNotices item={item} onPress={this.onPressNotice} />;
              })}

            <View style={styles.border} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
  },
  rowContainer: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.borderColorDateTime,
    borderTopWidth: 1,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  name: {
    fontFamily: Fonts.family.Bold,
    fontSize: Fonts.size.regular,
    color: Colors.darkGrey,
  },
  date: {
    fontFamily: Fonts.family.Regular,
    fontSize: 15,
    color: Colors.coolGrey,
    paddingTop: 5,
  },
  value: { color: Colors.slateGrey },
  border: {
    height: 1,
    backgroundColor: Colors.borderColorDateTime,
  },
  imageNew: { width: 20, height: 20, alignSelf: "center", marginStart: 8 },
  image: { height: 24, width: 24 },
});
