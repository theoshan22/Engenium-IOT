import React, { Component } from "react"; 
import * as Constants from '../Config/config';
import styles from "../Styles/style";
import {Keyboard,  Image,TouchableOpacity,Text, View, TouchableWithoutFeedback, KeyboardAvoidingView,ToastAndroid} from 'react-native';
import ListView from "deprecated-react-native-listview";
import Spinner from 'react-native-loading-spinner-overlay';
import { RootSiblingParent } from 'react-native-root-siblings';


export default class HomeScreen extends Component {

    constructor(props) {
    
      super(props);
      this.state = {
            loading:true,
          
          
      }; 
    
    }

    async  componentDidMount() {
        //calling Web Service just after screen is loaded
        this.setLoading(true);
        clientid = await Constants.getValueFor(Constants.CLIENTID);     
      
        return fetch(Constants.GET_WATER_EVENT_URL,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
            'clientId': clientid     
          })
        })
          .then(response => response.json())
          .then(responseJson => {

            console.debug(responseJson.data);
            let ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2,
            });
            this.setState({
              loading: false,
              dataSource: ds.cloneWithRows(responseJson.data),
              
            });
          })
          .catch(error => {
            console.error(error);
          });
    }

    ListViewItemSeparator = () => {
        //Divider for the list item
        return (
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#080808' }}
          />
        );
    };

    setLoading(loading) {
    this.setState({ loading: loading })
    }
    
    render() {
     
      if(!this.state.loading){
    
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

        
          <ListView
            dataSource={this.state.dataSource}
            renderSeparator={this.ListViewItemSeparator}
            renderRow={rowData => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  paddingTop: 16,
                  paddingBottom: 16,
                }}>
                <Text style={styles.textViewContainerHeading}>
                  {"Device:"+rowData.DeviceId}
                </Text>
                <Text style={styles.textViewContainer}>{"Water Present : "+rowData.Sensor_WaterPresent}</Text>
                <Text style={styles.textViewContainer}>{"Last Updated : "+  new Date(rowData.DateTime.replace(/[^0-9]/g, '')*1000).toLocaleString()}</Text>
                <Text style={styles.textViewContainer}>{"Battery : "+ Math.floor(rowData.Sensor_Battery*23.199) +" %"}</Text>

              
              </View>
            )}
          />
            <TouchableOpacity
          activeOpacity={0.7}
          onPress={ this.addDevice.bind(this)}
          style={styles.touchableOpacityStyle}>
          <Image
             
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
        </View>    
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView> 
        </RootSiblingParent>
      );
      }

      else
      {
        
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
 
          
        </View>    
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView> 
        </RootSiblingParent>
      );


      }
    }
  
    addDevice()
    {
      const { navigate } = this.props.navigation;           
      navigate("AddDevice") 

    }
    
  }