import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { HeaderWithBack } from '../../../../Components';
import { Colors, Metrics } from '../../../../Theme';
import CardGraph from './Components/CardGraph';
import DateSelect from './Components/DateSelect';
import FilterRange from './Components/FilterRange';

export default class DetailSummary extends Component {

    constructor(props) {
        super(props);
    }

    

    render() {
        const { navigation } = this.props;
        const title = this.props.navigation.getParam('type');
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <HeaderWithBack
                        navigation={navigation}
                        title={title} 
                    />
                    <FilterRange/>
                    <DateSelect/>
                    <ScrollView>
                        <CardGraph/>
                        <CardGraph/>
                        <CardGraph/>
                        <CardGraph/>
                        <CardGraph/>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight - 50,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    contentSection: {
        backgroundColor: Colors.white,
        margin: 10,
        padding: 15,
        borderRadius: 8
    },
});