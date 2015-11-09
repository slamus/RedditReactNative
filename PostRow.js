//
// POST ROW
//
// A simple amd minimalist post component
//

'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  Image,
  View,
} = React;

var PostThumbnail = React.createClass({
  render: function() {
    if (this.props.url && this.props.url.search("http") > -1) {
      return (
        <View style={styles.postHeaderThumbnail}>
          <Image style={styles.postHeaderThumbnailImage} source={{uri: this.props.url}} />
        </View>
      );
    }
    return (<View/>);
  },
});

var PostRow = React.createClass({
  setNativeProps(nativeProps) {
    // Enable TouchableHighlight without being explicitly a native children
     this._root.setNativeProps(nativeProps);
   },
  getDateFromString: function(date) {
    var theDate = new Date(date*1000);
    return `${theDate.getMonth()}/${theDate.getDate()}/${theDate.getFullYear()}`;
  },
  render: function() {
    return (
      <View style={styles.post} ref={component => this._root = component} {...this.props}>
          <View style={styles.postHeader}>
            <PostThumbnail url={this.props.post.data.thumbnail} />
            <View style={styles.postHeaderTitle}>
              <Text style={styles.postHeaderTitleText}>{this.props.post.data.title}</Text>
            </View>
          </View>
          <View style={styles.postDetails}>
            <Text style={styles.postDetailsText}>{this.props.post.data.num_comments} Comments - Score: {this.props.post.data.score}</Text>
            <Text style={styles.postDetailsText}>Posted on {this.getDateFromString(this.props.post.data.created_utc)} by {this.props.post.data.author} to /{this.props.post.data.subreddit}</Text>
            <Text style={styles.postDetailsText}>From:  {this.props.post.data.domain}</Text>
          </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({

  post: {
    margin: 10,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#F2F8FA',
    shadowColor: '#12B35F',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: .5,
    shadowRadius: 0,
  },
    postHeader: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
      postHeaderThumbnail: {
        flex: 2,
        marginRight: 10,
      },
        postHeaderThumbnailImage: {
          height: 60,
        },
      postHeaderTitle: {
        flex: 8,
      },
        postHeaderTitleText: {
          fontSize: 18,
          color: "#08384D",
          fontWeight: '500',
        },
    postDetails: {
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderColor: 'rgba(18, 179 ,95, .1)',
    },
      postDetailsText: {
        color: '#4D7181',
        fontSize: 14,
        fontWeight: '600',
      },

});

module.exports = PostRow;
