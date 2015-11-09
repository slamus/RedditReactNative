
"use strict"

var React = require('react-native');

var PostListScreen = require('./PostListScreen');
var FavouriteButton = require('./FavouriteButton');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;


var MainScreenRow = React.createClass({
  onSubPress: function() {
    this.props.navigator.push({
      component: PostListScreen,
      title: '/' + this.props.subredditName,
      passProps: this.props,
    });
  },
  render: function() {
    return (
      <View style={styles.subScreenRowContainer}>
        <TouchableHighlight style={styles.subScreenRow} onPress={this.onSubPress}>
            <Text style={styles.subScreenRowText}>/{this.props.subredditName}</Text>
        </TouchableHighlight>
        <FavouriteButton onPress={this.props.toggleFavourite} isFavourite={this.props.isFavourite()}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  subScreenRowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F8FA',
    borderBottomWidth: 1,
    borderColor: '#DAEBF2',
    height: 55,
  },
  subScreenRow: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 20,
  },
  subScreenRowText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: '#08384D',
  },
});

module.exports = MainScreenRow;
