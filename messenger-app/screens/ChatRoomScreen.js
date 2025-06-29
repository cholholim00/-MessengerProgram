import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Timestamp } from 'firebase/firestore';  // 추가

export default function ChatRoomScreen({ route }) {
  const { roomId, name } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const formatTime = (timestamp) => {
  const date = timestamp.toDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHour = hours % 12 || 12;
  return `${ampm} ${displayHour}:${minutes}`;
};


  useEffect(() => {
    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, 'chatRooms', roomId, 'messages'), {
  text,
  sender: auth.currentUser.email,
  createdAt: Timestamp.now(),  // ✅ Timestamp 사용
});
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
     <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={[
            styles.messageBubble,
            item.sender === auth.currentUser.email
              ? styles.myMessage
              : styles.otherMessage
          ]}
        >
    <Text>{item.text}</Text>
    <Text style={styles.timestamp}>{formatTime(item.createdAt)}</Text>
  </View>
)}
   inverted  // ✅ 최신 메시지가 아래쪽으로
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="메시지 입력"
        style={styles.input}
      />
      <Button title="전송" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginTop: 10 },
  messageBubble: {
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    textAlign: 'right',
    marginTop: 4,
  },
});

