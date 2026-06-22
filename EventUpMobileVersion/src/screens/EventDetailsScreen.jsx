import React from 'react';
import {
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from 'native-base';

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;

  const handleBuyTickets = () => {
    if (event.url) {
      Linking.openURL(event.url);
    } else {
      Alert.alert('No tickets available', 'Ticket information is not available for this event.');
    }
  };

  const venue = event._embedded?.venues?.[0];
  const genres = event.classifications?.map(c => c.genre?.name).filter(Boolean) || [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Box bg="#fff" p={5} borderBottomWidth={1} borderBottomColor="#e0e0e0">
        <Text fontSize={24} fontWeight="bold" color="#333">
          {event.name}
        </Text>
      </Box>

      <Box bg="#fff" mt={3} p={5} borderBottomWidth={1} borderBottomColor="#e0e0e0">
        <Text fontSize={16} fontWeight="bold" color="#333" mb={2}>
          Date & Time
        </Text>
        <Text fontSize={14} color="#666" mb={1}>
          {event.dates?.start?.localDate || 'Date TBA'}
        </Text>
        {event.dates?.start?.localTime && (
          <Text fontSize={14} color="#666">
            {event.dates.start.localTime}
          </Text>
        )}
      </Box>

      {venue && (
        <Box bg="#fff" mt={3} p={5} borderBottomWidth={1} borderBottomColor="#e0e0e0">
          <Text fontSize={16} fontWeight="bold" color="#333" mb={2}>
            Venue
          </Text>
          <Text fontSize={14} color="#666" mb={1}>
            {venue.name}
          </Text>
          {venue.address?.address && (
            <Text fontSize={14} color="#666" mb={1}>
              {venue.address.address}
            </Text>
          )}
          {venue.city?.name && (
            <Text fontSize={14} color="#666">
              {venue.city.name}, {venue.state?.stateCode}
            </Text>
          )}
        </Box>
      )}

      {genres.length > 0 && (
        <Box bg="#fff" mt={3} p={5} borderBottomWidth={1} borderBottomColor="#e0e0e0">
          <Text fontSize={16} fontWeight="bold" color="#333" mb={3}>
            Genres
          </Text>
          <HStack flexWrap="wrap" space={2}>
            {genres.map((genre, index) => (
              <Badge key={index} bg="#FF6B6B" borderRadius="full" px={3} py={1} mb={1}>
                <Text color="#fff" fontSize={12} fontWeight="500">
                  {genre}
                </Text>
              </Badge>
            ))}
          </HStack>
        </Box>
      )}

      {event.priceRanges && event.priceRanges.length > 0 && (
        <Box bg="#fff" mt={3} p={5} borderBottomWidth={1} borderBottomColor="#e0e0e0">
          <Text fontSize={16} fontWeight="bold" color="#333" mb={2}>
            Price Range
          </Text>
          <VStack space={1}>
            {event.priceRanges.map((range, index) => (
              <Text key={index} fontSize={14} color="#666">
                {range.type}: ${range.min} - ${range.max}
              </Text>
            ))}
          </VStack>
        </Box>
      )}

      <HStack p={5}>
        <Button
          flex={1}
          bg="#FF6B6B"
          borderRadius="md"
          py={4}
          _pressed={{ bg: '#FF5252' }}
          onPress={handleBuyTickets}
        >
          <Text color="#fff" fontWeight="bold" fontSize={14}>
            Buy Tickets
          </Text>
        </Button>
      </HStack>
    </ScrollView>
  );
};

export default EventDetailsScreen;
