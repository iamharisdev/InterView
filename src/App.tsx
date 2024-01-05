import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";
import { ThemeProvider } from "@/theme";
import ApplicationNavigator from "./navigators/Application";
import "./translations";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LogBox, KeyboardAvoidingView, Platform } from "react-native";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:process.env.WEB_KEY
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storage={storage}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <KeyboardAvoidingView
              behavior={"padding"}
              style={{ flex: 1 }}
            >
              <ApplicationNavigator />
            </KeyboardAvoidingView>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
