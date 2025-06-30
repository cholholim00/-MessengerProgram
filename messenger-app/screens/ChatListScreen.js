import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, onSnapshot, doc, deleteDoc, getDocs } from 'firebase/firestore';
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

  const deleteChatRoom = async (roomId) => {
    try {
      const messagesRef = collection(db, 'chatRooms', roomId, 'messages');
      const snapshot = await getDocs(messagesRef);
      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, 'chatRooms', roomId, 'messages', docSnap.id))
      );
      await Promise.all(deletePromises);

      await deleteDoc(doc(db, 'chatRooms', roomId));
      Alert.alert('삭제 완료', '채팅방이 삭제되었습니다.');
    } catch (error) {
      Alert.alert('오류', error.message);
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>채팅방 목록</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="채팅방 이름"
          value={newRoomName}
          onChangeText={setNewRoomName}
          style={styles.input}
        />
        <Button title="생성" onPress={handleCreateRoom} />
      </View>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatRoom', { roomId: item.id, name: item.name })}
            onLongPress={() => {
              Alert.alert(
                '채팅방 삭제',
                `'${item.name}' 방을 삭제하시겠습니까?`,
                [
                  { text: '취소', style: 'cancel' },
                  { text: '삭제', onPress: () => deleteChatRoom(item.id), style: 'destructive' },
                ]
              );
            }}
            style={styles.room}
          >
            <Text style={styles.roomName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>채팅방이 없습니다</Text>}
      />
      <Button title="로그아웃" onPress={handleLogout} color="#ff5555" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  room: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  roomName: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
});
