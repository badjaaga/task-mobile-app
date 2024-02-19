import { Image, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons/faArrowCircleRight";
import { IconButton } from "react-native-paper";
import { CustomText } from "../shared/CustomText";

export const HomeScreen = ({navigation}) => {
  const navigateToSearchScreen = () => {
    navigation.navigate('Search')
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/umbrella.png')}
        style={{width: 150, height: 150 }}
      />
      <CustomText style={styles.text}>Weather app</CustomText>
      <IconButton
        icon={() => <FontAwesomeIcon style={styles.icon} icon={faArrowCircleRight} size={48} />}
        onPress={navigateToSearchScreen}
      />
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07131F',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff'
  },
  icon: {
    color: '#0094FF'
  },
  text: {
    color: '#ffffff',
    fontWeight: "800",
    fontSize: 24,
    marginBottom: 24,
  }
})
