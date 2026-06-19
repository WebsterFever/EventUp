# EventUp Mobile - React Native Version

A mobile application version of EventUp built with React Native and Expo, allowing users to discover, search, and book event tickets.

## Features

- **Authentication**: Sign up and login with Firebase Authentication
- **Event Discovery**: Browse upcoming events from Ticketmaster API
- **Event Search**: Search for events by keyword
- **Event Details**: View detailed information about events including venue, date, time, and price ranges
- **Favorites**: Save your favorite events
- **Ticket Booking**: Direct integration with Ticketmaster for ticket purchases

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack Navigation)
- **Backend**: Firebase (Authentication & Firestore)
- **API**: Ticketmaster Discovery API
- **State Management**: React Hooks
- **Icons**: React Native Vector Icons

## Project Structure

```
EventUpMobileVersion/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.jsx          # Displays upcoming events
│   │   ├── SearchScreen.jsx        # Search events by keyword
│   │   ├── ProfileScreen.jsx       # User profile and settings
│   │   ├── LoginScreen.jsx         # User login
│   │   ├── SignupScreen.jsx        # User registration
│   │   └── EventDetailsScreen.jsx  # Event details and ticket booking
│   └── service/
│       └── firebase.js              # Firebase configuration
├── App.jsx                          # Main app component with navigation
├── app.json                         # Expo configuration
├── babel.config.js                  # Babel configuration
├── package.json                     # Dependencies and scripts
├── .env                             # Environment variables
└── README.md                        # This file
```

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Expo CLI installed globally: `npm install -g expo-cli`

### Installation

1. Navigate to the project directory:
   ```bash
   cd EventUpMobileVersion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your credentials (Firebase and Ticketmaster API keys)

4. Start the development server:
   ```bash
   npm start
   ```

### Running on Devices

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

## Environment Variables

Create a `.env` file in the root directory with:

```
REACT_NATIVE_FIREBASE_API_KEY=your_firebase_api_key
REACT_NATIVE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_NATIVE_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_NATIVE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
REACT_NATIVE_FIREBASE_APP_ID=your_firebase_app_id
REACT_NATIVE_TICKETMASTER_API_KEY=your_ticketmaster_api_key
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator or device
- `npm run ios` - Run on iOS simulator or device
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

## Features in Detail

### Authentication
- Email/password registration and login
- Firebase Authentication integration
- Auto-redirect to home after successful login

### Home Screen
- Displays upcoming events from Ticketmaster
- Event cards with basic information
- Tap to view full event details

### Search Screen
- Real-time search for events
- Filter by event name or keyword
- Display search results in card format

### Event Details
- Complete event information
- Venue details with address
- Event genres/categories
- Price ranges
- Add to favorites functionality
- Direct link to buy tickets on Ticketmaster

### Profile Screen
- User information display
- Quick access to favorites and settings
- Logout functionality

## API Integration

### Ticketmaster API
- Endpoint: `https://app.ticketmaster.com/discovery/v2/events.json`
- Used for fetching and searching events
- Returns event details, venues, dates, and ticket information

### Firebase Services
- **Authentication**: User registration and login
- **Firestore**: Store user favorites and preferences (future enhancement)

## Customization

### Colors
Main color: `#FF6B6B` (Red)
The app uses this color for buttons, badges, and accents throughout the interface.

### Navigation Structure
- **AuthStack**: Login and Signup screens (shown when user is not authenticated)
- **AppTabs**: Main app navigation with three tabs:
  - Home: Browse events
  - Search: Find specific events
  - Profile: User profile and settings

## Known Limitations

- Favorites are stored locally (not synced with Firebase yet)
- Ticket purchase opens external Ticketmaster URL
- Events are fetched from Ticketmaster API only

## Future Enhancements

- [ ] Sync favorites to Firebase Firestore
- [ ] In-app ticket purchase integration
- [ ] Event categories/filtering
- [ ] Push notifications for event updates
- [ ] User reviews and ratings
- [ ] Share events functionality
- [ ] Offline event viewing (cached data)

## Troubleshooting

### Build Issues
- Clear cache: `expo start -c`
- Clear node_modules: `rm -rf node_modules && npm install`

### Firebase Connection Issues
- Verify `.env` file has correct credentials
- Check Firebase project settings

### Ticketmaster API Issues
- Verify API key is valid and not expired
- Check API rate limits

## License

MIT License

## Support

For issues or questions, please refer to the main EventUp repository documentation.
npx expo start -c  
tasklist | findstr node
taskkill /F /PID 25048
taskkill /F /PID 30024

taskkill /F /IM node.exe

tasklist //FI "IMAGENAME eq node.exe"

Wake the emulator screen (in case it was asleep):
adb -s emulator-5554 shell input keyevent KEYCODE_WAKEUP


curl -X POST http://localhost:8081/reload
