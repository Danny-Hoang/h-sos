import React, { Component } from "react";
import styled from "styled-components";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Text,
	FlatList,
} from "react-native";
import { BottomPopup, TextButton } from "../../../../Components";
import { Colors, Metrics, Images, Fonts, Strings } from "../../../../Theme";
import DatePickerComponent from "../../../SetProfile/AdditionalInfo/DatePicker";
import { formatDateToString } from "../../../../Utils/time";
import moment from "moment";

const strings = Strings.filter;

const Item = styled.TouchableOpacity`
  border-color: ${(props) =>
		props.isSelected ? Colors.red : Colors.lightBlueGrey};
  border-width: ${(props) => 1.5};
  background-color: ${(props) =>
		props.isSelected ? Colors.redOpacity : Colors.white};
  width: 50%;
  height: 50px;
  justify-content: center;
`;
const ItemText = styled.Text`
  font-family: ${(props) =>
		props.isSelected ? Fonts.family.Bold : Fonts.family.Regular};
  font-size: ${Fonts.size.regular};
  color: ${(props) => (props.isSelected ? Colors.red : Colors.darkGrey)};
  text-align: center;
`;

const Header = ({ onClose, onSearch }) => (
	<View style={styles.header}>
		<TouchableOpacity
			onPress={() => {
				onClose();
			}}>
			<View style={{ justifyContent: 'center', height: '100%', aspectRatio: 1 }}>
				<Image source={Images.icCloseBlack} style={{ width: 24, height: 24 }} />
			</View>
		</TouchableOpacity>
		<TouchableOpacity
			style={{ width: 120, justifyContent: "center" }}
			onPress={() => {
				onSearch();
			}}
		>
			<Text style={styles.textButton}>{strings.search}</Text>
		</TouchableOpacity>
	</View>
);

export default class Filter extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			items: [
				{id: 0, seniorName: "All", isSelected: true },
				...props.dataSenior.map((item, index) => ({id: index+1,seniorName: item, isSelected: false}))
			],
			itemMonth: [
				{ id: 1, text: "1 Month" },
				{ id: 3, text: "3 Month" },
				{ id: 6, text: "6 Month" },
			],
			selectedMonth: 1,
			modalDatePickerVisible: false,
			startDate: moment().subtract(1, 'month'),
			endDate: new Date(),
			initialDate: undefined,
			isSelectStartDate: true,
		};
		console.log('hhduong dataSen', this.state)
	}

	onSelectDate = (date) => {
		const {startDate, endDate} = this.state
		if (this.state.isSelectStartDate) {
			if(moment(endDate).diff(moment(date), 'day') < 0) {return}
			this.setState({
				startDate: date,
				modalDatePickerVisible: false,
				selectedMonth: -1
			});
		} else {
			if(moment(date).diff(moment(startDate), 'day') < 0) {return}
			this.setState({ 
				endDate: date, 
				modalDatePickerVisible: false,
				selectedMonth: -1
			});
		}
	};

	onSelectDurationMonth = (id) => {
		this.setState({ selectedMonth: id });

		this.setState({
			startDate: moment().subtract(id, 'month'),
			endDate: moment()
		});
	}

	onSearch = () => {
		const {startDate, endDate} = this.state
		this.props.onClose()
		this.props.onSearch(startDate, endDate)
	};

	onPressItemSeniorName = (item) => {
		const { items } = this.state;
		let index = items.indexOf(item);
		if (index !== 0) {
			this.setState(({ items }) => ({
				items: [
					{
						...items[0],
						isSelected: false,
					},
					...items.slice(1, index),
					{
						...items[index],
						isSelected: !item.isSelected,
					},
					...items.slice(index + 1),
				],
			}));
		} else {
			if (item.isSelected) {
				this.setState(({ items }) => ({
					items: [
						{
							...items[0],
							isSelected: !item.isSelected,
						},
						...items.slice(1),
					],
				}));
			} else {
				let arr = [...this.state.items];
				arr.forEach((item) => {
					item.isSelected = false;
				});
				this.setState({
					items: [
						{
							...items[0],
							isSelected: true,
						},
						...arr.slice(1),
					],
				});
			}
		}
	};

	render() {
		const { onClose, onSearch } = this.props;
		const {
			items,
			itemMonth,
			selectedMonth,
			modalDatePickerVisible,
			endDate,
			startDate,
			initialDate,
		} = this.state;
		return (
			<View style={styles.container}>
				<Header onClose={onClose} onSearch={() => onSearch(items, startDate, endDate)} />
				<Text style={styles.textTitle}>{strings.senior}</Text>
				<FlatList
					style={{
						height: (items.length / 2 + (items.length % 2)) * 50,
						flexGrow: 0,
						marginHorizontal: 20
					}}
					data={items}
					numColumns={2}
					renderItem={({ item, index }) => (
						<Item
							style={{borderBottomWidth: (index > items.length - 3 || item.isSelected) ? 1.5 : 0, 
									borderLeftWidth: (index % 2 == 0 || item.isSelected) ? 1.5 : 0}}
							onPress={() => {
								this.onPressItemSeniorName(item);
							}}
							isSelected={item.isSelected}>
							<ItemText isSelected={item.isSelected}>
								{item.seniorName}
							</ItemText>
						</Item>
					)}
				/>
				<Text style={styles.textTitle}>{strings.date}</Text>
				<View style={{ flexDirection: "row", marginHorizontal: 20, }}>
					{itemMonth.map((item) => {
						let isSelected = item.id === selectedMonth;
						return (
							<View style={{ flex: 1 }} key={item.id}>
								<TextButton
									style={{
										backgroundColor: isSelected
											? Colors.redOpacity
											: Colors.white,
										color: isSelected ? Colors.red : Colors.darkGrey,
										borderColor: isSelected ? Colors.red : Colors.lightBlueGrey,
										borderWidth: isSelected ? 1.5 : 1,
										borderRadius: 0,
										fontFamily: isSelected
											? Fonts.family.Bold
											: Fonts.family.Regular,
									}}
									onClick={() => {
										this.onSelectDurationMonth(item.id)
									}}>
									{item.text}
								</TextButton>
							</View>
						);
					})}
				</View>
				<View style={styles.containerDate}>
					<TouchableOpacity
						style={styles.buttonDate}
						onPress={() => {
							this.setState({
								modalDatePickerVisible: true,
								initialDate: startDate,
								isSelectStartDate: true,
							});
						}}>
						<Text style={styles.textDate}>
							{formatDateToString(new Date(startDate))}
						</Text>
						<Image style={styles.imageDate} source={Images.btnArrowDown} />
					</TouchableOpacity>
					<Text style={{ fontSize: Fonts.size.h3 }}>-</Text>
					<TouchableOpacity
						style={styles.buttonDate}
						onPress={() => {
							this.setState({
								modalDatePickerVisible: true,
								initialDate: endDate,
								isSelectStartDate: false,
							});
						}}>
						<Text style={styles.textDate}>
							{formatDateToString(new Date(endDate))}
						</Text>
						<Image source={Images.btnArrowDown} style={styles.imageDate} />
					</TouchableOpacity>
				</View>
				<BottomPopup
					visible={modalDatePickerVisible}
					onRequestClose={() => {
						this.setState({ modalDatePickerVisible: false });
					}}>
					<View style={styles.bottomView}>
						<DatePickerComponent
							onChange={this.onSelectDate}
							date={new Date(initialDate)}
							onClose={() => {
								this.setState({ modalDatePickerVisible: false });
							}}
						/>
					</View>
				</BottomPopup>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: Metrics.screenWidth,
		flex: 0,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: Colors.white,
		paddingBottom: 30
	},
	header: {
		alignSelf: "stretch",
		height: 60,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: 'center',
		borderBottomColor: Colors.borderColorDateTime,
		borderBottomWidth: 1,
		marginHorizontal: 20
	},
	textButton: {
		fontFamily: Fonts.family.Bold,
		fontSize: Fonts.size.h3,
		color: Colors.lightishBlue,
		textAlign: "right",
	},
	name: {
		fontSize: Fonts.size.regular,
		color: Colors.darkGrey,
		textAlign: "center",
	},
	bottomView: {
		justifyContent: "flex-end",
		alignItems: "flex-end",
		height: 325,
	},
	buttonDate: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	textDate: { color: Colors.darkGreyTwo, fontSize: 19 },
	imageDate: { height: 10, width: 10, marginLeft: 10 },
	containerDate: {
		flexDirection: "row",
		borderBottomColor: Colors.lightBlueGrey,
		borderBottomWidth: 1,
		height: 55,
		marginBottom: 8,
		alignSelf: "stretch",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: 10,
		marginHorizontal: 20,
	},
	textTitle: {
		fontSize: Fonts.size.medium,
		alignSelf: "flex-start",
		marginTop: 23,
		marginBottom: 8,
		marginHorizontal: 20,
		color: Colors.slateGrey,
	},
});
