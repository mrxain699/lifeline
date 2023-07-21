import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { globalStyles } from '../../constants/Style'
import History from '../../components/History/History'
import { bloodrequests } from '../../database/Collections'
import { AuthContext } from '../../api/AuthContentApi'
const HistoryScreen = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  const getAcceptedRequest = async () => {
    try {
      const querySnapshot = await bloodrequests
        .where('request_approved', '==', 1)
        .where('id', '==', user.id)
        .orderBy('createdAt', 'desc')
        .get();
      if (querySnapshot.size > 0) {
        let requests_arr = [];
        const querySnapshot_2 = await bloodrequests
          .where('request_approved', '==', 1)
          .where('donor_id', '==', user.id)
          .orderBy('createdAt', 'desc')
          .get();
        querySnapshot.forEach(documentSnapshot => {
          requests_arr.push(documentSnapshot.data());
        })
        
        if (querySnapshot_2.size > 0) {
          querySnapshot_2.forEach(documentSnapshot => {
            requests_arr.push(documentSnapshot.data());
          })
        }
        else{
          console.log("Error on 2")
        }
        setRequests(requests_arr);
      }
      else {
        console.log("Error  on 1");
      }
    } catch (error) {
      console.log("Fetch Requests error in HistoryScreen.js", error)
    }
  }



  useEffect(() => {
    getAcceptedRequest();
  }, [])


  useEffect(() => {
    if(requests.length > 0){
      console.log(requests)
    }
  }, [requests])

  return (
    <SafeAreaView srtle={globalStyles.wrapper}>
      <History />
    </SafeAreaView>
  )
}

export default HistoryScreen;