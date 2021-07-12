import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ReminderCard from './ReminderCard';

class ListReminder extends Component {
    state = {}

    renderItem = ({ item }) => {
        const { pressDetail, deleteItem } = this.props;
        return (
            <ReminderCard
                item={item}
                deleteItem={(item) => { deleteItem(item) }}
                pressDetail={(event) => {
                    pressDetail(item)
                }} />
        );
    };

    render() {
        const { listReminder } = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={listReminder}
                    renderItem={this.renderItem}
                    scrollEventThrottle={16} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ListReminder;