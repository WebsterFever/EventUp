import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBuyTickets = () => {
    if (event.url) {
      Linking.openURL(event.url);
    } else {
      Alert.alert('No tickets available', 'Ticket information is not available for this event.');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? 'Removed from favorites' : 'Added to favorites',
      `${event.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`
    );
  };

  const venue = event._embedded?.venues?.[0];
  const genres = event.classifications?.map(c => c.genre?.name).filter(Boolean) || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eventName}>{event.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date & Time</Text>
        <Text style={styles.sectionContent}>
          {event.dates?.start?.localDate || 'Date TBA'}
        </Text>
        {event.dates?.start?.localTime && (
          <Text style={styles.sectionContent}>
            {event.dates.start.localTime}
          </Text>
        )}
      </View>

      {venue && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Venue</Text>
          <Text style={styles.sectionContent}>{venue.name}</Text>
          {venue.address?.address && (
            <Text style={styles.sectionContent}>{venue.address.address}</Text>
          )}
          {venue.city?.name && (
            <Text style={styles.sectionContent}>
              {venue.city.name}, {venue.state?.stateCode}
            </Text>
          )}
        </View>
      )}

      {genres.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genreContainer}>
            {genres.map((genre, index) => (
              <View key={index} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {event.priceRanges && event.priceRanges.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          {event.priceRanges.map((range, index) => (
            <Text key={index} style={styles.sectionContent}>
              {range.type}: ${range.min} - ${range.max}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.favoriteButton, isFavorite && styles.favoriteActive]}
          onPress={toggleFavorite}
        >
          <Text style={[styles.buttonText, isFavorite && styles.favoriteButtonText]}>
            {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buyButton]} onPress={handleBuyTickets}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  favoriteActive: {
    backgroundColor: '#FFE0E0',
    borderColor: '#FF6B6B',
  },
  buyButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  favoriteButtonText: {
    color: '#FF6B6B',
  },
});

export default EventDetailsScreen;
