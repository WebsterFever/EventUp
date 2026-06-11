import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { auth } from '../service/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  useToast,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      toast.show({ description: 'Please fill in all fields', duration: 3000 });
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.show({ description: 'Passwords do not match', duration: 3000 });
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      toast.show({ description: 'Password must be at least 6 characters', duration: 3000 });
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      toast.show({ description: err.message, duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Box flex={1} bg="#fff" justifyContent="center" px={5} py={8}>
        <VStack space={6} alignItems="center" mb={8}>
          <Text fontSize={32} fontWeight="bold" color="#FF6B6B">
            EventUp
          </Text>
          <Text fontSize={18} color="#666">
            Create Account
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
              <Text color="red.600" flex={1}>
                {error}
              </Text>
            </Box>
          </FormControl>
        ) : null}

        <VStack space={4}>
          <FormControl>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              isDisabled={loading}
              borderRadius="md"
              py={3}
              px={4}
              fontSize={16}
              _focus={{
                borderColor: '#FF6B6B',
                backgroundColor: '#fff',
              }}
            />
          </FormControl>

          <FormControl>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              isDisabled={loading}
              borderRadius="md"
              py={3}
              px={4}
              fontSize={16}
              _focus={{
                borderColor: '#FF6B6B',
                backgroundColor: '#fff',
              }}
            />
          </FormControl>

          <FormControl>
            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              isDisabled={loading}
              borderRadius="md"
              py={3}
              px={4}
              fontSize={16}
              _focus={{
                borderColor: '#FF6B6B',
                backgroundColor: '#fff',
              }}
            />
          </FormControl>

          <Button
            onPress={handleSignup}
            isDisabled={loading}
            bg="#FF6B6B"
            borderRadius="md"
            py={3}
            mt={4}
            _pressed={{ bg: '#FF5252' }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text color="#fff" fontWeight="bold" fontSize={16}>
                Sign Up
              </Text>
            )}
          </Button>
        </VStack>

        <Box alignItems="center" mt={6}>
          <Box flexDirection="row">
            <Text color="#666">Already have an account? </Text>
            <Text
              color="#FF6B6B"
              fontWeight="bold"
              onPress={() => navigation.navigate('Login')}
            >
              Sign In
            </Text>
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6B6B',
    marginBottom: 15,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignupScreen;
