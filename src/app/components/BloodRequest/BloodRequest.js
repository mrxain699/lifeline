import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';
import Label from '../ui/Form/Label';
import Input from '../ui/Form/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
import { ScrollView } from 'react-native-gesture-handler';
import Iconic from '../ui/Icons/Icons';
import { useNavigation } from '@react-navigation/native';
const BloodRequest = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { formattedAddress } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'A+', value: 'A+' },
        { label: 'B+', value: 'B+' },
        { label: 'A-', value: 'A-' },
        { label: 'B-', value: 'B-' },
        { label: 'AB+', value: 'AB+' },
        { label: 'AB-', value: 'AB-' },
        { label: 'O+', value: 'O+' },
        { label: 'O-', value: 'O-' },
    ]);


    return (
        <KeyboardAvoidingView style={globalStyles.wrapper}>
            <View style={styles.heading}>
                <Text style={styles.headingText}>Create Blood Request</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true} nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.inputsContainer}>
                    <Label label="Name" style={{ color: colors.red, marginLeft: 8 }} />
                    <View style={styles.inputContainer}>
                        <Input
                            placehokder="Name"
                            defaultValue={user.name && user.name}
                            placeholderTextColor={colors.grey}
                            style={[styles.input, { borderWidth: 0, marginTop: 0, }]}
                        />
                    </View>
                    <Label label="Phone" style={{ color: colors.red, marginLeft: 8, marginTop: 20 }} />
                    <View style={styles.inputContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.defaultText}>+92</Text>
                        </View>
                        <View style={styles.verticalDivider}></View>
                        <TextInput
                            inputMode='numeric'
                            placeholder='eg:03123456789'
                            placeholderTextColor={colors.grey}
                            defaultValue={user.phone && user.phone}
                            maxLength={11}
                            cursorColor={colors.black}
                            style={styles.input}

                        />
                    </View>
                    <Label label="Address" style={{ color: colors.red, marginLeft: 8, marginTop: 20 }} />
                    <View style={styles.addressContainer}>
                        <View style={styles.address}>
                            <Text style={styles.userAddress}>{formattedAddress.substr(0, 50).concat('...')}</Text>
                        </View>
                        <TouchableOpacity style={styles.markerButton} >
                            <Iconic name="location" size={24} color={colors.red} onPress={() => { 
                                navigation.navigate('Map')
                            }} />
                        </TouchableOpacity>
                    </View>
                    <Label label="Blood Group" style={{ color: colors.red, marginLeft: 8, marginTop: 20 }} />
                    <View style={styles.inputContainer}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder='Select Blood Group'
                            maxHeight={150}
                            onChangeValue={(value) => setValue(value)}
                            style={styles.dropdown}
                            listMode="SCROLLVIEW"
                            dropDownDirection="Bottom"
                            dropDownContainerStyle={{
                                borderWidth: 0,
                            }}

                        />

                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    heading: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        color: colors.red,
        fontFamily: 'Kalam-Regular',
        fontSize: 26
    },
    inputsContainer: {
        paddingHorizontal: 30,


    },
    inputContainer: {
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginTop: 5,

    },
    textContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    defaultText: {
        color: colors.grey_100,
        fontSize: 18,
        fontFamily: 'Kalam-Regular',


    },
    verticalDivider: {
        height: '50%',
        width: .5,
        marginTop: 12,
        backgroundColor: colors.grey
    },
    input: {
        width: '100%',
        height: '100%',
        color: colors.black,
        paddingHorizontal: 10,
        alignItems: 'center',
        fontSize: 18,
        zIndex: -1
    },
    dropdown: {
        borderColor: colors.white,
        borderRadius: 15,
    },
    button: {
        marginTop: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red,
        marginHorizontal: 30,
        marginTop: 40,
        borderRadius: 100,
        zIndex: -1,

    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Roboto-Regular'
    },
    addressContainer: {
        marginTop: 5,
        backgroundColor: colors.white,
        height: 50,
        elevation: 3,
        borderRadius: 15,
        flexDirection: 'row',
    },
    address: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexWrap: 'wrap',
        width: '85%',
    },
    markerButton: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userAddress: {
        color: colors.grey_100,
        fontSize: 16
    }
});

export default BloodRequest

