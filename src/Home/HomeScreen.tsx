import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons/faArrowCircleRight";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "react-native-paper";
import { ParagraphRegular, ParagraphBold } from "../shared/CustomText";

export const HomeScreen = ({navigation}) => {
  const navigateToSearchScreen = () => {
    navigation.navigate('Search')
  }
  return (
    <View style={styles.container}>
      <FontAwesomeIcon style={styles.icon} icon={faUmbrella} size={164} />
      <ParagraphBold style={styles.title}>Breeze</ParagraphBold>
      <ParagraphRegular style={styles.subtitle}>Weather app</ParagraphRegular>
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
  title: {
    marginTop: 64,
    color: '#ffffff',
    fontSize: 24
  },
  subtitle: {
    color: '#9BA0A5',
    fontSize: 18,
    marginBottom: 48
  }
})
