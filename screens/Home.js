import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../navigation/AuthProvider';

const Home = ({navigation}) => {
  const [type, setType] = useState('login');

  const [user, setUser] = useState();
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const { login, register } = useContext(AuthContext);

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('auth changed home');
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate('Todos');
      // console.log(user);
    }
  })

  return (
    <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 30}}>
      <View style={{flexDirection: 'row', marginVertical: 20}}>
        <TouchableOpacity
          onPress={() => setType('login')}
          style={[{marginRight: 10}, styles.button]}
          activeOpacity={0.7}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType('register')}
          style={styles.button}
          activeOpacity={0.7}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Registrar</Text>
        </TouchableOpacity>
      </View>
      {type === 'register' ? (
        <View style={{width: '100%'}}>
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={value => setName(value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Cidade"
            value={city}
            onChangeText={value => setCity(value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={value => setPassword(value)}
            style={styles.input}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => register(email, password)}
            style={styles.button}
            >
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Registrar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{width: '100%'}}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={value => setPassword(value)}
            style={styles.input}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => login(email, password)}
            style={styles.button}
            >
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Logar</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text>{error}</Text>
    </View>
  );
};

Home.navigationOptions = {
  title: 'Home',
};

export default Home;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 4,
    backgroundColor: '#b134eb',
    alignItems: 'center'
  },
  input: {
    marginBottom: 7
  },
});
