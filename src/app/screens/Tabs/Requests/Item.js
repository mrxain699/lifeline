import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react'
import { colors } from '../../../constants/Colors';
import Iconic from '../../../components/ui/Icons/Icons';
import { getFormatedDate } from '../../../utils/Functions';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../api/AuthContentApi';

const ItemContent = ({ icon, style, text }) => {
    return (
        <View style={[style && style, { flexDirection: 'row', alignItems: 'center' }]}>
            <Iconic name={icon} size={22} color={colors.red} />
            <Text style={[styles.text, { fontSize: 16, fontFamily: 'Roboto-Regular', marginLeft: 10, }]}>{text}</Text>
        </View>
    );
}

const Button = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => {onPress()}}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}


const Item = ({ request }) => {
    const navigation = useNavigation();
    const {
        user,
        getUserById
    } = useContext(AuthContext);

    const handleOnMapPress = () => {
        navigation.navigate('Map', {location:request.sender_location});
    }

    const handleOnMessagePress = async (requester_id) => {
        try {
            const reciever = await getUserById(requester_id);
            if(reciever){
                navigation.navigate('ChatScreen', {sender:user, receiver:reciever});
            }
        } catch (error) {
            console.log("Get user by id at : Tabs/RequestItem.js", error);
        }
    }

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemContentConatiner}>
                <ItemContent
                    icon={"person"}
                    text={request.name}
                />
                <ItemContent
                    icon={"call"}
                    text={request.phone}
                />

            </View>
            <View style={[styles.itemContentConatiner, { marginTop: 10 }]}>
                <ItemContent
                    icon={"water"}
                    text={`Blood ${request.blood_group}`}
                />
                <ItemContent
                    icon={"calendar"}
                    text={
                        request.hasOwnProperty('required_date')  ?
                        `${getFormatedDate(new Date(request.required_date), "WWW MMM DD")}` :
                        `${getFormatedDate(new Date(request.createdAt.toDate()), "WWW MMM DD")}`
                    }
                />
            </View>
            <View style={[styles.itemContentConatiner, { marginTop: 20, justifyContent: 'space-around' },]}>
                <Button text="Location" onPress={handleOnMapPress}/>
                <Button text="Message" onPress={() => handleOnMessagePress(request.id)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        shadowColor: 'rgba(0,0,0,0.8)',
        elevation: 2,
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    text: {
        color: colors.grey_200,
    },
    itemContentConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: colors.red_100,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Roboto-Regular'
    }

})

export default Item;

