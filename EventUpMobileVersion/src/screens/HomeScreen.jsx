import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {
  Box,
  Text,
  Pressable,
  VStack,
} from 'native-base';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        'https://app.ticketmaster.com/discovery/v2/events.json',
        {
          params: {
            apikey: process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY,
            size: 20,
            sort: 'date,asc',
          },
        }
      );

      if (response.data._embedded?.events) {
        setEvents(response.data._embedded.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const EventCard = ({ event }) => (
    <Pressable
      onPress={() => navigation.navigate('EventDetails', { event })}
      borderRadius="lg"
      bg="#fff"
      p={4}
      mb={3}
      shadow={1}
      _pressed={{
        bg: '#f9f9f9',
        opacity: 0.7,
      }}
    >
      <VStack space={2}>
        <Text fontSize={16} fontWeight="bold" color="#333">
          {event.name}
        </Text>
        <Text fontSize={14} color="#666">
          {event.dates?.start?.localDate || 'Date TBA'}
        </Text>
        {event._embedded?.venues && (
          <Text fontSize={14} color="#666">
            {event._embedded.venues[0].name}
          </Text>
        )}
      </VStack>
    </Pressable>
  );

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="#f5f5f5">
        <ActivityIndicator size="large" color="#FF6B6B" />
      </Box>
    );
  }

  return (
    <Box flex={1} bg="#f5f5f5">
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ padding: 12 }}
      />
    </Box>
  );
};

export default HomeScreen;
