/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useBoolean} from 'ahooks';
function App(): JSX.Element {
  const [isRecording, {set: setIsRecording}] = useBoolean();
  return (
    <SafeAreaView>
      <View style={styles.page}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.chatList}>
          <View>
            <View>
              <Text>语音1</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomWrap}>
          <Pressable
            onPressIn={() => {
              setIsRecording(true);
            }}
            onPressOut={() => {
              setIsRecording(false);
            }}>
            <View style={styles.btn}>
              <Text>{isRecording ? '正在录音...' : '按住说话'}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  chatList: {
    flexShrink: 1,
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  bottomWrap: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  btn: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 42,
  },
});

export default App;
