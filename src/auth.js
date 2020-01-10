
import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};


export const saveUser = async user => {
  try {
    await AsyncStorage.setItem('user', user);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

export const saveToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

export const getUser = async (key) => {
  let user = null;
  try {
    user = await AsyncStorage.getItem(key) || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return user;
}

export const deleteUserId = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
}

