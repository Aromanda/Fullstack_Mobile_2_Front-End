// Account.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserContext } from '../../components/shared/usercontexts';

const Account = () => {
  const { user, setUser } = useUserContext();
  const [userTypeEmail, setUserTypeEmail] = useState(user.user_type_email);
  const [userTypePhone, setUserTypePhone] = useState(user.user_type_phone);

  const handleSave = () => {
    // Update the user type's email and phone in the user context
    setUser(prevUser => ({
      ...prevUser,
      user_type_email: userTypeEmail,
      user_type_phone: userTypePhone,
    }));
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
