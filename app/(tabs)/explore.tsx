import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { onAuthStateChanged, signInWithCredential, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function ExploreScreen() {
  const [user, setUser] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '244332523472-qnv9d6eoqco01d30g8bsj4li96npe6h2.apps.googleusercontent.com', // webClientId Firebase
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication || {};
      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      }
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Chào {user.email}</Text>
          <Text>{user.displayName}</Text>
          <Text>{user.phoneNumber || 'Không có số điện thoại'}</Text>
          <Button title="Đăng xuất" onPress={handleSignOut} color="#FFA500" />
        </>
      ) : (
        <Button
          disabled={!request}
          title="Đăng nhập với Google"
          onPress={() => promptAsync()}
          color="#FFA500"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
