import * as SecureStore from 'expo-secure-store';

export  const SERVER_URL = "http://engenium.dedicated.co.za:2628/";
export  const LOGIN_URL = SERVER_URL+"UserMethods/userLogin";
export  const GET_WATER_EVENT_URL =  SERVER_URL+"UserMethods/deviceWaterEvents";
export  const ADD_DEVICE_URL = SERVER_URL+"UserMethods/deviceCreate";

 

export const CLIENTID = "ClientID";
export const CLIENT_AREA = "ClientArea";
export const CLIENT_NAME = "ClientName";
export const CLIENT_LONG = "CLIENTLONG";
export const CLIENT_LAT = "CLIENTLAT";


export async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
export async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } 
    else {
      return 0;
    }
  }