// import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
// import * as Sentry from "sentry-expo";
import "./global.css";

// Sentry.init({
//   dsn: "https://0622204572b96941051676ef760a31ff@o4509707665997824.ingest.de.sentry.io/4509707681661008",

//   // Adds more context data to events (IP address, cookies, user, etc.)
//   // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
//   sendDefaultPii: true,
//   enableNative: true,
//   debug: true,

//   // Configure Session Replay
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1,
//   integrations: [
//     Sentry.mobileReplayIntegration(),
//     Sentry.feedbackIntegration(),
//   ],

//   // uncomment the line below to enable Spotlight (https://spotlightjs.com)
//   // spotlight: __DEV__,
// });

// Sentry.init({
//   dsn: "https://0622204572b96941051676ef760a31ff@o4509707665997824.ingest.de.sentry.io/4509707681661008",
//   enableInExpoDevelopment: true,
//   debug: true,
//   // Add these options to help with Hermes compatibility
//   enableAutoSessionTracking: true,
//   sessionTrackingIntervalMillis: 10000,
// });

// export default Sentry.wrap(function RootLayout() {

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
