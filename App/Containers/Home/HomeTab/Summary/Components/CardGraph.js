import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors, Fonts, Images, Metrics } from '../../../../../Theme';

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};

export default class CardGraph extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.icon} source={Images.icHealthStep} />
                        <Text style={styles.title}>Step</Text>
                    </View>
                    <TouchableOpacity>
                        <Image style={styles.icon} source={Images.icGuide} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: 'baseline', }}>
                    <Text style={styles.value}>14000</Text>
                    <Text style={styles.valueUnit}>steps</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <LineChart
                        data={{
                            labels: ["12pm", "6am", "12pm", "6pm"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                    ]
                                }
                            ]
                        }}
                        width={Metrics.screenWidth - 30} // from react-native
                        height={(Metrics.screenWidth - 30) * 163 / 323}
                        chartConfig={{
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: () => `rgba(74, 100, 206, ${1})`,
                            labelColor: () => `rgba(193, 195, 198, 1)`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginTop: 10,
                            borderRadius: 16
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth - 20,
        height: undefined,
        aspectRatio: 355 / 270,
        margin: 10,
        borderRadius: 12,
        backgroundColor: Colors.white,
        shadowColor: Colors.coolGrey,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 10
    },
    icon: {
        width: 24,
        height: 24
    },
    title: {
        color: "#9DA2A7",
        fontSize: 18,
        fontFamily: Fonts.family.Regular,
        marginLeft: 10,
        fontWeight: '400'
    },
    value: {
        color: "#333435",
        fontSize: 24,
        fontFamily: Fonts.family.Regular,
        marginLeft: 10,
        fontWeight: '700',
    },
    valueUnit: {
        color: "#64696E",
        fontSize: 14,
        fontFamily: Fonts.family.Regular,
        marginLeft: 5,
        fontWeight: '400'
    }
})