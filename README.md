# Nearby Events

A cross-platform mobile application that helps users discover and join community events in their area.

[Watch the demo video](https://drive.google.com/file/d/1tJYcDZPcoHIjhlvTdPiTuk6gI32Z93VL/view)

## Architecture

### Tech Stack

- **Frontend**: React Native with TypeScript
- **Navigation**: React Navigation
- **Maps**: react-native-maps
- **Testing**: Jest + React Native Testing Library

## Design decisions

### Performance Optimizations

- **React.memo on Header**: Prevents unnecessary re-renders when list scrolls
- **useMemo for sorting**: Caches sorted events, recalculates only when events or location change

### Trade-offs

Instead of sorting on-demand, I pre-calculated both sorted arrays: `sortedByDistance` and `sortedByDate`.

**Benefits:**

- **Smooth UX**: Users see immediate results when changing sort modes
- **Predictable performance**: Sorting cost paid upfront, not during interaction

**Costs:**

- **Higher memory usage**: Storing 2 sorted arrays instead of 1
- **Dual computation**: Both sorts run even if user only uses one view

### Architecture Summary

- **Single Responsibility Components**: Each component has one purpose e.g. `EventCard` only displays event information
- **State Management**: Kept the state simple and minimal, without any central state management
- **TypeScript Usage**: Local state and mock API responses are strongly typed, reducing runtime errors and type safe codebase.

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### 1. Clone the repository

```sh
git clone https://github.com/akshat-rawat/NearbyEvents.git
cd NearbyEvents
```

### 2. Google Maps Setup (Android only)

- **Get Google Maps API Key**
  - Visit [Google Cloud Console](https://console.cloud.google.com/)
  - Enable "Maps SDK for Android"
  - Create an API key
- **Android Configuration**
  - Navigate to **android/app/src/main/AndroidManifest.xml**
  - Add your API key to your manifest file
  ```xml
  <application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
  </application>
  ```

### 3. Install dependencies

For iOS, remember to install CocoaPods dependencies.

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
npm install
cd ios && pod install && cd ..
```

### 4. Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
npm start
```

### 5. Run the app

With Metro running, open a new terminal window/pane from the root of the React Native project, and use one of the following commands to run Android or iOS app:

#### Android

```sh
npm run android
```

#### iOS

```sh
npm run ios
```

If everything is set up correctly, you should see the app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.
