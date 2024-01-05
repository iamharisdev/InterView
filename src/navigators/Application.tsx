import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Blog, Home, Profile, SignIn } from "@/screens";
import { useTheme } from "@/theme";

import type { ApplicationStackParamList } from "@/types/navigation";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  const { t } = useTranslation();
  global.t = t;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Blog" component={Blog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
