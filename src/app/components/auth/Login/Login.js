import React from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../constants/Style';
import { colors } from '../../../constants/Colors';
import Label from '../../ui/Form/Label';
import Input from '../../ui/Form/Input';
import Button from '../../ui/Form/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
            <View style={globalStyles.authHeadingContainer}>
                <Text style={globalStyles.authHeading}>LifeLine</Text>
                <Text style={globalStyles.authSubheading}>Login your account</Text>
            </View>
            <View style={globalStyles.authInputContainer}>
                <Label label="Email" />
                <Input
                    autoComplete='email'
                    inputMode="email"
                    keyboardType="email-address"
                    cursorColor={colors.black}
                />
                <Label label="Password" />
                <Input
                    secureTextEntry={true}
                    cursorColor={colors.black}
                    type="password"
                />
                <TouchableOpacity style={{position:'absolute', top:-20}}>
                    <Icon name="eye" size={18} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.smallTextContainer} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={globalStyles.smallText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <View style={globalStyles.authButtonContainer}>
                <Button text="Login" />
            </View>
            <View style={globalStyles.divider}>
                <Text style={globalStyles.dividerText}>or</Text>
            </View>
            <View style={globalStyles.authButtonContainer}>
                <TouchableOpacity style={globalStyles.googleButton}>
                    <Image source={require('../../../assets/images/google.png')} style={globalStyles.googleButtonImage} resizeMode='contain' />
                    <Text style={globalStyles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.smallTextContainer, { marginTop: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                <Text style={globalStyles.smallText}>Not a member?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                    <Text style={[globalStyles.smallText, { fontWeight: 'bold', marginLeft: 2, fontSize: 14 }]}>Signup</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Login
