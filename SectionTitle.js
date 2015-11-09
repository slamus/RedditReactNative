//
// SECTION TITLE
//
// A component used to keep everything aesthetically coherent
//

'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

var SectionTitle = React.createClass({
  render: function() {
    return (
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{this.props.title}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  sectionTitle: {
    flex: 1,
    backgroundColor: '#FCFEFF',
    height: 36,
    paddingTop: 8,
    paddingLeft: 20,
  },
  sectionTitleText: {
    flex: 1,
    color: '#12B35F',
    fontSize: 16,
    fontWeight: '600',
  },
});


module.exports = SectionTitle;
