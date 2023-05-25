import { Platform } from "react-native";

export function importGoogleAds(){
    if(Platform.OS !== 'web'){
        return require('react-native-google-mobile-ads');
    }else{
        return null;
    }
}