import React, { useState } from 'react'
import { View, StyleSheet} from 'react-native';
import { globalStyles } from '../../constants/Style';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from './components/Button';
import Title from './components/Title';
const BloodGroup = () => {
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
        <View style={[globalStyles.wrapper, {paddingHorizontal:20,}]}>
           <Title title="Your Blood Group" />
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder='Select Blood Group'
                style={styles.dropdown}
                maxHeight={400}
            />
            <Button/>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown:{
        marginTop:30,
    },
   
})

export default BloodGroup
