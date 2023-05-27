import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { globalStyles } from '../../../constants/Style';
import { colors } from '../../../constants/Colors';
import Label from '../../ui/Form/Label';
import Input from '../../ui/Form/Input';
import Button from '../../ui/Form/Button';


const Signup = ({ navigation }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
            <View style={[globalStyles.authHeadingContainer, { paddingTop: 20 }]}>
                <Text style={globalStyles.authHeading}>LifeLine</Text>
                <Text style={globalStyles.authSubheading}>Create an account</Text>
            </View>
            <View style={globalStyles.authInputContainer}>
                <Label label="Name" />
                <Input
                    cursorColor={colors.black}
                />
                <Label label="Email" />
                <Input
                    autoComplete='email'
                    inputMode="email"
                    keyboardType="email-address"
                    cursorColor={colors.black}
                />
                <Label label="Address" />
                <Input
                    cursorColor={colors.black}
                />
                <Label label="Password" />
                <Input
                    secureTextEntry={true}
                    cursorColor={colors.black}
                />
            </View>
            <View style={globalStyles.authButtonContainer}>
                <Button text="Signup" />
            </View>
        </ScrollView>
    )
}

export default Signup
