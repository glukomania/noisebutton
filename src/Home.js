import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { Fontisto } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select'

export const Home = () => {
  const [sound, setSound] = useState()
  const [isPlay, setIsPlay] = useState(false)
  const [start, setStart] = useState(null)

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/noise.mp3'))
    setSound(sound)

    if (isPlay) {
      console.log('stop')
      sound.stopAsync()
      setIsPlay(false)
    } else {
      await sound.playAsync()
      console.log('play')
      setIsPlay(true)
      setStart(moment())
    }
  }

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (isPlay) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlay])

  // unloading sound from memory
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  var options = ['Option1', 'Option2', 'Option3']
  var labels = ['hello', 'world', 'Foodmate']
  const [option, setOption] = useState()

  const placeholder = {
    label: 'Test me...',
    value: null,
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TouchableHighlight onPress={playSound} underlayColor="#909090" style={styles.button}>
        <View style={styles.innerContainer}>
          <Fontisto name={!isPlay ? 'play' : 'pause'} size={60} style={styles.icon} on />
        </View>
      </TouchableHighlight>

      <Text style={styles.timer}>{moment.utc(seconds * 1000).format('HH:mm:ss')}</Text>

      <View>
        <RNPickerSelect
          placeholder={placeholder}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#596a71',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icon: {
    color: 'white',
  },
  timer: {
    marginTop: '10%',
    color: 'white',
  },
  button: {
    width: 200,
    height: 200,
    borderColor: '#adad0b',
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 50,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

export default Home
