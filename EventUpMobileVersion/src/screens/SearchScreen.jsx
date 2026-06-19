import React, { useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import {
  Box,
  Text,
  Input,
  Pressable,
  VStack,
  HStack,
  SearchIcon,
} from 'native-base';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setEvents([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        'https://app.ticketmaster.com/discovery/v2/events.json',
        {
          params: {
            apikey: process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY,
            keyword: query,
            size: 20,
          },
        }
      );

      if (response.data._embedded?.events) {
        setEvents(response.data._embedded.events);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error searching events:', error);
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

  return (
    <Box flex={1} bg="#f5f5f5">
      <Box p={3} bg="#fff">
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={handleSearch}
          InputLeftElement={
            <SearchIcon ml={2} color="#999" />
          }
          borderRadius="md"
          py={3}
          px={4}
          fontSize={16}
          _focus={{
            borderColor: '#FF6B6B',
            backgroundColor: '#fff',
          }}
        />
      </Box>

      {loading && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#FF6B6B" />
        </Box>
      )}

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={
          !loading && searchQuery.length > 0 ? (
            <Box justifyContent="center" alignItems="center" mt={8}>
              <Text fontSize={16} color="#999">
                No events found
              </Text>
            </Box>
          ) : null
        }
      />
    </Box>
  );
};

export default SearchScreen;
