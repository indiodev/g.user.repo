import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CLIENT } from "./src/hooks/client";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <NavigationContainer>
        <QueryClientProvider client={CLIENT}>
          <Routes />
        </QueryClientProvider>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}
