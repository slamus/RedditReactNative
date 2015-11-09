
'use strict';

var BASE_URL = 'https://www.reddit.com/comments/';

var React = require('react-native');

var PostRow = require('./PostRow');
var SectionTitle = require('./SectionTitle');
var MessageBox = require('./MessageBox');
var ActionButton = require('./ActionButton');
var CommentRow = require('./CommentRow');

var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  WebView,
} = React;

var RedditWebView = React.createClass({
    render: function() {
      return (
        <View style={styles.main}>
          <WebView
            url={this.props.url}
            onShouldStartLoadWithRequest={true}
            startInLoadingState={false}
            automaticallyAdjustContentInsets={false}
            scalesPageToFit={true}
            style={styles.webView}
          />
        </View>
      );
    }
});

var PostActions = React.createClass({
  render: function() {
    if (this.props.domain.search('self') !== 0) {
      return (
        <View>
          <SectionTitle title="ACTIONS" />
          <ActionButton
            label={`View Link (${this.props.domain})`}
            onPress={this.props.onPress}
            lightStyle={true}
          />
        </View>
      );
    }
    return (<View></View>);
  },
});

var PostScreen = React.createClass({
  getInitialState: function() {
    return ({
      topComments: [],
      isLoading: false,
    });
  },
  getRequestUrl: function(postId) {
    return `${BASE_URL}${postId}/.json?limit=5`;
  },
  fetchComments: function() {
    if (this.state.isLoading) {
      return false;
    }
    this.setState({ isLoading: true });
    fetch(this.getRequestUrl(this.props.post.data.id))
    .then((response) => response.json())
    .catch((error) => {
      this.setState({
        topComments: [],
        isLoading: false,
      })
    })
    .then((responseData) => {
      this.setState({
        isLoading: false,
        topComments: this.getCommentsFromData(responseData),
      });
    })
    .done();
  },
  componentDidMount: function() {
    this.fetchComments();
  },
  getCommentsFromData: function(responseData) {
    // Get comments recursively
    var comments = []
    var loop = function (obj, level) {
      if (obj && obj.data && obj.data.children) {
        var data = obj.data.children;
        for (var i = 0; i < data.length; i++) {
          var comment = data[i];
          if (comment.kind == "t1") {
            comment.level = level;
            comments.push(comment);
            if (comment.data.replies) {
              loop(comment.data.replies, level+1);
            }
          }
        }
      }
    }
    if (responseData && responseData[1]) {
      var data = responseData[1];
      loop(data, 0);
    }
    return comments;
  },
  toWebView: function() {
    var url = `https://www.reddit.com${this.props.post.data.permalink}`;
    this.props.navigator.push({
      component: RedditWebView,
      title: 'Post Web Page',
      passProps: {
        url: url,
      },
    });
  },
  toMedia: function() {
    var url = `${this.props.post.data.url}`;
    this.props.navigator.push({
      component: RedditWebView,
      title: 'Post Media',
      passProps: {
        url: url,
      },
    });
  },
  render: function() {
    var msg = null;
    if (!this.state.topComments.length) {
      (this.state.isLoading) ? msg = "Loading" : msg = "Error while fetching Post..." ;
    }
    return (
      <ScrollView style={styles.main}>
        <PostRow post={this.props.post} />
        <PostActions onPress={this.toMedia} domain={this.props.post.data.domain}/>
        <SectionTitle title="TOP COMMENTS" />
        <View style={styles.comments}>
          <MessageBox msg={msg} />
          {this.state.topComments.map((comment, id) => {
            return (<CommentRow key={id} comment={comment} />);
          })}
        </View>
        <ActionButton onPress={this.toWebView} label={"See Full Article (Web View)"}/>
      </ScrollView>
    );
  },
});


var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FCFEFF',
    flexDirection: 'column',
    paddingTop: 10,
  },
  webView: {
    flex: 1,
    marginTop: 54,
  },
  comments: {
    margin: 10,
    marginTop: 0,
    marginBottom: 10,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#F2F8FA',
    shadowColor: '#12B35F',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: .5,
    shadowRadius: 0,
  },
});

module.exports = PostScreen;
