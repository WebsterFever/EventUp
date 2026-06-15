const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Windows fix: use polling-based file watcher instead of native FS events
config.watcher = {
  watchman: {
    deferStates: [],
  },
  healthCheck: {
    enabled: false,
  },
};

module.exports = config;
