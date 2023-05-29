import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native';
import Item from './Item';
import { images } from '../../constants/Images';

const Body = () => {
  const [toggleImage, setToggleImage] = useState(images.toggle_off_icon);
  const [isToggle, setIsToggle] = useState(false);

  const toggle_switch = () => {
    if(isToggle){
      setToggleImage(images.toggle_off_icon);
      setIsToggle(false);
    }
    else{
      setIsToggle(true);
      setToggleImage(images.toggle_on_icon);
    }
  };

  return (
    <View style={styles.container}>
        <Item title="Blood Request" image={images.heart_icon}/>
        <Item title="Urgent Blood Request" image={images.blood_bag_icon}/>
        <Item title="Available to Donate" image={toggleImage} onPress={toggle_switch}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height:400,
        marginTop:20,
        marginHorizontal:20,
    }
});

export default Body;
