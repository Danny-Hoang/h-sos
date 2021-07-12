import React, { Component } from "react";
import { StyleSheet, Text, View, SectionList, Image, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { BottomPopup, Container } from "../../../Components";
import { Colors, Fonts, Images, Strings } from "../../../Theme";
import EventCard from "./Components/EventCard";
import Filter from "./Components/Filter";
import { connect } from "react-redux";
import ActivityActions from "../../../Stores/Activities";
import { groupBy } from "../../../Utils";
import moment from "moment";

const strings = Strings.home;
class EventsTab extends Component {

    constructor(props) {
        super(props);
        this.page = 0;
        this.state = {
            isRefreshing: false, // pull to refresh
            modalFilterVisible: false,
            data: props.activities.data
        };
        this.fetchData();
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.onRefresh()
        });
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    renderItem = ({ item, index, separators }) => {
        return item
    };

    renderSectionHeader = ({ section: { title } }) => {
        return <Text style={styles.sectionHeader}>{title}</Text>
    };

    Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    ItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: Colors.athensGray,
                }}
            />
        );
    };

    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.props.activities.loading) return null;
        return (
            <View style={{ marginVertical: 20 }}>
                <ActivityIndicator size="large" color={Colors.black} />
            </View>
        );
    };

    handleLoadMore = () => {
        const {activities} = this.props;
        if (!activities.loading && activities.data.length < activities.total) {
            this.page = this.page + 1; // increase page by 1
            this.fetchData(this.page); // method for API call
        }
    };

    onRefresh = () => {
        this.setState({ isRefreshing: true })
        this.page = 0
        this.fetchData()
    }

    reformatData = (data) => {
        if (typeof (data) == 'undefined') return []
        let newResult = data.map((item) => {
            return { ...item, onlyDate: item.createdDate.split('T')[0] }
        })
        let dataRes = groupBy(newResult, 'onlyDate');
        var data = []
        Object.keys(dataRes).forEach(element => {
            var dataValue = []
            Object.values(dataRes[element]).forEach(elementValue => {
                dataValue.push(<EventCard content={elementValue} />)
            })
            var title = ''
            if (moment().diff(moment(element, 'YYYY-MM-DD'), 'day') < 2){
                title = moment(element).calendar().split(" at")[0]
            } else {
                title = element
            }
            let item = {
                title: title,
                data: dataValue
            }
            data.push(item)
        })
        return data
    }

    getSeniorData(item){
        const { activities } = this.props
        if (typeof (item) == 'undefined') return []
        var data = [];
        for (let i = 0; i < item.length; i++) {
            const item = activities.data[i];
            if(!data.includes(item.device.deviceName)){
                data.push(item.device.deviceName)
            }
        }
        return data
    }

    onSearch = (items, startDate, endDate) => {
        const { activities } = this.props
        if (typeof (activities.data) == 'undefined') return []
        var data = activities.data
                        .filter(x => moment(x.createdDate.split('T')[0]) >= moment(startDate) 
                                && moment(x.createdDate.split('T')[0]) <= moment(endDate))
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            if(element.id == 0 && element.isSelected){
                this.setState({
                    data: data
                })
                break;
            }
            if(!element.isSelected){
                data = data.filter(x => x.device.deviceName != element.seniorName)
            }
        }
        this.setState({
            data: data
        });
    }

    fetchData = async (page, startDate, endDate) => {
        const { getActivities, activities } = this.props;
        let params = {
            page: page,
            size: 1000,
            startDate: startDate,
            endDate: endDate
        }
        getActivities(params);
    };

    render() {
        const { modalFilterVisible, isRefreshing, data } = this.state
        const { activities } = this.props
        const dataRes = this.reformatData(data)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ backgroundColor: Colors.athensGray }}>
                    <View style={styles.row}>
                        <Text style={styles.header}>{strings.bottomTabBar.event}</Text>
                        <TouchableOpacity style={styles.image} onPress={() => this.setState({ modalFilterVisible: true })}>
                            <Image style={styles.image} source={Images.icFilter} />
                        </TouchableOpacity>

                    </View>

                    <SectionList
                        sections={dataRes}
                        onRefresh={this.onRefresh}
                        refreshing={false}
                        keyExtractor={(item, index) => item + index}
                        renderItem={this.renderItem}
                        renderSectionHeader={this.renderSectionHeader}
                        ItemSeparatorComponent={this.ItemSeparator}
                        ListFooterComponent={this.renderFooter}
                        onEndReachedThreshold={0.4}
                        onEndReached={this.handleLoadMore}
                    />
                </Container>

                <BottomPopup
                    visible={modalFilterVisible}
                    onRequestClose={() => {
                        this.setState({ modalFilterVisible: false });
                    }}
                >
                    <View style={styles.bottomView}>
                        <Filter
                            dataSenior={this.getSeniorData(activities.data)}
                            onSearch={(items, startDate, endDate) => {
                                this.onSearch(items, startDate, endDate);
                                this.setState({ modalFilterVisible: false });
                            }}
                            onClose={() => {
                                this.setState({ modalFilterVisible: false });
                            }}
                        />
                    </View>
                </BottomPopup>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    sectionHeader: {
        paddingTop: 10,
        paddingLeft: 22,
        paddingRight: 10,
        paddingBottom: 10,
        fontSize: 16,
        color: Colors.coolGrey,
        backgroundColor: Colors.athensGray,
        fontFamily: Fonts.family.Regular,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 20, 
        fontSize: 28,
        color: Colors.darkGrey,
        fontFamily: Fonts.family.Bold,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
    image: {
        width: 24,
        height: 24,
    },
    bottomView: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 0
    },
});

const mapStateToProps = ({ activities }) => ({
    activities
})
const mapDispatchToProps = (dispatch) => ({
    getActivities: (params) => dispatch(ActivityActions.getActivities(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsTab)