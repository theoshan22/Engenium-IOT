import React, { Component } from "react"; 
import * as Constants from '../Config/config';
import styles from "../Styles/style";
import {Keyboard,  Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView,ToastAndroid} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { RootSiblingParent } from 'react-native-root-siblings';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import Toast from 'react-native-root-toast';
import { Button } from 'react-native-elements';
export default class AddDeviceScreen extends Component {

  constructor(props) {
  
    super(props);
    this.state = {        
        scannedValue:'',
        scanned:false,
        hasPermission:null,
        loading:false,
        device_id :'',
        device_serial:'',
        long :null,
        lat : null,
        device_name : '',
    };
   
    
    
  }


  getLocation = async () =>
  {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        let toast = Toast.show('No GPS Permision', {
            duration: Toast.durations.LONG,
          });
          
          

      return;
    }

    

    let location = await Location.getCurrentPositionAsync({});
    this.setLat(location.coords.longitude);
    this.setLong(location.coords.latitude);
  
      

  }

  setLong(locationF)
  {
    this.setState({long:locationF})      
  }

  setSerial(serial)
  {
    this.setState({device_serial:serial})      
  }

  setLat(locationF)
  {
    this.setState({lat:locationF})      
  }
  setHasPermission(permission)
    {
    this.setState({hasPermission:permission})      
    }

  setScanned(permission)
    {
    this.setState({scanned:permission})      
    }

  setDeviceId(device)
    {

        this.setState({device_id:device})      
    }
    setDeviceName(device)
    {

        this.setState({device_name:device})      
    }
  
  

  setScannedValue(value) {
    this.setState({ scannedValue: value })
   }
   
   setLoading(loading) {
  this.setState({ loading: loading })
   }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setScanned(true);
    this.setDeviceId(data.split(".")[0])
    this.setSerial(data.split(".")[1])
    await this.getLocation();
    ///alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
     
    return (

      
      <RootSiblingParent>   
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
        <View style={styles.loginScreenContainer}>

        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
     
       <BarCodeScanner
        onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
        style={{ height: 200, width: '100%', backgroundColor: '#080808' }}
        />
          <TextInput placeholder="Device Id" placeholderColor="#c4c3cb" 
                       style={styles.loginFormTextInput} 
                       secureTextEntry={false}
                       onChangeText={(device_id) => this.setDeviceId(device_id)}
                       value={this.state.device_id}
                       editable={false}
                       />


                       
        <TextInput placeholder="Device Serial" placeholderColor="#c4c3cb" 
                       style={styles.loginFormTextInput} 
                       secureTextEntry={false}
                       onChangeText={(device_serial) => this.setSerial(device_serial)}
                       value={this.state.device_serial}
                       editable={false} 
                       />


        <TextInput placeholder="Device Name" placeholderColor="#c4c3cb" 
                       style={styles.loginFormTextInput} 
                       secureTextEntry={false}
                       onChangeText={(device_name) => this.setDeviceName(device_name)}
                       value={this.state.device_name}
                      
                       />



        <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TextInput placeholder="Longitude" style={styles.addDeviceLeftFormTextInput } 
                         editable={false} 
                         onChangeText={(long) => this.setLong(long)}
                         value={this.state.long==null?null:this.state.long.toString()}
                        
                        />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder="Latitude" style={styles.addDeviceRightFormTextInput} 
                         editable={false}
                         onChangeText={(lat) => this.setLat(lat)}
                         value={this.state.lat==null?null:this.state.lat.toString()}
                        />
                    </View>
                </View>

               

                <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.submit()}
              title="Add Device"
            />
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView> 
      </RootSiblingParent>
    );
  }


 async submit()
  {
        this.setLoading(true);
        clientid = await Constants.getValueFor(Constants.CLIENTID);     

        if(this.state.lat==null || this.state.device_name.length==0 || this.state.device_id.length==0  )
        {
            let toast = Toast.show('Please Complete All Fields.', {
                duration: Toast.durations.LONG,
              });
              this.setLoading(false); 
        }

        else
        {

            try {
 
            
              let res = await fetch( Constants.ADD_DEVICE_URL, {
                method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify( {
                  'deviceId': this.state.device_id,
                  'serial': this.state.device_serial,      
                  'type': "101", ///water type devices
                  'description': this.state.device_name,
                  'lng': this.state.long,
                  'lat': this.state.lat,
                  'name': this.state.device_name,
                  'clientId': clientid,
                })
                
              });
          
          
                  res = await res.json();
                  console.debug(res);
                  if(res.pass==true)
                  { 
                    this.setLoading(false);  
                    let toast = Toast.show('Successfully Added Device', {
                        duration: Toast.durations.LONG,
                      }); 
                  }
          
                  else
                  {
                    this.setLoading(false)
                    let toast = Toast.show('Failed To Add Devices', {
                      duration: Toast.durations.LONG,
                    }); 
                  }
            
               
                
                } catch (e) {
                  console.error(e);
                }
          





        }

  }

  
}