/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import dismissKeyboard from 'dismissKeyboard';
import React, {
  AppRegistry,
  Component,
  TextInput,
  Flexbox,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from 'react-native';

// this is a global style sheet to be shared among both ios and android apps
var styles = require("./assets/styles/styles");

// this is the android module for checking availability of a host
var ReachabilityAndroid = require('./native_modules/js_modules/ReachabilityAndroid');

// this is the provided method for testing the availability
// ReachabilityAndroid.test(url);

class Reachability extends React.Component {

  constructor(props){
    super(props)
    Reachability.context = this;
    this.fields = {
      hostAddress     : '',
      uncheckedImage  : require('./assets/images/disabled.png'),
      unAvailableImage: require('./assets/images/red.png'),
      availableImage  : require('./assets/images/green.png'),
      currentImage    : null,
      tempHack        : false,
    }
    this.state = {
      ...this.fields,
    }
  }
  render() {
    return (
      // We use ScrollView for the capability of using keyboardShouldPersistTaps()
      // default behaviour is false and is defined as 
      // "tapping outside of the focused text input when the keyboard is up dismisses the keyboard"
      <ScrollView>
        <TextInput
          ref="hostAddress"
          onChangeText={(text) => {
            this.fields.hostAddress = text
            if ((this.fields.hostAddress !== "") && (this.fields.hostAddress !== null)){
              this.setState({
                hostAddress: this.fields.hostAddress,
                currentImage: this.fields.uncheckedImage,
              })
            }
            else{
              this.setState({
                hostAddress: this.fields.hostAddress,
                currentImage: null,
              })
            }}}
          style={{height: 40, borderColor: 'blue', borderWidth: 5}}
          onSubmitEditing={this._releaseFirstResponder}
        />
        <View style={styles.row}>
          <View style={[styles.flex2]}>
          { this.state.currentImage &&
            <Image
              style={styles.image}
              source={this.state.currentImage}
            />
          }
          </View>
          {/* this is essentially a buffer (acts as width: 60%;) */}
          <View style={[styles.flex6]}></View>

          <View style={styles.flex2}>
            <TouchableOpacity onPress={ () =>{
                this._checkHostName(this.state.hostAddress)
              }}>
            <Text style={[styles.buttonText, styles.green]}>
              Test
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  _releaseFirstResponder(){
    dismissKeyboard();
  }

  async _checkHostName(hostName) {
    try {
      var success = await ReachabilityAndroid.test(hostName);
      if(success === true){
        this.setState({
          currentImage: this.fields.availableImage,
        })
      }
      else{
        this.setState({
          currentImage: this.fields.unAvailableImage,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
}

AppRegistry.registerComponent('Reachability', () => Reachability);
