import React, { Component } from 'react'
import {Button, Text, TextInput, View, StyleSheet, Alert} from 'react-native';
import { connect } from 'react-redux';
import AuthActions from "../../Stores/Auth";
import AsyncStorage from "@react-native-community/async-storage";
import log from "../../Utils/log";
import Configs from "../../Configs"
import Constants from "../../Constants";

class SignInWithMail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "a1",
            email: "hvn001@mail.com"
        };
    }

    login(){
        const {email, password} = this.state
        const {fetchAuth, navigation, token, error} = this.props
        fetchAuth(email, password)
    }

    pop = async () => {
        const {navigation} = this.props
        try {
            await AsyncStorage.setItem(Constants.KEYS.DEV_ENV, Configs.ENVIRONMENT.DEV, (e) => log('[saveDEV_APP_API_URL]', e))
        } catch (e) {
            log('[saveDEV_APP_API_URL] error', e)
        }
        navigation.pop();
    };

    render() {
        const {token, navigation} = this.props
        const { email, password } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, height: 50 }}>Login!</Text>
                    </View>
                    <View style={styles.subContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Password'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <Button
                            style={styles.textInput}
                            title="Login"
                            onPress={() => this.login()} />
                    </View>
                    <View style={styles.subContainer}>
                        <Button
                            style={styles.textInput}
                            title="Back"
                            onPress={() => this.pop()} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 400,
        padding: 20
    },
    subContainer: {
        marginBottom: 20,
        padding: 5,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 18,
        margin: 5,
        width: 300,
        borderWidth: 1,
        borderRadius: 10
    },
})

const mapStateToProps = ({ auth: { loading = false, error, token } }) => (console.log("mapStateToProps: ", loading, token, error), {
    error,
    loading,
    token
})
const mapDispatchToProps = (dispatch) => ({
    fetchAuth: (email, password) => dispatch(AuthActions.fetchAuth(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInWithMail)
