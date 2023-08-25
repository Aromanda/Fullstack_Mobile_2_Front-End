import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserContext } from '../../components/shared/usercontexts';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';

const Account = () => {
  const { user, setUser } = useUserContext();
  const [userTypeEmail, setUserTypeEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userTypePhone, setUserTypePhone] = useState("");

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    console.log("user: ", user);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/account/${user.usertype_id}?type=${user.type}`);
      const data = await response.json();
      console.log("data: ", data);
      setUserTypeEmail(data.account_email);
      setUserTypePhone(data.account_phone);
      setUserEmail(data.email);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/account/${user.usertype_id}?type=${user.type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_email: userTypeEmail, // Utilisez "account_email" au lieu de "user_type_email"
          account_phone: userTypePhone, // Utilisez "account_phone" au lieu de "user_type_phone"
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        // Mise à jour réussie
        console.log(result.message);
        // Vous pouvez ajouter d'autres actions ici en fonction de votre flux
      } else {
        console.error('Erreur lors de la mise à jour des informations du compte');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations du compte:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomNavbar />
      <View style={styles.content}>
        <Text>User Email: {user.email}</Text>
        <Text>User Type Email: {userTypeEmail}</Text>
        <Text>User Type Phone: {userTypePhone}</Text>
        <TextInput
          style={styles.input}
          value={userTypeEmail}
          onChangeText={setUserTypeEmail}
          placeholder="User Type Email"
        />
        <TextInput
          style={styles.input}
          value={userTypePhone}
          onChangeText={setUserTypePhone}
          placeholder="User Type Phone"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default Account;
