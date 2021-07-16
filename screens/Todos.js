import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Todos = ({navigation}) => {
  const ref = firestore().collection('todos');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [local, setLocal] = useState('');
  const [date, setdate] = useState('');
  const [time, setTime] = useState('');

  const [todos, setTodos] = useState([]);

  const [user, setUser] = useState();

  async function addTodo() {
    await ref.add({
      title,
      description,
      local,
      date,
      time,
    });
    setTitle('');
    setDescription('');
    setLocal('');
    setdate('');
    setTime('');
  }

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    
    ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, description, local, date, time} = doc.data();
        list.push({
          id: doc.id,
          title,
          description,
          local,
          date,
          time,
        });
      });

      setTodos(list);
    });

    return subscriber;
    
  }, []);

  useEffect(() => {
    if(!user){
      // navigation.navigate("Home");
      console.log(user);
    }
  })

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={value => setTitle(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={value => setDescription(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Local"
          value={local}
          onChangeText={value => setLocal(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Data"
          value={date}
          onChangeText={value => setdate(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Hora"
          value={time}
          onChangeText={value => setTime(value)}
          style={styles.input}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => addTodo()}
          style={styles.button}
          >
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Adicionar atividade</Text>
        </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => auth().signOut()}
            style={styles.button}
            >
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Logout</Text>
          </TouchableOpacity>
        {todos &&
          todos.map((todo, key) => (
            <View
              key={key}
              style={{
                marginVertical: 10,
                borderWidth: 1,
                borderColor: '#cacaca',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={{marginBottom: 3}}>Titulo: {todo.title}</Text>
              <Text style={{marginBottom: 3}}>Descrição: {todo.description}</Text>
              <Text style={{marginBottom: 3}}>Local: {todo.local}</Text>
              <Text style={{marginBottom: 3}}>Data: {todo.date}</Text>
              <Text style={{marginBottom: 3}}>Hora: {todo.time}</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cacaca',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 4,
    backgroundColor: '#b134eb',
    alignItems: 'center',
    marginBottom: 10
  },
});

Todos.navigationOptions = {
  title: 'Todos',
};

export default Todos;
