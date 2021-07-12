import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CarerCard from './CarerCard';

class ListCarer extends Component {
    state = {  }

    renderItem = ({ item }) => {
        const { pressMore, deleteItem } = this.props;
        return (
            <CarerCard 
            item={item} 
            deleteItem={(item)=>{deleteItem(item)}}
            pressMore={(event)=>{
                pressMore(item)
            }}/>
        );
    };

    render() {
        const {listCarer} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                data={listCarer}
                renderItem={this.renderItem}
                scrollEventThrottle={16}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ListCarer;