# sorting-hat

Simple React Native application inspired by the Sorting Hat from Harry Potter.

- One button with a Sorting Hat view
- On press, the hat animates
- A random sorting audio clip is played
- Audio clip placeholders currently point to valid `https://.../*.mp3` URLs

## Prerequisites

Before running the project locally, install the following tools:

- **Node.js**: use the current LTS version.
- **npm** or **Yarn**: package manager for installing dependencies.
- **VS Code**: recommended editor for working with the project.
- **Android Studio**: required for the Android SDK, emulator, and APK builds.
- **Java Development Kit (JDK)**: required by Android/Gradle.
- **React Native CLI environment**: make sure your Android development environment is set up correctly.

## Open the project in VS Code

1. Clone the repository:

   ```bash
   git clone https://github.com/VasylCo/sorting-hat.git
   ```

2. Open the project folder in VS Code:

   ```bash
   cd sorting-hat
   code .
   ```

3. Open the integrated terminal in VS Code:
   - Use **Terminal → New Terminal**
   - Or press **Ctrl+`**

## Install dependencies

In the VS Code terminal, run:

```bash
npm install
```

If the project uses Yarn instead of npm, run:

```bash
yarn install
```

## Run the project locally on Android

### 1. Start an Android emulator or connect a device

Choose one of the following:

- Start an emulator from **Android Studio > Device Manager**
- Or connect a physical Android device with **USB debugging** enabled

To verify the device is detected:

```bash
adb devices
```

### 2. Start the Metro bundler

In the first terminal:

```bash
npx react-native start
```

### 3. Run the Android app

In a second terminal:

```bash
npx react-native run-android
```

This command will:
- build the Android app
- install it on the emulator/device
- launch it automatically

## Recommended VS Code extensions

Optional but useful extensions:

- React Native Tools
- ESLint
- Prettier
- JavaScript and TypeScript Nightly

## Troubleshooting

### Clean and reinstall dependencies

```bash
rm -rf node_modules
npm install
```

### Reset Metro cache

```bash
npx react-native start --reset-cache
```

### Clean Android build

From the `android` folder:

```bash
cd android
./gradlew clean
cd ..
```

On Windows, use:

```bash
cd android
gradlew clean
cd ..
```

## How to create an APK file

### Debug APK

To build a debug APK:

```bash
cd android
./gradlew assembleDebug
```

On Windows:

```bash
cd android
gradlew assembleDebug
```

Generated file location:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK

To build a release APK:

```bash
cd android
./gradlew assembleRelease
```

On Windows:

```bash
cd android
gradlew assembleRelease
```

Generated file location:

```text
android/app/build/outputs/apk/release/app-release.apk
```

## Notes for release builds

Before creating a production-ready release APK, you usually need to:

- create a signing key
- configure `android/gradle.properties`
- configure signing in `android/app/build.gradle`

If signing is not configured, the release build may fail or produce an unsigned APK.

## Useful commands summary

```bash
npm install
npx react-native start
npx react-native run-android
cd android && ./gradlew assembleDebug
cd android && ./gradlew assembleRelease
```
