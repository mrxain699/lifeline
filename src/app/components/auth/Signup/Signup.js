import React, {useState, useContext, useEffect} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { globalStyles } from '../../../constants/Style';
import { colors } from '../../../constants/Colors';
import Label from '../../ui/Form/Label';
import Input from '../../ui/Form/Input';
import Button from '../../ui/Form/Button';
import Iconic from '../../ui/Icons/Icons';
import { AuthContext } from '../../../api/AuthContentApi';

const Signup = ({ navigation }) => {
    const {register, error, setError} = useContext(AuthContext);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [iconName, setIconName] = useState('eye-off-outline');
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const iconHandler = () => {
        if(iconName === "eye-off-outline"){
            setIconName('eye-outline');
            setSecureTextEntry(false);
        }
        else{
            setIconName('eye-off-outline');
            setSecureTextEntry(true);
        }
    }

    useEffect(()=>{
        if(error){
            setTimeout(() => {
                setError(null);
                
            }, 5000)
        }
    }, [error]);

    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
            <View style={[globalStyles.authHeadingContainer, { paddingTop: 20 }]}>
                <Text style={globalStyles.authHeading}>LifeLine</Text>
                <Text style={globalStyles.authSubheading}>Create an account</Text>
            </View>
            {
                error && <View style={globalStyles.errorContainer}>
                    <Text style={globalStyles.error}>{error}</Text>
                </View>
            }
            <View style={globalStyles.authInputContainer}>
                <Label label="Name" />
                <Input
                    cursorColor={colors.black}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Label label="Email" />
                <Input
                    autoComplete='email'
                    inputMode="email"
                    keyboardType="email-address"
                    cursorColor={colors.black}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Label label="Password" />
                <Input
                    secureTextEntry={secureTextEntry}
                    cursorColor={colors.black}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Iconic name={iconName} size={18} color="#8c8c8c" style={{position:'absolute', bottom:35, right:40}} onPress={()=>iconHandler()} />
            </View>
            <View style={globalStyles.authButtonContainer}>
                <Button text="Signup" onPress={()=>register(name, email, password)}/>
            </View>
        </ScrollView>
    )
}

export default Signup
