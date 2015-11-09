
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var ActionButton = React.createClass({
  render: function() {
    return (
      <TouchableHighlight style={[styles.actionButton, this.props.lightStyle && styles.actionButtonLight]} onPress={this.props.onPress}>
        <Text style={[styles.actionButtonLabel, this.props.lightStyle && styles.actionButtonLabelLight]} >{this.props.label}</Text>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  actionButton: {
    margin: 10,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#12B35F',
    shadowColor: '#12B35F',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: .5,
    shadowRadius: 0,
    height: 44,
    alignItems: 'center',
  },
    actionButtonLabel: {
      fontWeight: '600',
      color: '#FCFEFF',
      fontSize: 16,
      marginTop: 2,
    },
  actionButtonLight: {
    backgroundColor: '#F2F8FA',
  },
    actionButtonLabelLight: {
      color: "#08384D",
      fontWeight: '400',
    },
});

module.exports = ActionButton;
