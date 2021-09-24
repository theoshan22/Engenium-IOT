import React, { Component } from "react"; 
import * as Constants from '../Config/config';
import styles from "../Styles/style";
import {Keyboard,  Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView,ToastAndroid} from 'react-native';
import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';



export default class LoginScreen extends Component {

  constructor(props) {
  
    super(props);
    this.state = {
        username: "",
        password: "",
        loading:false
    };
  }

setUsername(username) {
   this.setState({ username : username })
  }

setPassword(password) {
    this.setState({ password: password })
 }
   
 setLoading(loading) {
  this.setState({ loading: loading })
}


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
     
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Engenium-IOT</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" 
                       style={styles.loginFormTextInput} 
                       onChangeText={(username) => this.setUsername(username)}
                       value={this.state.username}
            />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" 
                       style={styles.loginFormTextInput} 
                       secureTextEntry={true}
                       onChangeText={(password) => this.setPassword(password)}
                       value={this.state.password}
                       />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
           
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView> 
      </RootSiblingParent>
    );
  }

   async onLoginPress() {

   this.setLoading(true)

   const { navigate } = this.props.navigation;

    try {

    let value = await this.registerForPushNotificationsAsync();
     
    console.debug(value); 
    let res = await fetch( Constants.LOGIN_URL, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify( {
        'username': this.state.username,
        'password': this.state.password,
        'fcm'      : value
      })
      
    });


        res = await res.json();
       
        if(res.pass==true)
        {

        
          Constants.save(Constants.CLIENTID,res.user.ClientID+"");
          Constants.save(Constants.CLIENT_AREA,res.user.Client_Area+"");
          Constants.save(Constants.CLIENT_NAME,res.user.Client_Name+"");
          Constants.save(Constants.CLIENT_LAT,res.user.Latitude+"");
          Constants.save(Constants.CLIENT_LONG,res.user.Longitude+""); 
          this.setLoading(false)

          navigate("Home")

        }

        else
        {
          this.setLoading(false)
          let toast = Toast.show('Invalid Credentials', {
            duration: Toast.durations.LONG,
          });
          
          

        }
  
     
      
      } catch (e) {
        console.error(e);
      }

  }

  async registerForPushNotificationsAsync() {
    let token;
    if (true) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } 
    
    else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  
}