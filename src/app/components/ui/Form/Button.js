import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '../../../constants/Colors';
const Button = ({text}) => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        width:'100%',
        height:'100%',
        borderRadius: 100, 
        backgroundColor: colors.red_200,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: colors.white, 
        fontSize: 22, 
        fontFamily: 'Kalam-Regular'
    },
});

export default Button;
