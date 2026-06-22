import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  Box,
  Text,
  Pressable,
  VStack,
  HStack,
} from 'native-base';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?city=Toronto&classificationName=music&size=12&apikey=${process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY}`
      );

      const data = await response.json();

      if (data._embedded?.events) {
        setEvents(data._embedded.events);
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
      <HStack space={3}>
        <Image
          source={{
            uri: event.images?.[0]?.url || 'https://via.placeholder.com/300',
          }}
          style={{ width: 70, height: 70, borderRadius: 8 }}
        />
        <VStack space={2} flex={1}>
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
      </HStack>
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
