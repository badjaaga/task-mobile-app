import { StyleSheet, Text } from "react-native";

export const CustomText = ({ children, style, ...rest }) => {
  return <Text style={[styles.text, style]} {...rest}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins, Arial, sans-serif'
  },
});
