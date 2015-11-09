//
// IOS APP ENTRY POINT
//
// RedditReact is a simple reddit browsing and exploring app.
// It uses local storage to remember your favourite subreddit.
//

'use strict';

var React = require('react-native');
var MainScreen = require('./MainScreen');
var PostListScreen = require('./PostListScreen');

var {
  AppRegistry,
  NavigatorIOS,
  StatusBarIOS,
  StyleSheet,
} = React;


var RedditReact = React.createClass({
  componentDidMount: function() {
    StatusBarIOS.setStyle('light-content');
  },
  render: function() {
    return (
      <NavigatorIOS
        barTintColor='#12B35F'
        titleTextColor='#FCFEFF'
        tintColor='#FCFEFF'
        shadowHidden={true}
        style={styles.main}
        initialRoute={{
          title: 'Subreddits',
          component: MainScreen,
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FCFEFF',
  },
});

AppRegistry.registerComponent('RedditReact', () => RedditReact);
