import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Firestore에 유저 정보 등록
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date()
    });

    Alert.alert('성공', '회원가입 완료!');
    navigation.navigate('Login');
  } catch (error) {
    Alert.alert('오류', error.message);
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="회원가입" onPress={handleRegister} />
      <Text onPress={() => navigation.goBack()} style={styles.link}>
        로그인으로 돌아가기
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});
