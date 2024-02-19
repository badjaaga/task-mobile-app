import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native";


export const SearchScreen = () => {
  const [searchInput, setSearch] = useState('');
  return <SafeAreaView style={styles.container}>
    <View style={styles.searchInputBox}>
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={searchInput}
        placeholder="Type to search"
        placeholderTextColor="#bcbcbc" />
      <Button title="Cancel" onPress={() => setSearch('')} />
    </View>

  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#07131F',
    display: "flex"
  },
  searchInputBox: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#07131F',
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: '#1D2B3D',
    color: '#FFFFFF',
  }
});
