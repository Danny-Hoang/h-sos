import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import { HeaderWithBack, TextButton } from '../../../Components';
import { Colors, Strings } from '../../../Theme';
import EditOrderCard from './Components/EditOrderCard';

const strings = Strings.home.editOrder;
class EditOrder extends Component {
    state = {
        isDisableSave: true,
        data: [...Array(20)].map((d, index) => ({
          key: `item-${index}`,
          name: "John Brown " + index,
        }))
      }

    renderItem = ({ item, drag, isActive }) => {
        return (
            <EditOrderCard
                item={item}
                drag={drag}
                isActive={isActive}
            />
        );
    };

    ItemFooter = () => {
		return (
			<View style={styles.footerView}>
						<Text style={styles.guideText}>{strings.guide}</Text>
					</View>
		);
	}

    render() {
        const { navigation } = this.props;
        const {isDisableSave} = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ paddingTop: 8 }}>
                        <HeaderWithBack navigation={navigation} title={strings.title} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <DraggableFlatList
                                data={this.state.data}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                                onDragEnd={({ data }) => this.setState({data: data, isDisableSave: false})}
                                ListFooterComponent={this.ItemFooter}
                            />
                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 27 }}>
                            <TextButton
                                disabled={isDisableSave}
                                onClick={() => {
                                    navigation.pop();
                                }}
                                style={{ borderWidth: 0 }}>
                                {Strings.common.save}
                            </TextButton>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
    guideText: {
        color: Colors.darkGrey,
        fontSize: 20,
    },
    footerView:{
        alignItems: 'center',
        marginVertical: 20
    }
})

export default EditOrder;