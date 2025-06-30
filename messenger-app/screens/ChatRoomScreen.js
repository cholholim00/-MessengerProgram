import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Timestamp } from 'firebase/firestore';

export default function ChatRoomScreen({ route, navigation }) {
  const { roomId, name } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().email || '알 수 없음');
        }
      } catch (error) {
        console.error('❌ 사용자 이름 불러오기 실패:', error);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const msgs = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const msgData = docSnap.data();
          if (!msgData.senderName) {
            try {
              const userRef = doc(db, 'users', msgData.sender);
              const userSnap = await getDoc(userRef);
              msgData.senderName = userSnap.exists() ? userSnap.data().email : '알 수 없음';
            } catch (error) {
              msgData.senderName = '알 수 없음';
            }
          }
          return { id: docSnap.id, ...msgData };
        })
      );
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, 'chatRooms', roomId, 'messages'), {
        text,
        sender: auth.currentUser.uid,
        senderName: userName,
        createdAt: Timestamp.now(),
      });
      setText('');
    } catch (err) {
      console.error('❌ 메시지 전송 실패:', err);
    }
  };

  const deleteMessage = (msgId) => {
    Alert.alert(
      '메시지 삭제',
      '이 메시지를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'chatRooms', roomId, 'messages', msgId));
            } catch (error) {
              console.error('❌ 메시지 삭제 실패:', error);
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const deleteChatRoom = () => {
    Alert.alert(
      '채팅방 삭제',
      '채팅방과 모든 메시지를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          onPress: async () => {
            try {
              const msgQuery = query(collection(db, 'chatRooms', roomId, 'messages'));
              const snapshot = await getDocs(msgQuery);
              for (const docSnap of snapshot.docs) {
                await deleteDoc(doc(db, 'chatRooms', roomId, 'messages', docSnap.id));
              }
              await deleteDoc(doc(db, 'chatRooms', roomId));
              navigation.goBack();
            } catch (error) {
              console.error('❌ 채팅방 삭제 실패:', error);
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const formatTime = (timestamp) => {
    const date = timestamp?.toDate?.();
    if (!date) return '';
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHour = hours % 12 || 12;
    return `${ampm} ${displayHour}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => {
              if (item.sender === auth.currentUser.uid) deleteMessage(item.id);
            }}
            activeOpacity={0.7}
          >
            <View
              style={[styles.messageBubble, item.sender === auth.currentUser.uid ? styles.myMessage : styles.otherMessage]}
            >
              <Text style={styles.sender}>{item.senderName || '알 수 없음'}</Text>
              <Text>{item.text}</Text>
              <Text style={styles.timestamp}>{formatTime(item.createdAt)}</Text>
            </View>
          </TouchableOpacity>
        )}
        inverted
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888' }}>메시지가 없습니다</Text>}
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="메시지 입력"
        style={styles.input}
      />
      <Button title="전송" onPress={sendMessage} />
      <View style={{ marginTop: 10 }}>
        <Button title="채팅방 삭제" color="red" onPress={deleteChatRoom} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  messageBubble: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myMessage: {
    backgroundColor: '#cce5ff',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  sender: {
    fontWeight: '600',
    color: '#555',
    fontSize: 13,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'right',
    marginTop: 4,
  },
});
