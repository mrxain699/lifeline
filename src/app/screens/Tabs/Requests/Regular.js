import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { bloodrequests } from '../../../database/Collections';
import { AuthContext } from '../../../api/AuthContentApi';
import Item from './Item';
const Regular = () => {
  const {user, currentUserId} = useContext(AuthContext)
  const [normalRequests, setNormalRequests] = useState([]);


  const getNormalRequests = async () => {
    try {
      let requests = [];
      const querySnapshot = await bloodrequests.where('id', '!=', `${currentUserId}`).get();
      if(querySnapshot.size > 0){
        querySnapshot.forEach((documentSnapshot) => {
          requests.push(documentSnapshot.data());
        });
        setNormalRequests(requests);        
      }
    } catch (error) {
      console.log("Get Normal Requests Error : ", error);
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {getNormalRequests()}, 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={normalRequests}
        renderItem={({item}) => <Item request={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:25,
    paddingVertical:20,
  }
})

export default Regular

