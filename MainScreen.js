//
// SUB SCREEN
//
// First Screen used for:
//  - Searching subreddits
//  - View favourite subreddits
//  - View history
//

'use strict';

var React = require('react-native');

var SectionTitle = require('./SectionTitle');
var SubRow = require('./SubRow');

var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} = React;

var MainScreen = React.createClass({
  getInitialState: function() {
    return ({
      favourites: [
        'all',
        'gaming',
        'javascript',
      ],
      history: [
        'all',
        'nothing',
      ],
    });
  },
  isFavourite: function(subredditName) {
    if (this.state.favourites.indexOf(subredditName) > -1) {
      return true;
    } else {
      return false;
    }
  },
  toggleFavourite: function(subredditName) {
    var index = this.state.favourites.indexOf(subredditName);
    if (index > -1) {
      this.state.favourites.splice(index, 1);
      this.forceUpdate();
      return false;
    } else {
      this.state.favourites.push(subredditName);
      this.forceUpdate();
      return true;
    }
  },
  renderRow: function(subredditName, id) {
    return (<SubRow
      key={id}
      subredditName={subredditName}
      navigator={this.props.navigator}
      isFavourite={this.isFavourite.bind(null, subredditName)}
      toggleFavourite={this.toggleFavourite.bind(null, subredditName)} />);
  },
  render: function() {
    return(
      <ScrollView
        style={styles.main}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
      >
      <SectionTitle title="FAVOURITES" />
        {this.state.favourites.map((subredditName, id) => {
          return this.renderRow(subredditName, id);
        })}
      <SectionTitle title="HISTORY" />
        {this.state.history.map((subredditName, id) => {
          return this.renderRow(subredditName, id);
        })}
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 64,
    flexDirection: 'column',
    backgroundColor: '#FCFEFF',
  },
});

module.exports = MainScreen;
