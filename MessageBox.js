//
// MESSAGE BOX
//
// A simple message module for user feedback
//

"use strict"

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;


var MessageBox = React.createClass({
  render: function() {
    if (this.props.msg) {
      return (
        <View style={[styles.messageBox, this.props.style]}>
         <Text style={styles.messageBoxText}>{this.props.msg}</Text>
        </View>
      );
    }
    return (<View></View>);
  },
});

var styles = StyleSheet.create({
  messageBox: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  messageBoxText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#08384D',
    opacity: .7,
  },
});

module.exports = MessageBox;
