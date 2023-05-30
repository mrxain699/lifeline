import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/Colors'

const Button = () => {
    return (

        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.button}>Save</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:100,
        marginTop:20,
        zIndex:-1,
        backgroundColor:colors.red,

    },
    button:{
        fontFamily:'Roboto-Regular',
        fontSize:18,
        color:colors.white
    }
})

export default Button

