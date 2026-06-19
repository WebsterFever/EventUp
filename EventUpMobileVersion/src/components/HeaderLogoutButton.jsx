import React from 'react';
import { Pressable, Text } from 'native-base';
import { auth } from '../service/firebase';

const HeaderLogoutButton = () => (
  <Pressable onPress={() => auth.signOut()} px={4} py={2}>
    <Text color="#fff" fontSize={16}>
      Logout
    </Text>
  </Pressable>
);

export default HeaderLogoutButton;
