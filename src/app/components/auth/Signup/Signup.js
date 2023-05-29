import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { globalStyles } from '../../../constants/Style';
import { colors } from '../../../constants/Colors';
import Label from '../../ui/Form/Label';
import Input from '../../ui/Form/Input';
import Button from '../../ui/Form/Button';
import Iconic from '../../ui/Icons/Icons';

const Signup = ({ navigation }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [iconName, setIconName] = useState('eye-outline');

    const iconHandler = () => {
        if(iconName === "eye-outline"){
            setIconName('eye-off-outline');
            setSecureTextEntry(false);
        }
        else{
            setIconName('eye-outline');
            setSecureTextEntry(true);
        }
    }

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
                    secureTextEntry={secureTextEntry}
                    cursorColor={colors.black}
                />
                <Iconic name={iconName} size={18} color="#8c8c8c" style={{position:'absolute', bottom:35, right:40}} onPress={()=>iconHandler()} />
            </View>
            <View style={globalStyles.authButtonContainer}>
                <Button text="Signup" />
            </View>
        </ScrollView>
    )
}

export default Signup
