import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, HStack } from 'native-base';
import { auth } from '../service/firebase';

const HeaderRightActions = () => {
  const navigation = useNavigation();

  return (
    <HStack alignItems="center">
      <Pressable onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })} px={4} py={2}>
        <Text color="#fff" fontSize={16}>
          Profile
        </Text>
      </Pressable>
      <Pressable onPress={() => auth.signOut()} px={4} py={2}>
        <Text color="#fff" fontSize={16}>
          Logout
        </Text>
      </Pressable>
    </HStack>
  );
};

export default HeaderRightActions;
