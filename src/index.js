import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert
} from 'react-native';

import axios from 'axios';

const App = () => {

  const [list, setList] = useState();

  const url = 'http://brasil.io/api/v1/dataset/covid19/caso_full/data?state=SP';

  const getList = async() => {
    const response = await axios.get(url);
    const responseJson = (response.data.results);
    setList(responseJson.sort().filter(item => item.city != null))
  }

  const showDetails = (data) => {
    Alert.alert(
      data.city + ' - ' + data.state + ' ('+data.date+')', 
      'Populaçao: ' + data.estimated_population 
        + '\nCasos Confirmados: ' + data.last_available_confirmed
        + '\nMortes Confirmadas:' + data.last_available_deaths );
  }

  useEffect(()=>{
    getList();
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>test2</Text>
      <FlatList
          style={styles.flatList}
          data={list}
          keyExtractor={(item, index) => {
            // console.log("index", index)
            return index.toString();
          }}
          renderItem={({ item }) => {
            console.log("item", item)
            return (
              <Text 
                onPress={() => {
                  showDetails(item)
                }} 
                style={styles.text}>
                  {item.city}
              </Text>
            )
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  text: {
    flex: 1,
    fontSize: 25
  }
});

export default App;
