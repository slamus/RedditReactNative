//
// MAIN SCREEN
//
// Main Screen used for:
//  - Listing Posts according to subreddit
//

'use strict';

var BASE_URL = 'https://www.reddit.com/r/';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
} = React;

var PostRow = require('./PostRow');
var PostScreen = require('./PostScreen');
var MessageBox = require('./MessageBox');
var FavouriteButton = require('./FavouriteButton');

var PostListScreen = React.createClass({
  getInitialState: function() {
    return ({
      data: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      urlAfter: null,
      isLoading: false,
    });
  },
  getDataSource: function(posts: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(posts);
  },
  getRequestUrl: function(subredditName) {
    return `${BASE_URL}${subredditName}/.json?limit=20&after=${this.state.urlAfter}`;
  },
  fetchPosts: function() {
    if (this.state.isLoading) {
      return false;
    }
    this.setState({ isLoading: true });
    fetch(this.getRequestUrl(this.props.subredditName))
    .then((response) => response.json())
    .catch((error) => {
      this.setState({
        dataSource: error,
        isLoading: false,
      })
    })
    .then((responseData) => {
      if (responseData && responseData.data) {
        var posts = this.state.data.concat(responseData.data.children);
        this.setState({
          isLoading: false,
          data: posts,
          dataSource: this.getDataSource(posts),
          urlAfter: responseData.data.after,
        });
      } else {
        this.setState({
          isLoading: false,
          data: {},
          dataSource: this.getDataSource({}),
        });
      }
    })
    .done();
  },
  componentDidMount: function() {
    this.fetchPosts();
  },
  pressRow: function(post) {
    this.props.navigator.push({
      component: PostScreen,
      title: 'Post Details',
      passProps: {
        post: post,
      },
    });
  },
  renderRow: function(post: Object, sectionID: number | string, rowID: number | string) {
    return (
      <TouchableHighlight onPress={this.pressRow.bind(null, post)}>
        <PostRow post={post} />
      </TouchableHighlight>
    );
  },
  render: function() {
    var msg = null;
    if (!this.state.data.length) {
      (this.state.isLoading) ? msg = "Loading..." : msg = "No Post in this Subreddit..." ;
    }
    return (
      <View style={styles.main}>
        <MessageBox style={[{marginTop:64,}]} msg={msg} />
        <View style={styles.favContainer}>
          <FavouriteButton onPress={this.props.toggleFavourite} isFavourite={this.props.isFavourite()} />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          renderRow={this.renderRow}
          onEndReached={this.fetchPosts}
          style={styles.postsList}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FCFEFF',
    flexDirection: 'column',
  },
  favContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  postsList: {
    flexDirection: 'column',
    marginTop: 10,
  },
});

module.exports = PostListScreen;
