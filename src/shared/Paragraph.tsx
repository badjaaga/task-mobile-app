import { StyleSheet, Text } from "react-native";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_300Light,
  useFonts
} from "@expo-google-fonts/poppins";

export const ParagraphRegular = ({ children, style, ...rest }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return <Text style={[styles.regular, style]} {...rest}>{children}</Text>;
}


export const ParagraphBold = ({ children, style, ...rest }) => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return <Text style={[styles.bold, style]} {...rest}>{children}</Text>;
}

export const ParagraphLight = ({ children, style, ...rest }) => {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return <Text style={[styles.light, style]} {...rest}>{children}</Text>;
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Poppins_400Regular',
  },
  bold: {
    fontFamily: 'Poppins_500Medium',
  },
  light: {
    fontFamily: 'Poppins_300Light'
  },
});
