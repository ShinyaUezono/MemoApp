import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CircleButton from '../elements/CircleButton';

class MemoDetailScreen extends React.Component {
  state = {
    memo: {},
  }

// "componentDidMount" will cause TypeError even if I check null as below
  UNSAFE_componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ memo: params.memo });
  }

  dateString(date) {
    console.log(date.toDate().toISOString());
    const str = date.toDate().toISOString();
    return str.split('T')[0];
  }

  render() {
    const { memo } = this.state;
    if (memo == null) { return null; }

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.memoHeader}>
            <View>
              <Text style={styles.memoHeaderTitle}>{memo.body.substring(0, 10)}</Text>
              <Text style={styles.memoHeaderDate}>{this.dateString(memo.createdOn)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.memoContents}>
          <Text style={styles.memoBody}>
            {memo.body}
          </Text>
        </View>

        <CircleButton name="pencil" color="white" style={styles.editButton} onPress={() => this.props.navigation.navigate('MemoEdit')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  memoHeader: {
    height: 100,
    backgroundColor: '#17313C',
    justifyContent: 'center',
    padding: 10,
  },
  memoHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  memoHeaderDate: {
    fontSize: 10,
    color: '#fff',
  },
  memoContents: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  memoBody: {
    lineHeight: 22,
    fontSize: 15,
  },
  editButton: {
    top: 75,
  },
});

export default MemoDetailScreen;
