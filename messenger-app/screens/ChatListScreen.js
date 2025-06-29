// screens/ChatListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';

export default function ChatListScreen({ navigation }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chatRooms'), (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChatRooms(rooms);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;
    await addDoc(collection(db, 'chatRooms'), {
      name: newRoomName.trim(),
      createdAt: new Date(),
    });
    setNewRoomName('');
  };

  const handleLogout = () => signOut(auth);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>채팅방 목록</Text>
      <TextInput
        placeholder="채팅방 이름"
        value={newRoomName}
        onChangeText={setNewRoomName}
        style={styles.input}
      />
      <Button title="채팅방 생성" onPress={handleCreateRoom} />
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatRoom', { roomId: item.id, name: item.name })}
            style={styles.room}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  room: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc' },
});
