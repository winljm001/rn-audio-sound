## 初始化项目

```
npx react-native init AudioApp --template react-native-template-typescript
```

## 使用 react-native-audio

### 安装

```
yarn add react-native-audio

yarn add @types/react-native-audio -D
```

### 配置使用的权限

在 `android/app/src/main/AndroidManifest.xml` 添加

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

在 `ios/AudioApp/Info.plist` 添加

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This sample uses the microphone to record your speech and convert it to text.</string>
```

### ios 有个警告

在 `node_modules/react-native-audio/ios/AudioRecorderManager.m` 65 行添加如下

```
+ (BOOL) requiresMainQueueSetup {
  return YES;
}
```

```js

import {AudioRecorder, AudioUtils} from 'react-native-audio';


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
```

## 使用 react-native-sound
