import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../../../constants/Colors';
const Alert = ({ show, currentPress, newPress }) => {
    return (
        <AwesomeAlert
            show={show}
            showProgress={false}
            title="Share Your Location"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Current"
            confirmText="New"
            confirmButtonColor={colors.green}
            cancelButtonColor={colors.red}
            titleStyle={{
                color: colors.red,
                fontFamily: 'Roboto-Bold'
            }}
            cancelButtonStyle={{
                paddingVertical: 8,
                paddingHorizontal: 25,
            }}
            confirmButtonStyle={{
                paddingVertical: 8,
                paddingHorizontal: 25,
            }}
            onCancelPressed={() => {
                currentPress() && currentPress();
            }}
            onConfirmPressed={() => {
                newPress() && newPress();
            }}
        />
    )
}

export default Alert

