import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { colors } from '../constants/colors'
import { Link } from 'expo-router'

export default function Index(){
  return(
    <View style={styles.container}>
      <Image
        source={require('../assets/images/zenlife.jpg')}
        />
        
        <Text style={styles.title}>
          ZenLife
        </Text>

        <Text style={styles.text}>
          Sua Dieta personalizada
        </Text>

        <Link href="/step" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Gerar Dieta</Text>
          </Pressable>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.background,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  title:{
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.blueD
  },
  text:{
    fontSize: 18,
    color: colors.blueB,
    marginTop: 10,
    marginBottom: 10
  },
  button:{
    backgroundColor: colors.blueB,
    width: '80%',
    height: 40,
    borderRadius:4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35
  },
  buttonText:{
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  }
})