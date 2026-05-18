# sorting-hat

Simple React Native application inspired by the Sorting Hat from Harry Potter.

- One button with a Sorting Hat view
- On press, the hat animates
- A random sorting audio clip is played
- Audio clip placeholders currently point to valid `https://.../*.mp3` URLs

## Run locally for testing

This repository currently contains the app source (`App.js`).  
To run it locally, use an Expo starter project and copy this file into it.

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm
- Android Studio (for Android emulator) or a physical Android device
- Expo Go app on your phone (optional, for quick testing)

### Steps

1. Create a local Expo app:

   ```bash
   npx create-expo-app@latest sorting-hat-local --template blank
   ```

2. Copy this repository's `App.js` into that project:

   ```bash
   cp /path/to/this-repo/App.js sorting-hat-local/App.js
   ```

3. Install audio dependency used by the app:

   ```bash
   cd sorting-hat-local
   npx expo install expo-av
   ```

4. Start the app for testing:

   ```bash
   npx expo start
   ```

5. Open it on:
   - Android emulator (`a` in terminal), or
   - Expo Go on your phone (scan QR code)

## Create an APK file

The easiest way is using Expo EAS Build.

1. Install EAS CLI:

   ```bash
   npm install -g eas-cli
   ```

2. In your Expo project folder, sign in and configure EAS:

   ```bash
   cd sorting-hat-local
   eas login
   eas build:configure
   ```

3. Build an APK:

   ```bash
   eas build -p android --profile preview
   ```

4. After build finishes, open the URL from terminal output and download the generated `.apk`.
