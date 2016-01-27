/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
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
import dismissKeyboard from 'dismissKeyboard'

// this is a global style sheet to be shared among both ios and android apps
var styles = require("./assets/styles/styles");
var uncheckedImage = require('./assets/images/disabled.png');
var unAvailableImage = require('./assets/images/red.png');
var availableImage = require('./assets/images/green.png');
var hostName = "";

var CustomTextInput = React.createClass({
  getInitialState() {
    return {
      textValue: ''
    }
  },
  render: function() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'blue', borderWidth: 5}}
        onSubmitEditing={this.props.onSubmitPressed(this.state.textValue)}
        onChangeText={(textValue) => this.setState({textValue})}
        value={this.state.textValue}
      />
    );
  }
});

class Reachability extends Component {
  render() {

    return (
      // We use ScrollView for the capability of using keyboardShouldPersistTaps()
      // default behaviour is false and is defined as 
      // "tapping outside of the focused text input when the keyboard is up dismisses the keyboard"
      <ScrollView>
        <View style={styles.horiCenter}>
          <CustomTextInput onSubmitPressed = {this._setHostName} ></CustomTextInput>
        </View>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={uncheckedImage}
          />
          {/* this is essentially a buffer (acts as width: 60%;) */}
          <View style={[styles.flex6]} >
          </View>
          <View style={styles.flex2}>
            <TouchableOpacity onPress={this._checkAvailability}>
            <Text style={[styles.buttonText, styles.green]}>
              Test
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    );
  }
  _setHostName(name){
    if (name != null){
      hostName = name;
    }
  }
  _checkAvailability(){
    console.log(hostName);
  }

}


AppRegistry.registerComponent('Reachability', () => Reachability);
