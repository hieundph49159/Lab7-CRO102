import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function IndexScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      Alert.alert("Đăng ký thành công!");
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      Alert.alert("Đăng nhập thành công!");
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {user ? (
        <>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>Xin chào {user.email}</Text>
          <Button title="Đăng xuất" onPress={handleLogout} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              marginBottom: 10,
              width: "100%",
              padding: 10,
              borderRadius: 5,
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderWidth: 1,
              marginBottom: 10,
              width: "100%",
              padding: 10,
              borderRadius: 5,
            }}
          />
          <Button title="Đăng nhập" onPress={handleLogin} />
          <View style={{ height: 10 }} />
          <Button title="Đăng ký" onPress={handleRegister} />
        </>
      )}
    </View>
  );
  
}
