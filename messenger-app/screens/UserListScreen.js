// screens/UserListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function UserListScreen() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const userList = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => user.email !== auth.currentUser.email); // ⚠️ JS 필터로 내 계정 제외
    setUsers(userList);
  };
  fetchUsers();
}, []);


  const startChat = async (userId, userEmail) => {
    const myId = auth.currentUser.uid;
    const roomId = [myId, userId].sort().join('_'); // ✅ 고정된 방 ID

    const roomRef = doc(db, 'chatRooms', roomId);
    const roomSnap = await getDoc(roomRef);
    if (!roomSnap.exists()) {
      await setDoc(roomRef, {
        name: `${auth.currentUser.email} & ${userEmail}`,
        createdAt: new Date()
      });
    }
    navigation.navigate('ChatRoom', { roomId, name: userEmail });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💡 유저 목록</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => startChat(item.id, item.email)} style={styles.item}>
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc' },
});
