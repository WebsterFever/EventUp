import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../service/firebase';
import {
  Box,
  Text,
  Button,
  VStack,
  Pressable,
  Avatar,
} from 'native-base';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const pickImage = async () => {
    try {
      Alert.alert('Avatar clicked!');

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setProfilePhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Box bg="#fff" py={8} px={5} alignItems="center">

        <TouchableOpacity onPress={pickImage}>
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                marginBottom: 15,
              }}
            />
          ) : (
            <Avatar
              size="2xl"
              bg="#FF6B6B"
              alignSelf="center"
              mb={4}
              _text={{
                fontSize: 32,
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              {user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
          )}
        </TouchableOpacity>

        <Text color="#FF6B6B" mb={4}>
          Tap photo to change
        </Text>

        <VStack alignItems="center" space={1}>
          <Text fontSize={20} fontWeight="bold" color="#333">
            {user?.displayName || 'User'}
          </Text>

          <Text fontSize={14} color="#666">
            {user?.email}
          </Text>
        </VStack>
      </Box>

      <Box bg="#fff" mt={3}>
        <Pressable
          borderBottomWidth={1}
          borderBottomColor="#f0f0f0"
          px={5}
          py={4}
        >
          <Text fontSize={16}>My Events</Text>
        </Pressable>

        <Pressable
          borderBottomWidth={1}
          borderBottomColor="#f0f0f0"
          px={5}
          py={4}
        >
          <Text fontSize={16}>Favorites</Text>
        </Pressable>

        <Pressable
          px={5}
          py={4}
        >
          <Text fontSize={16}>Settings</Text>
        </Pressable>
      </Box>

      <Button
        bg="#FF6B6B"
        mt={5}
        mx={5}
        py={4}
        borderRadius="md"
        _pressed={{ bg: '#FF5252' }}
        onPress={handleLogout}
      >
        <Text color="#fff" fontWeight="bold">
          Logout
        </Text>
      </Button>
    </ScrollView>
  );
};

export default ProfileScreen;