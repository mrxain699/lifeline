import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';


const DonorDetail = ({route}) => {
  const [donor, setDonor] = useState(route.params.donor);
  return (
    <View>
      <Text style={{color:'#000'}}>{donor.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default DonorDetail

