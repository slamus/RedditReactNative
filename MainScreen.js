//
// MAIN SCREEN
//
// First Screen used for:
//  - Searching subreddits
//  - View favourite subreddits
//  - Favouriting subreddits
//  - View history
//

'use strict';

var BASE_URL = 'https://www.reddit.com/subreddits/search/';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');

var SectionTitle = require('./SectionTitle');
var SubRow = require('./SubRow');
var PostListScreen = require('./PostListScreen');

var {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  ScrollView,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
} = React;

var STORAGE_KEY = '@RedditReact:Favourites';

var MainScreen = React.createClass({
  mixins: [TimerMixin],

  timeoutID: (null: any),

  getInitialState: function() {
    return ({
      favourites: [],
      history: [],
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    });
  },
  async loadFavourites() {
    try {
      var favourites = await AsyncStorage.getItem(STORAGE_KEY);
      if (favourites !== null){
        this.setState({favourites: JSON.parse(favourites)});
      } else {
        this.setState({favourites: [
          'all',
          'gaming',
          'reactjs',
          'reactnative',
        ]});
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },
  async saveFavourites() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.favourites));
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },
  componentDidMount: function() {
    this.loadFavourites().done();
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
    } else {
      this.state.favourites.unshift(subredditName);
    }
    this.forceUpdate();
    this.saveFavourites();
    if (index > - 1) {
      return false;
    }
    return true;
  },
  getDataSource: function(posts: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(posts);
  },
  getRequestUrl: function(query) {
    return `${BASE_URL}.json?q=${query}`;
  },
  fetchSubreddits: function(query) {
    this.timeoutID = null;

    if (this.state.isLoading) {
      return false;
    }

    this.setState({ isLoading: true });
    fetch(this.getRequestUrl(query))
    .then((response) => response.json())
    .catch((error) => {
      this.setState({
        dataSource: error,
        isLoading: false,
      })
    })
    .then((responseData) => {
      var results = [];
      if (responseData && responseData.data && this.state.isLoading) {
        results = responseData.data.children;
      }
      this.setState({
        isLoading: false,
        dataSource: this.getDataSource(results),
      });
    })
    .done();
  },
  addToHistory: function(subredditName) {
    if (this.state.history[0] != subredditName) {
      this.state.history.unshift(subredditName);
      this.forceUpdate();
    }
  },
  onChangeText: function(text) {
    if (text.length > 1) {
      this.clearTimeout(this.timeoutID);
      this.timeoutID = this.setTimeout(() => this.fetchSubreddits(text), 200);
    } else {
      this.setState({
        isLoading: false,
        dataSource: this.getDataSource({}),
      })
    }
  },
  renderRow: function(subredditName, id) {
    return (<SubRow
      key={id}
      subredditName={subredditName}
      navigator={this.props.navigator}
      addToHistory={this.addToHistory}
      isFavourite={this.isFavourite.bind(null, subredditName)}
      toggleFavourite={this.toggleFavourite.bind(null, subredditName)} />);
  },
  renderResult: function(subreddit: Object, sectionID: number | string, rowID: number | string) {
    return this.renderRow(subreddit.data.display_name, null);
  },
  render: function() {
    return(
      <View style={styles.main}>
        <View style={styles.searchBarContainer}>
          <TextInput
              ref={component => this._textInput = component}
              style={styles.searchBar}
              onChangeText={this.onChangeText}
              autoCorrect={false}
              onBlur={this.closeSearch}
              autoCapitalize={"none"}
              maxLength={100}
              placeholder={"Search for subreddits here..."}
              clearButtonMode={"while-editing"}
          />
        {this.state.isLoading ?
          <ActivityIndicatorIOS
            animating={true}
            size="small"
            style={styles.searchBarActivity}
          />
          :
          <Image style={[styles.searchBarActivity, styles.searchBarIcon]} source={require('./img/searchIcon.png')} />
        }
        </View>
        {this.state.dataSource.getRowCount() === 0 ?
          <ScrollView
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false} >
            <SectionTitle title="FAVOURITES" />
            <View style={styles.container}>
              {this.state.favourites.map((subredditName, id) => {
                return this.renderRow(subredditName, id);
              })}
            </View>
            <SectionTitle title="HISTORY" />
            <View style={styles.container}>
              {this.state.history.map((subredditName, id) => {
                return this.renderRow(subredditName, id);
              })}
            </View>
          </ScrollView>
          :
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderResult}
            showsVerticalScrollIndicator={false}
            style={styles.listView}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={true}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
    );
  },
});

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FCFEFF',
    marginTop: 64,
  },
  searchBarContainer: {
    backgroundColor: 'rgba(18, 179, 95, .7)',
    padding: 7,
    paddingVertical: 8,
  },
    searchBar: {
      height: 34,
      paddingHorizontal: 10,
      paddingLeft: 39,
      borderRadius: 4,
      backgroundColor: '#FCFEFF',
      color: 'rgba(18, 179, 95, 1)',
    },
    searchBarActivity: {
      position: 'absolute',
      left: 15,
      top: 14,
    },
    searchBarIcon: {
      padding: 9,
      margin: 1,
      marginLeft: 3,
      opacity: .5,
    },
  container: {
    borderTopWidth: 1,
    borderColor: '#DAEBF2',
  },
});

module.exports = MainScreen;
