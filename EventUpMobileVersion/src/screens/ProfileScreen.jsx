import React, { useState, useEffect } from 'react';
import {
  ScrollView,
} from 'react-native';
import { auth } from '../service/firebase';
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Pressable,
  Avatar,
} from 'native-base';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Box bg="#fff" py={8} px={5} alignItems="center">
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
          {user?.email?.charAt(0).toUpperCase()}
        </Avatar>

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
          _pressed={{ bg: '#f5f5f5' }}
        >
          <Text fontSize={16} color="#333">
            My Events
          </Text>
        </Pressable>

        <Pressable
          borderBottomWidth={1}
          borderBottomColor="#f0f0f0"
          px={5}
          py={4}
          _pressed={{ bg: '#f5f5f5' }}
        >
          <Text fontSize={16} color="#333">
            Favorites
          </Text>
        </Pressable>

        <Pressable
          px={5}
          py={4}
          _pressed={{ bg: '#f5f5f5' }}
        >
          <Text fontSize={16} color="#333">
            Settings
          </Text>
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
        <Text color="#fff" fontSize={16} fontWeight="bold">
          Logout
        </Text>
      </Button>
    </ScrollView>
  );
};

export default ProfileScreen;
