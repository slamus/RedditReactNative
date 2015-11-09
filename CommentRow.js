//
// COMMENT ROW
//
// A read-only comment component, taking account
// of parent/children relationships
//

'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

var CommentRow = React.createClass({
  render: function() {
    return(
      <View style={[styles.commentContainer, this.props.comment.level && {
        marginLeft: (10 * this.props.comment.level),
        borderLeftWidth: 1,
        paddingLeft: 5,
      }]}>
        <View style={styles.commentBox}>
          <Text style={styles.commentBoxAuthor}>
            {this.props.comment.data.author}
            <Text style={styles.commentBoxAuthorScore}>
              {' '}{this.props.comment.data.score} Points
            </Text>
          </Text>
          <Text style={styles.commentBoxContent}>
            {this.props.comment.data.body}
          </Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    borderColor: '#7D98A3',
    marginBottom: 10,
  },
  commentBox: {
    flex: 1,
  },
    commentBoxAuthor: {
      color: '#4D7181',
      fontSize: 14,
      fontWeight: '600',
    },
      commentBoxAuthorScore: {
        color: '#7D98A3',
        fontSize: 12,
      },
    commentBoxContent: {
      color: '#08384D',
      fontSize: 14,
      marginLeft: 2,
    },
});

module.exports = CommentRow;
