import React, { Component } from "react";
import {Button, View, Text, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Constants from "../../Constants";
import Configs from "../../Configs";
import log from "../../Utils/log";
import {HeaderWithBack} from "../../Components";
import AuthActions from "../../Stores/Auth";
import {connect} from "react-redux";
import RadioBtnRN from "./RadioBtn";

class ChangeServerURL extends Component {

    constructor(props) {
        super(props);

        this.state = {
            res: {},
            current: '',
            index: 1,
            developUrl:'',
            currentDevelopUrl: ''
        };

        this.environments = [
            {
                label: 'Development'
            },
            {
                label: 'Pre-Production'
            },
            {
                label: 'Production'
            }
        ];

        this._renderRadioBtn = this._renderRadioBtn.bind(this);
        this._renderUrl = this._renderUrl.bind(this);
    }

    async componentDidMount() {
        try {
            const env = await AsyncStorage.getItem(Constants.KEYS.DEV_ENV);
            const url = await AsyncStorage.getItem(Constants.KEYS.DEV_APP_API_URL);
            if (env !== null) {
                switch (env) {
                    case Configs.ENVIRONMENT.DEV:
                        this.setState({ current: 'Development', index: 1, currentDevelopUrl: url })
                        break;
                    case Configs.ENVIRONMENT.PRE_PROD:
                        this.setState({ current: 'Pre-Production', index: 2, currentDevelopUrl: url })
                        break;
                    case Configs.ENVIRONMENT.PROD:
                        this.setState({ current: 'Production', index: 3, currentDevelopUrl: url })
                        break;
                }
            }

        } catch (e) {
            console.log('Fail to get development environment')
        }
    }

    _renderRadioBtn() {
        return (
            <RadioBtnRN
                data={this.environments}
                selectedBtn={(e) => this.setState({ res: e })}
                circleSize={16}
                initial={this.state.index}
            />
        )
    }

    _renderUrl(type) {
        switch (type) {
            case 'Development':
                return <View style={{padding: 10}}>
                    <Text style={{ fontSize: 12, paddingLeft: 20, paddingRight: 16 }}>
                        Mobile server url: {this.state.currentDevelopUrl}
                    </Text>
                    <Text style={{ fontSize: 12, padding: 16}}>
                        Auth server url: {Configs.AUTH_API_URL_DEV}
                    </Text>
                </View>
            case "Pre-Production":
                return <View tyle={{padding: 10}}>
                    <Text style={{ fontSize: 12, paddingLeft: 20, paddingRight: 16 }}>
                        Mobile server url: {Configs.API_URL_PRE_PROD}
                    </Text>
                    <Text style={{ fontSize: 12, padding: 16}}>
                        Auth server url: {Configs.AUTH_API_URL_PRE_PROD}
                    </Text>
                </View>
            case 'Production':
                return <View tyle={{padding: 10}}>
                    <Text style={{ fontSize: 12, paddingLeft: 20, paddingRight: 16}}>
                        Mobile server url: {Configs.API_URL_PROD}
                    </Text>
                    <Text style={{ fontSize: 12, padding: 16}}>
                        Auth server url: {Configs.AUTH_API_URL_PROD}
                    </Text>
                </View>
        }
    }

    saveEnvironment = async () => {
        const { navigation, fetchAuth } = this.props

        let value = Configs.ENVIRONMENT.PRE_PROD;
        switch (this.state.res.label) {
            case 'Development':
                value = Configs.ENVIRONMENT.DEV;
                break;
            case 'Pre-Production':
                value = Configs.ENVIRONMENT.PRE_PROD;
                break;
            case 'Production':
                value = Configs.ENVIRONMENT.PROD;
                break;
        }

        try {
            await AsyncStorage.setItem(Constants.KEYS.DEV_ENV, value, (e) => log('[save Dev env]', e))
            if (this.state.res.label === 'Development' && this.state.developUrl !== '') {
                await AsyncStorage.setItem(Constants.KEYS.DEV_APP_API_URL, this.state.developUrl, (e) => log('[save DEV_APP_API_URL]', e))
            }
        } catch (e) {
            log('[save DEV_APP_API_URL] error', e)
        }
        navigation.pop()
    };

    onChangeAddress = (text) => {
        this.setState( {
            developUrl: text
        })
    }

    render() {

        const { navigation } = this.props
        return (
            <View style={{flex: 1}}>
                <View style={{ paddingTop: 8 }}>
                    <HeaderWithBack navigation={navigation} title='Change Develop Environment' />
                </View>

                {this.state.res.label === 'Development' && <TextInput
                    style={styles.input}
                    onChangeText={this.onChangeAddress}
                    placeholder={this.state.currentDevelopUrl}
                    // keyboardType="numeric"
                />}

                <View style={{ top: 0, padding: 20 }}>
                    <Text style={{ fontSize: 13 }}>
                        Options:
                    </Text>

                    { this._renderRadioBtn() }

                </View>
                {
                    this.state.res &&
                    <View style={{ top: 20, width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 13 }}>
                            Selected Environment:
                        </Text>
                        <Text style={{ fontSize: 24 }}>
                            {this.state.res.label}
                        </Text>
                        {this._renderUrl(this.state.res.label)}

                        <View style={styles.subContainer}>
                            <Button
                                style={styles.textInput}
                                title="Save"
                                onPress={() => this.saveEnvironment()} />
                        </View>
                    </View>
                }

            </View>
        );
    }
};

const styles = StyleSheet.create({
    types: {
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#bbb',
        padding: 4,
        borderRadius: 3,
        backgroundColor: '#fff'
    },
    subContainer: {
        marginVertical: 20,
        width: 250
    },
    input: {
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
    },
});


const mapStateToProps = ({ auth: { loading = false, error, token } }) => (console.log("mapStateToProps: ", loading, token, error), {
    error,
    loading,
    token
})
const mapDispatchToProps = (dispatch) => ({
    fetchAuth: (email, password) => dispatch(AuthActions.fetchAuth(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeServerURL)
