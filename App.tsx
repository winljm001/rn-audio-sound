/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {useBoolean} from 'ahooks';
import dayjs from 'dayjs';
function App(): JSX.Element {
  const [isRecording, {set: setIsRecording}] = useBoolean();
  const [list, setList] = useState<string[]>([]);
  const [isInit, {setTrue: setInit}] = useBoolean();

  useEffect(() => {
    getAudioAuthorize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 请求录音授权
  const getAudioAuthorize = () => {
    AudioRecorder.requestAuthorization().then(isAuthor => {
      console.log('是否授权: ' + isAuthor);
      if (!isAuthor) {
        return console.log('APP需要使用录音，请打开录音权限允许APP使用');
      }
      setInit();
    });
  };
  useEffect(() => {
    if (isInit) {
      // 录音进展
      AudioRecorder.onProgress = data => {
        console.log('onProgress', data);
      };
      // 完成录音
      AudioRecorder.onFinished = data => {
        // data 录音数据，可以在此存储需要传给接口的路径数据
        console.log('onFinished', data);
        const filePath = data?.audioFileURL;
        setList([...list, filePath]);
      };
    }
  }, [isInit, list]);

  const genAudioPath = () => {
    return `${AudioUtils.DocumentDirectoryPath}/${dayjs().valueOf()}.aac`;
  };
  const prepareRecordingPath = () => {
    let audioPath = genAudioPath();
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 44100.0, //采样率
      Channels: 2, //通道
      AudioQuality: 'High', //音质
      AudioEncoding: 'aac', //音频编码 aac
      OutputFormat: 'mpeg_4', //输出格式
      MeteringEnabled: false, //是否计量
      MeasurementMode: false, //测量模式
      AudioEncodingBitRate: 32000, //音频编码比特率
      IncludeBase64: true, //是否是base64格式
      AudioSource: 0, //音频源
    });
  };
  const startAudio = async () => {
    prepareRecordingPath();
    try {
      const filePath = await AudioRecorder.startRecording();

      return filePath;
    } catch (error) {
      console.log(error);
    }
  };
  const stopAudio = async () => {
    try {
      const filePath = await AudioRecorder.stopRecording();

      return filePath;
    } catch (error) {}
  };
  return (
    <SafeAreaView>
      <View style={styles.page}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.chatList}>
          <View>
            <View>
              <Text>{JSON.stringify(list)}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomWrap}>
          <Pressable
            onPressIn={() => {
              setIsRecording(true);
              startAudio();
            }}
            onPressOut={() => {
              stopAudio();
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
