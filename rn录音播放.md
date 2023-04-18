## 初始化项目

```
npx react-native init AudioApp --template react-native-template-typescript
```

## 使用 react-native-audio

### 安装

```
yarn add react-native-audio
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
