import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { globalStyles } from '../../../constants/Style';
import { colors } from '../../../constants/Colors';
import Label from '../../ui/Form/Label';
import Input from '../../ui/Form/Input';
import Button from '../../ui/Form/Button';

const ForgotPassword = ({navigation}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
            <View style={[globalStyles.authHeadingContainer, {paddingTop:40}]}>
                <Text style={globalStyles.authHeading}>LifeLine</Text>
                <Text style={globalStyles.authSubheading}>Forgot Password</Text>
            </View>
            <View style={[globalStyles.authInputContainer, {marginBottom:0}]}>
                <Label label="Email" />
                <Input
                    autoComplete='email'
                    inputMode="email"
                    keyboardType="email-address"
                    cursorColor={colors.black}
                />
            </View>
            <View style={[globalStyles.authButtonContainer, {marginTop:0}]}> 
               <Button text="Send" />
            </View>
        </ScrollView>
    )
}

export default ForgotPassword;
