import { useCallback, useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, StyleSheet, Image, TextInput, View, ActivityIndicator } from "react-native";
import weatherService from "../services/weatherService";
import { useDebounce } from "usehooks-ts";
import { ParagraphBold, ParagraphLight, ParagraphRegular } from "../shared/CustomText";
import { calculateCurrentTime } from "../utils/calculateCurrentTime";

export const SearchScreen = () => {
  const [searchInput, setSearch] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchInput, 500)
  const [isLoading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await weatherService.searchWeatherData(debouncedValue);
        console.log(data.map(item => formatTime(item.dt, item.timezone)))
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data: ', error);
      }
    };

    fetchData();
  }, [debouncedValue]);

  const formatTime = useCallback((timeOfDataCalculation: number, timezoneOffset: number) => {
    calculateCurrentTime(timeOfDataCalculation, timezoneOffset)
  }, [])

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

    <ScrollView style={isLoading ? styles.loader : styles.scrollContainer}>
      {isLoading ? <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} /> : weatherData?.length ? weatherData.map(data =>
        <View style={styles.lineItem}>
          <Image style={styles.icon} source={{uri:`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}} />
          <ParagraphBold style={styles.cityName}>{data.name}</ParagraphBold>
          <ParagraphLight style={styles.cityName}>{formatTime(data.dt, data.timezone)}</ParagraphLight>
          <ParagraphRegular style={styles.description}> {data.weather[0].description} </ParagraphRegular>
          <ParagraphRegular style={styles.temperature}>{Math.floor(data.main.temp).toFixed(0)} °C</ParagraphRegular>
        </View>
      ) : <ParagraphRegular style={styles.notFound}>Not found</ParagraphRegular>}

    </ScrollView>

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
  },
  scrollContainer: {
    height: 600
  },
  weatherData: {
    color: '#000',
  },
  lineItem: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: '#1D2B3D',
    margin: 5,
    borderRadius: 8

  },
  cityName: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 10
  },
  description: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 'auto'
  },
  temperature: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 15
  },
  notFound: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 18
  },
  icon: {
    width: 50,
    height: 50,
  },
  loader: {
    display: 'flex',
    height: 600
  }
});
