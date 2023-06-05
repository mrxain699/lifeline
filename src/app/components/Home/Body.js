import React, {useState, useContext} from 'react'
import { View, StyleSheet } from 'react-native';
import Item from './Item';
import { images } from '../../constants/Images';
import { AppContext } from '../../api/AppContentApi';
const Body = () => {
  const {user,toggleStatus} = useContext(AppContext);
  const [toggleImage, setToggleImage] = useState(images.toggle_off_icon);

  const toggle_switch = () => {
    if(user.status === 1){
      setToggleImage(images.toggle_off_icon);
      toggleStatus(0);
    }
    else{
      setToggleImage(images.toggle_on_icon);
      toggleStatus(1);
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
