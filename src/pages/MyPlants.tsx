<script src="http://localhost:8097"></script>
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';

import waterdrop from '../assets/waterdrop.png'
import colors from '../styles/colors';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {
  const [myPlants, setMyPlants]  = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWater, setNextWater] = useState<string>();

  function handleRemove(plant:PlantProps) {
    Alert.alert('Remove', `Do you want to remove the ${plant.name}?`,[
      {
        text: "No 🙏🏻",
        style: "cancel",
      },
      {
        text: "Yes 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);
           
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Unable to remove! 😥");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();
      console.log(plantsStoraged)

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWater(
        `Don't forget to water the ${plantsStoraged[0].name} at ${nextTime} hours.`
      )

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData()
  },[])

  if(loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image 
          source={waterdrop}
          style={styles.spotlightImage} 
        />
        <Text style={styles.spotlightText}>
          {nextWater}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Next watering
        </Text>

        <FlatList 
          data={myPlants}  
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary 
              data={item}
              handleRemove={() => {handleRemove(item)}}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize:24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  }
})