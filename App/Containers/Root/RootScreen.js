import React, { Component } from "react";
import { connect } from 'react-redux'
import AppNavigator from "../../Navigator/AppNavigator"
import NavigationService from "../../Services/NavigationService"
import StartupActions from "../../Stores/Startup"

class RootScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        const {startup} = this.props
        // startup()
    }

    render() {
        return (
            <AppNavigator
                ref={(navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}
            />
        )
    }
}

const mapStateToProps = ({}) => {
    return {}
}

const mapDispatchToProps = (dispatch) => ({
    startup: () => dispatch(StartupActions.startup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);

// export default RootScreen

