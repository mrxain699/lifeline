import {PERMISSIONS, request} from 'react-native-permissions';


export const requestForLocation = async () => {
    try {
       const result  =  await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
       if(result){
        return result;
       }
    } catch (error) {
        console.log(error);
    }

}


export const requestForNotification = async () => {
    try {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if(result){
            return result;
        }
    } catch (error) {
        console.log(error)
    }
}

export const requestForStorage = async () => {
    try {
        const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        if(result){
            return result;
        }
    } catch (error) {
        console.log(error);
    }
  
   
}
