import { StyleSheet, Text } from "react-native";

export const ParagraphRegular = ({ children, style, ...rest }) => {
  return <Text style={[styles.regular, style]} {...rest}>{children}</Text>;
}


export const ParagraphBold = ({ children, style, ...rest }) => {
  return <Text style={[styles.bold, style]} {...rest}>{children}</Text>;
}

export const ParagraphLight = ({ children, style, ...rest }) => {
  return <Text style={[styles.light, style]} {...rest}>{children}</Text>;
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'ping-fang'
  },
  bold: {
    fontFamily: 'ping-fang-bold'
  },
  light: {
    fontFamily: 'ping-fang-light'
  },
});
