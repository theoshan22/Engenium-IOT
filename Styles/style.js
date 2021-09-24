const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
loginFormView: {
  flex: 1
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},

addDeviceLeftFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,
  justifyContent: 'flex-start'
},

addDeviceRightFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,
  justifyContent: 'flex-end'
},


loginButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginTop: 50,
  marginLeft: 15,
  marginRight: 15,
  
},

submitButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 60,
  
  marginLeft: 15,
  marginRight: 15,
  flex: 1,
   
  marginTop: 30
  
},
activityIndicator: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  height: 80
},
textViewContainerHeading: {
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: 20,
  color: '#000000',
  fontWeight: 'bold',
},
textViewContainer: {
  paddingLeft: 10,
  paddingRight: 10,
},
touchableOpacityStyle: {
  position: 'absolute',
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  right: 30,
  bottom: 30,
},
floatingButtonStyle: {
  resizeMode: 'contain',
  width: 50,
  height: 50,
  //backgroundColor:'black'
},
};