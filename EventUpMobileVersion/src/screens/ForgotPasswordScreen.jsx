import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../service/firebase';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Box flex={1} bg="#fff" justifyContent="center" px={5} alignItems="center">
        <Text fontSize={48} mb={4}>📧</Text>
        <Text fontSize={20} fontWeight="bold" color="#333" textAlign="center" mb={2}>
          Email Sent!
        </Text>
        <Text fontSize={14} color="#666" textAlign="center" mb={8}>
          Check your inbox for password reset instructions.
        </Text>
        <Button
          bg="#FF6B6B"
          borderRadius="md"
          py={3}
          px={10}
          _pressed={{ bg: '#FF5252' }}
          onPress={() => navigation.navigate('Login')}
        >
          <Text color="#fff" fontWeight="bold" fontSize={16}>Back to Login</Text>
        </Button>
      </Box>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Box flex={1} bg="#fff" justifyContent="center" px={5}>
        <VStack space={2} alignItems="center" mb={8}>
          <Text fontSize={32} fontWeight="bold" color="#FF6B6B">
            EventUp
          </Text>
          <Text fontSize={18} color="#666">
            Reset Password
          </Text>
          <Text fontSize={13} color="#999" textAlign="center" mt={2}>
            Enter your email and we'll send you instructions to reset your password.
          </Text>
        </VStack>

        {error ? (
          <FormControl isInvalid mb={4}>
            <Box
              bg="red.100"
              borderRadius="md"
              p={3}
              flexDirection="row"
              alignItems="center"
            >
              <WarningOutlineIcon color="red.600" mr={2} />
              <Text color="red.600" flex={1}>{error}</Text>
            </Box>
          </FormControl>
        ) : null}

        <VStack space={4}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            isDisabled={loading}
            borderRadius="md"
            py={3}
            px={4}
            fontSize={16}
            _focus={{ borderColor: '#FF6B6B', backgroundColor: '#fff' }}
          />

          <Button
            onPress={handleReset}
            isLoading={loading}
            isDisabled={loading}
            bg="#FF6B6B"
            borderRadius="md"
            py={3}
            mt={2}
            _pressed={{ bg: '#FF5252' }}
          >
            <Text color="#fff" fontWeight="bold" fontSize={16}>
              Send Reset Email
            </Text>
          </Button>
        </VStack>

        <Box alignItems="center" mt={6}>
          <Text
            color="#FF6B6B"
            fontWeight="bold"
            fontSize={14}
            onPress={() => navigation.navigate('Login')}
          >
            Back to Login
          </Text>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
