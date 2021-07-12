import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from 'react-redux';
import { RouterName } from "../../Navigator/RouteName";
import NavigationService from "../../Services/NavigationService";
import StartupActions from "../../Stores/Startup"
import { Colors, Images } from "../../Theme";

class Splash extends Component {

    constructor(){
        super();
        this.state = {}
    }

    componentDidMount(){
        const {startup} = this.props;
        startup()
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const {navigation, startupReducer} = nextProps;
        try {
            NavigationService.navigateAndReset(startupReducer.token != null ? RouterName.HomeNavigator : RouterName.Login)
        } catch (e) {
            console.log(e)
        }
        
        return {}
    }

    render() {
        return <View style={{backgroundColor: Colors.backgroundCompleteScreen, flex:1}}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image style={{width: 135, height: 102}} source={Images.icSplash}></Image>
            </View>
            
            <View style={{justifyContent: "center", alignItems: "center", marginBottom: 30}}>
                <Image style={{width: 68, height: 32}} source={Images.icLogoClip}></Image>
            </View>
        </View>
    }
}

const mapStateToProps = ({startupReducer}) => {
    return {startupReducer}
}

const mapDispatchToProps = (dispatch) => ({
    startup: () => dispatch(StartupActions.startup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
