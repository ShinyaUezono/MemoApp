import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
// import 'firebase/firestore';

import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

// const firebase = require("firebase");

// eslint-disable-next-line
// require("firebase/firestore");


class MemoListScreen extends React.Component {
  state = {
    memoList: [],
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/memos`);
    firebase.firestore().collection(`users/${currentUser.uid}/memos`)
      .get()
      .then((snapshot) => {
        const memoList = [];
        snapshot.forEach((doc) => {
          memoList.push(doc.data());
        });
        this.setState({ memoList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
//    const { memo } = this.state;
//    if (memo == null) { return null; }

    return (
      <View style={styles.container}>
        <MemoList memoList={this.state.memoList} navigation={this.props.navigation} />
        <CircleButton name="plus" onPress={this.handlePress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fffdf6',
  },
});

export default MemoListScreen;
