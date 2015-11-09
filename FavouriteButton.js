//
// FAVOURITE BUTTON
//
// A simple Favourite Component using images
//

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} = React;

var FavouriteButton = React.createClass({
  render: function() {
    return(
      <TouchableHighlight style={styles.favouriteButton} onPress={this.props.onPress}>
          <Image style={styles.favouriteButtonIcon} source={this.props.isFavourite ? require('./img/favoriteEnabled.png') : require('./img/favoriteDisabled.png')}/>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  favouriteButton: {
    padding: 16,
  },
});

module.exports = FavouriteButton;
